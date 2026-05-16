import type { VercelRequest, VercelResponse } from '@vercel/node';

export const config = { maxDuration: 60 };

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'GEMINI_API_KEY not configured' });

  try {
    const { image } = req.body;
    if (!image) return res.status(400).json({ error: 'No image provided' });

    const prompt = 'You are a professional photo restorer. Restore this old, damaged, or blurry photo: remove scratches, tear marks, and noise; sharpen details; correct colors to be realistic and vibrant. Return the restored image while preserving the original composition and subjects exactly.';

    const apiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-preview-image-generation:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [
              { text: prompt },
              { inline_data: { mime_type: 'image/jpeg', data: image } },
            ],
          }],
          generationConfig: { responseModalities: ['IMAGE', 'TEXT'] },
        }),
      }
    );

    if (!apiRes.ok) {
      const err = await apiRes.json();
      throw new Error(err.error?.message || `API error ${apiRes.status}`);
    }

    const data = await apiRes.json();
    for (const part of data.candidates?.[0]?.content?.parts ?? []) {
      if (part.inlineData?.mimeType?.startsWith('image/')) {
        return res.status(200).json({ image: part.inlineData.data });
      }
    }
    throw new Error('No image returned');
  } catch (error: any) {
    console.error('Restore error:', error);
    return res.status(500).json({ error: error.message || 'Failed to restore photo' });
  }
}
