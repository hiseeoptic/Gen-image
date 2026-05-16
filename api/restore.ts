import type { VercelRequest, VercelResponse } from '@vercel/node';

export const config = { maxDuration: 60 };

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'GEMINI_API_KEY not configured' });

  try {
    const { image } = req.body;
    if (!image) return res.status(400).json({ error: 'No image provided' });

    // Step 1: Analyze the old photo with Gemini Vision
    const analyzeRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [
              {
                text: 'Describe this photograph in detail: who is in it (appearance, age, clothing, expression), the setting/background, composition, era/time period, and overall mood. Be very descriptive so this photo could be faithfully recreated. 4-5 sentences.',
              },
              { inline_data: { mime_type: 'image/jpeg', data: image } },
            ],
          }],
        }),
      }
    );

    if (!analyzeRes.ok) throw new Error('Failed to analyze photo');
    const analyzeData = await analyzeRes.json();
    const description = analyzeData.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';

    // Step 2: Generate restored version with Imagen 3
    const restorationPrompt = `A professionally restored, high-quality photograph. ${description} The image is perfectly sharp, with vibrant natural colors, no damage, scratches, fading, or artifacts. Photorealistic, 8K quality, clean print.`;

    const genRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-001:predict?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          instances: [{ prompt: restorationPrompt }],
          parameters: {
            sampleCount: 1,
            aspectRatio: '1:1',
            safetyFilterLevel: 'block_only_high',
            personGeneration: 'allow_adult',
          },
        }),
      }
    );

    if (!genRes.ok) {
      const err = await genRes.json();
      throw new Error(err.error?.message || 'Imagen 3 error');
    }

    const genData = await genRes.json();
    const b64 = genData.predictions?.[0]?.bytesBase64Encoded;
    if (!b64) throw new Error('No image returned');

    return res.status(200).json({ image: b64 });
  } catch (error: any) {
    console.error('Restore error:', error);
    return res.status(500).json({ error: error.message || 'Failed to restore photo' });
  }
}
