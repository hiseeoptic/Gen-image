import type { VercelRequest, VercelResponse } from '@vercel/node';

export const config = { maxDuration: 60 };

const ASPECT_RATIOS: Record<string, string> = {
  '1:1': '1:1',
  '16:9': '16:9',
  '9:16': '9:16',
};

async function imagen3Generate(apiKey: string, prompt: string, aspectRatio: string): Promise<string> {
  const ar = ASPECT_RATIOS[aspectRatio] || '9:16';
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        instances: [{ prompt }],
        parameters: {
          sampleCount: 1,
          aspectRatio: ar,
          safetyFilterLevel: 'block_only_high',
          personGeneration: 'allow_adult',
        },
      }),
    }
  );
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error?.message || `Imagen 3 error ${res.status}`);
  }
  const data = await res.json();
  const b64 = data.predictions?.[0]?.bytesBase64Encoded;
  if (!b64) throw new Error('No image returned from Imagen 3');
  return b64;
}

async function geminiFlashGenerate(
  apiKey: string,
  prompt: string,
  imageParts: { data: string; mimeType: string }[]
): Promise<string> {
  const parts: any[] = [{ text: prompt }];
  for (const img of imageParts) {
    parts.push({ inline_data: { mime_type: img.mimeType, data: img.data } });
  }

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-preview-image-generation:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts }],
        generationConfig: { responseModalities: ['IMAGE', 'TEXT'] },
      }),
    }
  );
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error?.message || `Gemini Flash error ${res.status}`);
  }
  const data = await res.json();
  for (const part of data.candidates?.[0]?.content?.parts ?? []) {
    if (part.inlineData?.mimeType?.startsWith('image/')) {
      return part.inlineData.data;
    }
  }
  throw new Error('No image returned from Gemini Flash');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'GEMINI_API_KEY not configured' });

  try {
    const { prompt, faces, products, logo, outfitImage, aspectRatio } = req.body;
    if (!prompt) return res.status(400).json({ error: 'No prompt provided' });

    const hasInputImages = (faces?.length > 0) || (products?.length > 0) || logo || outfitImage;
    let resultBase64: string;

    if (hasInputImages) {
      const imageParts: { data: string; mimeType: string }[] = [];
      if (faces) for (const f of faces) imageParts.push({ data: f, mimeType: 'image/jpeg' });
      if (products) for (const p of products) imageParts.push({ data: p, mimeType: 'image/jpeg' });
      if (logo) imageParts.push({ data: logo, mimeType: 'image/png' });
      if (outfitImage) imageParts.push({ data: outfitImage, mimeType: 'image/jpeg' });
      resultBase64 = await geminiFlashGenerate(apiKey, prompt, imageParts);
    } else {
      resultBase64 = await imagen3Generate(apiKey, prompt, aspectRatio);
    }

    return res.status(200).json({ image: resultBase64 });
  } catch (error: any) {
    console.error('Generate error:', error);
    return res.status(500).json({ error: error.message || 'Failed to generate photo' });
  }
}
