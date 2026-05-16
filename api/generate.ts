import type { VercelRequest, VercelResponse } from '@vercel/node';
import OpenAI from 'openai';

export const config = { maxDuration: 60 };

const SIZES: Record<string, '1024x1024' | '1536x1024' | '1024x1536'> = {
  '1:1': '1024x1024',
  '16:9': '1536x1024',
  '9:16': '1024x1536',
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'OPENAI_API_KEY not configured' });

  try {
    const { prompt, faces, products, logo, outfitImage, aspectRatio } = req.body;
    if (!prompt) return res.status(400).json({ error: 'No prompt provided' });

    const openai = new OpenAI({ apiKey });
    const size = SIZES[aspectRatio] || '1024x1536';

    const hasInputImages =
      (Array.isArray(faces) && faces.length > 0) ||
      (Array.isArray(products) && products.length > 0) ||
      logo ||
      outfitImage;

    if (hasInputImages) {
      // Collect all input images — faces first (most important for identity)
      const imageFiles: File[] = [];

      if (faces) {
        for (const f of faces) {
          const buf = Buffer.from(f, 'base64');
          imageFiles.push(new File([buf], `face_${imageFiles.length}.jpg`, { type: 'image/jpeg' }));
        }
      }
      if (products) {
        for (const p of products) {
          const buf = Buffer.from(p, 'base64');
          imageFiles.push(new File([buf], `product_${imageFiles.length}.jpg`, { type: 'image/jpeg' }));
        }
      }
      if (logo) {
        const buf = Buffer.from(logo, 'base64');
        imageFiles.push(new File([buf], 'logo.png', { type: 'image/png' }));
      }
      if (outfitImage) {
        const buf = Buffer.from(outfitImage, 'base64');
        imageFiles.push(new File([buf], 'outfit.jpg', { type: 'image/jpeg' }));
      }

      const response = await openai.images.edit({
        model: 'gpt-image-1',
        image: imageFiles[0],
        prompt,
        size,
      });

      const b64 = response.data?.[0]?.b64_json;
      if (!b64) throw new Error('No image returned from OpenAI');
      return res.status(200).json({ image: b64 });
    } else {
      // Text-only generation
      const response = await openai.images.generate({
        model: 'gpt-image-1',
        prompt,
        size,
        n: 1,
      });

      const b64 = response.data?.[0]?.b64_json;
      if (!b64) throw new Error('No image returned from OpenAI');
      return res.status(200).json({ image: b64 });
    }
  } catch (error: any) {
    console.error('Generate error:', error);
    return res.status(500).json({ error: error.message || 'Failed to generate photo' });
  }
}
