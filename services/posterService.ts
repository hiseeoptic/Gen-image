import { PosterConfig, PosterStyle, PosterFormat, ProductCategory } from '../types';

export interface StyleTemplate {
  label: string;
  emoji: string;
  bgFrom: string;
  bgTo: string;
  textColor: string;
  prompt: string;
}

export interface FormatInfo {
  label: string;
  ratio: string;
  icon: string;
  description: string;
  compositionHint: string;
}

export const STYLE_TEMPLATES: Record<PosterStyle, StyleTemplate> = {
  minimal_luxury: {
    label: 'Minimal Luxury',
    emoji: '✦',
    bgFrom: '#f5f5f4',
    bgTo: '#fafaf9',
    textColor: '#1c1917',
    prompt: 'Ultra minimal luxury product poster. Pure clean white or warm cream background. Product elegantly centered with perfect negative space. Soft diffused top-down studio lighting. Precise delicate drop shadow. Refined serif or geometric sans typography. Swiss design grid principles. High-end editorial magazine aesthetic. Hermès and Aesop brand visual identity level quality. Immaculate and serene.',
  },
  dark_premium: {
    label: 'Dark Premium',
    emoji: '◆',
    bgFrom: '#0a0a0a',
    bgTo: '#1c1917',
    textColor: '#fafaf9',
    prompt: 'Dark premium luxury product poster. Deep rich near-black background with subtle texture. Dramatic directional lighting with warm golden and copper rim highlights on product edges. Luxurious deep shadows. Moody cinematic atmosphere. Gold or cream accent typography. Wealthy exclusive visual feel. Macallan whiskey or Rolex watch advertisement quality. Highly cinematic and rich.',
  },
  cyberpunk: {
    label: 'Cyberpunk',
    emoji: '⚡',
    bgFrom: '#0d0221',
    bgTo: '#020f1f',
    textColor: '#00f5ff',
    prompt: 'Cyberpunk neon product poster. Ultra dark near-black urban background. Intense electric blue and magenta neon rim lighting on product. Wet reflective dark surface below product showing neon color reflections. Subtle holographic scanline overlay. Rain atmosphere and vapor particles. Futuristic glitch typography. Cyberpunk 2077 meets Blade Runner 2049 aesthetic. Electrifying visual energy.',
  },
  cinematic: {
    label: 'Cinematic',
    emoji: '🎬',
    bgFrom: '#1a0e00',
    bgTo: '#0a0d12',
    textColor: '#f5d78e',
    prompt: 'Cinematic product key visual poster. Professional DCI film color grading with rich amber and teal contrast. Dramatic chiaroscuro lighting. Deep cinematic depth of field. Epic atmospheric environment suggesting narrative. Anamorphic lens flare effects. Award-winning commercial cinematography quality. Roger Deakins lighting inspiration. Emotionally powerful and immersive.',
  },
  modern_ecommerce: {
    label: 'Modern Ecommerce',
    emoji: '🛍',
    bgFrom: '#f8fafc',
    bgTo: '#eff6ff',
    textColor: '#1e3a5f',
    prompt: 'Modern premium ecommerce product poster. Bright clean white or very light background. Product perfectly centered with professional soft-box studio lighting. Crisp ultra-sharp product details. Clean geometric drop shadow. Trust-building commercial aesthetic. Conversion-optimized layout with clear visual hierarchy. Premium Shopify brand listing quality. Fresh professional and highly trustworthy.',
  },
  apple_minimal: {
    label: 'Apple-Style',
    emoji: '',
    bgFrom: '#ffffff',
    bgTo: '#f2f2f7',
    textColor: '#1d1d1f',
    prompt: 'Apple-inspired precision product poster. Pure white background with extremely subtle gradient. Product floating in mathematically perfect negative space. Precise photorealistic drop shadow with correct light direction. Premium hardware photography lighting — clean, controlled, technical perfection. San Francisco-inspired clean typography. Product presented as a design object of desire. Pixel-perfect minimalism at its absolute finest.',
  },
  futuristic_tech: {
    label: 'Futuristic Tech',
    emoji: '⬡',
    bgFrom: '#020617',
    bgTo: '#0c1445',
    textColor: '#38bdf8',
    prompt: 'Futuristic technology product poster. Deep space-black background with electric blue and cyan holographic particle field. Wireframe geometric grid lines receding into depth. Data stream and circuit pattern visual elements. Product surrounded by floating specification callouts and data visualization rings. Quantum computing aesthetic. CES Innovation Award product presentation quality. Scientifically precise and awe-inspiring.',
  },
  japanese_poster: {
    label: 'Japanese',
    emoji: '⛩',
    bgFrom: '#fdf8f0',
    bgTo: '#fef9f0',
    textColor: '#1a1a1a',
    prompt: 'Japanese minimalist product poster. Structured asymmetric grid composition with intentional ma (negative space). Subtle washi paper or rice paper texture background in cream or white. Refined color palette — one restrained accent color such as deep red, indigo, or forest green. Clean product photography with precise shadow. Elegant balance of minimalist design with decorative Japanese aesthetic elements. Muji and Issey Miyake brand design sensibility. Deeply contemplative and refined.',
  },
  streetwear_hype: {
    label: 'Streetwear Hype',
    emoji: '🔥',
    bgFrom: '#1a0505',
    bgTo: '#2d1200',
    textColor: '#fbbf24',
    prompt: 'Streetwear hype drop product poster. High energy graphic design with raw urban attitude. Bold grunge halftone texture overlays. Extreme contrast color scheme — deep black with electric yellow, red, or orange. Oversized drop-shadow blocky typography. Product presented as a limited-edition collector item. Supreme, Off-White, and Balenciaga drop campaign aesthetic. Aggressive and unapologetically bold. Cultural moment energy.',
  },
  luxury_skincare: {
    label: 'Luxury Skincare',
    emoji: '🌸',
    bgFrom: '#fff0f5',
    bgTo: '#fdf4ff',
    textColor: '#831843',
    prompt: 'Ultra luxury beauty and skincare product poster. Soft dreamy pearlescent cream rose-gold and ivory tones. Delicate botanical elements — fresh flower petals, leaves, or dewdrops floating around product. Gossamer translucent liquid splash or pouring cream effect. Soft diffused beauty lighting with beautiful catchlights. Premium cosmetics editorial photography quality. La Mer, Charlotte Tilbury, and Chanel Beauty campaign aesthetic. Aspirationally beautiful and feminine.',
  },
  fitness_supplement: {
    label: 'Fitness Supplement',
    emoji: '💪',
    bgFrom: '#1a0800',
    bgTo: '#0a0a0a',
    textColor: '#f97316',
    prompt: 'High-intensity fitness supplement product poster. Explosive energy burst visual effects radiating dynamically from behind product. Dramatic hard rim back-lighting on product. Dark charcoal and black background. Bold high-contrast orange, red, or electric green color scheme. Power and peak athletic performance visual language. Shattered glass or impact particle effects. GNC, Optimum Nutrition, and Dymatize advertising quality. Adrenaline-pumping and motivational.',
  },
  bold_typography: {
    label: 'Bold Typography',
    emoji: 'Aa',
    bgFrom: '#fbbf24',
    bgTo: '#f59e0b',
    textColor: '#000000',
    prompt: 'Bold typographic product poster. Oversized massive headline text as the primary visual element dominating the composition. Product cleverly integrated into or around the typography. Swiss International Typographic Style influence. High contrast — typically black and white with single bold accent color. Graphic design forward aesthetic where type and product are equal heroes. Pentagram agency editorial branding quality. Visually arresting and intellectually interesting.',
  },
  ai_futuristic: {
    label: 'AI Futuristic',
    emoji: '◎',
    bgFrom: '#0f0025',
    bgTo: '#0a0040',
    textColor: '#a78bfa',
    prompt: 'AI-powered futuristic product poster. Deep cosmic violet and indigo gradient background. Neural network constellation pattern with glowing nodes and connections. Electric violet and blue particle cloud surrounding product. Data visualization rings and quantum waveform effects. Product presented as an artifact from the technological singularity. OpenAI meets Apple design philosophy. Machine learning beauty meets human desire. Intellectually transcendent and visually breathtaking.',
  },
  neon_glow: {
    label: 'Neon Glow',
    emoji: '💡',
    bgFrom: '#1a0020',
    bgTo: '#0d001a',
    textColor: '#f0abfc',
    prompt: 'Vibrant neon glow product poster. Ultra-dark near-black background to maximize neon contrast. Intense multi-color neon lighting — electric pink, blue-green, and yellow tube lights illuminating product from multiple angles. Glowing neon color reflections puddling on dark reflective surface below. Neon tube light signs partially visible in background. Retro-futuristic 1980s Tokyo neon aesthetic. Blade Runner and Miami Vice color palette. Electric and seductively luminous.',
  },
  retro_vintage: {
    label: 'Retro Vintage',
    emoji: '◈',
    bgFrom: '#fef3c7',
    bgTo: '#fde8c8',
    textColor: '#7c2d12',
    prompt: 'Retro vintage product poster. Warm film-aged color grading with characteristic faded yellows, burnt oranges, and desaturated shadows. Halftone dot pattern screen-print texture overlay. Vintage hand-lettered or Art Deco typography with subtle distressed edges and authentic grain. Mid-century American advertising graphic design aesthetic from 1950s to 1970s. Worn paper texture background. Handcrafted analog sensibility. Nostalgic, charming, and warmly human.',
  },
};

export const FORMAT_INFO: Record<PosterFormat, FormatInfo> = {
  instagram_post: {
    label: 'Instagram Post',
    ratio: '1:1',
    icon: '◻',
    description: 'Vuông 1080×1080',
    compositionHint: 'Square 1:1 format composition, balanced centered layout, strong visual impact at thumbnail size',
  },
  instagram_story: {
    label: 'Instagram Story',
    ratio: '9:16',
    icon: '▯',
    description: 'Dọc 1080×1920',
    compositionHint: 'Tall vertical 9:16 portrait format, product prominently in upper two-thirds, text space at bottom',
  },
  facebook_ad: {
    label: 'Facebook Ad',
    ratio: '16:9',
    icon: '▭',
    description: 'Ngang 1200×628',
    compositionHint: 'Wide horizontal 16:9 landscape format, product on right or left third, headline space on opposite side',
  },
  shopee_banner: {
    label: 'Shopee Banner',
    ratio: '16:9',
    icon: '🛒',
    description: 'Banner 1200×400',
    compositionHint: 'Wide ecommerce banner format, product and promotion clearly visible, conversion-focused layout',
  },
  tiktok_ad: {
    label: 'TikTok Ad',
    ratio: '9:16',
    icon: '▯',
    description: 'Dọc 1080×1920',
    compositionHint: 'Full-screen vertical mobile format, bold energetic composition, strong center product focus',
  },
  website_hero: {
    label: 'Website Hero',
    ratio: '16:9',
    icon: '🖥',
    description: 'Full-width 1920×1080',
    compositionHint: 'Full-width cinematic horizontal banner, epic scale composition, immersive product staging',
  },
  a4_poster: {
    label: 'A4 Poster',
    ratio: '3:4',
    icon: '📄',
    description: 'In ấn A4',
    compositionHint: 'Vertical A4 print poster format, elegant top-to-bottom visual flow, print-ready composition',
  },
};

const CATEGORY_ENHANCEMENTS: Record<ProductCategory, string> = {
  auto: '',
  skincare: 'luxury beauty cosmetics editorial photography, dewy fresh translucent product quality, soft feminine flattering beauty lighting',
  supplement: 'athletic performance product advertising, high-energy bold visual language, strong powerful composition worthy of a championship athlete',
  perfume: 'luxury haute parfumerie advertising photography, sensuous bottle glass refraction and light play, opulent atmospheric lighting, aspirational fragrance campaign',
  tech: 'premium technology product photography, precise clean technical studio lighting, sleek modern reflective surfaces, innovation and precision visual language',
  fashion: 'high fashion editorial product photography, lifestyle luxury apparel advertising, aspirational styling and environment',
  jewelry: 'fine jewelry macro product photography, brilliant gemstone caustic light effects, dark velvet or white marble background, precious metal warm sheen and brilliance',
  beverage: 'premium beverage advertising photography, condensation droplets and refreshing freshness visual effects, appetite-stimulating warm or cool lighting, lifestyle drink moment',
  food: 'gourmet food editorial photography, fresh ingredient precision styling, appetite-stimulating warm golden lighting, premium culinary presentation and texture',
};

export function buildPosterPrompt(config: PosterConfig): string {
  const style = STYLE_TEMPLATES[config.style];
  const format = FORMAT_INFO[config.format];
  const catBoost = config.productCategory !== 'auto' ? CATEGORY_ENHANCEMENTS[config.productCategory] : '';

  const textPart = config.headline
    ? [
        `Include this headline text prominently in the poster design: "${config.headline}"`,
        config.subheadline ? `Subheadline: "${config.subheadline}"` : '',
        config.cta ? `Call-to-action button text: "${config.cta}"` : '',
      ].filter(Boolean).join('. ')
    : 'No text overlays needed — pure product visual impact only';

  const parts: string[] = [
    style.prompt,
    catBoost,
    format.compositionHint,
    `Compose for ${format.label} format (${format.ratio} aspect ratio)`,
    config.colorPreference ? `Color palette direction: ${config.colorPreference}` : '',
    textPart,
    'The uploaded product must be the absolute hero — reproduce it with complete fidelity and accuracy',
    'Hyper-realistic commercial photography quality, 8K ultra-high resolution',
    'Award-winning advertising aesthetic — this must look like it was art-directed by a world-class creative director at a luxury advertising agency',
    'NOT generic AI art. A premium, conversion-focused, emotionally impactful commercial product poster.',
  ];

  return parts.filter(Boolean).join('. ');
}

export async function generatePoster(
  productBase64: string,
  mimeType: string,
  config: PosterConfig
): Promise<string> {
  const prompt = buildPosterPrompt(config);

  const response = await fetch('/api/poster', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, productImage: productBase64, mimeType }),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error || 'Lỗi khi tạo poster');
  }

  const data = await response.json();
  return `data:image/png;base64,${data.image}`;
}
