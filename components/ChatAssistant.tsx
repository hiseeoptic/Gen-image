import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Send, Sparkles, Zap, RefreshCw, X, Bot, User, Download, Copy, Check } from 'lucide-react';

export type ChatMode = 'poster' | 'story' | 'infographic' | 'personal' | 'restoration';

interface Message {
  role: 'user' | 'model';
  text: string;
}

interface Props {
  mode: ChatMode;
  onClose?: () => void;
  accentColor?: string;
}

const MODE_CONFIG: Record<ChatMode, {
  label: string;
  icon: string;
  greeting: string;
  placeholder: string;
  generateLabel: string;
  accentBg: string;
  accentBorder: string;
  accentText: string;
  accentButton: string;
  totalSteps: number;
  stepLabels: string[];
  chips: string[][];  // chips[stepIndex] — suggestions shown after step i's AI response
}> = {
  poster: {
    label: 'Tư vấn Poster',
    icon: '🎨',
    greeting: 'Xin chào! Tôi là Creative Director AI, chuyên tạo poster quảng cáo đẳng cấp ✨ Hãy cho tôi biết bạn đang kinh doanh sản phẩm / dịch vụ gì nhé?',
    placeholder: 'Nhập câu trả lời của bạn...',
    generateLabel: 'Tạo Poster Ngay',
    accentBg: 'bg-purple-600',
    accentBorder: 'border-purple-500',
    accentText: 'text-purple-400',
    accentButton: 'bg-purple-600 hover:bg-purple-500',
    totalSteps: 7,
    stepLabels: ['Sản phẩm', 'Nền tảng', 'Phong cách', 'Màu sắc', 'Tiêu đề', 'CTA', 'Bối cảnh'],
    chips: [
      ['Mỹ phẩm / Skincare', 'Đồ ăn / Nhà hàng', 'Thời trang', 'Thực phẩm chức năng', 'Công nghệ / App'],
      ['Instagram Feed (1:1)', 'Instagram Story (9:16)', 'Facebook Ad (16:9)', 'TikTok (9:16)', 'Banner web (3:1)'],
      ['Minimal Luxury', 'Dark Premium', 'Cyberpunk / Neon', 'Apple Minimal', 'Retro Vintage', 'Cinematic'],
      ['Trắng / Kem sang trọng', 'Đen / Vàng gold', 'Hồng pastel', 'Xanh navy', 'Màu thương hiệu riêng'],
      [],
      ['Mua ngay - Giảm 50%', 'Liên hệ ngay', 'Khám phá thêm', 'Không thêm CTA'],
      ['Studio sạch', 'Thiên nhiên', 'Thành phố ban đêm', 'Bếp / Nhà hàng', 'Không gian sang trọng'],
    ],
  },
  story: {
    label: 'Tư vấn Ảnh Kể Chuyện',
    icon: '📖',
    greeting: 'Chào bạn! Tôi sẽ giúp bạn tạo ra một bức ảnh kể chuyện truyền cảm hứng 🌟 Bạn muốn kể câu chuyện về chủ đề gì?',
    placeholder: 'Chia sẻ ý tưởng của bạn...',
    generateLabel: 'Tạo Ảnh Ngay',
    accentBg: 'bg-rose-600',
    accentBorder: 'border-rose-500',
    accentText: 'text-rose-400',
    accentButton: 'bg-rose-600 hover:bg-rose-500',
    totalSteps: 7,
    stepLabels: ['Chủ đề', 'Bố cục', 'Nhân vật', 'Bối cảnh', 'Tiêu đề', 'Phong cách', 'Trang trí'],
    chips: [
      ['Động lực vượt khó', 'Hành trình thành công', 'Lịch sử dân tộc', 'Câu chuyện kiên nhẫn (Rùa & Thỏ)', 'Ngày mới tích cực'],
      ['Hành trình (trái→phải)', 'So sánh đối lập', 'Nhiều cảnh liên tiếp', 'Banner quote lớn'],
      ['Dũng sĩ/anh hùng', 'Vận động viên', 'Người leo núi', 'Doanh nhân', 'Học giả/thư sinh'],
      ['Núi non hùng vĩ', 'Ruộng lúa vàng', 'Bầu trời sử thi', 'Phố cổ đèn lồng', 'Bản đồ Việt Nam'],
      [],
      ['Vàng sang trọng', 'Điện ảnh hùng tráng', 'Màu nước nghệ thuật', '3D cao cấp', 'Phẳng tối giản'],
      ['Đèn lồng bay', 'Hoa sen nở', 'Dải sáng vàng hình chữ S', 'Thân rồng uốn lượn', 'Đốm sáng kỳ diệu'],
    ],
  },
  infographic: {
    label: 'Tư vấn Infographic',
    icon: '📊',
    greeting: 'Xin chào! Tôi sẽ giúp bạn tạo infographic đẹp và chuyên nghiệp 🎯 Bạn muốn làm infographic về loại nào?',
    placeholder: 'Mô tả sản phẩm hoặc món ăn của bạn...',
    generateLabel: 'Tạo Infographic Ngay',
    accentBg: 'bg-amber-600',
    accentBorder: 'border-amber-500',
    accentText: 'text-amber-400',
    accentButton: 'bg-amber-600 hover:bg-amber-500',
    totalSteps: 7,
    stepLabels: ['Loại', 'Tên SP', 'Hình chính', 'Nguyên liệu', 'Các bước', 'Badge', 'Phong cách'],
    chips: [
      ['Công thức món ăn', 'Thành phần mỹ phẩm / Serum', 'Hướng dẫn sử dụng', 'Brochure sản phẩm'],
      [],
      ['Chụp từ trên xuống (overhead)', 'Góc 3/4 nghiêng nhẹ', 'Thẳng phía trước', 'Góc thấp ấn tượng'],
      [],
      [],
      ['Thời gian nấu + Khẩu phần', 'Độ khó', 'Công dụng chính', 'Phù hợp với loại da'],
      ['Pastel ấm Hàn Quốc', 'Trắng hiện đại', 'Tối sang trọng', 'Màu sắc tươi vui', 'Tối giản Hàn'],
    ],
  },
  personal: {
    label: 'Tư vấn Ảnh Chân Dung',
    icon: '📸',
    greeting: 'Xin chào! Tôi là nhiếp ảnh gia AI sẽ giúp bạn tạo ảnh chân dung đẹp 📸 Bạn muốn tạo ảnh cho ai?',
    placeholder: 'Trả lời câu hỏi của AI...',
    generateLabel: 'Tạo Ảnh Ngay',
    accentBg: 'bg-blue-600',
    accentBorder: 'border-blue-500',
    accentText: 'text-blue-400',
    accentButton: 'bg-blue-600 hover:bg-blue-500',
    totalSteps: 6,
    stepLabels: ['Đối tượng', 'Trang phục', 'Bối cảnh', 'Phong cách', 'Góc máy', 'Điểm nhấn'],
    chips: [
      ['Nữ — cá nhân', 'Nam — cá nhân', 'Couple — đôi', 'Nhóm 3-5 người', 'Doanh nhân'],
      ['Công sở / Vest', 'Sang trọng / Đầm dạ hội', 'Casual thường ngày', 'Áo dài truyền thống', 'Thể thao'],
      ['Studio phông trắng', 'Ngoài trời / Công viên', 'Phố cổ Hội An', 'Cà phê', 'Thiên nhiên / Rừng'],
      ['Korean soft (ánh sáng mềm)', 'Cinematic (màu phim)', 'Fashion editorial', 'Studio chuyên nghiệp', 'Lifestyle tự nhiên'],
      ['Ngang tầm mắt', 'Góc thấp ấn tượng', 'Half body', 'Full body'],
      [],
    ],
  },
  restoration: {
    label: 'Tư vấn Phục Chế',
    icon: '🖼️',
    greeting: 'Xin chào! Tôi sẽ tư vấn phục chế ảnh cũ cho bạn 🖼️ Bức ảnh cần phục chế thuộc thời kỳ nào và của ai?',
    placeholder: 'Mô tả tình trạng ảnh...',
    generateLabel: 'Phục Chế Ngay',
    accentBg: 'bg-teal-600',
    accentBorder: 'border-teal-500',
    accentText: 'text-teal-400',
    accentButton: 'bg-teal-600 hover:bg-teal-500',
    totalSteps: 4,
    stepLabels: ['Thời kỳ', 'Tình trạng', 'Kết quả', 'Ưu tiên'],
    chips: [
      ['Ảnh gia đình thập niên 70-80', 'Ảnh đám cưới cũ', 'Ảnh thời kháng chiến', 'Ảnh thời bao cấp'],
      ['Bị mờ, mất chi tiết', 'Bị rách, bị gấp', 'Ố vàng, phai màu', 'Nhiều vết xước'],
      ['Giữ nguyên đen trắng', 'Chuyển sang màu tự nhiên', 'Cải thiện màu gốc'],
      ['Khuôn mặt người thân', 'Toàn bộ ảnh đều quan trọng', 'Khung cảnh / bối cảnh'],
    ],
  },
};

// Render text with **bold** markdown
function renderText(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-semibold text-white">{part.slice(2, -2)}</strong>;
    }
    return <span key={i}>{part}</span>;
  });
}

export function ChatAssistant({ mode, onClose }: Props) {
  const cfg = MODE_CONFIG[mode];
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [generatedPrompt, setGeneratedPrompt] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Current step: 0 = greeting shown, 1 = after first user reply, etc.
  const currentStep = Math.max(0, Math.floor((messages.length - 1) / 2));
  const progressPct = Math.min(100, Math.round((currentStep / cfg.totalSteps) * 100));
  const stepChips = cfg.chips[currentStep] ?? [];

  useEffect(() => {
    setMessages([{ role: 'model', text: cfg.greeting }]);
    setInput('');
    setIsReady(false);
    setResultUrl(null);
    setGeneratedPrompt(null);
    setError(null);
  }, [mode]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isTyping) return;
    setError(null);

    const userMsg: Message = { role: 'user', text: text.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages, mode }),
      });
      if (!res.ok) throw new Error('Lỗi kết nối');
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'model', text: data.reply }]);
      if (data.isReady) setIsReady(true);
    } catch {
      setError('Có lỗi xảy ra, vui lòng thử lại.');
    } finally {
      setIsTyping(false);
    }
  }, [messages, isTyping, mode]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      const extractRes = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages, mode, extractPrompt: true }),
      });
      if (!extractRes.ok) throw new Error('Lỗi tổng hợp prompt');
      const { prompt } = await extractRes.json();
      setGeneratedPrompt(prompt);

      const genRes = await fetch('/api/story', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      if (!genRes.ok) {
        const err = await genRes.json();
        throw new Error(err.error || 'Lỗi tạo ảnh');
      }
      const genData = await genRes.json();
      setResultUrl(`data:image/png;base64,${genData.image}`);
    } catch (err: any) {
      setError(err.message || 'Có lỗi xảy ra');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!resultUrl) return;
    const a = document.createElement('a');
    a.href = resultUrl;
    a.download = `ai-chat-${mode}-${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleCopyPrompt = async () => {
    if (!generatedPrompt) return;
    await navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRegenerate = () => {
    setResultUrl(null);
    setGeneratedPrompt(null);
    handleGenerate();
  };

  const handleReset = () => {
    setMessages([{ role: 'model', text: cfg.greeting }]);
    setInput('');
    setIsReady(false);
    setResultUrl(null);
    setGeneratedPrompt(null);
    setError(null);
    setCopied(false);
  };

  // ── RESULT VIEW ──────────────────────────────────────────────────────────────
  if (resultUrl) {
    return (
      <div className="space-y-5">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">{cfg.icon}</span>
            <div>
              <h3 className="text-white font-bold text-base">Kết quả từ AI Chat!</h3>
              <p className="text-slate-400 text-xs">Tạo từ cuộc hội thoại của bạn</p>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            <button onClick={handleRegenerate} disabled={isGenerating}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 text-slate-300 hover:border-slate-500 text-xs transition-colors disabled:opacity-50">
              <RefreshCw size={12} className={isGenerating ? 'animate-spin' : ''} />
              {isGenerating ? 'Đang tạo...' : 'Tạo lại'}
            </button>
            <button onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-600 hover:bg-green-500 text-white text-xs font-semibold transition-colors">
              <Download size={12} /> Tải xuống
            </button>
          </div>
        </div>

        <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
          <img src={resultUrl} alt="AI generated" className="w-full max-h-[70vh] object-contain bg-slate-900" />
        </div>

        {generatedPrompt && (
          <details className="border border-slate-800 rounded-xl overflow-hidden">
            <summary className="px-4 py-2.5 text-xs text-slate-400 cursor-pointer hover:text-white hover:bg-slate-800/30 transition-colors flex items-center gap-2">
              <span className="font-mono bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded text-[10px]">PROMPT</span>
              Xem prompt đã dùng · Copy sang Midjourney / Nano Banana
            </summary>
            <div className="p-4 border-t border-slate-800/60 space-y-2">
              <textarea readOnly value={generatedPrompt} rows={6}
                className="w-full bg-slate-950 text-slate-300 text-[11px] font-mono rounded-lg px-3 py-2 resize-y border border-slate-800 focus:outline-none" />
              <button onClick={handleCopyPrompt}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  copied ? 'bg-green-600 text-white' : 'border border-slate-700 text-slate-400 hover:border-slate-500 hover:text-white'
                }`}>
                {copied ? <><Check size={12} /> Đã copy!</> : <><Copy size={12} /> Copy Prompt</>}
              </button>
            </div>
          </details>
        )}

        <div className="flex gap-3 justify-center">
          <button onClick={handleReset}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl ${cfg.accentButton} text-white text-sm font-semibold transition-all hover:-translate-y-0.5 shadow-lg`}>
            <Sparkles size={14} /> Tư vấn lại từ đầu
          </button>
          <button onClick={() => { setResultUrl(null); setGeneratedPrompt(null); }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:border-slate-500 text-sm transition-colors">
            Tiếp tục chỉnh sửa
          </button>
        </div>
      </div>
    );
  }

  // ── CHAT VIEW ─────────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col" style={{ height: '580px' }}>
      {/* Header + Progress */}
      <div className="px-4 pt-3 pb-0 shrink-0">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-full ${cfg.accentBg} flex items-center justify-center`}>
              <Bot size={14} className="text-white" />
            </div>
            <div>
              <p className="text-white text-sm font-semibold">{cfg.icon} {cfg.label}</p>
              <p className="text-slate-500 text-[10px]">
                {isReady ? '✅ Sẵn sàng tạo ảnh!' : `Bước ${Math.min(currentStep + 1, cfg.totalSteps)}/${cfg.totalSteps}`}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {messages.length > 2 && (
              <button onClick={handleReset} className="text-slate-500 hover:text-slate-300 transition-colors p-1 rounded" title="Bắt đầu lại">
                <RefreshCw size={13} />
              </button>
            )}
            {onClose && (
              <button onClick={onClose} className="text-slate-500 hover:text-slate-300 transition-colors p-1 rounded">
                <X size={15} />
              </button>
            )}
          </div>
        </div>

        {/* Progress bar */}
        <div className="relative h-1 bg-slate-800 rounded-full mb-3 overflow-hidden">
          <div
            className={`absolute left-0 top-0 h-full rounded-full transition-all duration-500 ${cfg.accentBg}`}
            style={{ width: `${progressPct}%` }}
          />
        </div>

        {/* Step labels */}
        {cfg.totalSteps <= 7 && (
          <div className="flex gap-1 mb-2 overflow-x-auto pb-1 scrollbar-none">
            {cfg.stepLabels.map((label, i) => (
              <span key={i} className={`text-[9px] px-1.5 py-0.5 rounded-full shrink-0 transition-colors ${
                i < currentStep
                  ? `${cfg.accentBg} text-white opacity-70`
                  : i === currentStep
                  ? `${cfg.accentBg} text-white`
                  : 'bg-slate-800 text-slate-600'
              }`}>
                {label}
              </span>
            ))}
          </div>
        )}

        <div className="border-b border-slate-800/60 mb-0" />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 min-h-0">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
            <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
              msg.role === 'model' ? cfg.accentBg : 'bg-slate-700'
            }`}>
              {msg.role === 'model' ? <Bot size={13} className="text-white" /> : <User size={13} className="text-white" />}
            </div>
            <div className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
              msg.role === 'model'
                ? 'bg-slate-800/60 text-slate-200 rounded-tl-sm'
                : `${cfg.accentBg} text-white rounded-tr-sm`
            }`}>
              {renderText(msg.text)}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex gap-2.5">
            <div className={`w-7 h-7 rounded-full ${cfg.accentBg} flex items-center justify-center shrink-0`}>
              <Bot size={13} className="text-white" />
            </div>
            <div className="bg-slate-800/60 rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1.5 items-center">
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}

        {/* Contextual suggestion chips — shown after each AI response */}
        {!isTyping && stepChips.length > 0 && messages.length > 0 && messages[messages.length - 1].role === 'model' && (
          <div className="pl-9">
            <p className="text-slate-600 text-[10px] mb-1.5">Gợi ý:</p>
            <div className="flex flex-wrap gap-1.5">
              {stepChips.map(s => (
                <button key={s} onClick={() => sendMessage(s)}
                  className={`px-2.5 py-1 rounded-full border border-slate-700 bg-slate-800/50 text-slate-400 text-xs hover:text-white transition-all ${
                    cfg.accentBorder.replace('border-', 'hover:border-')
                  }`}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Error */}
      {error && (
        <div className="mx-4 mb-2 px-3 py-2 bg-red-500/10 border border-red-500/30 rounded-lg text-red-300 text-xs shrink-0">
          ⚠️ {error}
        </div>
      )}

      {/* Generate button — appears when AI signals ready */}
      {isReady && !isGenerating && (
        <div className="px-4 pb-3 shrink-0">
          <button onClick={handleGenerate}
            className={`w-full py-3 rounded-xl ${cfg.accentButton} text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all hover:-translate-y-0.5`}>
            <Zap size={16} /> ✨ {cfg.generateLabel}
          </button>
        </div>
      )}

      {/* Input area */}
      <div className="px-4 pb-4 shrink-0 border-t border-slate-800/60 pt-3">
        {/* Fallback generate button after 5+ messages */}
        {!isReady && messages.length >= 5 && (
          <div className="mb-2">
            <button onClick={handleGenerate} disabled={isGenerating}
              className={`w-full py-2 rounded-xl border ${cfg.accentBorder} ${cfg.accentText} text-sm font-semibold flex items-center justify-center gap-2 hover:bg-slate-800/50 transition-all disabled:opacity-50`}>
              {isGenerating
                ? <><RefreshCw size={14} className="animate-spin" /> Đang tạo...</>
                : <><Zap size={14} /> {cfg.generateLabel}</>}
            </button>
          </div>
        )}

        <div className="flex gap-2 items-end">
          <textarea
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={cfg.placeholder}
            rows={1}
            disabled={isTyping}
            className="flex-1 bg-slate-800/60 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-slate-500 resize-none transition-colors disabled:opacity-50"
            style={{ maxHeight: 96, overflowY: 'auto' }}
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || isTyping}
            className={`w-9 h-9 rounded-xl ${cfg.accentBg} text-white flex items-center justify-center transition-all hover:opacity-90 disabled:opacity-40 shrink-0`}>
            <Send size={15} />
          </button>
        </div>
        <p className="text-slate-700 text-[10px] mt-1.5 text-center">Enter để gửi · Shift+Enter xuống dòng</p>
      </div>
    </div>
  );
}
