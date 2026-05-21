import { InfographicConfig, InfographicStyle, InfographicLayout, InfographicType } from '../types';

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

export function buildHeroPrompt(config: InfographicConfig): string {
  const style = STYLE_TEMPLATES[config.style];
  return `${style.prompt}.

Generate a beautiful, high-quality illustration or photorealistic image of:
${config.heroDescription || 'A beautiful food dish or product, perfectly styled and composed'}

CRITICAL REQUIREMENTS:
- Absolutely NO TEXT, NO LABELS, NO NUMBERS, NO WRITING anywhere in the image
- Clean, centered composition — subject fills the frame beautifully
- Professional food photography / product photography quality
- Square or slightly portrait format
- The image will be embedded as the centerpiece of a designed infographic card
- Soft, clean background that doesn't distract
- Beautiful lighting with gentle shadows
- High detail, appetizing and appealing visual`;
}

export async function generateHeroImage(config: InfographicConfig): Promise<string> {
  const prompt = buildHeroPrompt(config);

  const response = await fetch('/api/story', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
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
