import { StoryConfig, StoryLayout, StoryStyle, StoryColorScheme } from '../types';

// ─── LAYOUT TEMPLATES ────────────────────────────────────────────────────────

export interface LayoutTemplate {
  label: string;
  description: string;
  icon: string;
  hint: string;
}

export const LAYOUT_TEMPLATES: Record<StoryLayout, LayoutTemplate> = {
  journey: {
    label: 'Hành Trình',
    icon: '🛤',
    description: 'Con đường từ điểm bắt đầu đến đích đến — nhân vật, cột mốc, phần thưởng cuối hành trình',
    hint: 'Phù hợp: Hành trình phát triển bản thân, kinh doanh, học tập',
  },
  comparison: {
    label: 'So Sánh',
    icon: '⚖',
    description: 'Chia đôi: bên trái (tốt/thành công) và bên phải (xấu/thất bại) để tạo sự đối lập rõ ràng',
    hint: 'Phù hợp: Đúng vs Sai, Kiên trì vs Bỏ cuộc, Thành công vs Thất bại',
  },
  multi_scene: {
    label: 'Kể Chuyện Nhiều Cảnh',
    icon: '🎞',
    description: 'Nhiều cảnh riêng biệt nối nhau bằng dải sáng vàng, kể một câu chuyện liên tục',
    hint: 'Phù hợp: Lịch sử, Truyền thuyết, Quy trình nhiều bước',
  },
  banner: {
    label: 'Banner Truyền Cảm Hứng',
    icon: '✨',
    description: 'Ngày/Tiêu đề lớn + hàng icon biểu tượng + câu trích dẫn — kiểu ảnh chào buổi sáng',
    hint: 'Phù hợp: Ảnh chào ngày mới, Slogan, Động lực hằng ngày',
  },
  infographic: {
    label: 'Sơ Đồ Thông Tin',
    icon: '📊',
    description: 'Bố cục thông tin cấu trúc với icon, text, mũi tên — trình bày ý tưởng rõ ràng dễ hiểu',
    hint: 'Phù hợp: Các bước thực hiện, Nguyên tắc, Bí quyết thành công',
  },
};

// ─── VISUAL STYLES ───────────────────────────────────────────────────────────

export interface StyleTemplate {
  label: string;
  description: string;
  prompt: string;
  bgFrom: string;
  bgTo: string;
}

export const STYLE_TEMPLATES: Record<StoryStyle, StyleTemplate> = {
  gold_luxury: {
    label: 'Vàng Sang Trọng',
    description: 'Phong cách cao cấp với màu vàng đặc trưng, ánh sáng ấm, typography đẹp',
    bgFrom: '#1a1200',
    bgTo: '#b8860b',
    prompt: 'Ultra premium luxury gold illustration, warm golden tones, elegant serif typography, professional premium brand aesthetic, rich golden lighting, ornate decorative elements, high-end commercial art quality',
  },
  cinematic_epic: {
    label: 'Cinematic Hùng Tráng',
    description: 'Phong cách phim ảnh rộng lớn, màu sắc phong phú, ánh sáng kịch tính',
    bgFrom: '#0a0d1a',
    bgTo: '#1a0a00',
    prompt: 'Epic cinematic illustration, dramatic chiaroscuro lighting, rich deep colors, wide anamorphic composition, movie poster quality art direction, heroic narrative visual storytelling, award-winning concept art',
  },
  flat_minimal: {
    label: 'Phẳng Tối Giản',
    description: 'Thiết kế phẳng sạch sẽ, icon 2D, màu sắc rõ ràng, dễ đọc',
    bgFrom: '#1e3a5f',
    bgTo: '#0f172a',
    prompt: 'Clean flat design illustration, modern minimalist infographic style, crisp 2D icons, geometric shapes, clear visual hierarchy, modern corporate design system, clean sans-serif typography',
  },
  watercolor: {
    label: 'Màu Nước Nghệ Thuật',
    description: 'Phong cách tranh màu nước mềm mại, nghệ thuật, ấm áp, cảm xúc',
    bgFrom: '#f5e6d3',
    bgTo: '#e8d5b7',
    prompt: 'Beautiful watercolor illustration, soft organic textures, delicate brushstroke details, warm artistic palette, hand-painted quality, gentle washes of color, dreamy atmospheric quality',
  },
  '3d_premium': {
    label: '3D Cao Cấp',
    description: 'Hình ảnh 3D render chuyên nghiệp, bóng đổ thực tế, chất liệu kim loại',
    bgFrom: '#0d1117',
    bgTo: '#1a1a2e',
    prompt: '3D premium render illustration, photorealistic materials, subsurface scattering, volumetric lighting, octane or Arnold render quality, metallic gold surfaces, precise shadows, commercial 3D art direction',
  },
};

// ─── COLOR SCHEMES ───────────────────────────────────────────────────────────

export interface ColorSchemeTemplate {
  label: string;
  prompt: string;
  preview: { bg: string; accent: string };
}

export const COLOR_SCHEMES: Record<StoryColorScheme, ColorSchemeTemplate> = {
  gold_white: {
    label: 'Vàng & Trắng',
    prompt: 'Color palette: warm golden yellows and champagne gold on clean white or cream background. Gold accent elements, white space, elegant contrast.',
    preview: { bg: '#fffbeb', accent: '#b8860b' },
  },
  gold_dark: {
    label: 'Vàng & Tối',
    prompt: 'Color palette: luminous gold and amber tones on deep dark brown or near-black background. Dramatic contrast, rich and premium atmosphere.',
    preview: { bg: '#1a0f00', accent: '#ffd700' },
  },
  full_color: {
    label: 'Đa Màu Sắc',
    prompt: 'Color palette: rich full-color illustrated palette with warm sunlit greens, sky blues, golden yellows, and warm earth tones. Vibrant and inviting.',
    preview: { bg: '#1a3a1a', accent: '#ff9500' },
  },
  blue_gold: {
    label: 'Xanh & Vàng',
    prompt: 'Color palette: deep royal blue and navy tones with gold and silver accent elements. Trustworthy, prestigious, corporate excellence aesthetic.',
    preview: { bg: '#0a1628', accent: '#ffd700' },
  },
  earth_tones: {
    label: 'Màu Đất',
    prompt: 'Color palette: warm earth tones — terracotta, sienna, warm brown, aged parchment cream. Natural, grounded, authentic organic feel.',
    preview: { bg: '#3d2b1f', accent: '#cd853f' },
  },
};

// ─── CHARACTERS ──────────────────────────────────────────────────────────────

export interface CharacterOption {
  id: string;
  label: string;
  emoji: string;
  prompt: string;
}

export const CHARACTER_OPTIONS: CharacterOption[] = [
  { id: 'warrior', label: 'Dũng Sĩ / Anh Hùng', emoji: '⚔', prompt: 'a heroic ancient Asian warrior in ornate golden armor holding a scroll, noble and commanding presence' },
  { id: 'runner_young', label: 'Vận Động Viên Trẻ', emoji: '🏃', prompt: 'a young dynamic athlete in white sportswear in a powerful running stride, energetic and determined' },
  { id: 'climber_elder', label: 'Người Leo Núi', emoji: '🧗', prompt: 'a silver-haired experienced man climbing a rocky mountain peak, determined and wise' },
  { id: 'business_person', label: 'Doanh Nhân', emoji: '💼', prompt: 'a confident professional in a well-fitted suit, commanding and successful presence' },
  { id: 'scholar', label: 'Học Giả / Thư Sinh', emoji: '📚', prompt: 'a wise scholar in traditional robes holding books and scrolls, intellectual and contemplative' },
  { id: 'general', label: 'Tướng Lĩnh / Lãnh Đạo', emoji: '🎖', prompt: 'a battle general in ceremonial armor with soldiers and banners behind, powerful leadership presence' },
  { id: 'female_leader', label: 'Nữ Lãnh Đạo', emoji: '👑', prompt: 'a confident and graceful female leader in elegant attire, strong and inspiring presence' },
  { id: 'turtle', label: 'Nhân Vật Rùa', emoji: '🐢', prompt: 'a cute determined illustrated turtle with a backpack steadily climbing uphill, storybook character style' },
  { id: 'rabbit', label: 'Nhân Vật Thỏ', emoji: '🐰', prompt: 'an illustrated rabbit character looking sleepy and complacent leaning against a wall, storybook character style' },
];

// ─── SYMBOLS ─────────────────────────────────────────────────────────────────

export interface SymbolOption {
  id: string;
  label: string;
  emoji: string;
  prompt: string;
}

export const SYMBOL_OPTIONS: SymbolOption[] = [
  { id: 'golden_path', label: 'Dải Sáng Vàng', emoji: '✨', prompt: 'a flowing glowing golden light ribbon/stream weaving through the scene connecting all elements' },
  { id: 'mountain', label: 'Đỉnh Núi', emoji: '⛰', prompt: 'a majestic mountain peak with a golden flag at the summit bathed in sunrise light' },
  { id: 'sunrise', label: 'Bình Minh', emoji: '🌅', prompt: 'a radiant golden sunrise with sunbeams spreading across the horizon' },
  { id: 'flame', label: 'Ngọn Lửa', emoji: '🔥', prompt: 'mystical green and gold flames symbolizing knowledge and wisdom' },
  { id: 'dragon', label: 'Rồng Vàng', emoji: '🐉', prompt: 'a majestic golden dragon with intricate scales soaring through the sky' },
  { id: 'ancient_tree', label: 'Cây Cổ Thụ', emoji: '🌳', prompt: 'a massive ancient tree with deep exposed roots symbolizing strength and legacy' },
  { id: 'compass', label: 'La Bàn Vàng', emoji: '🧭', prompt: 'an ornate golden compass symbolizing direction and purpose' },
  { id: 'shield', label: 'Khiên Bảo Vệ', emoji: '🛡', prompt: 'a gleaming gold shield symbolizing protection, resilience, and defense' },
  { id: 'scroll', label: 'Cuộn Thư / Sách', emoji: '📜', prompt: 'an ancient scroll or open book with glowing golden script symbolizing knowledge' },
  { id: 'seedling', label: 'Mầm Cây', emoji: '🌱', prompt: 'a delicate green seedling growing from soil, symbol of growth and new beginnings' },
  { id: 'hourglass', label: 'Đồng Hồ Cát', emoji: '⏳', prompt: 'a golden hourglass with sand flowing, symbolizing time and patience' },
  { id: 'wings_heart', label: 'Trái Tim Cánh', emoji: '💛', prompt: 'a golden heart with wings and flame, symbolizing courage and passion' },
  { id: 'lotus', label: 'Hoa Sen', emoji: '🪷', prompt: 'a beautiful lotus flower blooming from water, symbolizing purity and enlightenment' },
  { id: 'coins', label: 'Đồng Tiền Vàng', emoji: '🪙', prompt: 'scattered golden coins and wealth symbols, representing abundance and prosperity' },
  { id: 'rice_field', label: 'Cánh Đồng Lúa', emoji: '🌾', prompt: 'golden rice fields stretching to the horizon, lush and abundant harvest atmosphere' },
  { id: 'go_board', label: 'Bàn Cờ', emoji: '♟', prompt: 'a traditional Asian game board with black and white stones, symbolizing strategy and wisdom' },
];

// ─── FLOW / RIBBON TYPES ─────────────────────────────────────────────────────

export interface FlowTypeOption {
  id: string;
  label: string;
  icon: string;
  description: string;
  prompt: string;
}

export const FLOW_TYPE_OPTIONS: FlowTypeOption[] = [
  { id: 'golden_ribbon', label: 'Dải Sáng Vàng', icon: '✨', description: 'Ánh sáng vàng hình chữ S nối các cảnh', prompt: 'a luminous flowing golden light ribbon weaving organically in an elegant S-curve through the entire canvas connecting all scenes, glowing and ethereal' },
  { id: 'dragon_body', label: 'Thân Rồng Vàng', icon: '🐉', description: 'Rồng vàng uốn lượn xuyên qua các cảnh', prompt: 'a majestic golden dragon body whose serpentine form curves and winds through all scenes, its glowing scales serving as the visual spine of the composition' },
  { id: 'smoke_steam', label: 'Khói & Hơi Nước', icon: '💨', description: 'Khói bốc lên uốn lượn như dải lụa', prompt: 'elegant curling wisps of smoke and steam rising in graceful organic curves, connecting all elements like a floating ribbon of mist' },
  { id: 'winding_path', label: 'Con Đường Uốn Lượn', icon: '🛤', description: 'Con đường vàng ngoằn ngoèo qua từng cảnh', prompt: 'a winding golden road or pathway that curves dynamically left to right through the landscape, connecting all narrative scenes like chapters of a journey' },
  { id: 'river_flow', label: 'Dòng Sông Vàng', icon: '🌊', description: 'Dòng sông ánh vàng chảy qua các cảnh', prompt: 'a flowing river of liquid gold that meanders gracefully through the composition, its reflective surface connecting and illuminating all scenes' },
  { id: 'comet_trail', label: 'Đuôi Sao Chổi', icon: '☄', description: 'Tia sáng vụt qua như sao chổi', prompt: 'a blazing comet trail of golden and white light streaking dramatically through the composition, leaving glowing sparks that illuminate each scene' },
  { id: 'lotus_vine', label: 'Dây Hoa Sen', icon: '🪷', description: 'Dây leo hoa sen uốn lượn qua cảnh', prompt: 'elegant lotus vines and branches gracefully weaving through all scenes, with blooming lotus flowers and golden leaves at key narrative moments' },
  { id: 'phoenix_trail', label: 'Đường Bay Phượng Hoàng', icon: '🦅', description: 'Vệt bay rực lửa của phượng hoàng', prompt: 'the blazing trail of a golden phoenix soaring through the composition, leaving streams of crimson and gold flames that connect all scenes in a dramatic arc' },
];

// ─── BACKGROUND ELEMENTS ─────────────────────────────────────────────────────

export interface VisualOption {
  id: string;
  label: string;
  emoji: string;
  prompt: string;
}

export const BACKGROUND_OPTIONS: VisualOption[] = [
  { id: 'rice_fields',    label: 'Ruộng Lúa Vàng',    emoji: '🌾', prompt: 'vast golden rice paddies stretching to the horizon at golden hour sunset' },
  { id: 'mountains',      label: 'Núi Non Hùng Vĩ',   emoji: '⛰', prompt: 'dramatic misty mountain range with peaks bathed in golden morning light' },
  { id: 'bamboo_forest',  label: 'Rừng Tre Xanh',     emoji: '🎍', prompt: 'dense lush bamboo forest with shafts of golden light filtering through the canopy' },
  { id: 'ancient_palace', label: 'Cung Điện Cổ',      emoji: '🏯', prompt: 'ancient Vietnamese palace complex with curved rooflines against a dramatic sky' },
  { id: 'vietnam_map',    label: 'Bản Đồ Việt Nam',   emoji: '🗺', prompt: 'antique parchment map of Vietnam with aged ink marks, compass rose, and vintage cartography style' },
  { id: 'epic_sky',       label: 'Bầu Trời Sử Thi',   emoji: '🌄', prompt: 'epic dramatic sky with towering golden cumulonimbus clouds and rays of light piercing through' },
  { id: 'moonlit_night',  label: 'Đêm Trăng Rằm',    emoji: '🌕', prompt: 'serene moonlit night over ancient Vietnamese landscape with full moon reflection on water' },
  { id: 'golden_dawn',    label: 'Bình Minh Vàng',    emoji: '🌅', prompt: 'stunning golden dawn with the sun breaking over the horizon in radiant amber and gold' },
  { id: 'ancient_city',   label: 'Phố Cổ Đèn Lồng',  emoji: '🏮', prompt: 'atmospheric ancient Vietnamese old town with glowing red lanterns and traditional wooden shop houses' },
  { id: 'starry_sky',     label: 'Trời Đầy Sao',      emoji: '🌌', prompt: 'spectacular starry night sky with visible Milky Way and nebula over Vietnamese landscape' },
  { id: 'parchment',      label: 'Nền Giấy Cổ',       emoji: '📜', prompt: 'aged parchment background texture with subtle ink stains, worn edges, and vintage document quality' },
  { id: 'campfire',       label: 'Lửa Trại Đêm Khuya',emoji: '🔥', prompt: 'warm campfire glowing in a forest clearing at night, embers floating upward into the dark sky' },
  { id: 'morning_mist',   label: 'Sương Sớm Núi',     emoji: '🌫', prompt: 'soft morning mist rolling through mountain valleys creating layered atmospheric depth' },
  { id: 'ocean_coast',    label: 'Bờ Biển Việt Nam',  emoji: '🌊', prompt: 'dramatic Vietnamese coastline with rocky cliffs, turquoise water, and golden sunset light' },
  { id: 'cherry_blossom', label: 'Hoa Anh Đào',       emoji: '🌸', prompt: 'delicate cherry blossom trees in full bloom with petals drifting gently in the breeze' },
];

export const DECORATIVE_OPTIONS: VisualOption[] = [
  { id: 'floating_lanterns', label: 'Đèn Lồng Bay',       emoji: '🏮', prompt: 'dozens of glowing red and gold lanterns floating upward into the night sky' },
  { id: 'cherry_petals',     label: 'Cánh Hoa Rơi',       emoji: '🌸', prompt: 'delicate pink and white flower petals drifting gracefully in the breeze' },
  { id: 'gold_coins',        label: 'Đồng Tiền Vàng',     emoji: '🪙', prompt: 'golden coins raining down or scattered elegantly in the air' },
  { id: 'light_rays',        label: 'Tia Sáng Thần Thánh',emoji: '✨', prompt: 'divine golden light rays piercing through storm clouds from above' },
  { id: 'magic_sparkles',    label: 'Đốm Sáng Kỳ Diệu',  emoji: '💫', prompt: 'twinkling magical sparkle particles and stardust floating throughout the scene' },
  { id: 'dragon_scales',     label: 'Vảy Rồng Kim',       emoji: '🐉', prompt: 'intricate golden dragon scale pattern as a decorative motif or texture overlay' },
  { id: 'phoenix_feathers',  label: 'Lông Phượng Hoàng',  emoji: '🦅', prompt: 'crimson and gold phoenix feathers floating gracefully through the air' },
  { id: 'lotus_blooms',      label: 'Hoa Sen Nở Rực',     emoji: '🪷', prompt: 'white and pink lotus flowers blooming on still reflective water' },
  { id: 'calligraphy',       label: 'Thư Pháp Cổ Điển',   emoji: '🖌', prompt: 'elegant Vietnamese or East Asian calligraphy brushstrokes as decorative background elements' },
  { id: 'glowing_embers',    label: 'Than Hồng Bay',       emoji: '🔥', prompt: 'glowing ember particles floating and swirling upward from a fire below' },
  { id: 'fireflies',         label: 'Đom Đóm Lập Lòe',    emoji: '✨', prompt: 'hundreds of fireflies creating a magical twinkling green-gold effect in the darkness' },
  { id: 'autumn_leaves',     label: 'Lá Vàng Mùa Thu',    emoji: '🍂', prompt: 'swirling autumn leaves in amber, gold, and rust tones spiraling through the air' },
  { id: 'water_ripples',     label: 'Gợn Sóng Nước',      emoji: '💧', prompt: 'concentric water ripples expanding on a reflective surface with golden light reflections' },
  { id: 'thunder_lightning',  label: 'Sấm Sét Oai Hùng',   emoji: '⚡', prompt: 'dramatic golden lightning bolts striking across a stormy dramatic sky' },
  { id: 'stardust',          label: 'Bụi Sao Ngân Hà',    emoji: '🌟', prompt: 'cosmic stardust and nebula wisps in gold, purple, and blue tones swirling overhead' },
  { id: 'gold_aura',         label: 'Hào Quang Vàng',     emoji: '🌕', prompt: 'a radiant golden aura or halo of light emanating from the central element' },
  { id: 'incense_smoke',     label: 'Khói Hương Trầm',    emoji: '🕯', prompt: 'delicate wisps of incense smoke curling upward in elegant spirals from below' },
  { id: 'flag_banners',      label: 'Cờ Hiệu Bay Phấp Phới', emoji: '🚩', prompt: 'colorful Vietnamese flags and military banners waving proudly in the wind' },
  { id: 'ancient_script',    label: 'Chữ Cổ Phát Sáng',   emoji: '📖', prompt: 'glowing ancient script, runes, or seal characters floating in the air' },
  { id: 'golden_particles',  label: 'Hạt Bụi Vàng',       emoji: '✦', prompt: 'countless tiny golden particles and dust motes drifting through shafts of light' },
];

// ─── JOURNEY MILESTONE OPTIONS ───────────────────────────────────────────────

export interface MilestoneOption {
  id: string;
  label: string;
  emoji: string;
  prompt: string;
}

export const MILESTONE_OPTIONS: MilestoneOption[] = [
  { id: 'overcome_fear', label: 'Vượt qua nỗi sợ', emoji: '💪', prompt: 'a milestone showing overcoming fear, stepping out of comfort zone' },
  { id: 'learning', label: 'Học tập & Rèn luyện', emoji: '📖', prompt: 'a milestone of continuous learning, books and practice' },
  { id: 'failure', label: 'Vấp ngã & Đứng dậy', emoji: '⬆', prompt: 'a setback and recovery milestone, falling and rising again' },
  { id: 'discipline', label: 'Kỷ luật bản thân', emoji: '🎯', prompt: 'a discipline milestone, consistent daily effort and habit building' },
  { id: 'teamwork', label: 'Đồng đội & Hỗ trợ', emoji: '🤝', prompt: 'a teamwork milestone, people supporting each other' },
  { id: 'breakthrough', label: 'Bứt phá', emoji: '🚀', prompt: 'a breakthrough moment, explosive growth and advancement' },
  { id: 'wisdom', label: 'Tích lũy kinh nghiệm', emoji: '🦉', prompt: 'a wisdom accumulation milestone, gaining experience and insight' },
  { id: 'recognition', label: 'Được công nhận', emoji: '🏅', prompt: 'a recognition milestone, achievement acknowledged by others' },
];

// ─── PROMPT BUILDER ──────────────────────────────────────────────────────────

function getFlowPrompt(flowType: string): string {
  return FLOW_TYPE_OPTIONS.find(f => f.id === flowType)?.prompt
    || 'a flowing glowing golden light ribbon weaving organically through all scenes';
}

function buildEnvironmentBlock(config: StoryConfig): string {
  const bgList = (config.backgroundElements || [])
    .map(id => BACKGROUND_OPTIONS.find(b => b.id === id)?.prompt)
    .filter(Boolean);
  const decList = (config.decorativeDetails || [])
    .map(id => DECORATIVE_OPTIONS.find(d => d.id === id)?.prompt)
    .filter(Boolean);
  const parts: string[] = [];
  if (bgList.length > 0) parts.push(`BACKGROUND & ENVIRONMENT: ${bgList.join('; ')}`);
  if (decList.length > 0) parts.push(`ATMOSPHERIC DECORATIVE DETAILS scattered throughout: ${decList.join('; ')}`);
  return parts.join('.\n');
}

function getCharacterPrompts(ids: string[]): string {
  return ids
    .map(id => CHARACTER_OPTIONS.find(c => c.id === id)?.prompt)
    .filter(Boolean)
    .join('; ');
}

function getSymbolPrompts(ids: string[]): string {
  return ids
    .map(id => SYMBOL_OPTIONS.find(s => s.id === id)?.prompt)
    .filter(Boolean)
    .join('; ');
}

function getMilestonePrompts(ids: string[]): string {
  return ids
    .map(id => MILESTONE_OPTIONS.find(m => m.id === id)?.prompt)
    .filter(Boolean)
    .join('; ');
}

function buildTextBlock(config: StoryConfig): string {
  const lines: string[] = [];
  if (config.headline) lines.push(`LARGE HEADLINE TEXT displayed prominently in the image using bold elegant Vietnamese typography: "${config.headline}"`);
  if (config.subheadline) lines.push(`SUBHEADLINE TEXT: "${config.subheadline}"`);
  if (config.quote) lines.push(`QUOTE TEXT in an elegant text box or framed area: "${config.quote}"`);
  if (config.bodyText) lines.push(`BODY TEXT / CAPTION: "${config.bodyText}"`);
  return lines.join('. ');
}

function buildJourneyPrompt(config: StoryConfig): string {
  const chars = getCharacterPrompts(config.characters);
  const syms = getSymbolPrompts(config.symbols);
  const milestones = getMilestonePrompts(config.journeyMilestones);

  const flowDesc = getFlowPrompt(config.flowType);
  return `COMPOSITION: Ultra-wide cinematic landscape format. ${flowDesc} extends from far left to far right, serving as the visual spine connecting the entire narrative.

LEFT SIDE (START POINT): ${config.journeyStart || 'A person standing at the beginning of a long golden path, hopeful and determined'}. Label this area clearly.

MIDDLE JOURNEY SECTION: Along the winding path, show 2-4 milestone moments: ${milestones || 'challenges overcome, skills gained, growth experienced'}. Each milestone has a small icon or scene.

RIGHT SIDE (DESTINATION): ${config.journeyEnd || 'The same person victorious at the mountaintop, a golden flag planted, celebrating achievement'}.

${chars ? `CHARACTERS IN THIS STORY: ${chars}.` : ''}
${syms ? `DECORATIVE VISUAL ELEMENTS: ${syms}.` : ''}
${buildTextBlock(config)}`;
}

function buildComparisonPrompt(config: StoryConfig): string {
  const chars = getCharacterPrompts(config.characters);
  const syms = getSymbolPrompts(config.symbols);

  return `COMPOSITION: Ultra-wide split-panel format. Left half and right half tell contrasting stories separated by a clear visual divider.

TOP CENTER TITLE: The headline text spans across both panels.

LEFT HALF — "${config.leftLabel || 'Con đường đúng đắn'}": ${config.leftDescription || 'The positive path — perseverance, consistent effort, growth. Warm golden light, upward movement, success imagery'}. Background should feel warm, luminous, and golden.

RIGHT HALF — "${config.rightLabel || 'Con đường sai lầm'}": ${config.rightDescription || 'The negative path — giving up, laziness, stagnation. Cooler darker tones, downward or stagnant imagery'}. Background should feel darker and more muted.

Each half has 2-3 supporting icon symbols at the bottom illustrating the contrast.

${chars ? `CHARACTERS: ${chars}.` : ''}
${syms ? `DECORATIVE ELEMENTS: ${syms}.` : ''}
${buildTextBlock(config)}`;
}

function buildMultiScenePrompt(config: StoryConfig): string {
  const chars = getCharacterPrompts(config.characters);
  const syms = getSymbolPrompts(config.symbols);
  const scenes = config.sceneDescriptions.filter(Boolean);

  const sceneText = scenes.length > 0
    ? scenes.map((s, i) => `Scene ${i + 1}: ${s}`).join('. ')
    : 'Scene 1: The beginning — a lone figure with a mission. Scene 2: The challenge — difficult terrain and obstacles. Scene 3: The helpers — allies and knowledge gained. Scene 4: The turning point — a key moment of decision. Scene 5: The triumph — celebration and legacy.';

  const flowDesc = getFlowPrompt(config.flowType);
  return `COMPOSITION: Ultra-wide landscape format. Multiple distinct narrative scenes are connected by ${flowDesc}, weaving from left to right through the entire canvas like chapters of a story.

${sceneText}

This visual flow element connects and passes through all scenes, creating visual continuity. Each scene should feel like a distinct panel that is part of one coherent story.

${chars ? `CHARACTERS TO INCLUDE ACROSS SCENES: ${chars}.` : ''}
${syms ? `DECORATIVE VISUAL ELEMENTS: ${syms}.` : ''}
${buildTextBlock(config)}`;
}

function buildBannerPrompt(config: StoryConfig): string {
  const syms = getSymbolPrompts(config.symbols);

  const flowDesc = getFlowPrompt(config.flowType);
  return `COMPOSITION: Ultra-wide banner format (approximately 16:9 or wider). Rich atmospheric background.

TOP SECTION: Very large dominant text — ${config.headline || 'an inspiring date and title'}. This text should be the most visually prominent element.

MIDDLE SECTION: ${flowDesc} runs through the middle portion of the image. Along this visual flow, 3-5 gold icon symbols are placed at intervals: ${syms || 'compass, book/gear, seedling, handshake'}. Each icon represents a concept or step.

BOTTOM SECTION: An elegant bordered quote box or text area containing: "${config.quote || 'Bắt đầu mỗi ngày với tâm thế tích cực và quyết tâm mạnh mẽ'}". Below that, smaller footer text: "${config.bodyText || ''}".

The right side of the background should feature a beautiful symbolic scene (sunrise over mountains, rays of light).

${buildTextBlock(config)}`;
}

function buildInfographicPrompt(config: StoryConfig): string {
  const syms = getSymbolPrompts(config.symbols);
  const scenes = config.sceneDescriptions.filter(Boolean);

  const pointsText = scenes.length > 0
    ? scenes.map((s, i) => `Point ${i + 1}: ${s}`).join('. ')
    : 'Point 1: First key principle with icon. Point 2: Second principle with icon. Point 3: Third principle with icon. Point 4: Fourth principle with icon.';

  return `COMPOSITION: Ultra-wide structured infographic illustration. Clean organized layout presenting information in a clear, visually engaging way.

TOP: Large clear headline title.

MAIN BODY: A structured visual flow showing ${scenes.length || 4} key points or steps arranged horizontally or in a clear visual hierarchy:
${pointsText}

Each point has: a clear gold icon symbol, a short bold label, and supporting description text.

Connecting arrows or flow lines between points showing progression or relationship.

${syms ? `ICON VISUAL ELEMENTS TO USE: ${syms}.` : ''}
${buildTextBlock(config)}`;
}

export function buildStoryPrompt(config: StoryConfig): string {
  const style = STYLE_TEMPLATES[config.style];
  const color = COLOR_SCHEMES[config.colorScheme];

  // Layout-specific composition
  let layoutSection = '';
  switch (config.layout) {
    case 'journey':     layoutSection = buildJourneyPrompt(config); break;
    case 'comparison':  layoutSection = buildComparisonPrompt(config); break;
    case 'multi_scene': layoutSection = buildMultiScenePrompt(config); break;
    case 'banner':      layoutSection = buildBannerPrompt(config); break;
    case 'infographic': layoutSection = buildInfographicPrompt(config); break;
  }

  const envBlock = buildEnvironmentBlock(config);

  const parts = [
    `${style.prompt}.`,
    `${color.prompt}.`,
    'IMPORTANT: This is a professionally designed Vietnamese motivational/educational visual content piece. Ultra-wide landscape format. Hyper-detailed, premium quality illustration.',
    layoutSection,
    envBlock,
    config.additionalNotes ? `ADDITIONAL CREATIVE DIRECTION: ${config.additionalNotes}` : '',
    'The final result must feel like it was designed by a world-class creative director and senior illustrator. NOT generic AI art. Premium, intentional, emotionally impactful visual storytelling at the highest commercial quality level.',
  ];

  return parts.filter(Boolean).join('\n\n');
}

export interface StoryImageInput {
  data: string;
  mimeType: string;
}

export async function fileToStoryImageInput(file: File): Promise<StoryImageInput> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const base64 = dataUrl.split(',')[1];
      resolve({ data: base64, mimeType: file.type || 'image/jpeg' });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export async function generateStoryVisual(config: StoryConfig, referenceImages?: StoryImageInput[]): Promise<string> {
  const prompt = buildStoryPrompt(config);

  const body: any = { prompt };
  if (referenceImages && referenceImages.length > 0) body.images = referenceImages;

  const response = await fetch('/api/story', {
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
}

