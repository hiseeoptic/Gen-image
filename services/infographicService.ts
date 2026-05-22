import { InfographicConfig, InfographicFormat, InfographicStyle, InfographicLayout, InfographicType } from '../types';

export interface StyleTemplate {
  label: string;
  description: string;
  bgFrom: string;
  bgTo: string;
  prompt: string;
}

export interface LayoutTemplate {
  label: string;
  description: string;
  icon: string;
}

export interface TypeTemplate {
  label: string;
  icon: string;
  description: string;
  leftTitle: string;
  rightTitle: string;
  heroHint: string;
  ingredientLabel: string;
  stepLabel: string;
}

export const TYPE_TEMPLATES: Record<InfographicType, TypeTemplate> = {
  recipe: {
    label: 'Công thức món ăn',
    icon: '🍜',
    description: 'Nguyên liệu + hình món ăn 3D + quy trình nấu — đẹp như tạp chí ẩm thực',
    leftTitle: 'Nguyên Liệu',
    rightTitle: 'Quy Trình Thực Hiện',
    heroHint: 'VD: Nồi lẩu nấm đang sôi sục, đầy nấm hương, kim châm, thịt bò, đậu hũ và rau xanh. Nồi gốm trắng trên bếp ga nhỏ.',
    ingredientLabel: 'Nguyên liệu',
    stepLabel: 'Bước',
  },
  product_ingredients: {
    label: 'Thành phần sản phẩm',
    icon: '🧴',
    description: 'Làm từ những gì, chiết xuất gì — infographic thành phần cho mỹ phẩm, thực phẩm chức năng',
    leftTitle: 'Thành Phần',
    rightTitle: 'Công Dụng',
    heroHint: 'VD: Chai serum màu vàng nhạt, đứng thẳng trên nền trắng, nhìn thấy rõ nhãn sản phẩm. Xung quanh có các nguyên liệu tự nhiên.',
    ingredientLabel: 'Thành phần',
    stepLabel: 'Công dụng',
  },
  how_to_use: {
    label: 'Hướng dẫn sử dụng',
    icon: '📋',
    description: 'Cách dùng sản phẩm từng bước — infographic quy trình rõ ràng đẹp mắt',
    leftTitle: 'Bạn Cần',
    rightTitle: 'Các Bước Thực Hiện',
    heroHint: 'VD: Sản phẩm chăm sóc da màu hồng pastel trên bề mặt đá cẩm thạch trắng, ánh sáng nhẹ nhàng từ bên trái.',
    ingredientLabel: 'Cần chuẩn bị',
    stepLabel: 'Bước thực hiện',
  },
  product_brochure: {
    label: 'Brochure sản phẩm',
    icon: '✨',
    description: 'Showcase sản phẩm với tính năng nổi bật — brochure quảng cáo chuyên nghiệp',
    leftTitle: 'Điểm Nổi Bật',
    rightTitle: 'Tại Sao Chọn Chúng Tôi',
    heroHint: 'VD: Bộ sản phẩm chăm sóc da gồm 3 chai được sắp xếp đẹp, nền trắng sạch, ánh sáng studio chuyên nghiệp.',
    ingredientLabel: 'Tính năng',
    stepLabel: 'Lý do',
  },
};

export const STYLE_TEMPLATES: Record<InfographicStyle, StyleTemplate> = {
  soft_pastel: {
    label: 'Soft Pastel',
    description: 'Nền kem/be ấm, màu pastel nhẹ nhàng — như ảnh lẩu nấm',
    bgFrom: '#f5ede3',
    bgTo: '#fdf6ee',
    prompt: 'Soft pastel infographic illustration style, warm cream beige background, gentle pastel accent colors (soft pink, mint green, peach), 3D rounded illustration elements, cute and appetizing visual style, soft drop shadows, clean Korean design aesthetic, high-end food magazine quality',
  },
  clean_modern: {
    label: 'Clean Modern',
    description: 'Nền trắng tinh, tối giản hiện đại, chuyên nghiệp',
    bgFrom: '#ffffff',
    bgTo: '#f8f9fa',
    prompt: 'Clean modern infographic design, pure white background, minimal geometric design elements, bold accent colors, Swiss-inspired grid system, crisp clean typography, professional commercial infographic quality, modern brand design system',
  },
  dark_luxury: {
    label: 'Dark Luxury',
    description: 'Nền tối sang trọng, chi tiết vàng và trắng — premium cao cấp',
    bgFrom: '#1a1a1a',
    bgTo: '#0d0d0d',
    prompt: 'Dark luxury infographic design, deep charcoal or near-black background, gold and cream accent colors, elegant premium typography, sophisticated composition, luxury brand aesthetic, golden decorative elements, high-end commercial design quality',
  },
  colorful_vibrant: {
    label: 'Colorful Vibrant',
    description: 'Đa màu sắc tươi vui, năng động — phù hợp thực phẩm, đồ uống',
    bgFrom: '#fff9f0',
    bgTo: '#fffbf5',
    prompt: 'Vibrant colorful infographic illustration, bright cheerful color palette, energetic and appetite-stimulating colors, playful illustrated style, warm yellows and oranges, fresh greens, modern food illustration quality, Instagram-worthy visual design',
  },
  korean_minimal: {
    label: 'Korean Minimal',
    description: 'Phong cách Hàn Quốc tối giản, màu be và nude, rất trendy',
    bgFrom: '#f7f3ef',
    bgTo: '#f0ebe4',
    prompt: 'Korean minimalist infographic design, warm nude and beige tones, extremely clean and breathable layout, delicate fine-line illustrations, Muji-inspired simplicity, gentle warm neutrals, modern Seoul design aesthetic, premium understated quality',
  },
};

export const LAYOUT_TEMPLATES: Record<InfographicLayout, LayoutTemplate> = {
  classic_recipe: {
    label: 'Classic (Trái - Giữa - Phải)',
    icon: '◫',
    description: 'Nguyên liệu trái, hình chính giữa, quy trình phải — giống ảnh lẩu nấm',
  },
  hero_center: {
    label: 'Hero ở giữa lớn',
    icon: '◉',
    description: 'Hình sản phẩm chiếm trung tâm lớn, thông tin xung quanh',
  },
  left_hero: {
    label: 'Hero bên trái',
    icon: '◧',
    description: 'Sản phẩm lớn bên trái, thông tin chi tiết bên phải',
  },
  top_hero: {
    label: 'Hero ở trên',
    icon: '⬒',
    description: 'Hình lớn phía trên, bảng thông tin bên dưới',
  },
  grid_showcase: {
    label: 'Lưới thông tin',
    icon: '⊞',
    description: 'Bố cục dạng lưới đều nhau, nhiều thành phần cùng kích cỡ',
  },
};

const BADGE_PRESETS = [
  { label: 'Thời gian nấu', value: '30 phút', color: 'pink' },
  { label: 'Độ khó', value: 'Dễ', color: 'mint' },
  { label: 'Khẩu phần', value: '4 người', color: 'peach' },
  { label: 'Calo', value: '350 kcal', color: 'lavender' },
  { label: 'Xuất xứ', value: 'Việt Nam', color: 'blue' },
  { label: 'Thời gian lưu trữ', value: '6 tháng', color: 'green' },
  { label: 'Dung tích', value: '50ml', color: 'pink' },
  { label: '100%', value: 'Tự nhiên', color: 'mint' },
];

export function getBadgePresets() { return BADGE_PRESETS; }

// ─── PROMPT BUILDER ──────────────────────────────────────────────────────────

export function buildInfographicPrompt(config: InfographicConfig): string {
  const style = STYLE_TEMPLATES[config.style];
  const type = TYPE_TEMPLATES[config.type];

  const ingredientSection = config.ingredients.length > 0
    ? config.ingredients.map(ing =>
        `• ${ing.amount ? ing.amount + ' ' : ''}${ing.name}${ing.note ? ' (${ing.note})' : ''}`
      ).join('\n')
    : '(no ingredients listed)';

  const stepsSection = config.steps.length > 0
    ? config.steps.map((step, i) =>
        `${i + 1}. "${step.title}"${step.description ? ': ' + step.description : ''}`
      ).join('\n')
    : '(no steps listed)';

  const badgesSection = config.badges.length > 0
    ? config.badges.map(b => `"${b.label}: ${b.value}"`).join(' | ')
    : '';

  const layoutInstructions: Record<InfographicLayout, string> = {
    classic_recipe: `LAYOUT: Ultra-wide landscape infographic. Three-column layout:
LEFT COLUMN — Section header "${config.leftSectionTitle}":
${config.ingredients.length > 0 ? 'Beautifully illustrated circular bubble elements, each containing a small 3D illustrated thumbnail of the ingredient/component with text label below:\n' + ingredientSection : ''}

CENTER — Hero visual:
${config.heroDescription || 'A beautiful 3D photorealistic illustration of the main product/dish, perfectly lit and styled'}
${badgesSection ? '\nINFO BADGES below hero in colorful pill shapes: ' + badgesSection : ''}

RIGHT COLUMN — Section header "${config.rightSectionTitle}":
Numbered steps with small illustrated icons and connecting arrows:
${stepsSection}`,

    hero_center: `LAYOUT: Wide landscape infographic. Large hero visual prominently centered:
CENTER (large): ${config.heroDescription || 'Main product/dish beautifully illustrated'}
${badgesSection ? 'Info badges around the hero: ' + badgesSection : ''}

SURROUNDING INFORMATION:
Left side — "${config.leftSectionTitle}": ${ingredientSection}
Right side — "${config.rightSectionTitle}": ${stepsSection}`,

    left_hero: `LAYOUT: Wide landscape infographic. Left half dominated by hero visual, right half information:
LEFT HALF (large): ${config.heroDescription || 'Main product/dish beautifully illustrated'}
${badgesSection ? 'Info badges overlaid or below: ' + badgesSection : ''}

RIGHT HALF:
"${config.leftSectionTitle}": ${ingredientSection}
"${config.rightSectionTitle}": ${stepsSection}`,

    top_hero: `LAYOUT: Wide landscape infographic. Large hero at top, structured information below:
TOP SECTION (large): ${config.heroDescription || 'Main product/dish beautifully illustrated'}

BOTTOM SECTION (two columns):
Left — "${config.leftSectionTitle}": ${ingredientSection}
Right — "${config.rightSectionTitle}": ${stepsSection}
${badgesSection ? 'Info badges between top and bottom: ' + badgesSection : ''}`,

    grid_showcase: `LAYOUT: Wide landscape infographic in an organized grid layout:
HEADER: Large title
MAIN VISUAL: ${config.heroDescription || 'Main product/dish'}
GRID OF ITEMS for "${config.leftSectionTitle}": ${ingredientSection}
GRID OF ITEMS for "${config.rightSectionTitle}": ${stepsSection}
${badgesSection ? 'Highlight badges: ' + badgesSection : ''}`,
  };

  const parts = [
    `${style.prompt}.`,
    `Ultra-detailed professional infographic illustration. Wide landscape 16:9 format.`,
    '',
    `MAIN TITLE: Large elegant Vietnamese typography: "${config.title}"`,
    config.subtitle ? `SUBTITLE: "${config.subtitle}"` : '',
    '',
    layoutInstructions[config.layout],
    '',
    'TYPOGRAPHY: All Vietnamese text must be clean, legible, and beautifully styled. Section titles in elegant medium-weight serif or rounded sans-serif. Body text in clean readable style.',
    'ILLUSTRATION QUALITY: Each ingredient/component shown as a beautiful 3D miniature illustration inside a soft circular or rounded bubble. Small step icons are clean and recognizable.',
    'OVERALL AESTHETIC: Premium commercial quality. Looks like it was designed by a professional graphic designer and food stylist together.',
    config.additionalNotes ? `ADDITIONAL DETAILS: ${config.additionalNotes}` : '',
    'This must be a polished, publication-ready infographic — NOT generic AI clipart. Professional Vietnamese marketing material quality.',
  ];

  return parts.filter(Boolean).join('\n');
}

// ─── FORMAT-SPECIFIC COMPOSITION GUIDE ──────────────────────────────────────

const FORMAT_COMPOSITION: Record<InfographicFormat, {
  ratio: string;
  canvas: string;
  cameraAngle: string;
  composition: string;
  framing: string;
}> = {
  landscape: {
    ratio: '16:9 wide horizontal',
    canvas: 'Generate a WIDE HORIZONTAL image (16:9 landscape orientation). Width is much greater than height.',
    cameraAngle: '45-degree overhead angle or slight three-quarter view showing depth and breadth of the subject',
    composition: 'Subject centered horizontally with generous space on both sides. Use the horizontal width to show the full context — for food, include the bowl/pot plus surrounding garnishes and props spread left to right. For products, arrange items in a horizontal lineup.',
    framing: 'Fill the wide frame: place the main subject center-left or center, with supporting elements extending to both sides. The horizontal format naturally allows a wide, panoramic, styled food scene.',
  },
  square: {
    ratio: '1:1 perfectly square',
    canvas: 'Generate a PERFECTLY SQUARE image (1:1 ratio, equal width and height). This is extremely important — the output must not be wider or taller.',
    cameraAngle: 'Directly overhead (flat lay, bird\'s eye view, top-down 90°) OR a gentle 30-45° overhead angle — both fill a square frame naturally',
    composition: 'Centered symmetrical composition. The subject (pot, bowl, plate, or product) fills approximately 70-80% of the square canvas. For a pot or bowl, shoot directly from above so the circular rim fills the square frame naturally. Do NOT try to show the full side profile — an overhead view of a round pot perfectly matches a square canvas.',
    framing: 'Think of it as an Instagram flatlay. The circular or rectangular shape of the subject naturally inscribes in the square. Background visible only at corners as negative space. Some garnishes or props scattered just outside the main subject to fill corner space tastefully.',
  },
  portrait: {
    ratio: '4:5 vertical portrait',
    canvas: 'Generate a VERTICAL image (4:5 portrait orientation). Height is greater than width.',
    cameraAngle: '30-45° overhead angle looking slightly down — captures both the top and front of the subject beautifully',
    composition: 'Subject centered in the vertical frame. The tall canvas allows showing the full dish from a front-angled overhead perspective — you can see inside a pot or bowl while also seeing its shape. Stack elements vertically: main subject in center, supporting garnishes above and below.',
    framing: 'The vertical canvas suits showing a tall product bottle from top to bottom, or a deep bowl/pot with visible contents. Fill the height with the subject and natural props. Keep left and right margins clean.',
  },
  story: {
    ratio: '9:16 tall vertical story format',
    canvas: 'Generate a TALL VERTICAL image (9:16 story format, very tall). Height is nearly double the width.',
    cameraAngle: 'Multiple angles layered vertically — overhead view at top transitioning to front angle at bottom, OR a single dramatic 30° overhead angle that emphasizes the vertical stacking of ingredients',
    composition: 'Use the tall vertical canvas to show layers and depth: top portion shows the full overhead view of the dish/product, middle shows the most visually rich part (ingredients, texture, detail), bottom shows the surface, background, or supporting props. The composition should flow naturally from top to bottom.',
    framing: 'Think editorial food magazine vertical spread. The tall format suits showing a pot of soup with all ingredients floating visibly from above, or a tall product bottle with beautiful ingredient splashes at the top and bottom.',
  },
};

// ─── TYPE-SPECIFIC PHOTOGRAPHY DIRECTION ────────────────────────────────────

function getTypePhotographyStyle(config: InfographicConfig): string {
  switch (config.type) {
    case 'recipe':
      return `FOOD PHOTOGRAPHY DIRECTION:
- Style: Professional food editorial photography meets cute Korean 3D illustration hybrid
- For soups, hotpots, stews (nồi, lẩu, canh): use overhead view showing ingredients floating beautifully in broth, steam gently rising
- For rice dishes, stir-fries: use 30-45° angle showing the heap of food from slightly above
- Garnishes (herbs, sesame, spring onion) should be scattered artfully, not clumped
- Steam or gentle mist above hot food makes it look freshly cooked and appetizing
- Color contrast: make sure green vegetables, orange carrots, white tofu, red meat are all visible and distinct
- The food should look PLENTIFUL and overflowing with generous portions`;

    case 'product_ingredients':
      return `PRODUCT PHOTOGRAPHY DIRECTION:
- Style: Premium beauty/lifestyle product photography with editorial flair
- Center the product bottle/jar/tube as the hero — it must be clearly identifiable
- Surround with key raw ingredients (if serum: citrus slices, herb leaves, pearls matching key ingredients listed)
- Use a clean marble, wood grain, or matching-color surface
- Product label can be partially visible but NO readable text allowed
- Soft bokeh background, primary light from one side creating gentle shadows
- The product should feel luxurious and trustworthy`;

    case 'how_to_use':
      return `PRODUCT-IN-USE PHOTOGRAPHY DIRECTION:
- Style: Clean lifestyle photography — product in a beautiful real-world setting
- Show the product in context (on a vanity, on a shelf, in a hand if needed)
- Minimalist props: cotton rounds, small plants, clean towels complement without distracting
- Lighting: soft diffused window light or studio softbox — very clean and beauty-brand appropriate
- Convey ease and elegance of use`;

    case 'product_brochure':
      return `PRODUCT SHOWCASE PHOTOGRAPHY DIRECTION:
- Style: High-end commercial product photography, studio quality
- If multiple products in a range: arrange in a pleasing geometric layout (triangle, diagonal line, or arc)
- Pure studio background — white, light gray, or soft gradient matching brand color
- Professional studio lighting with deliberate highlights and minimal shadows
- The product packaging/design should look premium and desirable`;

    default:
      return `VISUAL DIRECTION:
- Professional commercial photography quality
- Beautiful and aspirational — makes the viewer want the product or food
- Clean elegant styling with intentional props`;
  }
}

export function buildHeroPrompt(config: InfographicConfig): string {
  const style = STYLE_TEMPLATES[config.style];
  const fmt = FORMAT_COMPOSITION[config.format || 'square'];
  const subject = config.heroDescription || 'A beautiful food dish or product, perfectly styled and composed';
  const typeDirection = getTypePhotographyStyle(config);

  return `VISUAL STYLE: ${style.prompt}.

CANVAS FORMAT: ${fmt.canvas}
ASPECT RATIO: This image MUST be ${fmt.ratio}. Do not generate a different ratio.

SUBJECT TO ILLUSTRATE:
${subject}

CAMERA ANGLE: ${fmt.cameraAngle}

COMPOSITION RULES:
${fmt.composition}

FRAMING GUIDE:
${fmt.framing}

${typeDirection}

ABSOLUTE REQUIREMENTS:
- ZERO TEXT anywhere — no labels, no numbers, no writing, no watermarks, no captions
- The output image MUST match the specified ${fmt.ratio} aspect ratio exactly
- Subject fills the frame completely and naturally — no awkward cropping or squeezing
- Background: ${style.prompt.includes('dark') ? 'deep dark background with rich shadows' : 'soft clean background matching the style — cream, white, or gentle gradient'}
- Lighting: beautiful, intentional — not flat, not harsh. Soft shadows add depth
- Resolution and detail: hyper-detailed, every texture visible — fabric of vegetables, sheen of broth, texture of ingredients
- The result should look like it belongs in a premium Korean food magazine or luxury brand catalog`;
}

export async function fileToBase64(file: File): Promise<{ data: string; mimeType: string }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      resolve({ data: dataUrl.split(',')[1], mimeType: file.type || 'image/jpeg' });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export async function generateHeroImage(config: InfographicConfig, uploadedImage?: { data: string; mimeType: string } | null): Promise<string> {
  const basePrompt = buildHeroPrompt(config);
  const fmt = FORMAT_COMPOSITION[config.format || 'square'];

  const body: any = { prompt: basePrompt };
  if (uploadedImage) {
    const enhancePrompt = `${basePrompt}

IMPORTANT: The user has uploaded their own photo of this product/dish. Use it as the primary visual reference. Recreate it as a beautifully styled illustration or enhanced photograph that matches the visual style described above. Keep the subject identical — same dish, same product — but elevate the lighting, styling, and composition to match the ${fmt.ratio} canvas and the premium quality described. Maintain product/food identity completely.`;
    body.prompt = enhancePrompt;
    body.images = [uploadedImage];
  }

  const response = await fetch('/api/story', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error || 'Lỗi khi tạo hình minh họa');
  }

  const data = await response.json();
  return `data:image/png;base64,${data.image}`;
}

export async function generateInfographic(config: InfographicConfig): Promise<string> {
  const prompt = buildInfographicPrompt(config);

  const response = await fetch('/api/story', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error || 'Lỗi khi tạo ảnh infographic');
  }

  const data = await response.json();
  return `data:image/png;base64,${data.image}`;
}

export async function generateIngredientIllustration(
  name: string,
  style: InfographicStyle,
): Promise<string | null> {
  const sv = STYLE_TEMPLATES[style];
  const prompt = `${sv.prompt}.

TASK: Create a PERFECTLY SQUARE (1:1 ratio) miniature 3D icon illustration of: "${name}"

COMPOSITION:
- Strictly 1:1 square canvas — equal width and height, no exceptions
- Subject centered exactly in the middle of the square frame
- Subject fills approximately 75-85% of the frame — large enough to see clearly, with a little breathing room at edges
- For round ingredients (tomato, lemon, egg): the circular shape naturally fits a square frame beautifully
- For long ingredients (green onion, asparagus, carrot): arrange at a slight diagonal (30-45°) to use the square space elegantly
- For irregular items (shrimp, mushroom, herb bunch): position upright or at a natural angle that fills the square

VISUAL STYLE:
- Adorable 3D isometric icon style, like a premium food delivery app or Korean cooking platform
- Soft, slightly glossy 3D render with gentle subsurface scattering on food items
- Warm cream or very soft pastel background (matching the infographic style)
- Gentle drop shadow below the subject — not hard, just a soft ground shadow
- Studio soft-box lighting from upper-left at 45°, creating a gentle highlight and shadow

STRICT RULES:
- ABSOLUTELY ZERO TEXT, ZERO LABELS, ZERO NUMBERS, ZERO WRITING anywhere in the image
- Pure clean background — no other objects, no clutter, no patterns
- The output must be square (1:1) — verify the aspect ratio before finalizing
- Premium quality suitable for a high-end infographic card`;

  try {
    const res = await fetch('/api/story', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return `data:image/png;base64,${data.image}`;
  } catch {
    return null;
  }
}

export async function generateAllIngredientIllustrations(
  config: InfographicConfig,
): Promise<(string | null)[]> {
  return Promise.all(
    config.ingredients.map(ing =>
      ing.name
        ? generateIngredientIllustration(ing.name, config.style)
        : Promise.resolve(null),
    ),
  );
}
