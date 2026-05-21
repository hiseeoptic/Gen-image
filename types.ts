export enum AppMode {
  RESTORATION = 'RESTORATION',
  PERSONAL = 'PERSONAL',
  POSTER = 'POSTER',
  STORY = 'STORY',
  INFOGRAPHIC = 'INFOGRAPHIC',
}

export type PosterStyle =
  | 'minimal_luxury' | 'dark_premium' | 'cyberpunk' | 'cinematic'
  | 'modern_ecommerce' | 'apple_minimal' | 'futuristic_tech'
  | 'japanese_poster' | 'streetwear_hype' | 'luxury_skincare'
  | 'fitness_supplement' | 'bold_typography' | 'ai_futuristic'
  | 'neon_glow' | 'retro_vintage';

export type StoryLayout = 'journey' | 'comparison' | 'multi_scene' | 'banner' | 'infographic';
export type StoryStyle = 'gold_luxury' | 'cinematic_epic' | 'flat_minimal' | 'watercolor' | '3d_premium';
export type StoryColorScheme = 'gold_white' | 'gold_dark' | 'full_color' | 'blue_gold' | 'earth_tones';

// ─── INFOGRAPHIC TYPES ───────────────────────────────────────────────────────

export type InfographicType = 'recipe' | 'product_ingredients' | 'how_to_use' | 'product_brochure';
export type InfographicStyle = 'soft_pastel' | 'clean_modern' | 'dark_luxury' | 'colorful_vibrant' | 'korean_minimal';
export type InfographicLayout = 'classic_recipe' | 'hero_center' | 'left_hero' | 'top_hero' | 'grid_showcase';

export interface InfographicIngredient {
  amount: string;
  name: string;
  note: string;
}

export interface InfographicStep {
  title: string;
  description: string;
}

export interface InfographicBadge {
  label: string;
  value: string;
  color: string;
}

export interface InfographicConfig {
  type: InfographicType;
  style: InfographicStyle;
  layout: InfographicLayout;
  title: string;
  subtitle: string;
  heroDescription: string;
  ingredients: InfographicIngredient[];
  steps: InfographicStep[];
  badges: InfographicBadge[];
  leftSectionTitle: string;
  rightSectionTitle: string;
  additionalNotes: string;
}

export interface StoryConfig {
  layout: StoryLayout;
  style: StoryStyle;
  colorScheme: StoryColorScheme;
  // Text
  headline: string;
  subheadline: string;
  quote: string;
  bodyText: string;
  // Journey layout
  journeyStart: string;
  journeyEnd: string;
  journeyMilestones: string[];
  // Comparison layout
  leftLabel: string;
  leftDescription: string;
  rightLabel: string;
  rightDescription: string;
  // Multi-scene layout
  sceneDescriptions: string[];
  // Characters & Symbols
  characters: string[];
  symbols: string[];
  additionalNotes: string;
}

export type PosterFormat =
  | 'instagram_post' | 'instagram_story' | 'facebook_ad'
  | 'shopee_banner' | 'tiktok_ad' | 'website_hero' | 'a4_poster';

export type ProductCategory =
  | 'auto' | 'skincare' | 'supplement' | 'perfume' | 'tech'
  | 'fashion' | 'jewelry' | 'beverage' | 'food';

export interface PosterConfig {
  style: PosterStyle;
  format: PosterFormat;
  headline: string;
  subheadline: string;
  cta: string;
  colorPreference: string;
  productCategory: ProductCategory;
}

export interface GeneratedImage {
  originalParams: string;
  imageUrl: string;
  timestamp: number;
}

export type SubjectType = 'MALE' | 'FEMALE' | 'COUPLE' | 'GROUP' | 'PRODUCT';
export type GenerationSource = 'UPLOAD' | 'TEXT_ONLY';

export interface PhotoConfig {
  source: GenerationSource;
  subjectType: SubjectType;
  customSubjectCount: string;

  // Outfit
  outfitCategory: string;
  outfitDetail: string;
  outfitImage: string | null;

  // Context
  contextCategory: string;
  contextDetail: string;

  // Pose
  pose: string;

  // Photography Style
  photographyStyle: string;
  photographyStyleCategory: 'special' | 'standard';

  // Technical & Vibe
  lighting: string;
  cameraAngle: string;
  aspectRatio: string;
  camera: string;

  // Face & Quality
  quality: string;
  expression: string;
  faceEnhancements: string[];

  additionalPrompt: string;
}

export const DEFAULT_CONFIG: PhotoConfig = {
  source: 'UPLOAD',
  subjectType: 'FEMALE',
  customSubjectCount: '',

  outfitCategory: 'suit',
  outfitDetail: 'Sharp tailored female power suit, elegant and professional',

  outfitImage: null,

  contextCategory: 'studio_bg',
  contextDetail: 'High-key studio photography, pure white infinity background, clean and commercial look',

  pose: 'Standing naturally, confident posture',
  photographyStyle: 'Front-facing studio portrait, symmetrical face, clean neutral background',

  photographyStyleCategory: 'standard',

  lighting: 'Professional softbox studio lighting, beautifully even and flattering illumination, clean controlled shadows',
  cameraAngle: 'Eye level',
  aspectRatio: '9:16',
  camera: 'Shot on 85mm f/1.4 portrait lens, beautiful background blur, sharp subject',

  quality: 'Hyper-realistic photography, 8K ultra-high resolution, raw unprocessed photo quality, extreme skin and fabric detail',
  expression: 'Friendly, slight smile, approachable, warm eyes',
  faceEnhancements: [],

  additionalPrompt: '',
};

export interface OptionItem {
  id: string;
  label: string;
  value: string;
}

export interface CategoryItem {
  id: string;
  label: string;
  options: OptionItem[];
}

export type LoadingState = 'IDLE' | 'UPLOADING' | 'PROCESSING' | 'SUCCESS' | 'ERROR';
