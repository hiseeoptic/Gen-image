import type { VercelRequest, VercelResponse } from '@vercel/node';

export const config = { maxDuration: 60 };

const ASPECT_RATIOS: Record<string, string> = {
  '1:1': '1:1',
  '16:9': '16:9',
  '9:16': '9:16',
};

const OPENAI_SIZES: Record<string, string> = {
  '1:1': '1024x1024',
  '16:9': '1536x1024',
  '9:16': '1024x1536',
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

async function openaiEditWithFace(
  apiKey: string,
  faceBase64: string,
  prompt: string,
  aspectRatio: string
): Promise<string> {
  const size = OPENAI_SIZES[aspectRatio] || '1024x1536';

  const imageBuffer = Buffer.from(faceBase64, 'base64');
  const imageBlob = new Blob([imageBuffer], { type: 'image/jpeg' });

  const formData = new FormData();
  formData.append('model', 'gpt-image-1');
  formData.append('image[]', imageBlob, 'face.jpg');
  formData.append('prompt', prompt);
  formData.append('n', '1');
  formData.append('size', size);

  const res = await fetch('https://api.openai.com/v1/images/edits', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}` },
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error?.message || `OpenAI error ${res.status}`);
  }

  const data = await res.json();
  const b64 = data.data?.[0]?.b64_json;
  if (!b64) throw new Error('No image returned from OpenAI');
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

  const geminiKey = process.env.GEMINI_API_KEY;
  if (!geminiKey) return res.status(500).json({ error: 'GEMINI_API_KEY not configured' });

  try {
    const { prompt, faces, products, logo, outfitImage, aspectRatio } = req.body;
    if (!prompt) return res.status(400).json({ error: 'No prompt provided' });

    const hasFaces = Array.isArray(faces) && faces.length > 0;

    // Face uploaded + OpenAI key → use OpenAI gpt-image-1 for true face preservation
    if (hasFaces) {
      const openaiKey = process.env.OPENAI_API_KEY;
      if (openaiKey) {
        const resultBase64 = await openaiEditWithFace(openaiKey, faces[0], prompt, aspectRatio);
        return res.status(200).json({ image: resultBase64 });
      }
    }

    // No face (or no OpenAI key) → Imagen 3, optionally with Gemini description
    const hasInputImages = hasFaces || (products?.length > 0) || logo || outfitImage;
    let finalPrompt = prompt;

    if (hasInputImages) {
      const imageParts: { data: string; mimeType: string }[] = [];
      if (faces) for (const f of faces) imageParts.push({ data: f, mimeType: 'image/jpeg' });
      if (products) for (const p of products) imageParts.push({ data: p, mimeType: 'image/jpeg' });
      if (logo) imageParts.push({ data: logo, mimeType: 'image/png' });
      if (outfitImage) imageParts.push({ data: outfitImage, mimeType: 'image/jpeg' });

      const description = await analyzeImages(geminiKey, imageParts);
      if (description) {
        finalPrompt = `${prompt}\n\nSUBJECT APPEARANCE (from uploaded reference photo): ${description}`;
      }
    }

    const resultBase64 = await imagen3Generate(geminiKey, finalPrompt, aspectRatio);
    return res.status(200).json({ image: resultBase64 });
  } catch (error: any) {
    console.error('Generate error:', error);
    return res.status(500).json({ error: error.message || 'Failed to generate photo' });
  }
}
