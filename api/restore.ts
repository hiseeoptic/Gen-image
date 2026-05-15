import type { VercelRequest, VercelResponse } from '@vercel/node';
import OpenAI from 'openai';

export const config = {
  maxDuration: 60,
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    const { image } = req.body;
    if (!image) {
      return res.status(400).json({ error: 'No image provided' });
    }

    const openai = new OpenAI({ apiKey });

    const prompt = `Act as a professional photo restorer. Fix this old, damaged, or blurry photo. Remove scratches, tear marks, and noise. Sharpen details, correct colors to be realistic and vibrant. Restore the photo to look brand new while preserving the original composition and subjects.`;

    const imageBuffer = Buffer.from(image, 'base64');
    const imageFile = new File([imageBuffer], 'input.jpg', { type: 'image/jpeg' });

    const response = await openai.images.edit({
      model: 'gpt-image-1',
      image: imageFile,
      prompt,
      size: '1024x1024',
    });

    const resultBase64 = response.data?.[0]?.b64_json;
    if (!resultBase64) {
      throw new Error('No image returned from API');
    }

    return res.status(200).json({ image: resultBase64 });
  } catch (error: any) {
    console.error('Restore API error:', error);
    return res.status(500).json({
      error: error.message || 'Failed to restore photo',
    });
  }
}
