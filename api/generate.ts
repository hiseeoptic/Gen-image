import type { VercelRequest, VercelResponse } from '@vercel/node';

export const config = { maxDuration: 60 };

async function geminiGenerateImage(
  apiKey: string,
  prompt: string,
  inputImages?: { data: string; mimeType: string }[]
): Promise<string> {
  const parts: any[] = [];

  if (inputImages && inputImages.length > 0) {
    for (const img of inputImages) {
      parts.push({ inline_data: { mime_type: img.mimeType, data: img.data } });
    }
  }
  parts.push({ text: prompt });

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts }],
        generationConfig: {
          responseModalities: ['IMAGE', 'TEXT'],
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
    throw new Error('Gemini không trả về ảnh. Thử lại hoặc điều chỉnh prompt.');
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

    const inputImages: { data: string; mimeType: string }[] = [];
    if (faces) for (const f of faces) inputImages.push({ data: f, mimeType: 'image/jpeg' });
    if (products) for (const p of products) inputImages.push({ data: p, mimeType: 'image/jpeg' });
    if (logo) inputImages.push({ data: logo, mimeType: 'image/png' });
    if (outfitImage) inputImages.push({ data: outfitImage, mimeType: 'image/jpeg' });

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
