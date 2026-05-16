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
    `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-001:predict?key=${apiKey}`,
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

async function analyzeImages(apiKey: string, imageParts: { data: string; mimeType: string }[]): Promise<string> {
  const parts: any[] = [
    {
      text: 'Describe the person(s) and/or product(s) in these reference images. For persons: describe facial features, skin tone, hair color and style, age range, eye color, face shape, and distinguishing characteristics. For products: describe shape, color, texture, and key visual details. Be concise and specific (3-4 sentences total).',
    },
    ...imageParts.map((img) => ({ inline_data: { mime_type: img.mimeType, data: img.data } })),
  ];

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts }] }),
    }
  );
  if (!res.ok) return '';
  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'GEMINI_API_KEY not configured' });

  try {
    const { prompt, faces, products, logo, outfitImage, aspectRatio } = req.body;
    if (!prompt) return res.status(400).json({ error: 'No prompt provided' });

    const hasInputImages = (faces?.length > 0) || (products?.length > 0) || logo || outfitImage;
    let finalPrompt = prompt;

    if (hasInputImages) {
      const imageParts: { data: string; mimeType: string }[] = [];
      if (faces) for (const f of faces) imageParts.push({ data: f, mimeType: 'image/jpeg' });
      if (products) for (const p of products) imageParts.push({ data: p, mimeType: 'image/jpeg' });
      if (logo) imageParts.push({ data: logo, mimeType: 'image/png' });
      if (outfitImage) imageParts.push({ data: outfitImage, mimeType: 'image/jpeg' });

      const description = await analyzeImages(apiKey, imageParts);
      if (description) {
        finalPrompt = `${prompt}\n\nSUBJECT APPEARANCE (from uploaded reference photo): ${description}`;
      }
    }

    const resultBase64 = await imagen3Generate(apiKey, finalPrompt, aspectRatio);
    return res.status(200).json({ image: resultBase64 });
  } catch (error: any) {
    console.error('Generate error:', error);
    return res.status(500).json({ error: error.message || 'Failed to generate photo' });
  }
}
