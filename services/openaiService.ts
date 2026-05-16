import { PhotoConfig } from "../types";

export const fileToGenerativePart = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      const base64Data = base64String.split(',')[1];
      resolve(base64Data);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export interface PromptBuildContext {
  hasFaces: boolean;
  hasProducts: boolean;
  hasLogo: boolean;
}

export function buildPrompt(config: PhotoConfig, ctx: PromptBuildContext = { hasFaces: false, hasProducts: false, hasLogo: false }): string {
  const isSpecial = config.photographyStyleCategory === 'special';

  // Subject
  let subject = '';
  if (config.subjectType === 'PRODUCT') {
    subject = 'a product';
  } else {
    const map: Record<string, string> = { MALE: 'a man', FEMALE: 'a woman', COUPLE: 'a couple', GROUP: 'a group of people' };
    subject = map[config.subjectType] || 'a person';
    if (config.customSubjectCount) subject += ` (${config.customSubjectCount})`;
  }

  // Face identity
  const faceId = ctx.hasFaces
    ? 'FACE IDENTITY: Exactly match the provided input face photo — preserve all facial features, skin tone, and identity precisely.'
    : '';

  // Face enhancements
  const enhMap: Record<string, string> = {
    younger: 'natural de-aging (5-10 years younger)',
    smooth_skin: 'smooth professional skin retouching',
    makeup: 'natural elegant makeup',
    bright_eyes: 'bright clear eyes',
  };
  const enh = config.faceEnhancements.map((id: string) => enhMap[id]).filter(Boolean);
  const enhLine = enh.length > 0 ? `Facial enhancements: ${enh.join(', ')}.` : '';

  if (isSpecial) {
    return [
      config.photographyStyle + '.',
      `The main subject is ${subject}.`,
      faceId,
      enhLine,
      config.quality,
      config.additionalPrompt ? `Additional: ${config.additionalPrompt}.` : '',
    ].filter(Boolean).join(' ');
  }

  // Standard prompt
  const outfitPart = config.subjectType !== 'PRODUCT' && config.outfitDetail
    ? config.outfitDetail + (config.outfitImage ? ' (match the reference outfit image style)' : '')
    : '';

  return [
    `A high-quality photorealistic image of ${subject}.`,
    `Photography style: ${config.photographyStyle}.`,
    `Camera angle: ${config.cameraAngle}.`,
    config.pose ? `Pose: ${config.pose}.` : '',
    config.subjectType !== 'PRODUCT' ? `Expression: ${config.expression}.` : '',
    outfitPart ? `Outfit: ${outfitPart}.` : '',
    ctx.hasProducts ? 'Include the provided product(s) naturally in the scene.' : '',
    ctx.hasLogo ? 'Integrate the provided logo visibly but tastefully.' : '',
    `Setting: ${config.contextDetail}.`,
    `Lighting: ${config.lighting}.`,
    `Quality: ${config.quality}.`,
    faceId,
    enhLine,
    config.additionalPrompt ? `Additional: ${config.additionalPrompt}.` : '',
  ].filter(Boolean).join('\n');
}

export const restorePhoto = async (base64Image: string): Promise<string> => {
  const response = await fetch('/api/restore', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ image: base64Image }),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error || 'Lỗi khi phục chế ảnh');
  }

  const data = await response.json();
  return `data:image/png;base64,${data.image}`;
};

export interface GenerationInputs {
  faces: string[];
  products: string[];
  logo: string | null;
}

export const generatePersonalPhoto = async (
  inputs: GenerationInputs,
  config: PhotoConfig
): Promise<string> => {
  const { faces, products, logo } = inputs;

  const prompt = buildPrompt(config, {
    hasFaces: faces.length > 0,
    hasProducts: products.length > 0,
    hasLogo: !!logo,
  });

  const body: Record<string, any> = {
    prompt,
    aspectRatio: config.aspectRatio || '16:9',
  };

  if (config.source === 'UPLOAD') {
    if (faces.length > 0) body.faces = faces;
    if (products.length > 0) body.products = products;
    if (logo) body.logo = logo;
  }
  if (config.outfitImage) {
    body.outfitImage = config.outfitImage;
  }

  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error || 'Lỗi khi tạo ảnh');
  }

  const data = await response.json();
  return `data:image/png;base64,${data.image}`;
};
