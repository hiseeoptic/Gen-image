import type { VercelRequest, VercelResponse } from '@vercel/node';

export const config = { maxDuration: 60 };

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'GEMINI_API_KEY not configured' });

  try {
    const { image } = req.body;
    if (!image) return res.status(400).json({ error: 'No image provided' });

    const res2 = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [
              { inline_data: { mime_type: 'image/jpeg', data: image } },
              {
                text: 'Restore this old or damaged photo. Remove scratches, fix fading and discoloration, sharpen all details, correct colors to be vivid and realistic. Output a professionally restored, high-quality version while preserving all original subjects and composition exactly.',
              },
            ],
          }],
          generationConfig: {
            responseModalities: ['IMAGE', 'TEXT'],
          },
        }),
      }
    );

    if (!res2.ok) {
      const err = await res2.json();
      throw new Error(err.error?.message || `Gemini error ${res2.status}`);
    }

    const data = await res2.json();
    const imagePart = data.candidates?.[0]?.content?.parts?.find((p: any) => p.inlineData);
    if (!imagePart?.inlineData?.data) {
      throw new Error('Gemini không trả về ảnh phục chế.');
    }

    return res.status(200).json({ image: imagePart.inlineData.data });
  } catch (error: any) {
    console.error('Restore error:', error);
    return res.status(500).json({ error: error.message || 'Failed to restore photo' });
  }
}
