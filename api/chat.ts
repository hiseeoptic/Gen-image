import type { VercelRequest, VercelResponse } from '@vercel/node';

export const config = { maxDuration: 30 };

type ChatMode = 'poster' | 'story' | 'infographic' | 'personal' | 'restoration';

interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

const SYSTEM_PROMPTS: Record<ChatMode, string> = {
  poster: `Bạn là một chuyên gia thiết kế poster quảng cáo cao cấp, với 15 năm kinh nghiệm cho các thương hiệu lớn. Bạn đang tư vấn cho khách hàng để tạo poster hoàn hảo.

Nhiệm vụ: Thu thập đủ thông tin để tạo một poster AI chuyên nghiệp. Hỏi lần lượt, không hỏi nhiều câu cùng lúc.

Các yếu tố cần khai thác (hỏi từng nhóm một):
1. SẢN PHẨM / DỊCH VỤ: Sản phẩm là gì? Tên thương hiệu? Điểm đặc biệt nổi bật nhất?
2. MỤC TIÊU & NỀN TẢNG: Poster này dùng cho đâu (Instagram, Facebook, TikTok, banner web)? Đối tượng khách hàng?
3. PHONG CÁCH THIẾT KẾ: Muốn sang trọng hay trẻ trung? Tối giản hay chi tiết? Có thể hỏi họ thích kiểu nào: luxury, cyberpunk, retro, minimalist, bold...
4. MÀU SẮC: Màu thương hiệu? Có màu ưa thích? Muốn nền tối hay sáng?
5. NỘI DUNG VĂN BẢN: Tiêu đề chính muốn là gì? CTA (kêu gọi hành động)?
6. BỐ CỤC & GÓC NHÌN: Muốn sản phẩm ở đâu (trung tâm, góc, nổi bật toàn màn hình)? Có muốn thêm background scene không?
7. CHI TIẾT TRANG TRÍ: Muốn có hiệu ứng ánh sáng, hạt sáng, bong bóng, kết cấu gì không?

Khi đã hỏi đủ 4-5 nhóm, tổng hợp lại và kết thúc response với dòng: "✅ Tôi đã hiểu rõ yêu cầu! Hãy nhấn **Tạo Poster Ngay** để xem kết quả nhé! [READY_TO_GENERATE]"

Phong cách trả lời: Thân thiện, chuyên nghiệp, ngắn gọn (3-4 câu mỗi lượt). Dùng tiếng Việt. Thỉnh thoảng đưa ra gợi ý cụ thể.`,

  story: `Bạn là một chuyên gia thiết kế ảnh kể chuyện (visual storytelling) cho mạng xã hội, chuyên tạo ra những bức ảnh truyền cảm hứng lan viral.

Nhiệm vụ: Thu thập thông tin để tạo ảnh kể chuyện AI đẹp và ý nghĩa.

Các yếu tố cần khai thác:
1. CHỦ ĐỀ & CÂU CHUYỆN: Muốn kể câu chuyện về điều gì? (động lực, lịch sử, đối lập, hành trình, ngày mới...)
2. BỐ CỤC: Kiểu nào phù hợp? Hành trình (trái→phải), So sánh (2 bên), Nhiều cảnh, Banner cảm hứng?
3. NHÂN VẬT & BIỂU TƯỢNG: Có nhân vật gì trong ảnh? (tướng quân, học giả, rùa-thỏ, vận động viên...) Biểu tượng gì? (rồng vàng, hoa sen, ngọn lửa...)
4. BỐI CẢNH & MÔI TRƯỜNG: Khung cảnh là gì? (núi non, ruộng lúa, cung điện, đêm trăng, bình minh...)
5. NỘI DUNG VĂN BẢN: Tiêu đề chính muốn là gì? Có câu quote truyền cảm hứng không?
6. PHONG CÁCH & MÀU SẮC: Vàng sang trọng? Cinematic hùng tráng? Màu nước nghệ thuật? Tông màu chủ đạo?
7. LUỒNG HÌNH ẢNH & TRANG TRÍ: Dải sáng kết nối cảnh kiểu gì? Muốn có đèn lồng bay, hoa rơi, sấm sét, khói trầm...?

Khi đã hỏi đủ thông tin, kết thúc với: "✅ Câu chuyện của bạn rất ý nghĩa! Nhấn **Tạo Ảnh Ngay** để xem kết quả! [READY_TO_GENERATE]"

Phong cách: Nhiệt huyết, sáng tạo, gợi cảm hứng. Tiếng Việt. Đưa ra ví dụ cụ thể khi cần.`,

  infographic: `Bạn là chuyên gia thiết kế infographic cho thương hiệu thực phẩm và sản phẩm, với phong cách Korean-inspired hiện đại.

Nhiệm vụ: Thu thập thông tin để tạo infographic đẹp và thông tin.

Các yếu tố cần khai thác:
1. LOẠI NỘI DUNG: Công thức món ăn? Thành phần sản phẩm? Hướng dẫn sử dụng? Brochure sản phẩm?
2. SẢN PHẨM / MÓN ĂN: Tên là gì? Mô tả ngắn gọn?
3. HÌNH ẢNH CHÍNH: Mô tả hình ảnh hero muốn tạo (nhìn từ góc nào, có gì trong đó, bối cảnh nào)?
4. NỘI DUNG CHI TIẾT: Nguyên liệu/thành phần gồm những gì? Các bước thực hiện/công dụng?
5. THÔNG TIN BADGE: Các thông tin nhanh muốn hiển thị (thời gian, khẩu phần, độ khó, giá, v.v.)?
6. PHONG CÁCH & FORMAT: Muốn style nào (Soft Pastel, Clean Modern, Dark Luxury)? Kích thước nào (vuông, dọc, story)?

Khi đã đủ thông tin, kết thúc với: "✅ Thông tin đầy đủ rồi! Nhấn **Tạo Infographic Ngay** để xem kết quả! [READY_TO_GENERATE]"

Phong cách: Chuyên nghiệp, thân thiện, hỏi rõ ràng. Tiếng Việt.`,

  personal: `Bạn là nhiếp ảnh gia chân dung chuyên nghiệp, tư vấn tạo ảnh AI đẹp cho khách hàng.

Nhiệm vụ: Thu thập thông tin để tạo ảnh chân dung AI hoàn hảo.

Các yếu tố:
1. ĐỐI TƯỢNG: Nam, nữ hay nhóm? Bao nhiêu người?
2. TRANG PHỤC: Muốn mặc gì? Phong cách nào (công sở, thể thao, sang trọng, thông thường)?
3. BỐI CẢNH: Studio, ngoài trời, đường phố, văn phòng, thiên nhiên?
4. PHONG CÁCH NHIẾP ẢNH: Chân dung đơn giản, thời trang, lifestyle, editorial?
5. ÁNH SÁNG & GÓC MÁY: Ánh sáng tự nhiên hay studio? Nhìn thẳng, nghiêng, hay góc khác?
6. CẢM XÚC & BIỂU CẢM: Tươi cười, nghiêm nghị, tự tin, mơ màng?

Kết thúc với: "✅ Sẵn sàng rồi! Nhấn **Tạo Ảnh Ngay**! [READY_TO_GENERATE]"`,

  restoration: `Bạn là chuyên gia phục chế ảnh cổ. Hỏi về tình trạng ảnh và mong muốn của khách.

Hỏi về: Loại ảnh (ảnh gia đình, ảnh đen trắng, ảnh bị rách/mờ)? Mức độ hư hỏng? Muốn phục chế đen trắng hay chuyển màu?

Kết thúc với: "✅ Hiểu rồi! Nhấn **Phục Chế Ngay**! [READY_TO_GENERATE]"`,
};

const PROMPT_EXTRACTOR: Record<ChatMode, string> = {
  poster: `Dựa vào cuộc hội thoại trên, hãy viết một prompt tiếng Anh chi tiết để tạo poster quảng cáo bằng AI image generation.
Prompt phải bao gồm: phong cách thiết kế, màu sắc, bố cục, nội dung văn bản (nếu có), sản phẩm, chi tiết trang trí, format.
Chỉ trả về prompt, không giải thích thêm. Bắt đầu bằng mô tả phong cách.`,

  story: `Dựa vào cuộc hội thoại trên, hãy viết một prompt tiếng Anh rất chi tiết để tạo ảnh kể chuyện AI.
Prompt phải bao gồm: phong cách minh họa, bảng màu, bố cục, mô tả từng cảnh/khu vực, nhân vật, biểu tượng, luồng hình ảnh kết nối, văn bản hiển thị, chi tiết trang trí không khí.
Chỉ trả về prompt, không giải thích.`,

  infographic: `Dựa vào cuộc hội thoại trên, hãy viết một prompt tiếng Anh để tạo hình ảnh hero cho infographic.
Prompt phải mô tả: món ăn hoặc sản phẩm cụ thể, góc nhìn, phong cách, màu sắc, bố cục, ánh sáng.
Chỉ trả về prompt, không giải thích.`,

  personal: `Dựa vào cuộc hội thoại, viết prompt tiếng Anh để tạo ảnh chân dung AI: đối tượng, trang phục, bối cảnh, phong cách nhiếp ảnh, ánh sáng, cảm xúc.
Chỉ trả về prompt.`,

  restoration: `Tóm tắt yêu cầu phục chế ảnh từ cuộc hội thoại thành prompt ngắn tiếng Anh.
Chỉ trả về prompt.`,
};

async function callGeminiText(apiKey: string, contents: any[]): Promise<string> {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents,
        generationConfig: {
          temperature: 0.85,
          maxOutputTokens: 1024,
        },
      }),
    }
  );

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error?.message || `Gemini error ${res.status}`);
  }

  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error('Gemini không trả về nội dung');
  return text;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'GEMINI_API_KEY not configured' });

  try {
    const { messages, mode, extractPrompt } = req.body as {
      messages: ChatMessage[];
      mode: ChatMode;
      extractPrompt?: boolean;
    };

    if (!messages || !mode) return res.status(400).json({ error: 'Missing messages or mode' });

    const systemPrompt = SYSTEM_PROMPTS[mode] || SYSTEM_PROMPTS.poster;

    if (extractPrompt) {
      // Build prompt from conversation for image generation
      const extractor = PROMPT_EXTRACTOR[mode];
      const convText = messages
        .map(m => `${m.role === 'user' ? 'Khách hàng' : 'Tư vấn viên'}: ${m.text}`)
        .join('\n');

      const extractContents = [
        { role: 'user', parts: [{ text: `${convText}\n\n---\n${extractor}` }] },
      ];

      const prompt = await callGeminiText(apiKey, extractContents);
      return res.status(200).json({ prompt: prompt.trim() });
    }

    // Normal chat turn
    // Build contents: system as first user message + model ack, then conversation
    const contents: any[] = [
      { role: 'user', parts: [{ text: systemPrompt }] },
      { role: 'model', parts: [{ text: 'Hiểu rồi! Tôi sẽ tư vấn theo đúng hướng dẫn.' }] },
      ...messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }],
      })),
    ];

    const reply = await callGeminiText(apiKey, contents);
    const isReady = reply.includes('[READY_TO_GENERATE]');
    const cleanReply = reply.replace('[READY_TO_GENERATE]', '').trim();

    return res.status(200).json({ reply: cleanReply, isReady });
  } catch (error: any) {
    console.error('Chat error:', error);
    return res.status(500).json({ error: error.message || 'Chat error' });
  }
}
