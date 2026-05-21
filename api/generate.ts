import type { VercelRequest, VercelResponse } from '@vercel/node';

export const config = { maxDuration: 60 };

interface LabeledImage {
  data: string;
  mimeType: string;
  role: 'face' | 'product' | 'logo' | 'outfit';
}

const ROLE_LABELS: Record<LabeledImage['role'], string> = {
  face: 'FACE REFERENCE IMAGE — This is the person who must appear in the generated photo. You MUST preserve this exact face identity, facial features, bone structure, skin tone, and overall appearance. Do not alter or replace this person\'s face:',
  product: 'PRODUCT REFERENCE IMAGE — This is the exact product that must be included in the generated photo. The person should be holding, showcasing, or interacting with this specific product. Make the product clearly visible and recognizable:',
  logo: 'LOGO REFERENCE IMAGE — Integrate this logo tastefully and visibly in the generated image:',
  outfit: 'OUTFIT REFERENCE IMAGE — Match this clothing style in the generated image:',
};

async function geminiGenerateImage(
  apiKey: string,
  prompt: string,
  inputImages?: LabeledImage[]
): Promise<string> {
  const parts: any[] = [];

  if (inputImages && inputImages.length > 0) {
    for (const img of inputImages) {
      parts.push({ text: ROLE_LABELS[img.role] });
      parts.push({ inline_data: { mime_type: img.mimeType, data: img.data } });
    }
  }
  parts.push({ text: prompt });

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts }],
        generationConfig: {
          responseModalities: ['Text', 'Image'],
        },
      }),
    }
  );

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error?.message || `Gemini error ${res.status}`);
  }

  const data = await res.json();
  const imagePart = data.candidates?.[0]?.content?.parts?.find((p: any) => p.inlineData);
  if (!imagePart?.inlineData?.data) {
    throw new Error('Gemini không trả về ảnh. Thử điều chỉnh prompt.');
  }

  return imagePart.inlineData.data;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'GEMINI_API_KEY not configured' });

  try {
    const { prompt, faces, products, logo, outfitImage } = req.body;
    if (!prompt) return res.status(400).json({ error: 'No prompt provided' });

    const inputImages: LabeledImage[] = [];
    if (faces) for (const f of faces) inputImages.push({ data: f, mimeType: 'image/jpeg', role: 'face' });
    if (products) for (const p of products) inputImages.push({ data: p, mimeType: 'image/jpeg', role: 'product' });
    if (logo) inputImages.push({ data: logo, mimeType: 'image/png', role: 'logo' });
    if (outfitImage) inputImages.push({ data: outfitImage, mimeType: 'image/jpeg', role: 'outfit' });

    const resultBase64 = await geminiGenerateImage(
      apiKey,
      prompt,
      inputImages.length > 0 ? inputImages : undefined
    );

    return res.status(200).json({ image: resultBase64 });
  } catch (error: any) {
    console.error('Generate error:', error);
    return res.status(500).json({ error: error.message || 'Failed to generate photo' });
  }
}
