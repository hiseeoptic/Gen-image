import React, { useRef, useState } from 'react';
import { PhotoConfig, CategoryItem, OptionItem } from '../types';
import { Settings2, Sun, Shirt, MapPin, Palette, Users, Smile, Camera, Upload, Trash2, Zap, Sparkles, Monitor, Smartphone, Square, Accessibility, ScanFace, Wand2, Copy } from 'lucide-react';
import { fileToGenerativePart, buildPrompt } from '../services/openaiService';

interface ConfigPanelProps {
  config: PhotoConfig;
  onChange: (newConfig: PhotoConfig) => void;
  imageFlags?: { hasFaces: boolean; hasProducts: boolean; hasLogo: boolean };
}

// ─── SPECIAL CREATIVE STYLES (Hot trends + existing) ───────────────────────
const SPECIAL_STYLES: OptionItem[] = [
  // HOT TRENDS 2024-2025
  { id: 'clean_girl', label: '✨ Clean Girl (TikTok Viral)', value: 'Clean girl aesthetic, dewy natural skin, no-makeup makeup look, minimal neutral clothing, effortless real-girl beauty, viral social media portrait style, ultra-realistic photography' },
  { id: 'quiet_luxury', label: '💎 Quiet Luxury (Old Money)', value: 'Quiet luxury old money aesthetic, understated premium clothing in muted neutral palette, Loro Piana and Brunello Cucinelli inspired, timeless effortless elegance, high-end lifestyle photography' },
  { id: 'dark_academia', label: '📚 Dark Academia', value: 'Dark academia aesthetic, warm moody lighting, rich amber and sepia tones, library or stone architecture setting, intellectual and romantic atmosphere, vintage scholarly portrait' },
  { id: 'film_candid_35mm', label: '📷 Film 35mm Candid', value: 'Authentic 35mm analog film photography style, candid lifestyle moment, beautiful natural grain, light leaks, natural unposed genuine expression, timeless photographic quality' },
  { id: 'y2k_fashion', label: '🌀 Y2K Aesthetic (2000s)', value: 'Y2K fashion aesthetic, year 2000s style, glossy metallic accents, bold colors and chrome elements, nostalgic early internet pop culture fashion photography' },
  { id: 'vogue_editorial', label: '📰 Vogue Editorial (Cover)', value: 'Vogue magazine editorial cover shoot quality, high fashion studio lighting, powerful commanding presence, aspirational luxury fashion photography, impeccable styling' },
  { id: 'korean_beauty', label: '🌸 Korean Beauty (K-beauty)', value: 'Korean beauty aesthetic, glass skin effect, soft natural lighting, minimal fresh makeup, elegant and youthful Korean portrait photography style, Seoul fashion influence' },
  { id: 'moody_editorial', label: '🌑 Moody Editorial Fashion', value: 'Dark moody editorial fashion photography, dramatic chiaroscuro shadows, rich jewel tone colors, intense emotional atmosphere, high-concept avant-garde fashion storytelling' },
  { id: 'cinematic_still', label: '🎬 Cinematic Still (Movie Frame)', value: 'Cinematic movie still frame, professional DCI color grade, narrative storytelling atmosphere, feels like a scene from an acclaimed film, widescreen cinematic composition' },
  { id: 'harajuku_tokyo', label: '🗼 Harajuku Tokyo Street', value: 'Harajuku Tokyo street fashion photography, vibrant and eclectic styling, busy Japanese street background, colorful and energetic urban youth culture, Shibuya energy' },
  { id: 'supermodel_90s', label: '👑 Supermodel 90s Editorial', value: '1990s supermodel editorial style, powerful commanding poses, high contrast film look, iconic golden era fashion photography, Helmut Newton and Peter Lindbergh inspired' },
  { id: 'nature_editorial', label: '🌿 Nature Editorial', value: 'Editorial portrait in natural outdoor setting, lush greenery or golden open field, warm natural light, effortless beauty in nature, fashion-meets-landscape artistic photography' },
  // CLASSIC SPECIAL
  { id: '3d_fb_profile', label: '✨ Ngồi trên Profile Facebook', value: 'Surreal 3D render art, cute miniature character sitting casually on top of a floating transparent Facebook profile interface screen, social media icon elements floating around, high quality 3D character design, soft global illumination' },
  { id: '3d_post_window', label: '✨ Ngồi trên khung bài đăng', value: 'Creative 3D composition, character sitting on the edge of a floating social media post window frame, breaking the fourth wall, interactive social media concept, 3D render style' },
  { id: 'typography_double', label: '✨ Chồng chữ nghệ thuật', value: 'Double exposure artistic portrait, silhouette of the face filled with complex typography text arrangements, newspaper print texture overlay, creative graphic design style, black and white or sepia tone' },
  { id: 'hongkong_vibes', label: '✨ Hồng Kông (Wong Kar-wai)', value: 'Wong Kar-wai cinematic style, Hong Kong aesthetic, neon lights reflecting on wet surfaces, motion blur, moody greenish-yellow color grading, melancholic atmosphere, film grain' },
  { id: 'text_overlay_poster', label: '✨ Poster Tạp chí / Xếp chữ', value: 'High-fashion magazine cover style, bold typography text overlay behind and in front of the subject, vogue aesthetic, studio lighting, graphical elements' },
  { id: 'cyberpunk_neon', label: '✨ Cyberpunk Neon', value: 'Futuristic cyberpunk style, neon blue and pink rim lighting, high-tech background, glowing skin details, sci-fi atmosphere' },
  { id: 'paper_cut_layered', label: '✨ Paper Cut 3D', value: 'Layered paper-cut art style, character and background made of stacked paper shapes, soft shadows, handcrafted illustration feel' },
  { id: 'surreal_mirror_world', label: '✨ Thế giới gương siêu thực', value: 'Surreal portrait with mirror reflections, duplicated reality, dreamlike composition, conceptual art photography' },
  { id: 'claymation_style', label: '✨ Đất nặn (Clay Style)', value: 'Claymation-inspired 3D character style, soft textures, rounded shapes, playful handmade look' },
  { id: 'polaroid_memory', label: '✨ Ký ức Polaroid', value: 'Polaroid photo frame aesthetic, faded colors, light leaks, nostalgic memory feel, analog photography style' },
  { id: 'glitch_identity', label: '✨ Glitch nhân dạng', value: 'Digital glitch portrait, fragmented face, data distortion effects, identity and technology theme' },
  { id: 'hologram_identity', label: '✨ Nhân dạng hologram', value: 'Holographic portrait style, translucent glow layers, futuristic identity visualization, soft sci-fi lighting' },
];

// ─── STANDARD PHOTOGRAPHY STYLES ────────────────────────────────────────────
const STANDARD_STYLES: OptionItem[] = [
  { id: 'front_face_clean', label: 'Chính diện rõ mặt', value: 'Front-facing studio portrait, symmetrical face, clean neutral background' },
  { id: 'half_face_portrait', label: 'Chân dung nửa mặt', value: 'Half-face studio portrait, one side of face in light, the other in soft shadow, clean background' },
  { id: 'three_quarter_face', label: 'Góc 3/4 khuôn mặt', value: 'Three-quarter face portrait, slight head turn, natural facial depth, studio lighting' },
  { id: 'profile_side_view', label: 'Nghiêng mặt (Profile)', value: 'Side profile studio portrait, clean outline, minimal background, elegant composition' },
  { id: 'face_focus_blur_bg', label: 'Mặt rõ – nền mờ', value: 'Face-focused portrait, shallow depth of field, softly blurred background, studio look' },
  { id: 'eyes_contact_closeup', label: 'Cận mắt – Giao tiếp', value: 'Close-up portrait with direct eye contact, strong facial connection, soft studio lighting' },
  { id: 'shoulder_crop_portrait', label: 'Cắt vai – Gọn khung', value: 'Studio portrait cropped at shoulders, clean framing, professional headshot style' },
  { id: 'upper_body_portrait', label: 'Nửa người trên', value: 'Upper-body studio portrait, chest to head framing, suitable for speaking or presentation' },
  { id: 'chin_down_confident', label: 'Cúi cằm tự tin', value: 'Portrait with chin slightly down, eyes looking forward, confident and grounded presence' },
  { id: 'chin_up_vision', label: 'Ngẩng nhẹ – Tầm nhìn', value: 'Portrait with chin slightly up, eyes forward or above camera, visionary and leadership feel' },
  { id: 'look_away_thoughtful', label: 'Nhìn lệch – Suy tư', value: 'Subject looking slightly away from camera, thoughtful expression, calm studio mood' },
  { id: 'diagonal_pose', label: 'Tư thế chéo nhẹ', value: 'Slight diagonal body pose, subtle dynamic composition, natural studio posture' },
  { id: 'shoulder_turn_pose', label: 'Xoay vai', value: 'Shoulders turned slightly, face toward camera, adds depth and natural body language' },
  { id: 'asymmetric_light_balance', label: 'Ánh sáng lệch cân', value: 'Asymmetrical lighting portrait, one side brighter, subtle depth and realism' },
  { id: 'street_handheld', label: 'Phóng sự đường phố', value: 'Street photography handheld style, candid natural movement, reportage photojournalism feel, authentic and unposed moment' },
  { id: 'golden_outdoor', label: 'Ngoài trời Golden Hour', value: 'Outdoor golden hour lifestyle portrait, warm backlight glow, natural environment, effortless and beautiful' },
  { id: 'candid_lifestyle', label: 'Candid đời thường', value: 'Candid lifestyle portrait, subject in natural daily activity, authentic unscripted moment, documentary feel' },
  { id: 'environmental_wide', label: 'Chân dung môi trường rộng', value: 'Environmental portrait with wide lens perspective, subject in meaningful large-scale surroundings, editorial storytelling composition' },
  { id: 'minimal_editorial', label: 'Tối giản Editorial', value: 'Minimalist editorial portrait, strong negative space, clean graphic composition, modern high-fashion photography' },
];

// ─── POSE CATEGORIES ─────────────────────────────────────────────────────────
const POSE_CATEGORIES: CategoryItem[] = [
  {
    id: 'standing',
    label: 'Dáng Đứng',
    options: [
      { id: 'stand_arms_crossed', label: 'Khoanh tay tự tin', value: 'Standing tall, arms crossed confidently, power pose' },
      { id: 'stand_hands_pocket', label: 'Tay đút túi', value: 'Standing, one hand in pocket, relaxed but professional' },
      { id: 'stand_lean_wall', label: 'Dựa lưng tường', value: 'Leaning back against a wall or glass window, relaxed' },
      { id: 'stand_neutral_relaxed', label: 'Đứng thả lỏng', value: 'Standing in a neutral relaxed posture, shoulders down, natural body alignment' },
      { id: 'stand_hands_front', label: 'Hai tay trước người', value: 'Standing with hands lightly clasped in front, calm and approachable stance' },
      { id: 'stand_weight_shift', label: 'Dồn trọng tâm một chân', value: 'Standing with weight shifted to one leg, natural and casual body language' },
      { id: 'stand_side_angle', label: 'Đứng nghiêng nhẹ', value: 'Standing at a slight side angle, body turned subtly, adds depth and elegance' },
      { id: 'stand_hand_gesture', label: 'Tay cử chỉ nhẹ', value: 'Standing with gentle expressive hand gesture, conversational and natural presence' },
      { id: 'stand_step_forward', label: 'Bước nhẹ về phía trước', value: 'Standing with one foot stepping slightly forward, confident and dynamic posture' },
      { id: 'stand_back_straight', label: 'Lưng thẳng, cổ cao', value: 'Standing upright with straight back and lifted posture, composed and professional stance' },
      { id: 'stand_podium', label: 'Đứng bục phát biểu', value: 'Standing behind a podium, gesturing with hands as if speaking, leadership presence' },
    ]
  },
  {
    id: 'sitting',
    label: 'Dáng Ngồi',
    options: [
      { id: 'sit_ceo', label: 'Ngồi ghế giám đốc', value: 'Sitting comfortably in a high-back leather executive chair, hands on armrests' },
      { id: 'sit_desk_working', label: 'Ngồi làm việc (Laptop)', value: 'Sitting at a desk, typing on a laptop, focused expression' },
      { id: 'sit_coffee', label: 'Ngồi cafe chill', value: 'Sitting at a cafe table, holding a coffee cup, relaxed posture' },
      { id: 'lean_desk', label: 'Dựa hông vào bàn', value: 'Leaning hip against the edge of a desk, arms crossed or holding a document' },
      { id: 'sit_legs_crossed', label: 'Ngồi vắt chân', value: 'Sitting in an armchair, legs crossed elegantly, holding a book or tablet' },
    ]
  },
  {
    id: 'action',
    label: 'Hành động',
    options: [
      { id: 'walking', label: 'Đang bước đi', value: 'Walking confidently towards the camera, dynamic natural movement' },
      { id: 'looking_watch', label: 'Xem đồng hồ', value: 'Looking at wristwatch, busy professional lifestyle vibe' },
      { id: 'phone_call', label: 'Nghe điện thoại', value: 'Talking on a smartphone, business conversation context' },
      { id: 'walking_with_coffee', label: 'Vừa đi vừa cầm cà phê', value: 'Walking while holding a coffee cup, casual lifestyle and approachable vibe' },
      { id: 'adjusting_jacket_walk', label: 'Chỉnh áo khi đi', value: 'Walking and adjusting jacket or sleeves, polished and professional motion' },
      { id: 'turning_back', label: 'Quay lại nhìn', value: 'Walking then turning back to look at the camera, natural transitional motion' },
      { id: 'entering_space', label: 'Bước vào không gian', value: 'Entering a room or space with natural stride, confident and purposeful movement' },
    ]
  }
];

// ─── FACE ENHANCEMENTS ────────────────────────────────────────────────────────
const FACE_ENHANCEMENT_OPTIONS = [
  { id: 'lock_face', label: '🔒 Khoá khuôn mặt', desc: 'Giữ 100% nhận dạng từ ảnh tải lên' },
  { id: 'smooth_skin', label: '✨ Làm mịn da', desc: 'Da mịn tự nhiên, không nhựa' },
  { id: 'bright_skin', label: '☀️ Da sáng tự nhiên', desc: 'Rạng rỡ, căng bóng' },
  { id: 'younger', label: '⏪ Trẻ hóa (5-10 tuổi)', desc: 'Trẻ hơn tự nhiên' },
  { id: 'remove_wrinkles', label: '🌸 Xóa nếp nhăn', desc: 'Mịn nhẹ, giữ kết cấu da' },
  { id: 'makeup', label: '💄 Trang điểm nhẹ', desc: 'Makeup tự nhiên mỗi ngày' },
  { id: 'bright_eyes', label: '👁 Mắt sáng nổi bật', desc: 'Ánh mắt trong, biểu cảm' },
  { id: 'sharp_features', label: '💎 Nét mặt sắc sảo', desc: 'Xương hàm, gò má rõ nét' },
];

// ─── ASPECT RATIO ─────────────────────────────────────────────────────────────
const RATIO_OPTIONS = [
  { id: '9:16', label: 'Dọc (Toàn thân)', icon: Smartphone, value: '9:16' },
  { id: '16:9', label: 'Ngang (Điện ảnh)', icon: Monitor, value: '16:9' },
  { id: '1:1', label: 'Vuông (Avatar)', icon: Square, value: '1:1' },
];

// ─── CONTEXT CATEGORIES ───────────────────────────────────────────────────────
const CONTEXT_CATEGORIES: CategoryItem[] = [
  {
    id: 'studio_bg',
    label: 'Phông Studio',
    options: [
      { id: 'bg_pure_white', label: 'Phông Trắng Tinh khiết', value: 'High-key studio photography, pure white seamless infinity background, clean and commercial look, perfect for professional portraits' },
      { id: 'bg_studio_grey', label: 'Phông Xám Chuyên nghiệp', value: 'Professional studio grey backdrop, soft even lighting, elegant corporate portrait style' },
      { id: 'bg_deep_black', label: 'Phông Đen Huyền bí', value: 'Low-key studio, pure black background, dramatic rim lighting, intense and powerful mood' },
      { id: 'bg_pastel_pink', label: 'Phông Hồng Pastel', value: 'Soft pastel pink studio background, sweet youthful vibe, commercial pop style' },
      { id: 'bg_pastel_blue', label: 'Phông Xanh Pastel', value: 'Soft pastel blue studio background, calm and fresh look, social media profile style' },
      { id: 'bg_beige', label: 'Phông Be (Beige) Hàn Quốc', value: 'Warm beige studio background, Korean profile photo style, soft and elegant minimalism' },
      { id: 'bg_textured_canvas', label: 'Phông Vải Canvas Nghệ thuật', value: 'Hand-painted textured canvas backdrop, fine art portrait style, classic painterly look' },
      { id: 'bg_gradient_blue', label: 'Gradient Xanh Đậm', value: 'Dark blue gradient studio background, corporate executive headshot style' },
      { id: 'bg_abstract_light', label: 'Ánh sáng Trừu tượng', value: 'Studio background with abstract light bokeh and blurred shapes, atmospheric and creative mood' },
    ]
  },
  {
    id: 'office',
    label: 'Văn phòng',
    options: [
      { id: 'ceo_desk', label: 'Bàn CEO quyền lực', value: 'High-end CEO executive desk, panoramic city skyline view through floor-to-ceiling windows, luxury interior design, real photography' },
      { id: 'luxury_executive_office', label: 'Phòng điều hành cao cấp', value: 'Luxury executive office, refined interior design, large mahogany desk, calm authoritative atmosphere, real photography' },
      { id: 'penthouse_office', label: 'Văn phòng penthouse', value: 'Penthouse office space, floor-to-ceiling glass windows, stunning city skyline view, exclusive premium atmosphere, real photography' },
      { id: 'modern_luxury_office', label: 'Văn phòng hiện đại cao cấp', value: 'Modern luxury office, minimalist designer furniture, soft ambient lighting, premium materials, real photography' },
      { id: 'designer_office', label: 'Văn phòng thiết kế cao cấp', value: 'High-end designer office space, custom bespoke furniture, artistic and professional environment, real photography' },
      { id: 'meeting_room', label: 'Phòng họp kính', value: 'Modern glass-walled meeting room, bright professional atmosphere, conference table, real photography' },
      { id: 'coworking_space', label: 'Co-working space', value: 'Premium modern coworking space, shared workstations, natural light streaming in, creative working vibe, real photography' },
      { id: 'startup_workspace', label: 'Không gian startup', value: 'Trendy startup office, whiteboards and laptops, casual professional environment, real photography' },
      { id: 'podium', label: 'Bục phát biểu', value: 'Speaking at a podium in a conference hall, spotlight on speaker, professional event photography' },
      { id: 'office_window_side', label: 'Gần cửa sổ văn phòng', value: 'Office window-side area, beautiful natural daylight, city buildings visible outside, real photography' },
    ]
  },
  {
    id: 'gym_fitness',
    label: 'Gym & Thể thao',
    options: [
      { id: 'luxury_gym', label: 'Gym cao cấp hiện đại', value: 'Upscale luxury gym interior, premium high-end equipment, warm ambient LED lighting, mirror walls, polished concrete floors, premium fitness club atmosphere, realistic photography' },
      { id: 'neon_gym', label: 'Gym đèn neon (Mạnh mẽ)', value: 'Neon-lit industrial gym space, dramatic purple and blue colored lighting, exposed brick and metal structure, powerful intense training atmosphere, realistic photography' },
      { id: 'pilates_studio', label: 'Studio Pilates sáng trưng', value: 'Bright airy pilates studio, large windows with natural light, clean white walls, wooden floor, reformer equipment, minimalist elegant fitness space, realistic photography' },
      { id: 'boxing_studio', label: 'Phòng tập boxing', value: 'Professional boxing studio, heavy punching bags hanging, dramatic overhead lighting, raw gritty athletic environment, powerful and intense mood, realistic photography' },
      { id: 'outdoor_park_training', label: 'Tập ngoài trời (Công viên)', value: 'Outdoor fitness training in lush urban park, fresh morning golden light, green trees and grass background, energetic and natural athletic setting, realistic photography' },
      { id: 'resort_pool', label: 'Hồ bơi resort cao cấp', value: 'Luxury resort infinity pool overlooking tropical landscape, crystal turquoise water, palm trees, golden hour sunlight, exclusive vacation atmosphere, realistic photography' },
      { id: 'tennis_court', label: 'Sân tennis quốc tế', value: 'International standard hard court tennis facility, clean professional environment, bright sports photography lighting, athletic prestige, realistic photography' },
      { id: 'yoga_rooftop', label: 'Yoga sân thượng (City view)', value: 'Rooftop yoga and wellness space, panoramic city skyline view, warm sunrise or sunset light, peaceful elevated urban lifestyle, realistic photography' },
      { id: 'crossfit_industrial', label: 'CrossFit Box (Công nghiệp)', value: 'Industrial crossfit training box, rubber matted floors, overhead pendant lighting, exposed ceiling structure, intense serious athletic training environment, realistic photography' },
      { id: 'gym_mirror', label: 'Gương gym phản chiếu', value: 'Full-length gym mirror reflection setup, modern equipment visible in background, strong ambient lighting, fitness influencer content style, realistic photography' },
    ]
  },
  {
    id: 'hongkong_cinematic',
    label: '🎬 HK Điện ảnh 80s',
    options: [
      { id: 'hk_wet_street_night', label: 'Phố đêm HK mưa (Wong Kar-wai)', value: 'Rain-slicked Hong Kong street at night circa 1980s, neon signs reflected brilliantly in wet pavement, warm amber and green color cast, authentic film grain, melancholic cinematic mood, Wong Kar-wai aesthetic, In the Mood for Love style' },
      { id: 'hk_neon_alley', label: 'Hẻm đèn neon Hồng Kông', value: 'Narrow Kowloon alley at night, dense neon signage in Chinese characters, red yellow and pink glowing lights, vintage 1980s Hong Kong urban atmosphere, moody and evocative street photography' },
      { id: 'hk_bar_lounge', label: 'Bar Hồng Kông thập niên 80', value: 'Intimate dim bar in 1980s Hong Kong, warm amber overhead lighting, dark wooden bar counter, atmospheric cigarette smoke haze, classic Cantopop era nostalgic vibe, film noir quality' },
      { id: 'hk_rooftop_night', label: 'Mái nhà Hồng Kông (Hè đêm)', value: 'Rooftop in Hong Kong at night, dense neon city lights below, humid summer atmosphere, packed urban skyline, cinematic nostalgic mood, Wong Kar-wai color palette' },
      { id: 'hk_market_night', label: 'Chợ đêm Hồng Kông', value: 'Busy Hong Kong night market, small shops crowded together, colorful lanterns and hanging goods, warm natural lighting, authentic 1980s Cantonese street life photography' },
      { id: 'hk_tram_interior', label: 'Tàu điện cổ Hồng Kông', value: 'Inside a vintage Hong Kong double-decker tram, rattan seats, warm yellow interior lighting, blurred neon street visible through windows, nostalgic 1980s public transport atmosphere' },
      { id: 'hk_cinema_lobby', label: 'Sảnh rạp HK cổ điển', value: 'Old Hong Kong cinema lobby, 1980s movie poster decor on walls, atmospheric warm tungsten lighting, golden age of Hong Kong cinema nostalgia' },
      { id: 'hk_phone_booth_night', label: 'Bốt điện thoại đêm HK', value: 'Vintage Hong Kong phone booth at night, rain falling outside, warmly backlit from interior, lonely urban atmospheric scene, classic cinematic noir quality' },
    ]
  },
  {
    id: 'international_landmarks',
    label: 'Địa danh Nước ngoài',
    options: [
      { id: 'eiffel_tower_street', label: 'Paris – Gần Tháp Eiffel', value: 'Street-level view near the Eiffel Tower in Paris, pedestrian walkway with cobblestones, natural daylight, casual authentic travel photography perspective, real location feel' },
      { id: 'times_square_sidewalk', label: 'New York – Times Square', value: 'Standing on the sidewalk at Times Square New York, eye-level city perspective, neon advertisements around, candid urban travel photography, real location feel' },
      { id: 'tower_bridge_riverside', label: 'London – Bờ sông Thames', value: 'Riverside walkway near Tower Bridge London, natural walking perspective, overcast British daylight, authentic city scene, real location feel' },
      { id: 'burj_khalifa_downtown', label: 'Dubai – Khu Downtown', value: 'Downtown Dubai pedestrian area, Burj Khalifa visible in background, modern architecture surroundings, natural standing viewpoint, real location feel' },
      { id: 'paris_seine_riverside', label: 'Paris – Bờ sông Seine', value: 'Walking along the Seine riverbank in Paris, stone embankment, classic city buildings nearby, natural daylight, casual authentic travel photography, real location feel' },
      { id: 'montmartre_street', label: 'Paris – Khu Montmartre', value: 'Street view in Montmartre Paris, sloped cobblestone road, small charming cafes, everyday European neighborhood atmosphere, real location feel' },
      { id: 'lucerne_lake_walk', label: 'Thụy Sĩ – Ven hồ Lucerne', value: 'Lakeside walkway in Lucerne Switzerland, calm water reflection, old town buildings nearby, mountains in distance, eye-level travel viewpoint, real location feel' },
      { id: 'santorini_cliff_path', label: 'Santorini – Lối đi ven vách đá', value: 'Walking path along Santorini cliffs, white Cycladic houses nearby, caldera view, natural travel photography angle, golden hour light, real location feel' },
      { id: 'rome_colosseum_outside', label: 'Rome – Bên ngoài Colosseum', value: 'Standing outside the Colosseum in Rome, street-level angle, warm afternoon Italian sunlight, real location travel photography feel' },
      { id: 'shibuya_crossing_corner', label: 'Tokyo – Shibuya Crossing', value: 'Street corner at Shibuya Crossing Tokyo, eye-level urban view, people crossing naturally, handheld candid travel photo feel, real location' },
      { id: 'venice_canal_walkway', label: 'Venice – Lối đi ven kênh', value: 'Walking beside Venice canal, gondolas passing, sunlight on water, eye-level tourist photography perspective, real location feel' },
      { id: 'swiss_alps_village', label: 'Thụy Sĩ – Làng núi Alps', value: 'Village viewpoint in Swiss Alps, ground-level perspective, traditional wooden houses, mountains in distance, clear crisp daylight, real location feel' },
      { id: 'sydney_harbor_walk', label: 'Sydney – Bến cảng', value: 'Harbor-side walkway near Sydney Opera House, clear Australian daylight, casual authentic travel photography angle, real location feel' },
      { id: 'maldives_beach_walk', label: 'Maldives – Bãi biển', value: 'Walking along a pristine Maldives beach, crystal turquoise water, overwater bungalows in background, handheld travel photo feeling, real location feel' },
      { id: 'newzealand_lakeside', label: 'New Zealand – Ven hồ', value: 'Standing by majestic lakeside in New Zealand, mountains reflected in mirror-like water, natural scenic travel photography, real location feel' },
    ]
  },
  {
    id: 'street',
    label: 'Đường phố',
    options: [
      { id: 'hanoi_old_quarter', label: 'Phố cổ Hà Nội', value: 'Narrow street in Hanoi Old Quarter, low-rise historic houses, hanging shop signs, motorbikes in background, natural daytime street photography, real location' },
      { id: 'saigon_cafe_balcony', label: 'Cafe ban công Sài Gòn', value: 'Balcony cafe overlooking busy Saigon street, scooters below, casual urban lifestyle perspective, real location' },
      { id: 'hoi_an_old_street', label: 'Phố cổ Hội An', value: 'Hoi An ancient town street, beautiful yellow walls, colorful paper lanterns overhead, slow peaceful atmosphere, natural daylight, real location' },
      { id: 'ny_street', label: 'Phố New York', value: 'Busy New York street, yellow taxis, towering skyscrapers, fashion editorial photography, real location feel' },
      { id: 'paris_cafe_street', label: 'Cafe vỉa hè Paris', value: 'Street-side Parisian cafe, small round tables with wicker chairs, people sitting casually, soft golden daylight, real location feel' },
      { id: 'tokyo_local_street', label: 'Phố khu dân cư Tokyo', value: 'Quiet Tokyo neighborhood street, low-rise buildings, bicycles parked outside, clean everyday city atmosphere, real location feel' },
      { id: 'night_city', label: 'Thành phố đêm mưa', value: 'City street at night after rain, neon lights reflecting on wet pavement, atmospheric urban moodiness, cinematic quality' },
      { id: 'zurich_old_town', label: 'Phố cổ Zurich', value: 'Old town street in Zurich, cobblestone road, small boutique shops, calm European daily life, real location feel' },
      { id: 'dalat_cafe_garden', label: 'Cafe vườn Đà Lạt', value: 'Garden cafe in Da Lat, pine trees around, cool misty weather, relaxed outdoor seating, real location feel' },
    ]
  },
  {
    id: 'nature',
    label: 'Thiên nhiên',
    options: [
      { id: 'sapa_mountain_trail', label: 'Sapa – Đường mòn núi', value: 'Mountain hiking trail in Sapa, stunning terraced rice fields, misty mountain air, natural trekking photography, real location' },
      { id: 'phu_quoc_beach', label: 'Phú Quốc – Bãi biển', value: 'Walking along pristine Phu Quoc beach, gentle waves, palm trees, natural seaside travel photography, real location' },
      { id: 'swiss_alps_hiking', label: 'Alps – Đường trekking Thụy Sĩ', value: 'Hiking trail in Swiss Alps, lush green slopes, dramatic mountain peaks nearby, clear daylight, eye-level nature photography, real location feel' },
      { id: 'iceland_waterfall', label: 'Iceland – Gần thác nước', value: 'Walking path near Iceland waterfall, mist in the air, dramatic volcanic landscape, eye-level outdoor photography, real location feel' },
      { id: 'bali_coastal_path', label: 'Bali – Đường ven biển', value: 'Coastal walking trail in Bali, dramatic ocean cliffs, warm tropical daylight, travel photography perspective, real location feel' },
      { id: 'forest_sunlight', label: 'Rừng thông ánh nắng', value: 'Deep pine forest with golden sunlight filtering through trees, cinematic nature photography, magical atmosphere' },
      { id: 'beach_sunset', label: 'Bãi biển hoàng hôn', value: 'Luxury tropical beach at sunset, warm golden orange sky, gentle ocean waves, cinematic lifestyle photography' },
      { id: 'garden_flowers', label: 'Vườn hoa nở rộ', value: 'Beautiful blooming flower garden, soft pastel colors, romantic and dreamy natural light, lifestyle portrait' },
      { id: 'mountain_peak', label: 'Đỉnh núi hùng vĩ', value: 'Epic mountain peak viewpoint, clouds below, vast landscape stretching to horizon, adventure photography' },
    ]
  }
];

// ─── OUTFIT DATABASE ──────────────────────────────────────────────────────────
const OUTFIT_DATABASE: Record<string, CategoryItem[]> = {
  MALE: [
    {
      id: 'suit',
      label: 'Vest / Doanh nhân',
      options: [
        { id: 'm_classic_suit', label: 'Vest Cổ điển (Cà vạt)', value: 'Classic navy blue tailored business suit with silk tie, crisp white shirt' },
        { id: 'm_modern_suit', label: 'Vest Hiện đại (Không cà vạt)', value: 'Modern slim-fit charcoal grey suit, white shirt open collar, no tie, contemporary executive style' },
        { id: 'm_tuxedo', label: 'Tuxedo (Dạ tiệc)', value: 'Classic black tuxedo, bow tie, formal evening wear, luxurious and elegant' },
        { id: 'm_italian_cut_suit', label: 'Vest form Ý (Cà vạt)', value: 'Italian-cut slim suit, structured shoulders, fine wool fabric, elegant silk tie, refined modern gentleman look' },
        { id: 'm_charcoal_suit', label: 'Vest xám than doanh nhân', value: 'Charcoal grey business suit, high-quality wool, crisp tailoring, professional tie, confident leadership presence' },
        { id: 'm_navy_minimal_suit', label: 'Vest xanh navy tối giản', value: 'Navy blue minimalist suit, soft tailoring, open collar shirt, young executive aesthetic' },
        { id: 'm_double_breasted', label: 'Vest 2 hàng nút hiện đại', value: 'Modern double-breasted suit, premium fabric, sharp structured lines, confident fashion-forward look' },
        { id: 'm_dark_green_suit', label: 'Vest xanh rêu cao cấp', value: 'Dark forest green tailored suit, luxury wool fabric, open collar, distinctive yet elegant modern style' },
      ]
    },
    {
      id: 'casual',
      label: 'Đời thường',
      options: [
        { id: 'm_polo', label: 'Áo Polo & Quần tây', value: 'Smart casual premium polo shirt and tailored chinos, old money aesthetic' },
        { id: 'm_linen', label: 'Sơ mi Linen mùa hè', value: 'White linen shirt, sleeves rolled, relaxed Mediterranean summer vibe' },
        { id: 'm_business_casual_blazer', label: 'Blazer & Áo thun cao cấp', value: 'Unstructured blazer with premium cotton t-shirt, tailored trousers, modern business casual style' },
        { id: 'm_shirt_no_tie', label: 'Sơ mi cổ mở', value: 'Crisp white dress shirt, open collar, slim trousers, relaxed yet polished executive appearance' },
        { id: 'm_light_sweater', label: 'Áo len mỏng khoác vai', value: 'Lightweight cashmere sweater worn over shirt, elegant casual European businessman style' },
        { id: 'm_cardigan_smart', label: 'Cardigan lịch sự', value: 'Fine wool cardigan over collared shirt, clean trousers, intellectual business casual look' },
        { id: 'm_dark_polo_minimal', label: 'Polo tối giản cao cấp', value: 'Dark tone premium polo shirt, tailored pants, minimalist modern entrepreneur vibe' },
      ]
    },
    {
      id: 'korean_style_m',
      label: 'Hàn Quốc (K-Style)',
      options: [
        { id: 'm_k_ootd', label: 'OOTD Seoul tối giản', value: 'Korean mens OOTD, clean minimal layering, neutral muted tones, slim fit premium pieces, effortless Seoul street style' },
        { id: 'm_k_business_casual', label: 'Smart casual Hàn Quốc', value: 'Korean smart casual men, fitted turtleneck or structured shirt, tailored trousers, clean refined accessories, sophisticated Seoul office fashion' },
        { id: 'm_k_streetwear', label: 'Streetwear Seoul', value: 'Seoul streetwear style, oversized hoodie or graphic shirt, slim jogger pants, clean white sneakers, Korean urban youth fashion' },
        { id: 'm_k_minimal', label: 'Tối giản cao cấp Hàn', value: 'Korean premium minimalist style, quality neutral fabrics, clean modern silhouette, understated Seoul elegance' },
      ]
    },
    {
      id: 'sports',
      label: 'Thể thao',
      options: [
        { id: 'm_gym_minimal', label: 'Gym tối giản nam', value: 'Mens minimalist gym outfit, fitted performance t-shirt, tapered training pants, clean athletic look' },
        { id: 'm_gym_layered', label: 'Gym layering lịch sự', value: 'Mens layered gym outfit, lightweight zip jacket over training top, refined athletic aesthetic' },
        { id: 'm_hiking_tech', label: 'Leo núi tech lịch sự', value: 'Mens technical hiking outfit, breathable long-sleeve top, slim trekking pants, clean outdoor style' },
        { id: 'm_running_minimal', label: 'Chạy bộ tối giản', value: 'Mens minimalist running outfit, streamlined athletic wear, clean and professional runner style' },
        { id: 'm_golf', label: 'Đồ Golf', value: 'Professional golf outfit, polo shirt and technical trousers, country club style' },
      ]
    },
    {
      id: 'beach_resort_m',
      label: 'Biển & Resort',
      options: [
        { id: 'm_resort_linen', label: 'Sơ mi linen resort nam', value: 'Mens linen shirt unbuttoned casually, tailored swim shorts, resort vacation style, Mediterranean vibes' },
        { id: 'm_resort_shorts', label: 'Short vải cao cấp resort', value: 'Mens premium fabric shorts with fitted polo, luxury resort casual style, yacht club inspired' },
        { id: 'm_resort_blazer_white', label: 'Blazer trắng resort nam', value: 'Mens white or cream linen blazer, lightweight summer luxury dressing, elegant resort fashion' },
      ]
    },
    {
      id: 'party',
      label: 'Đi tiệc',
      options: [
        { id: 'm_party_black_shirt', label: 'Sơ mi đen tiệc tối', value: 'Mens black tailored shirt, subtle sheen fabric, slim dark trousers, elegant evening party style' },
        { id: 'm_party_silk_shirt', label: 'Sơ mi lụa cao cấp', value: 'Mens silk-blend shirt, smooth luxurious texture, open collar, refined luxury party look' },
        { id: 'm_party_velvet_blazer', label: 'Blazer nhung dạ tiệc', value: 'Mens velvet blazer, deep jewel tone color, soft sheen, upscale evening event style' },
        { id: 'm_party_monochrome', label: 'Monochrome tiệc đêm', value: 'Mens monochrome all-black party outfit, minimalist luxury night out vibe' },
        { id: 'm_party_dark_turtleneck', label: 'Áo cổ lọ tiệc', value: 'Mens dark turtleneck with well-fitted tailored trousers, sleek modern evening elegance' },
      ]
    },
    {
      id: 'traditional',
      label: 'Truyền thống',
      options: [
        { id: 'm_aodai', label: 'Áo Dài Nam', value: 'Traditional Vietnamese Ao Dai for men, ceremonial formal style' },
        { id: 'm_aodai_brocade', label: 'Áo dài gấm rồng', value: 'Mens traditional Ao Dai with subtle dragon brocade pattern, structured dignified masculine style' },
        { id: 'm_aodai_dark', label: 'Áo dài tông trầm truyền thống', value: 'Mens dark-tone traditional Ao Dai, subtle woven patterns, calm and powerful formal appearance' },
      ]
    },
  ],
  FEMALE: [
    {
      id: 'suit',
      label: 'Vest / Doanh nhân',
      options: [
        { id: 'f_female_suit', label: 'Vest Nữ quyền lực', value: 'Sharp tailored female power suit, elegant and professionally confident' },
        { id: 'f_blazer_skirt', label: 'Blazer & Chân váy', value: 'Professional blazer with matching pencil skirt, executive feminine style' },
        { id: 'f_power_suit_modern', label: 'Vest nữ hiện đại quyền lực', value: 'Modern female power suit, sharp tailoring, premium fabric, confident professional presence' },
        { id: 'f_oversized_blazer', label: 'Vest oversize cá tính', value: 'Oversized blazer suit for women, relaxed fit, fashion-forward confident style' },
        { id: 'f_pastel_suit', label: 'Vest màu pastel trẻ trung', value: 'Pastel-tone women power suit, soft color palette, youthful and elegant professional look' },
        { id: 'f_monochrome_suit', label: 'Vest đơn sắc thời thượng', value: 'Monochrome womens suit, minimalist design, clean high-fashion business style' },
        { id: 'f_belted_blazer', label: 'Vest thắt đai eo', value: 'Belted blazer suit for women, accentuated waist, elegant confident feminine power look' },
      ]
    },
    {
      id: 'casual',
      label: 'Đời thường',
      options: [
        { id: 'f_dress_summer', label: 'Váy Hè nhẹ nhàng', value: 'Flowing summer dress, delicate floral patterns, breezy and relaxed feminine vibe' },
        { id: 'f_jeans_top', label: 'Jeans & Áo thun', value: 'Casual denim jeans, stylish white top, effortless everyday look' },
        { id: 'f_wrap_dress', label: 'Váy wrap nữ tính', value: 'Wrap dress for women, flattering silhouette, soft fabric, elegant and stylish everyday fashion' },
        { id: 'f_slip_dress', label: 'Váy lụa slip dress', value: 'Silk slip dress, minimalist modern cut, smooth texture, fashionable feminine look' },
        { id: 'f_bodycon_dress', label: 'Váy ôm tôn dáng', value: 'Bodycon dress, figure-hugging fit, confident and stylish feminine everyday fashion' },
        { id: 'f_crop_top_jeans', label: 'Áo croptop & jeans', value: 'Crop top paired with high-waist jeans, youthful confident dynamic street style' },
        { id: 'f_oversize_shirt_jeans', label: 'Sơ mi oversize & jeans', value: 'Oversized shirt with denim jeans, effortless modern street fashion for women' },
      ]
    },
    {
      id: 'korean_style',
      label: 'Hàn Quốc (K-Style)',
      options: [
        { id: 'f_k_ootd', label: 'OOTD Hàn Quốc ngọt ngào', value: 'Korean sweet feminine OOTD, light pastel colors, delicate silhouette, layered accessories, K-drama heroine style' },
        { id: 'f_k_street', label: 'Streetwear Hàn Quốc', value: 'Korean streetwear for women, oversized cotton pieces, neutral tones, clean sneakers, effortless Seoul street style' },
        { id: 'f_k_minimal', label: 'Hàn tối giản cao cấp', value: 'Korean minimalist premium style, quality neutral fabrics, clean tailoring, sophisticated Seoul fashion' },
        { id: 'f_k_cafe', label: 'Cafe look Hàn Quốc', value: 'Korean cafe date look, cozy knit sweater, straight leg jeans, clean aesthetic everyday style' },
        { id: 'f_k_business', label: 'Business Hàn Quốc thanh lịch', value: 'Korean business chic for women, structured blazer with feminine details, clean professional look, Seoul office style' },
        { id: 'f_k_idol', label: 'Style idol Kpop', value: 'Kpop idol-inspired fashion, trendy polished styling, stage-ready chic with casual luxe elements' },
      ]
    },
    {
      id: 'quiet_luxury_f',
      label: 'Quiet Luxury (Tối giản)',
      options: [
        { id: 'f_ql_camel_coat', label: 'Camel coat tối giản', value: 'Camel wool coat, minimal branding, premium quality fabric, old money quiet luxury aesthetic' },
        { id: 'f_ql_cream_set', label: 'Cream matching set', value: 'Cream colored coordinated matching set, impeccable clean tailoring, understated elegance, Loro Piana inspired' },
        { id: 'f_ql_trench', label: 'Trench coat cổ điển', value: 'Classic Burberry-style trench coat, timeless perfect cut, neutral tone, effortlessly sophisticated' },
        { id: 'f_ql_cashmere', label: 'Cashmere turtleneck', value: 'Fine cashmere turtleneck, perfectly fitted, minimal luxury dressing, elevated timeless everyday style' },
        { id: 'f_ql_wide_pants', label: 'Quần rộng vải cao cấp', value: 'Wide-leg tailored trousers, premium fabric with beautiful drape, paired with simple top, refined minimalist fashion' },
      ]
    },
    {
      id: 'sports',
      label: 'Thể thao',
      options: [
        { id: 'f_yoga', label: 'Đồ tập Yoga cao cấp', value: 'Premium yoga activewear, flattering leggings and sports bra top, fit and confident athletic look' },
        { id: 'f_gym_minimal', label: 'Gym tối giản nữ', value: 'Womens minimalist gym outfit, fitted performance top and high-waist leggings, clean confident athletic look' },
        { id: 'f_gym_layered', label: 'Gym layering hiện đại', value: 'Womens gym wear with light zip jacket over sports top, sleek and refined fitness style' },
        { id: 'f_hiking_modern', label: 'Leo núi hiện đại nữ', value: 'Womens modern hiking outfit, neutral colors, fitted breathable long-sleeve top, slim trekking pants, elegant outdoor style' },
        { id: 'f_running_slim', label: 'Chạy bộ gọn dáng', value: 'Womens streamlined running outfit, fitted top and leggings, modern and confident runner style' },
      ]
    },
    {
      id: 'beach_resort',
      label: 'Biển & Resort',
      options: [
        { id: 'f_resort_white_dress', label: 'Đầm trắng resort', value: 'White flowing maxi dress, light fabric, Mediterranean luxury vacation style, effortless elegance' },
        { id: 'f_sundress_tropical', label: 'Sundress nhiệt đới', value: 'Bright tropical sundress, floral patterns, lightweight fabric, summer vacation lifestyle photography' },
        { id: 'f_resort_linen_set', label: 'Linen set resort', value: 'Matching linen set top and wide pants, neutral natural tones, breezy elegant resort wear' },
        { id: 'f_beach_elegant', label: 'Biển sang trọng', value: 'Elegant beach style, tailored shorts with silk blouse, resort luxury fashion photography' },
      ]
    },
    {
      id: 'party',
      label: 'Đi tiệc',
      options: [
        { id: 'f_evening_gown', label: 'Đầm dạ hội', value: 'Elegant long evening gown, luxury jewelry, gala event style' },
        { id: 'f_evening_satin', label: 'Đầm satin dạ hội', value: 'Satin evening gown, smooth flowing fabric, elegant silhouette, refined feminine allure' },
        { id: 'f_one_shoulder_dress', label: 'Váy lệch vai', value: 'One-shoulder cocktail dress, clean modern lines, subtle feminine elegance, classy party style' },
        { id: 'f_slit_long_dress', label: 'Váy dài xẻ nhẹ', value: 'Long evening dress with tasteful side slit, graceful movement, elegant confident femininity' },
        { id: 'f_blazer_evening', label: 'Blazer dự tiệc', value: 'Womens tailored blazer with elegant inner top, slim trousers or skirt, modern classy party outfit' },
        { id: 'f_dark_turtleneck_party', label: 'Cổ lọ tiệc tối', value: 'Dark-tone turtleneck with elegant skirt or trousers, sleek sophisticated night event look' },
      ]
    },
    {
      id: 'traditional',
      label: 'Truyền thống',
      options: [
        { id: 'f_aodai', label: 'Áo Dài Nữ', value: 'Traditional Vietnamese Ao Dai, silk texture, intricate beautiful patterns' },
        { id: 'f_aodai_classic_silk', label: 'Áo dài lụa truyền thống', value: 'Classic womens Ao Dai in pure silk fabric, smooth drape, elegant traditional Vietnamese femininity' },
        { id: 'f_aodai_floral', label: 'Áo dài thêu hoa', value: 'Womens Ao Dai with delicate floral embroidery, graceful and refined traditional beauty' },
        { id: 'f_aodai_pastel_modern', label: 'Áo dài pastel hiện đại', value: 'Pastel-tone modern Ao Dai, soft colors, youthful and fashionable contemporary Vietnamese style' },
        { id: 'f_aodai_lace_detail', label: 'Áo dài điểm ren', value: 'Ao Dai with subtle lace accents, delicate feminine detail, refined and tasteful allure' },
      ]
    },
  ]
};

// ─── QUALITY OPTIONS ──────────────────────────────────────────────────────────
const QUALITY_OPTIONS: OptionItem[] = [
  { id: 'hyperreal_8k', label: 'Siêu thực 8K (Photorealistic)', value: 'Hyper-realistic photography, 8K ultra-high resolution, raw unprocessed photo quality, extreme skin and fabric detail' },
  { id: 'cinematic', label: 'Điện ảnh (Cinematic)', value: 'Cinematic movie quality, professional DCI color grading, film-like atmosphere, teal and orange tone palette' },
  { id: 'high_fashion', label: 'Thời trang cao cấp (Editorial)', value: 'High-fashion editorial photography, Vogue and Harper\'s Bazaar magazine quality, luxury aesthetic, impeccable execution' },
  { id: 'luxury_commercial', label: 'Quảng cáo Luxury (Commercial)', value: 'Luxury commercial advertising photography, premium brand campaign quality, aspirational and flawless presentation' },
  { id: '4k_studio', label: '4K Studio Professional', value: '4K professional studio photography, extreme sharpness, precise lighting control, commercial portfolio quality' },
  { id: 'vintage_film', label: 'Film Analog 35mm (Cổ điển)', value: 'Authentic 35mm analog film photography, organic grain texture, Kodak Portra 400 color science, timeless nostalgic quality' },
  { id: 'natural_realistic', label: 'Đời thường tự nhiên', value: 'Natural realistic photography, unretouched authentic look, real skin texture, candid natural lighting' },
  { id: 'smartphone_candid', label: 'Điện thoại (Candid đời thật)', value: 'Smartphone photography aesthetic, candid feel, natural exposure, slight handheld realism, social media authentic style' },
];

// ─── EXPRESSION OPTIONS ───────────────────────────────────────────────────────
const EXPRESSION_OPTIONS: OptionItem[] = [
  { id: 'friendly', label: 'Thân thiện (Friendly)', value: 'Friendly, slight warm smile, approachable and inviting, warm eyes' },
  { id: 'confident', label: 'Tự tin (Confident)', value: 'Confident, subtle closed-mouth smile, direct powerful eye contact' },
  { id: 'professional', label: 'Chuyên nghiệp', value: 'Professional, calm, composed, trustworthy and authoritative' },
  { id: 'slight_smile', label: 'Cười mỉm nhẹ', value: 'Very subtle elegant smile, soft expression, refined and graceful' },
  { id: 'serious', label: 'Nghiêm nghị (Serious)', value: 'Serious, intense focused gaze, powerful commanding presence' },
  { id: 'neutral', label: 'Tự nhiên (Neutral)', value: 'Neutral relaxed natural expression, calm and at ease' },
  { id: 'dreamy', label: 'Mơ màng', value: 'Dreamy look, gazing slightly away, soft eyes, romantic atmosphere' },
  { id: 'happy_laugh', label: 'Vui tươi (Tự nhiên)', value: 'Genuine happy natural expression, bright smile, joyful and energetic' },
];

// ─── LIGHTING OPTIONS ─────────────────────────────────────────────────────────
const LIGHTING_OPTIONS: OptionItem[] = [
  { id: 'studio_soft', label: '💡 Studio Soft (Softbox)', value: 'Professional softbox studio lighting, beautifully even and flattering illumination, clean controlled shadows' },
  { id: 'natural_window', label: '🪟 Cửa sổ tự nhiên', value: 'Natural window light, soft directional daylight, warm indoor photography atmosphere, realistic and flattering' },
  { id: 'golden_hour', label: '🌅 Golden Hour (Hoàng hôn)', value: 'Warm golden hour sunlight, romantic cinematic glow, long soft shadows, magical late afternoon quality' },
  { id: 'rembrandt', label: '🎭 Rembrandt (Nghệ thuật)', value: 'Classic Rembrandt lighting, dramatic side illumination, triangular highlight on cheek, fine art portrait depth' },
  { id: 'split', label: '⚡ Split Light (Nửa sáng/tối)', value: 'Bold split lighting, exactly half face in bright light and half in shadow, strong dramatic portrait statement' },
  { id: 'butterfly', label: '🦋 Butterfly (Glamour)', value: 'Butterfly lighting from directly above, glamour shadow beneath nose, Hollywood golden age beauty style' },
  { id: 'backlit', label: '✨ Ngược sáng (Backlit)', value: 'Beautiful artistic backlight, glowing rim light around subject, dreamy and ethereal halo atmosphere' },
  { id: 'neon', label: '🌈 Neon Cyber (Đô thị đêm)', value: 'Vivid neon pink and blue cyberpunk lighting, urban night atmosphere, colorful and dramatic mood' },
  { id: 'candle', label: '🕯 Nến / Ánh đèn ấm', value: 'Warm intimate candlelight or ambient lamp glow, soft warm color temperature, romantic cozy atmosphere' },
  { id: 'blue_hour', label: '🌙 Blue Hour (Chạng vạng)', value: 'Blue hour twilight outdoor light, deep cool blue sky, warm artificial lights in contrast, magical evening atmosphere' },
  { id: 'overcast', label: '☁️ Overcast (Mây khuếch tán)', value: 'Soft overcast sky diffused light, even outdoor illumination, no harsh shadows, clean professional outdoor result' },
];

// ─── CAMERA & LENS OPTIONS ────────────────────────────────────────────────────
const CAMERA_OPTIONS: OptionItem[] = [
  { id: 'portrait_85mm', label: '85mm f/1.4 Portrait (Bokeh đẹp)', value: 'Shot on 85mm f/1.4 portrait lens, beautiful creamy bokeh background blur, flattering perspective compression, sharp subject' },
  { id: 'standard_50mm', label: '50mm f/1.8 Standard (Tự nhiên)', value: 'Shot on 50mm f/1.8 standard lens, natural perspective, slight background separation, clean and realistic rendering' },
  { id: 'street_35mm', label: '35mm f/1.4 Street (Môi trường)', value: 'Shot on 35mm lens, wide environmental portrait, natural perspective with surroundings, reportage photojournalism style' },
  { id: 'tele_135mm', label: '135mm f/2 Telephoto (Nén cảnh)', value: 'Shot on 135mm f/2 telephoto lens, strong background compression, very flattering subject rendering, silky smooth bokeh' },
  { id: 'medium_format', label: 'Medium Format (Hasselblad)', value: 'Shot on Hasselblad medium format camera, extraordinary tonal depth and resolution, luxury fashion campaign quality' },
  { id: 'zoom_2470', label: '24-70mm f/2.8 (Đa năng)', value: 'Shot on professional 24-70mm f/2.8 zoom lens, versatile framing, sharp commercial photography quality' },
  { id: 'wide_16mm', label: '16mm Wide Angle (Toàn cảnh)', value: 'Shot on 16mm ultra-wide angle lens, dramatic environmental context, powerful sense of place and scale' },
  { id: 'film_35mm', label: 'Film Camera 35mm (Analog)', value: 'Shot on analog 35mm film camera, authentic organic grain and vintage color rendering, timeless photographic character' },
  { id: 'none', label: 'Mặc định (AI tự chọn)', value: '' },
];

// ─── CAMERA ANGLE OPTIONS ─────────────────────────────────────────────────────
const ANGLE_OPTIONS: OptionItem[] = [
  { id: 'wide', label: 'Toàn thân (Full Body)', value: 'Full body shot, head to toe fully visible' },
  { id: 'half_body', label: 'Nửa người (Waist Up)', value: 'Medium shot, waist up' },
  { id: 'portrait', label: 'Cận cảnh (Headshot)', value: 'Close-up headshot, focus on face' },
  { id: 'low', label: 'Góc thấp (Quyền lực)', value: 'Low angle from below, looking up, powerful perspective' },
  { id: 'eye', label: 'Ngang mắt (Eye Level)', value: 'Eye level, natural and direct' },
  { id: 'high', label: 'Góc cao (Overhead)', value: 'Slightly elevated angle from above, slimming and editorial' },
];

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export const ConfigPanel: React.FC<ConfigPanelProps> = ({ config, onChange, imageFlags }) => {
  const outfitInputRef = useRef<HTMLInputElement>(null);
  const [activePoseTab, setActivePoseTab] = useState('standing');
  const [outfitGender, setOutfitGender] = useState<string>(config.subjectType === 'MALE' ? 'MALE' : 'FEMALE');
  const [copied, setCopied] = React.useState(false);

  const previewPrompt = buildPrompt(config, imageFlags ?? { hasFaces: config.source === 'UPLOAD', hasProducts: false, hasLogo: false });

  const handleCopy = () => {
    navigator.clipboard.writeText(previewPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const updateConfig = (key: keyof PhotoConfig, value: any) => onChange({ ...config, [key]: value });

  const toggleFaceEnhancement = (id: string) => {
    const current = config.faceEnhancements || [];
    updateConfig('faceEnhancements', current.includes(id) ? current.filter(i => i !== id) : [...current, id]);
  };

  const handleOutfitImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const base64 = await fileToGenerativePart(e.target.files[0]);
      updateConfig('outfitImage', base64);
    }
  };

  const currentOutfitCategories = OUTFIT_DATABASE[outfitGender] || OUTFIT_DATABASE.FEMALE;

  return (
    <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 space-y-8 max-h-[900px] overflow-y-auto custom-scrollbar">

      {/* HEADER */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-4">
        <Settings2 className="text-blue-400" size={20} />
        <h3 className="font-semibold text-white">Cấu hình Chi tiết</h3>
      </div>

      {/* 1. KHUNG HÌNH & GÓC MÁY */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-blue-300 flex items-center gap-2 uppercase tracking-wider">
          <Monitor size={14} /> Khung hình & Góc chụp
        </label>
        <div className="grid grid-cols-3 gap-2 mb-3">
          {RATIO_OPTIONS.map((opt) => (
            <button key={opt.id} onClick={() => updateConfig('aspectRatio', opt.value)}
              className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${config.aspectRatio === opt.value ? 'bg-blue-600 border-blue-500 text-white shadow-lg' : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'}`}>
              <opt.icon size={20} className="mb-1" />
              <span className="text-xs font-medium">{opt.label.split(' ')[0]}</span>
            </button>
          ))}
        </div>
        <select onChange={(e) => updateConfig('cameraAngle', e.target.value)} value={config.cameraAngle}
          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white outline-none focus:ring-2 focus:ring-blue-500">
          {ANGLE_OPTIONS.map(opt => <option key={opt.id} value={opt.value}>{opt.label}</option>)}
        </select>
      </div>

      {/* 2. ĐỐI TƯỢNG */}
      <div className="space-y-3 pt-4 border-t border-slate-800">
        <label className="text-sm font-medium text-blue-300 flex items-center gap-2 uppercase tracking-wider">
          <Users size={14} /> Đối tượng
        </label>
        <div className="grid grid-cols-3 gap-2">
          {['MALE', 'FEMALE', 'PRODUCT'].map((type) => (
            <button key={type} onClick={() => { updateConfig('subjectType', type); if (type === 'MALE' || type === 'FEMALE') setOutfitGender(type); }}
              className={`px-3 py-2 rounded-lg text-xs md:text-sm border transition-all ${config.subjectType === type ? 'bg-blue-600 border-blue-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600'}`}>
              {type === 'MALE' ? 'Nam' : type === 'FEMALE' ? 'Nữ' : 'Sản phẩm'}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2">
          {['COUPLE', 'GROUP'].map((type) => (
            <button key={type} onClick={() => updateConfig('subjectType', type)}
              className={`px-3 py-2 rounded-lg text-xs md:text-sm border transition-all ${config.subjectType === type ? 'bg-blue-600 border-blue-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-400'}`}>
              {type === 'COUPLE' ? 'Cặp đôi' : 'Nhóm'}
            </button>
          ))}
        </div>
      </div>

      {/* 3. NÂNG CẤP KHUÔN MẶT */}
      {config.subjectType !== 'PRODUCT' && (
        <div className="space-y-3 bg-blue-900/10 p-4 rounded-xl border border-blue-800/40 pt-4 border-t-0">
          <label className="text-sm font-medium text-blue-300 flex items-center gap-2 uppercase tracking-wider">
            <ScanFace size={14} /> Nâng cấp Khuôn mặt
          </label>
          <div className="grid grid-cols-2 gap-2">
            {FACE_ENHANCEMENT_OPTIONS.map((opt) => (
              <label key={opt.id} className={`flex items-start gap-2 cursor-pointer rounded-lg p-2 border transition-all ${config.faceEnhancements?.includes(opt.id) ? 'bg-blue-600/20 border-blue-500/50' : 'border-transparent hover:bg-slate-800/50'}`}>
                <input type="checkbox" className="mt-0.5 h-3.5 w-3.5 rounded border-slate-600 bg-slate-800 text-blue-600"
                  checked={config.faceEnhancements?.includes(opt.id) || false}
                  onChange={() => toggleFaceEnhancement(opt.id)} />
                <div>
                  <div className="text-xs font-medium text-slate-200">{opt.label}</div>
                  <div className="text-[10px] text-slate-500">{opt.desc}</div>
                </div>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* 4. CHẤT LƯỢNG & BIỂU CẢM */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
        <div className="space-y-2">
          <label className="text-xs font-medium text-blue-300 flex items-center gap-1 uppercase tracking-wider"><Zap size={13} /> Chất lượng ảnh</label>
          <select value={config.quality} onChange={(e) => updateConfig('quality', e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2 py-2 text-xs text-white outline-none">
            {QUALITY_OPTIONS.map(q => <option key={q.id} value={q.value}>{q.label}</option>)}
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-medium text-blue-300 flex items-center gap-1 uppercase tracking-wider"><Smile size={13} /> Biểu cảm</label>
          <select value={config.expression} onChange={(e) => updateConfig('expression', e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2 py-2 text-xs text-white outline-none">
            {EXPRESSION_OPTIONS.map(e => <option key={e.id} value={e.value}>{e.label}</option>)}
          </select>
        </div>
      </div>

      {/* 5. BỐI CẢNH & PHONG CÁCH */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4 border-t border-slate-800">
        {/* BỐI CẢNH */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-blue-300 flex items-center gap-2 uppercase tracking-wider">
            <MapPin size={14} /> Bối cảnh
          </label>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {CONTEXT_CATEGORIES.map(cat => (
              <button key={cat.id} onClick={() => updateConfig('contextCategory', cat.id)}
                className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${config.contextCategory === cat.id ? 'bg-blue-600 border-blue-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'}`}>
                {cat.label}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 gap-1 bg-slate-800/30 p-2 rounded-lg border border-slate-700/50 max-h-[220px] overflow-y-auto custom-scrollbar">
            {CONTEXT_CATEGORIES.find(c => c.id === config.contextCategory)?.options.map(opt => (
              <button key={opt.id} onClick={() => updateConfig('contextDetail', opt.value)}
                className={`p-2 rounded-md text-left text-xs transition-all border ${config.contextDetail === opt.value ? 'bg-blue-600 border-blue-500 text-white shadow-md' : 'bg-transparent border-transparent text-slate-300 hover:bg-slate-700/50'}`}>
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* PHONG CÁCH & SÁNG TẠO */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-purple-300 flex items-center gap-2 uppercase tracking-wider">
            <Wand2 size={14} /> Phong cách & Sáng tạo
          </label>
          <div className="flex flex-col gap-1 bg-purple-900/10 p-2 rounded-lg border border-purple-900/30 max-h-[280px] overflow-y-auto custom-scrollbar">
            <div className="px-2 py-1.5 text-[10px] font-bold text-yellow-400 uppercase tracking-wider border-b border-yellow-500/20 mb-1 flex items-center gap-1">
              <Sparkles size={10} /> Hot Trends
            </div>
            {SPECIAL_STYLES.filter(s => ['clean_girl','quiet_luxury','dark_academia','film_candid_35mm','y2k_fashion','vogue_editorial','korean_beauty','moody_editorial','cinematic_still','harajuku_tokyo','supermodel_90s','nature_editorial'].includes(s.id)).map(opt => (
              <button key={opt.id} onClick={() => onChange({ ...config, photographyStyle: opt.value, photographyStyleCategory: 'special' })}
                className={`p-2 rounded-md text-left text-xs transition-all border ${config.photographyStyle === opt.value ? 'bg-yellow-600 border-yellow-500 text-white' : 'bg-transparent border-transparent text-slate-300 hover:bg-slate-700/50'}`}>
                {opt.label}
              </button>
            ))}
            <div className="px-2 py-1.5 text-[10px] font-bold text-orange-400 uppercase tracking-wider border-b border-orange-500/20 mb-1 mt-2 flex items-center gap-1">
              <Wand2 size={10} /> Sáng tạo Đặc biệt
            </div>
            {SPECIAL_STYLES.filter(s => !['clean_girl','quiet_luxury','dark_academia','film_candid_35mm','y2k_fashion','vogue_editorial','korean_beauty','moody_editorial','cinematic_still','harajuku_tokyo','supermodel_90s','nature_editorial'].includes(s.id)).map(opt => (
              <button key={opt.id} onClick={() => onChange({ ...config, photographyStyle: opt.value, photographyStyleCategory: 'special' })}
                className={`p-2 rounded-md text-left text-xs transition-all border ${config.photographyStyle === opt.value ? 'bg-orange-600 border-orange-500 text-white' : 'bg-transparent border-transparent text-slate-300 hover:bg-slate-700/50'}`}>
                {opt.label}
              </button>
            ))}
            <div className="px-2 py-1.5 text-[10px] font-bold text-purple-300 uppercase tracking-wider border-b border-purple-500/20 mb-1 mt-2 flex items-center gap-1">
              <Camera size={10} /> Phong cách Chụp
            </div>
            {STANDARD_STYLES.map(opt => (
              <button key={opt.id} onClick={() => onChange({ ...config, photographyStyle: opt.value, photographyStyleCategory: 'standard' })}
                className={`p-2 rounded-md text-left text-xs transition-all border ${config.photographyStyle === opt.value ? 'bg-purple-600 border-purple-500 text-white' : 'bg-transparent border-transparent text-slate-300 hover:bg-slate-700/50'}`}>
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 6. TẠO DÁNG */}
      <div className="space-y-3 pt-4 border-t border-slate-800">
        <label className="text-sm font-medium text-blue-300 flex items-center gap-2 uppercase tracking-wider">
          <Accessibility size={14} /> Tạo Dáng
        </label>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {POSE_CATEGORIES.map(cat => (
            <button key={cat.id} onClick={() => setActivePoseTab(cat.id)}
              className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${activePoseTab === cat.id ? 'bg-green-600 border-green-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-400'}`}>
              {cat.label}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2 bg-slate-800/30 p-2 rounded-lg border border-slate-700/50 max-h-[160px] overflow-y-auto custom-scrollbar">
          {POSE_CATEGORIES.find(c => c.id === activePoseTab)?.options.map(opt => (
            <button key={opt.id} onClick={() => updateConfig('pose', opt.value)}
              className={`p-2 rounded-md text-left text-xs transition-all border ${config.pose === opt.value ? 'bg-green-600 border-green-500 text-white shadow-md' : 'bg-transparent border-transparent text-slate-300 hover:bg-slate-700/50'}`}>
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* 7. TRANG PHỤC */}
      {config.subjectType !== 'PRODUCT' && (
        <div className="space-y-4 pt-4 border-t border-slate-800">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-purple-300 flex items-center gap-2 uppercase tracking-wider">
              <Shirt size={14} /> Trang phục
            </label>
            <div className="flex bg-slate-800 rounded-lg p-1">
              <button onClick={() => setOutfitGender('MALE')}
                className={`px-3 py-1 rounded-md text-[10px] font-bold transition-all ${outfitGender === 'MALE' ? 'bg-blue-600 text-white' : 'text-slate-500'}`}>NAM</button>
              <button onClick={() => setOutfitGender('FEMALE')}
                className={`px-3 py-1 rounded-md text-[10px] font-bold transition-all ${outfitGender === 'FEMALE' ? 'bg-pink-600 text-white' : 'text-slate-500'}`}>NỮ</button>
            </div>
          </div>
          <div>
            {!config.outfitImage ? (
              <button onClick={() => outfitInputRef.current?.click()}
                className="w-full py-3 border border-dashed border-slate-600 rounded-lg text-slate-400 text-xs flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors">
                <Upload size={14} /> Tải ảnh trang phục mẫu (Tùy chọn)
              </button>
            ) : (
              <div className="relative w-full h-32 rounded-lg overflow-hidden border border-purple-500 group">
                <img src={`data:image/jpeg;base64,${config.outfitImage}`} className="w-full h-full object-cover opacity-70" />
                <button onClick={() => updateConfig('outfitImage', null)} className="absolute top-2 right-2 bg-red-500 p-1.5 rounded-full text-white"><Trash2 size={12} /></button>
              </div>
            )}
            <input type="file" ref={outfitInputRef} onChange={handleOutfitImageUpload} accept="image/*" className="hidden" />
          </div>
          {!config.outfitImage && (
            <div className="space-y-3">
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {currentOutfitCategories.map(cat => (
                  <button key={cat.id} onClick={() => updateConfig('outfitCategory', cat.id)}
                    className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${config.outfitCategory === cat.id ? 'bg-purple-600 border-purple-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'}`}>
                    {cat.label}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-2 bg-slate-800/30 p-2 rounded-lg border border-slate-700/50 max-h-[160px] overflow-y-auto custom-scrollbar">
                {currentOutfitCategories.find(c => c.id === config.outfitCategory)?.options.map(opt => (
                  <button key={opt.id} onClick={() => updateConfig('outfitDetail', opt.value)}
                    className={`p-2 rounded-md text-left text-xs transition-all border ${config.outfitDetail === opt.value ? 'bg-purple-600 border-purple-500 text-white shadow-md' : 'bg-transparent border-transparent text-slate-300 hover:bg-slate-700/50'}`}>
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 8. ÁNH SÁNG & CAMERA */}
      <div className="space-y-4 pt-4 border-t border-slate-800">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-medium text-blue-300 flex items-center gap-1 uppercase tracking-wider">
              <Sun size={13} /> Ánh sáng
            </label>
            <select value={config.lighting} onChange={(e) => updateConfig('lighting', e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2 py-2 text-xs text-white outline-none">
              {LIGHTING_OPTIONS.map(opt => <option key={opt.id} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium text-blue-300 flex items-center gap-1 uppercase tracking-wider">
              <Camera size={13} /> Camera & Ống kính
            </label>
            <select value={config.camera || ''} onChange={(e) => updateConfig('camera', e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2 py-2 text-xs text-white outline-none">
              {CAMERA_OPTIONS.map(opt => <option key={opt.id} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* 9. GHI CHÚ THÊM */}
      <div className="space-y-2 pt-4 border-t border-slate-800">
        <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
          <Palette size={14} /> Ghi chú thêm (tùy chọn)
        </label>
        <textarea value={config.additionalPrompt} onChange={(e) => updateConfig('additionalPrompt', e.target.value)}
          placeholder="VD: Cầm bó hoa hồng đỏ, đeo kính râm đen, trời đang mưa nhẹ, áo ướt..."
          className="w-full h-20 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-blue-500 outline-none resize-none" />
      </div>

      {/* PROMPT PREVIEW */}
      <div className="space-y-3 pt-4 border-t border-slate-800">
        <label className="text-sm font-medium text-yellow-300 flex items-center gap-2 uppercase tracking-wider">
          <Wand2 size={14} /> Xem trước Prompt (để copy)
        </label>
        <div className="relative bg-slate-950 border border-slate-700 rounded-lg p-3">
          <pre className="text-xs text-slate-300 whitespace-pre-wrap font-mono leading-relaxed max-h-[200px] overflow-y-auto pr-8 custom-scrollbar">
            {previewPrompt}
          </pre>
          <button onClick={handleCopy}
            className="absolute top-2 right-2 bg-slate-700 hover:bg-slate-600 transition-colors p-1.5 rounded text-xs text-slate-300 flex items-center gap-1">
            <Copy size={12} />
            {copied ? 'Đã copy!' : 'Copy'}
          </button>
        </div>
        <p className="text-[10px] text-slate-500">
          * Prompt thực tế sẽ tự động đính kèm ảnh khuôn mặt / sản phẩm / logo khi bạn tải lên.
        </p>
      </div>
    </div>
  );
};
