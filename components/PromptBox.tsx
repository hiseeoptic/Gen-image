import React, { useState } from 'react';
import { ChevronDown, Copy, Check } from 'lucide-react';

interface Props {
  prompt: string | null;
  label?: string;
}

export function PromptBox({ prompt, label = 'Xem Prompt · Copy sang Nano Banana / Midjourney' }: Props) {
  const [show, setShow] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!prompt) return null;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="border border-slate-700/50 rounded-xl overflow-hidden bg-slate-900/30">
      <button
        onClick={() => setShow(!show)}
        className="w-full px-4 py-3 flex items-center justify-between text-sm text-slate-400 hover:text-white hover:bg-slate-800/30 transition-colors"
      >
        <span className="flex items-center gap-2">
          <span className="text-[10px] font-mono font-bold bg-slate-800 text-slate-400 px-2 py-0.5 rounded border border-slate-700/60">PROMPT</span>
          <span className="text-xs">{label}</span>
        </span>
        <ChevronDown size={15} className={`shrink-0 transition-transform ${show ? 'rotate-180' : ''}`} />
      </button>

      {show && (
        <div className="border-t border-slate-800/60 p-4">
          <div className="relative">
            <textarea
              readOnly
              value={prompt}
              rows={9}
              className="w-full bg-slate-950 text-slate-300 text-[11px] leading-relaxed rounded-lg px-3 py-3 resize-y font-mono border border-slate-800/60 focus:outline-none"
            />
            <button
              onClick={handleCopy}
              className={`absolute top-2 right-2 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                copied ? 'bg-green-600 text-white' : 'bg-slate-700 hover:bg-slate-600 text-white'
              }`}
            >
              {copied ? <Check size={11} /> : <Copy size={11} />}
              {copied ? 'Đã copy!' : 'Copy'}
            </button>
          </div>
          <p className="text-[10px] text-slate-600 mt-2">
            Paste prompt này vào Nano Banana, Midjourney, DALL-E, Ideogram hoặc bất kỳ AI image tool nào
          </p>
        </div>
      )}
    </div>
  );
}
