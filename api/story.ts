import type { VercelRequest, VercelResponse } from '@vercel/node';

export const config = { maxDuration: 60 };

interface ImageInput {
  data: string;   // base64
  mimeType: string;
}

async function geminiGenerateStory(apiKey: string, prompt: string, images?: ImageInput[]): Promise<string> {
  const parts: any[] = [];

  // Prepend reference images if provided
  if (images && images.length > 0) {
    images.forEach(img => {
      parts.push({ inlineData: { mimeType: img.mimeType, data: img.data } });
    });
  }
  parts.push({ text: prompt });

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts }],
        generationConfig: { responseModalities: ['Text', 'Image'] },
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
    throw new Error('Gemini không trả về ảnh. Thử điều chỉnh nội dung.');
  }
  return imagePart.inlineData.data;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'GEMINI_API_KEY not configured' });

  try {
    const { prompt, images } = req.body;
    if (!prompt) return res.status(400).json({ error: 'No prompt provided' });

    const resultBase64 = await geminiGenerateStory(apiKey, prompt, images);
    return res.status(200).json({ image: resultBase64 });
  } catch (error: any) {
    console.error('Story generation error:', error);
    return res.status(500).json({ error: error.message || 'Failed to generate story visual' });
  }
}
