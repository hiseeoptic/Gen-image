import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Send, Sparkles, Zap, RefreshCw, X, Bot, User, Download } from 'lucide-react';

export type ChatMode = 'poster' | 'story' | 'infographic' | 'personal' | 'restoration';

interface Message {
  role: 'user' | 'model';
  text: string;
}

interface Props {
  mode: ChatMode;
  onClose?: () => void;
  accentColor?: string; // tailwind color name e.g. 'purple', 'rose', 'amber'
}

const MODE_CONFIG: Record<ChatMode, {
  label: string;
  icon: string;
  greeting: string;
  placeholder: string;
  generateLabel: string;
  accentClass: string;
  accentBg: string;
  accentBorder: string;
  accentText: string;
  accentButton: string;
}> = {
  poster: {
    label: 'Tư vấn Poster',
    icon: '🎨',
    greeting: 'Xin chào! Tôi là AI designer chuyên tạo poster quảng cáo. Hãy cho tôi biết bạn đang kinh doanh sản phẩm / dịch vụ gì nhé? 😊',
    placeholder: 'Nhập câu trả lời của bạn...',
    generateLabel: 'Tạo Poster Ngay',
    accentClass: 'purple',
    accentBg: 'bg-purple-600',
    accentBorder: 'border-purple-500',
    accentText: 'text-purple-400',
    accentButton: 'bg-purple-600 hover:bg-purple-500',
  },
  story: {
    label: 'Tư vấn Ảnh Kể Chuyện',
    icon: '📖',
    greeting: 'Chào bạn! Tôi sẽ giúp bạn tạo ra một bức ảnh kể chuyện đầy cảm hứng ✨ Bạn muốn kể câu chuyện về điều gì? (Ví dụ: động lực vượt khó, hành trình thành công, lịch sử, ngày mới...)',
    placeholder: 'Chia sẻ ý tưởng của bạn...',
    generateLabel: 'Tạo Ảnh Ngay',
    accentClass: 'rose',
    accentBg: 'bg-rose-600',
    accentBorder: 'border-rose-500',
    accentText: 'text-rose-400',
    accentButton: 'bg-rose-600 hover:bg-rose-500',
  },
  infographic: {
    label: 'Tư vấn Infographic',
    icon: '📊',
    greeting: 'Xin chào! Tôi sẽ giúp bạn tạo infographic đẹp và chuyên nghiệp 🎯 Bạn muốn làm infographic về gì? (Công thức món ăn, thành phần sản phẩm, hướng dẫn sử dụng hay brochure sản phẩm?)',
    placeholder: 'Mô tả sản phẩm hoặc món ăn của bạn...',
    generateLabel: 'Tạo Infographic Ngay',
    accentClass: 'amber',
    accentBg: 'bg-amber-600',
    accentBorder: 'border-amber-500',
    accentText: 'text-amber-400',
    accentButton: 'bg-amber-600 hover:bg-amber-500',
  },
  personal: {
    label: 'Tư vấn Ảnh Chân Dung',
    icon: '📸',
    greeting: 'Xin chào! Tôi là nhiếp ảnh gia AI sẽ giúp bạn tạo ảnh chân dung đẹp 📸 Trước tiên, bạn muốn tạo ảnh cho ai? (Nam, nữ, nhóm người?)',
    placeholder: 'Trả lời câu hỏi của AI...',
    generateLabel: 'Tạo Ảnh Ngay',
    accentClass: 'blue',
    accentBg: 'bg-blue-600',
    accentBorder: 'border-blue-500',
    accentText: 'text-blue-400',
    accentButton: 'bg-blue-600 hover:bg-blue-500',
  },
  restoration: {
    label: 'Tư vấn Phục Chế',
    icon: '🖼',
    greeting: 'Xin chào! Tôi sẽ tư vấn phục chế ảnh cũ cho bạn 🖼 Bức ảnh bạn cần phục chế đang ở tình trạng như thế nào? (Ảnh đen trắng, bị mờ, bị rách, hay ố vàng?)',
    placeholder: 'Mô tả tình trạng ảnh...',
    generateLabel: 'Phục Chế Ngay',
    accentClass: 'teal',
    accentBg: 'bg-teal-600',
    accentBorder: 'border-teal-500',
    accentText: 'text-teal-400',
    accentButton: 'bg-teal-600 hover:bg-teal-500',
  },
};

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
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Show initial greeting
  useEffect(() => {
    setMessages([{ role: 'model', text: cfg.greeting }]);
  }, [mode]);

  // Auto-scroll to bottom
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
      // Step 1: extract prompt from conversation
      const extractRes = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages, mode, extractPrompt: true }),
      });
      if (!extractRes.ok) throw new Error('Lỗi tổng hợp prompt');
      const { prompt } = await extractRes.json();
      setGeneratedPrompt(prompt);

      // Step 2: generate image using the extracted prompt
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
  };

  // ── RESULT VIEW ──────────────────────────────────────────────────────────
  if (resultUrl) {
    return (
      <div className="space-y-5">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">{cfg.icon}</span>
            <div>
              <h3 className="text-white font-bold text-base">Kết quả từ AI Chat!</h3>
              <p className="text-slate-400 text-xs">Tạo bởi cuộc hội thoại của bạn</p>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            <button onClick={handleRegenerate} disabled={isGenerating}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 text-slate-300 hover:border-slate-500 text-xs transition-colors disabled:opacity-50">
              <RefreshCw size={12} /> {isGenerating ? 'Đang tạo...' : 'Tạo lại'}
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

        {/* Show generated prompt */}
        {generatedPrompt && (
          <details className="border border-slate-800 rounded-xl overflow-hidden">
            <summary className="px-4 py-2.5 text-xs text-slate-400 cursor-pointer hover:text-white hover:bg-slate-800/30 transition-colors flex items-center gap-2">
              <span className="font-mono bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded text-[10px]">PROMPT</span>
              Xem prompt đã dùng · Copy sang Midjourney / Nano Banana
            </summary>
            <div className="p-4 border-t border-slate-800/60">
              <textarea readOnly value={generatedPrompt} rows={6}
                className="w-full bg-slate-950 text-slate-300 text-[11px] font-mono rounded-lg px-3 py-2 resize-y border border-slate-800 focus:outline-none" />
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

  // ── CHAT VIEW ─────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col" style={{ height: '560px' }}>
      {/* Header */}
      <div className={`flex items-center justify-between px-4 py-3 border-b border-slate-800/60 shrink-0`}>
        <div className="flex items-center gap-2">
          <div className={`w-7 h-7 rounded-full ${cfg.accentBg} flex items-center justify-center`}>
            <Bot size={14} className="text-white" />
          </div>
          <div>
            <p className="text-white text-sm font-semibold">{cfg.icon} {cfg.label}</p>
            <p className="text-slate-500 text-[10px]">AI đang sẵn sàng tư vấn</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {messages.length > 2 && (
            <button onClick={handleReset} className="text-slate-500 hover:text-slate-300 transition-colors p-1 rounded">
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

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 min-h-0">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
            {/* Avatar */}
            <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
              msg.role === 'model' ? `${cfg.accentBg}` : 'bg-slate-700'
            }`}>
              {msg.role === 'model' ? <Bot size={13} className="text-white" /> : <User size={13} className="text-white" />}
            </div>

            {/* Bubble */}
            <div className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
              msg.role === 'model'
                ? 'bg-slate-800/60 text-slate-200 rounded-tl-sm'
                : `${cfg.accentBg} text-white rounded-tr-sm`
            }`}>
              {msg.text}
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

        {/* Quick suggest chips (after first AI greeting, before user replies) */}
        {messages.length === 1 && !isTyping && (
          <div className="pl-9">
            <p className="text-slate-600 text-[10px] mb-1.5">Gợi ý nhanh:</p>
            <div className="flex flex-wrap gap-1.5">
              {mode === 'poster' && ['Mỹ phẩm / Skincare', 'Đồ ăn / Nhà hàng', 'Thời trang', 'Thực phẩm chức năng', 'Công nghệ'].map(s => (
                <button key={s} onClick={() => sendMessage(s)}
                  className="px-2.5 py-1 rounded-full border border-slate-700 bg-slate-800/50 text-slate-400 text-xs hover:border-purple-500/60 hover:text-white transition-all">
                  {s}
                </button>
              ))}
              {mode === 'story' && ['Động lực vượt khó', 'Hành trình thành công', 'Câu chuyện lịch sử', 'Banner ngày mới', 'Rùa & Thỏ'].map(s => (
                <button key={s} onClick={() => sendMessage(s)}
                  className="px-2.5 py-1 rounded-full border border-slate-700 bg-slate-800/50 text-slate-400 text-xs hover:border-rose-500/60 hover:text-white transition-all">
                  {s}
                </button>
              ))}
              {mode === 'infographic' && ['Công thức món ăn', 'Serum / Mỹ phẩm', 'Thực phẩm chức năng', 'Hướng dẫn dùng sản phẩm'].map(s => (
                <button key={s} onClick={() => sendMessage(s)}
                  className="px-2.5 py-1 rounded-full border border-slate-700 bg-slate-800/50 text-slate-400 text-xs hover:border-amber-500/60 hover:text-white transition-all">
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

      {/* Input */}
      <div className="px-4 pb-4 shrink-0 border-t border-slate-800/60 pt-3">
        {/* Generate button also available after 3+ messages even if not flagged ready */}
        {!isReady && messages.length >= 5 && (
          <div className="mb-2">
            <button onClick={handleGenerate} disabled={isGenerating}
              className={`w-full py-2 rounded-xl border ${cfg.accentBorder} ${cfg.accentText} text-sm font-semibold flex items-center justify-center gap-2 hover:bg-slate-800/50 transition-all disabled:opacity-50`}>
              {isGenerating ? <><RefreshCw size={14} className="animate-spin" /> Đang tạo...</> : <><Zap size={14} /> {cfg.generateLabel}</>}
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
            className={`w-9 h-9 rounded-xl ${cfg.accentBg} text-white flex items-center justify-center transition-all hover:opacity-90 disabled:opacity-40 shrink-0`}
          >
            <Send size={15} />
          </button>
        </div>
        <p className="text-slate-700 text-[10px] mt-1.5 text-center">Enter để gửi · Shift+Enter xuống dòng</p>
      </div>
    </div>
  );
}
