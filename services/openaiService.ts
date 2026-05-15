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

  let subjectDescription = "";
  if (config.subjectType === 'PRODUCT') {
    subjectDescription = "A professional product photography shot.";
  } else {
    const genderMap: Record<string, string> = {
      'MALE': 'man', 'FEMALE': 'woman', 'COUPLE': 'couple', 'GROUP': 'group of people'
    };
    const baseSubject = genderMap[config.subjectType] || 'person';
    const countInfo = config.customSubjectCount ? `(${config.customSubjectCount})` : "";
    subjectDescription = `A photorealistic image of a ${baseSubject} ${countInfo}.`;
  }

  let outfitPrompt = config.outfitDetail;
  if (config.outfitImage) {
    outfitPrompt += " (Use the clothing style from the provided Reference Outfit Image)";
  }

  let faceInstructions = "Ensure the face matches the input identity.";
  if (config.faceEnhancements.length > 0) {
    const enhancements = [];
    if (config.faceEnhancements.includes('younger'))
      enhancements.push("apply a subtle rejuvenation filter to look 5-10 years younger naturally");
    if (config.faceEnhancements.includes('smooth_skin'))
      enhancements.push("apply professional skin retouching, smooth texture, remove blemishes");
    if (config.faceEnhancements.includes('makeup'))
      enhancements.push("apply natural, elegant makeup to enhance features");
    if (config.faceEnhancements.includes('bright_eyes'))
      enhancements.push("enhance eye clarity and brightness");
    faceInstructions = `FACE ENHANCEMENT: ${enhancements.join(", ")}. Maintain natural bone structure.`;
  }

  const prompt = `
    Role: World-class Photographer & Art Director.
    Task: Create a high-end photo.

    CRITICAL INSTRUCTIONS FOR FACE IDENTITY (HIGHEST PRIORITY):
    1. IDENTITY LOCK: The generated face MUST be an EXACT replica of the provided Input Face Image.
    2. FULL BODY FIDELITY: Prioritize facial resolution even in wide shots.
    3. Enhancements: ${faceInstructions}
    ${products.length > 0 ? '4. PRODUCT PLACEMENT: Include the product(s) naturally in the scene.' : ''}
    ${logo ? '5. LOGO INTEGRATION: Place the logo visibly but naturally.' : ''}

    SPECIFICATIONS:
    - Subject: ${subjectDescription}
    - Photography Style: ${config.photographyStyle}
    - Pose/Action: ${config.pose}
    - Expression: ${config.expression}
    - Outfit: ${outfitPrompt}
    - Context/Location: ${config.contextDetail} (Category: ${config.contextCategory})
    - Lighting: ${config.lighting}
    - Camera Angle: ${config.cameraAngle}
    - Quality: ${config.quality}
    - Additional Notes: ${config.additionalPrompt}

    Return ONLY the generated image.
  `.trim();

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
