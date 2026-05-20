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

  // Subject description
  let subject = '';
  if (config.subjectType === 'PRODUCT') {
    subject = 'a product';
  } else {
    const map: Record<string, string> = {
      MALE: 'a man',
      FEMALE: 'a woman',
      COUPLE: 'a couple',
      GROUP: 'a group of people',
    };
    subject = map[config.subjectType] || 'a person';
    if (config.customSubjectCount) subject += ` (${config.customSubjectCount})`;
  }

  // Face identity instruction — prioritise lock_face if selected, otherwise use reference phrasing
  const hasLockFace = config.faceEnhancements?.includes('lock_face');
  const faceId = ctx.hasFaces
    ? hasLockFace
      ? 'CRITICAL FACE IDENTITY: Exactly preserve and precisely recreate every single facial feature from the uploaded reference photo — same face shape, bone structure, skin tone, eye shape, nose, lips, and complete identity. The person in the output must be unmistakably and identically the same individual as in the reference. Do not alter the face under any circumstance.'
      : 'CRITICAL FACE IDENTITY: You must precisely match the uploaded reference face photo — preserve every facial feature, bone structure, skin tone, eye shape, nose, and complete identity. The person in the output must be unmistakably the same individual as in the reference.'
    : '';

  // Face enhancement map
  const enhMap: Record<string, string> = {
    lock_face: 'CRITICAL — Exactly preserve ALL facial features from reference photo. Same face, same identity.',
    smooth_skin: 'flawlessly smooth natural skin texture, professional beauty retouching',
    bright_skin: 'naturally brightened luminous skin, healthy inner glow',
    younger: 'naturally de-aged 5-10 years younger, realistic and convincing',
    remove_wrinkles: 'wrinkles and fine lines subtly smoothed, fresh youthful skin',
    makeup: 'light natural makeup, soft definition',
    bright_eyes: 'bright sparkling eyes, expressive and clear gaze',
    sharp_features: 'sharper defined facial features, refined jawline and cheekbones',
  };

  // Filter out lock_face from visual enhancement list (it's handled separately in faceId)
  const enhancementsToShow = (config.faceEnhancements || []).filter((id: string) => id !== 'lock_face');
  const enh = enhancementsToShow.map((id: string) => enhMap[id]).filter(Boolean);
  const enhLine = enh.length > 0 ? `Facial enhancements applied: ${enh.join('; ')}.` : '';

  // Camera/lens line
  const cameraLine = config.camera && config.camera.trim() !== '' ? config.camera.trim() : '';

  // --- SPECIAL STYLE PATH ---
  if (isSpecial) {
    const parts: string[] = [
      config.photographyStyle + '.',
      `The main subject is ${subject}.`,
      config.subjectType !== 'PRODUCT' && config.outfitDetail
        ? `Wearing: ${config.outfitDetail}.`
        : '',
      config.subjectType !== 'PRODUCT' ? `Expression: ${config.expression}.` : '',
      cameraLine ? `${cameraLine}.` : '',
      faceId,
      enhLine,
      config.quality,
      ctx.hasProducts ? 'Include the provided product(s) naturally in the scene.' : '',
      ctx.hasLogo ? 'Integrate the provided logo visibly but tastefully.' : '',
      config.additionalPrompt ? `Additional details: ${config.additionalPrompt}.` : '',
      'Photograph must look completely real and photographic.',
    ];
    return parts.filter(Boolean).join(' ');
  }

  // --- STANDARD PROMPT PATH ---

  // Quality/style intro sentence
  const qualityIntro = config.quality
    ? `${config.quality}.`
    : 'A high-quality photorealistic photograph.';

  // Outfit
  const outfitPart =
    config.subjectType !== 'PRODUCT' && config.outfitDetail
      ? config.outfitDetail + (config.outfitImage ? ', styled to match the provided outfit reference image' : '')
      : '';

  // Build a natural flowing prompt
  const parts: string[] = [];

  // 1. Quality/style intro
  parts.push(qualityIntro);

  // 2. Subject with photography style context
  parts.push(`The subject is ${subject}, photographed in ${config.photographyStyle} style.`);

  // 3. Outfit
  if (outfitPart) {
    parts.push(`Wearing: ${outfitPart}.`);
  }

  // 4. Pose
  if (config.subjectType !== 'PRODUCT' && config.pose) {
    parts.push(`Pose: ${config.pose}.`);
  }

  // 5. Expression
  if (config.subjectType !== 'PRODUCT') {
    parts.push(`Expression: ${config.expression}.`);
  }

  // 6. Products / logo
  if (ctx.hasProducts) {
    parts.push('Include the provided product(s) naturally and prominently in the scene.');
  }
  if (ctx.hasLogo) {
    parts.push('Integrate the provided logo visibly but tastefully into the image.');
  }

  // 7. Setting/context with atmosphere
  if (config.contextDetail) {
    parts.push(`Setting: ${config.contextDetail}.`);
  }

  // 8. Lighting setup
  if (config.lighting) {
    parts.push(`Lighting: ${config.lighting}.`);
  }

  // 9. Camera angle
  if (config.cameraAngle) {
    parts.push(`Camera angle: ${config.cameraAngle}.`);
  }

  // 10. Camera/lens
  if (cameraLine) {
    parts.push(`${cameraLine}.`);
  }

  // 11. Face identity instruction
  if (faceId) {
    parts.push(faceId);
  }

  // 12. Face enhancements
  if (enhLine) {
    parts.push(enhLine);
  }

  // 13. Additional notes
  if (config.additionalPrompt) {
    parts.push(`Additional details: ${config.additionalPrompt}.`);
  }

  // 14. Realism anchor
  parts.push('The final result must look like a real professional photograph — not digital art, not illustration, not CGI. Pure photographic realism.');

  return parts.filter(Boolean).join('\n');
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
