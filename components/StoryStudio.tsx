import React, { useState } from 'react';
import { Download, RefreshCw, Sparkles, Zap, ChevronDown, ChevronUp, Check, Plus, X } from 'lucide-react';
import { StoryConfig, StoryLayout, StoryStyle, StoryColorScheme } from '../types';
import {
  LAYOUT_TEMPLATES, STYLE_TEMPLATES, COLOR_SCHEMES,
  CHARACTER_OPTIONS, SYMBOL_OPTIONS, MILESTONE_OPTIONS,
  generateStoryVisual,
} from '../services/storyService';
import { Button } from './Button';

const DEFAULT_CONFIG: StoryConfig = {
  layout: 'journey',
  style: 'gold_luxury',
  colorScheme: 'gold_white',
  headline: '',
  subheadline: '',
  quote: '',
  bodyText: '',
  journeyStart: '',
  journeyEnd: '',
  journeyMilestones: [],
  leftLabel: 'KHÔNG SỢ CHẬM',
  leftDescription: '',
  rightLabel: 'CHỈ SỢ DỪNG LẠI',
  rightDescription: '',
  sceneDescriptions: ['', '', ''],
  characters: [],
  symbols: [],
  additionalNotes: '',
};

function SectionHeader({ step, label, sublabel }: { step: number | string; label: string; sublabel?: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="bg-rose-600 text-white text-xs font-bold w-7 h-7 rounded-full flex items-center justify-center shrink-0">
        {step}
      </span>
      <div>
        <h3 className="font-semibold text-white text-sm leading-tight">{label}</h3>
        {sublabel && <p className="text-slate-500 text-xs">{sublabel}</p>}
      </div>
    </div>
  );
}

export function StoryStudio() {
  const [config, setConfig] = useState<StoryConfig>(DEFAULT_CONFIG);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    style: false,
    advanced: false,
  });

  const update = <K extends keyof StoryConfig>(key: K, value: StoryConfig[K]) => {
    setConfig(prev => ({ ...prev, [key]: value }));
    setResultUrl(null);
  };

  const toggleExpand = (key: string) =>
    setExpandedSections(prev => ({ ...prev, [key]: !prev[key] }));

  const toggleArrayItem = (key: 'characters' | 'symbols' | 'journeyMilestones', id: string) => {
    const arr = config[key] as string[];
    update(key, arr.includes(id) ? arr.filter(x => x !== id) : [...arr, id]);
  };

  const updateScene = (index: number, value: string) => {
    const scenes = [...config.sceneDescriptions];
    scenes[index] = value;
    update('sceneDescriptions', scenes);
  };

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const url = await generateStoryVisual(config);
      setResultUrl(url);
    } catch (err: any) {
      setError(err.message || 'Đã có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (!resultUrl) return;
    const a = document.createElement('a');
    a.href = resultUrl;
    a.download = `story-${config.layout}-${Date.now()}.png`;
    a.click();
  };

  const currentLayout = LAYOUT_TEMPLATES[config.layout];
  const currentStyle = STYLE_TEMPLATES[config.style];
  const currentColor = COLOR_SCHEMES[config.colorScheme];

  // ─── RESULT VIEW ──────────────────────────────────────────────────────────
  if (resultUrl) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h3 className="text-xl font-bold text-white">{currentLayout.icon} Ảnh đã tạo xong!</h3>
            <p className="text-slate-400 text-sm mt-1">{currentLayout.label} · {currentStyle.label} · {currentColor.label}</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setResultUrl(null)} className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white transition-colors text-sm">
              <RefreshCw size={14} /> Tạo lại
            </button>
            <button onClick={handleDownload} className="flex items-center gap-2 px-5 py-2 rounded-lg bg-green-600 hover:bg-green-500 text-white text-sm font-semibold shadow-lg transition-colors">
              <Download size={14} /> Tải xuống
            </button>
          </div>
        </div>
        <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/50 shadow-2xl">
          <img src={resultUrl} alt="Story visual" className="w-full max-h-[80vh] object-contain" />
        </div>
        <div className="flex gap-4 justify-center pt-2">
          <button onClick={handleGenerate} disabled={isLoading} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold transition-all disabled:opacity-50 shadow-lg hover:-translate-y-0.5">
            <Zap size={16} /> Tạo biến thể mới
          </button>
          <button onClick={() => { setResultUrl(null); setConfig(DEFAULT_CONFIG); }} className="flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white transition-colors font-semibold">
            Tạo ảnh mới
          </button>
        </div>
      </div>
    );
  }

  // ─── MAIN FORM ────────────────────────────────────────────────────────────
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold px-3 py-1 rounded-full mb-2">
          <Sparkles size={12} /> Visual Story Creator
        </div>
        <h2 className="text-3xl font-bold text-white">Tạo Ảnh Kể Chuyện AI</h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Chọn bố cục → thêm nội dung → chọn nhân vật & biểu tượng → AI tạo ra ảnh chuyên nghiệp. Không cần thiết kế, không cần Photoshop.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* ── Left Column: Steps ── */}
        <div className="lg:col-span-8 space-y-5">

          {/* STEP 1: Layout */}
          <div className="bg-slate-900/40 border border-slate-800/60 rounded-2xl p-6">
            <SectionHeader step="1" label="Chọn bố cục / Kiểu ảnh" sublabel="Mỗi bố cục kể chuyện theo cách khác nhau" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {(Object.entries(LAYOUT_TEMPLATES) as [StoryLayout, typeof LAYOUT_TEMPLATES[StoryLayout]][]).map(([id, tmpl]) => (
                <button
                  key={id}
                  onClick={() => update('layout', id)}
                  className={`relative text-left p-4 rounded-xl border-2 transition-all hover:scale-[1.02] group ${
                    config.layout === id
                      ? 'border-rose-500 bg-rose-500/10 shadow-lg shadow-rose-900/40'
                      : 'border-slate-700/60 bg-slate-800/30 hover:border-slate-500'
                  }`}
                >
                  <div className="text-2xl mb-2">{tmpl.icon}</div>
                  <p className="font-bold text-white text-sm">{tmpl.label}</p>
                  <p className="text-slate-400 text-xs mt-1 leading-snug">{tmpl.description}</p>
                  <p className="text-slate-600 text-[10px] mt-2 italic">{tmpl.hint}</p>
                  {config.layout === id && (
                    <div className="absolute top-2 right-2 w-5 h-5 bg-rose-500 rounded-full flex items-center justify-center">
                      <Check size={10} className="text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* STEP 2: Text Content */}
          <div className="bg-slate-900/40 border border-slate-800/60 rounded-2xl p-6">
            <SectionHeader step="2" label="Nội dung văn bản" sublabel="Các đoạn text sẽ được hiển thị trong ảnh (bằng tiếng Việt)" />
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Tiêu đề chính (lớn, nổi bật nhất)</label>
                <input
                  type="text"
                  value={config.headline}
                  onChange={e => update('headline', e.target.value)}
                  placeholder="VD: CHÚC BẠN KHÔNG SỢ CHẬM, CHỈ SỢ DỪNG LẠI"
                  className="mt-1.5 w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-rose-500 transition-colors"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Tiêu đề phụ</label>
                  <input
                    type="text"
                    value={config.subheadline}
                    onChange={e => update('subheadline', e.target.value)}
                    placeholder="VD: Hành trình ngàn dặm bắt đầu từ một bước"
                    className="mt-1.5 w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-rose-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Chú thích / Footer text</label>
                  <input
                    type="text"
                    value={config.bodyText}
                    onChange={e => update('bodyText', e.target.value)}
                    placeholder="VD: Thứ Hai, 02.02.2025 – Năng lượng tích cực"
                    className="mt-1.5 w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-rose-500 transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Câu trích dẫn / Quote (trong khung đẹp)</label>
                <textarea
                  value={config.quote}
                  onChange={e => update('quote', e.target.value)}
                  placeholder={`VD: "Hãy cứ là người leo núi chậm chạp, còn hơn là người bỏ cuộc đứng dưới chân đồi."`}
                  rows={2}
                  className="mt-1.5 w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-rose-500 transition-colors resize-none"
                />
              </div>
            </div>
          </div>

          {/* STEP 3: Layout-specific Config */}
          <div className="bg-slate-900/40 border border-slate-800/60 rounded-2xl p-6">
            <SectionHeader
              step="3"
              label={`Cấu hình bố cục: ${currentLayout.label}`}
              sublabel="Mô tả chi tiết từng phần của ảnh"
            />

            {/* Journey */}
            {config.layout === 'journey' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Điểm xuất phát (bên trái)</label>
                    <textarea
                      value={config.journeyStart}
                      onChange={e => update('journeyStart', e.target.value)}
                      placeholder="VD: Một người trẻ đứng trước con đường dài, tay cầm đuốc, đầy quyết tâm nhưng còn bỡ ngỡ"
                      rows={2}
                      className="mt-1.5 w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-rose-500 resize-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Đích đến (bên phải)</label>
                    <textarea
                      value={config.journeyEnd}
                      onChange={e => update('journeyEnd', e.target.value)}
                      placeholder="VD: Người đó đứng trên đỉnh núi cao, cờ vàng phấp phới, ánh bình minh rực rỡ phía sau"
                      rows={2}
                      className="mt-1.5 w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-rose-500 resize-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block">
                    Các cột mốc trên hành trình <span className="text-slate-600 font-normal normal-case">(chọn 2-4 cái)</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {MILESTONE_OPTIONS.map(m => (
                      <button
                        key={m.id}
                        onClick={() => toggleArrayItem('journeyMilestones', m.id)}
                        className={`p-2.5 rounded-lg border text-xs text-center transition-all ${
                          config.journeyMilestones.includes(m.id)
                            ? 'border-rose-500 bg-rose-500/15 text-rose-300'
                            : 'border-slate-700 bg-slate-800/50 text-slate-400 hover:border-slate-500'
                        }`}
                      >
                        <div className="text-lg mb-1">{m.emoji}</div>
                        <div className="leading-tight">{m.label}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Comparison */}
            {config.layout === 'comparison' && (
              <div className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-amber-950/30 border border-amber-900/40 rounded-xl p-4">
                    <label className="text-xs font-semibold text-amber-400 uppercase tracking-wider block mb-2">Bên Trái ✓ (Tích cực / Đúng)</label>
                    <input
                      type="text"
                      value={config.leftLabel}
                      onChange={e => update('leftLabel', e.target.value)}
                      placeholder="VD: KHÔNG SỢ CHẬM"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 mb-2"
                    />
                    <textarea
                      value={config.leftDescription}
                      onChange={e => update('leftDescription', e.target.value)}
                      placeholder="Mô tả bên trái: Nhân vật, hành động, cảm xúc. VD: Chú rùa nhỏ đang kiên nhẫn leo núi, đổ mồ hôi nhưng không dừng bước. Bên dưới có: đá vàng, mầm cây nhỏ. Ánh sáng ấm, nền vàng sáng."
                      rows={3}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 resize-none"
                    />
                  </div>
                  <div className="bg-slate-900/60 border border-slate-700/40 rounded-xl p-4">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">Bên Phải ✗ (Tiêu cực / Sai)</label>
                    <input
                      type="text"
                      value={config.rightLabel}
                      onChange={e => update('rightLabel', e.target.value)}
                      placeholder="VD: CHỈ SỢ DỪNG LẠI"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-slate-500 mb-2"
                    />
                    <textarea
                      value={config.rightDescription}
                      onChange={e => update('rightDescription', e.target.value)}
                      placeholder="Mô tả bên phải: VD: Chú thỏ đang ngủ dựa vào tường gạch, đồng hồ báo thức bên cạnh. Nền tối xám lạnh. Bên dưới có bánh răng han gỉ, vũng lầy."
                      rows={3}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-slate-500 resize-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Multi Scene */}
            {config.layout === 'multi_scene' && (
              <div className="space-y-3">
                <p className="text-xs text-slate-500">Mô tả từng cảnh trong ảnh. Các cảnh sẽ được nối bằng dải sáng vàng.</p>
                {config.sceneDescriptions.map((scene, i) => (
                  <div key={i} className="flex gap-2 items-start">
                    <span className="bg-slate-700 text-slate-300 text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-2.5">
                      {i + 1}
                    </span>
                    <input
                      type="text"
                      value={scene}
                      onChange={e => updateScene(i, e.target.value)}
                      placeholder={[
                        'Cảnh 1: VD: Vua Hùng đứng trên đỉnh núi nhìn xuống đất nước, tay cầm bản đồ',
                        'Cảnh 2: VD: Nông dân cày ruộng lúa vàng, bàn tay chạm vào rễ cây cổ thụ lớn',
                        'Cảnh 3: VD: Thầy trò ngồi chơi cờ dưới ánh trăng, rừng tre xanh mát',
                        'Cảnh 4: VD: Tướng quân và binh lính với cờ hiệu, lửa trại đêm khuya',
                        'Cảnh 5: VD: Người dân hân hoan, rồng vàng bay lên bầu trời, cuộn thư phát sáng',
                      ][i] || `Mô tả cảnh ${i + 1}...`}
                      className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-rose-500"
                    />
                    {i >= 3 && (
                      <button onClick={() => update('sceneDescriptions', config.sceneDescriptions.filter((_, idx) => idx !== i))} className="mt-2 text-slate-600 hover:text-red-400 transition-colors">
                        <X size={16} />
                      </button>
                    )}
                  </div>
                ))}
                {config.sceneDescriptions.length < 5 && (
                  <button
                    onClick={() => update('sceneDescriptions', [...config.sceneDescriptions, ''])}
                    className="flex items-center gap-2 text-xs text-slate-500 hover:text-slate-300 transition-colors px-3 py-2 rounded-lg border border-dashed border-slate-700 hover:border-slate-500 w-full justify-center"
                  >
                    <Plus size={14} /> Thêm cảnh
                  </button>
                )}
              </div>
            )}

            {/* Banner */}
            {config.layout === 'banner' && (
              <p className="text-sm text-slate-400 bg-slate-800/30 rounded-xl p-4">
                Banner sẽ tự động dùng <strong className="text-white">Tiêu đề chính</strong> làm text lớn, <strong className="text-white">Câu trích dẫn</strong> làm nội dung quote box.
                Chọn các <strong className="text-white">Biểu tượng</strong> ở bước 5 để xuất hiện dọc theo con đường trong banner.
              </p>
            )}

            {/* Infographic */}
            {config.layout === 'infographic' && (
              <div className="space-y-3">
                <p className="text-xs text-slate-500">Mô tả từng điểm/bước thông tin trong sơ đồ.</p>
                {config.sceneDescriptions.map((point, i) => (
                  <div key={i} className="flex gap-2 items-start">
                    <span className="bg-rose-800/50 text-rose-300 text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-2.5">{i + 1}</span>
                    <input
                      type="text"
                      value={point}
                      onChange={e => updateScene(i, e.target.value)}
                      placeholder={[
                        'Bước 1: VD: Xác định mục tiêu rõ ràng — biết mình muốn gì',
                        'Bước 2: VD: Lên kế hoạch hành động chi tiết từng ngày',
                        'Bước 3: VD: Kỷ luật thực hiện dù không có cảm hứng',
                        'Bước 4: VD: Học hỏi từ thất bại, điều chỉnh liên tục',
                        'Bước 5: VD: Kiên trì đến khi đạt được đích đến',
                      ][i] || `Điểm ${i + 1}...`}
                      className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-rose-500"
                    />
                  </div>
                ))}
                {config.sceneDescriptions.length < 5 && (
                  <button onClick={() => update('sceneDescriptions', [...config.sceneDescriptions, ''])} className="flex items-center gap-2 text-xs text-slate-500 hover:text-slate-300 transition-colors px-3 py-2 rounded-lg border border-dashed border-slate-700 hover:border-slate-500 w-full justify-center">
                    <Plus size={14} /> Thêm điểm
                  </button>
                )}
              </div>
            )}
          </div>

          {/* STEP 4: Characters */}
          <div className="bg-slate-900/40 border border-slate-800/60 rounded-2xl p-6">
            <SectionHeader step="4" label="Nhân vật trong ảnh" sublabel="Chọn những nhân vật sẽ xuất hiện (tối đa 3-4)" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {CHARACTER_OPTIONS.map(char => (
                <button
                  key={char.id}
                  onClick={() => toggleArrayItem('characters', char.id)}
                  className={`p-3 rounded-xl border text-center transition-all hover:scale-[1.02] ${
                    config.characters.includes(char.id)
                      ? 'border-rose-500 bg-rose-500/15 text-rose-200 shadow-sm'
                      : 'border-slate-700/60 bg-slate-800/30 text-slate-400 hover:border-slate-500'
                  }`}
                >
                  <div className="text-xl mb-1">{char.emoji}</div>
                  <div className="text-[11px] font-medium leading-tight">{char.label}</div>
                  {config.characters.includes(char.id) && (
                    <Check size={10} className="mx-auto mt-1 text-rose-400" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* STEP 5: Symbols */}
          <div className="bg-slate-900/40 border border-slate-800/60 rounded-2xl p-6">
            <SectionHeader step="5" label="Biểu tượng & Yếu tố trang trí" sublabel="Chọn những icon/vật thể xuất hiện trong ảnh (tối đa 5-6)" />
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2">
              {SYMBOL_OPTIONS.map(sym => (
                <button
                  key={sym.id}
                  onClick={() => toggleArrayItem('symbols', sym.id)}
                  className={`p-2.5 rounded-xl border text-center transition-all hover:scale-[1.02] ${
                    config.symbols.includes(sym.id)
                      ? 'border-amber-500 bg-amber-500/15 text-amber-200'
                      : 'border-slate-700/60 bg-slate-800/30 text-slate-400 hover:border-slate-500'
                  }`}
                >
                  <div className="text-lg mb-1">{sym.emoji}</div>
                  <div className="text-[10px] font-medium leading-tight">{sym.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* STEP 6: Style & Color (collapsible) */}
          <div className="bg-slate-900/40 border border-slate-800/60 rounded-2xl overflow-hidden">
            <button onClick={() => toggleExpand('style')} className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-800/30 transition-colors">
              <div className="flex items-center gap-3">
                <span className="bg-slate-700 text-white text-xs font-bold w-7 h-7 rounded-full flex items-center justify-center shrink-0">6</span>
                <div className="text-left">
                  <h3 className="font-semibold text-white text-sm">Phong cách & Bảng màu</h3>
                  <p className="text-slate-500 text-xs">{currentStyle.label} · {currentColor.label}</p>
                </div>
              </div>
              <ChevronDown size={18} className={`text-slate-400 transition-transform ${expandedSections.style ? 'rotate-180' : ''}`} />
            </button>
            {expandedSections.style && (
              <div className="px-6 pb-6 pt-2 border-t border-slate-800/60 space-y-5">
                <div>
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2.5">Phong cách minh họa</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                    {(Object.entries(STYLE_TEMPLATES) as [StoryStyle, typeof STYLE_TEMPLATES[StoryStyle]][]).map(([id, tmpl]) => (
                      <button
                        key={id}
                        onClick={() => update('style', id)}
                        className={`p-3 rounded-xl border text-center transition-all ${
                          config.style === id
                            ? 'border-rose-500 bg-rose-500/10 text-rose-200'
                            : 'border-slate-700/60 bg-slate-800/30 text-slate-400 hover:border-slate-500'
                        }`}
                      >
                        <div className="w-full h-8 rounded-md mb-2" style={{ background: `linear-gradient(135deg, ${tmpl.bgFrom}, ${tmpl.bgTo})` }} />
                        <div className="text-[11px] font-semibold leading-tight">{tmpl.label}</div>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2.5">Bảng màu chủ đạo</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                    {(Object.entries(COLOR_SCHEMES) as [StoryColorScheme, typeof COLOR_SCHEMES[StoryColorScheme]][]).map(([id, scheme]) => (
                      <button
                        key={id}
                        onClick={() => update('colorScheme', id)}
                        className={`p-3 rounded-xl border text-center transition-all ${
                          config.colorScheme === id
                            ? 'border-amber-500 bg-amber-500/10 text-amber-200'
                            : 'border-slate-700/60 bg-slate-800/30 text-slate-400 hover:border-slate-500'
                        }`}
                      >
                        <div className="flex gap-1 justify-center mb-1.5">
                          <div className="w-4 h-4 rounded-full" style={{ background: scheme.preview.bg }} />
                          <div className="w-4 h-4 rounded-full" style={{ background: scheme.preview.accent }} />
                        </div>
                        <div className="text-[11px] font-semibold leading-tight">{scheme.label}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Advanced notes (collapsible) */}
          <div className="bg-slate-900/40 border border-slate-800/60 rounded-2xl overflow-hidden">
            <button onClick={() => toggleExpand('advanced')} className="w-full px-6 py-3.5 flex items-center justify-between hover:bg-slate-800/30 transition-colors">
              <div className="flex items-center gap-3">
                <span className="bg-slate-800 text-slate-400 text-xs font-bold w-7 h-7 rounded-full flex items-center justify-center shrink-0">+</span>
                <span className="text-slate-400 text-sm font-medium">Ghi chú thêm cho AI <span className="text-slate-600">(tùy chọn)</span></span>
              </div>
              <ChevronDown size={16} className={`text-slate-500 transition-transform ${expandedSections.advanced ? 'rotate-180' : ''}`} />
            </button>
            {expandedSections.advanced && (
              <div className="px-6 pb-5 pt-2 border-t border-slate-800/60">
                <textarea
                  value={config.additionalNotes}
                  onChange={e => update('additionalNotes', e.target.value)}
                  placeholder="Thêm mô tả chi tiết cho AI: VD: Toàn bộ ảnh cần có cảm giác như tranh minh họa sách truyện cổ tích Việt Nam, màu sắc ấm áp, ánh nắng vàng buổi chiều, không khí hoài cổ..."
                  rows={3}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-slate-500 resize-none"
                />
              </div>
            )}
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/40 text-red-200 px-4 py-3 rounded-xl text-sm">⚠️ {error}</div>
          )}
        </div>

        {/* ── Right Column: Summary + Generate ── */}
        <div className="lg:col-span-4">
          <div className="sticky top-24 space-y-5">

            {/* Summary */}
            <div className="bg-slate-900/60 rounded-2xl border border-slate-800/60 p-5">
              <h3 className="font-semibold text-white text-sm mb-4 flex items-center gap-2">
                <Sparkles size={14} className="text-yellow-400" /> Cấu hình hiện tại
              </h3>
              <div className="space-y-2.5 text-xs">
                <div className="flex gap-3 p-2.5 bg-slate-800/40 rounded-lg">
                  <span className="text-2xl">{currentLayout.icon}</span>
                  <div>
                    <p className="text-white font-semibold">{currentLayout.label}</p>
                    <p className="text-slate-500 text-[10px] mt-0.5">{currentLayout.hint}</p>
                  </div>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Phong cách</span>
                  <span className="text-white">{currentStyle.label}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Bảng màu</span>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full" style={{ background: currentColor.preview.accent }} />
                    <span className="text-white">{currentColor.label}</span>
                  </div>
                </div>
                {config.characters.length > 0 && (
                  <div className="flex justify-between text-slate-400">
                    <span>Nhân vật</span>
                    <span className="text-white">{config.characters.length} đã chọn</span>
                  </div>
                )}
                {config.symbols.length > 0 && (
                  <div className="flex justify-between text-slate-400">
                    <span>Biểu tượng</span>
                    <span className="text-white">{config.symbols.length} đã chọn</span>
                  </div>
                )}
                {config.headline && (
                  <div className="p-2 bg-slate-800/60 rounded-lg">
                    <p className="text-slate-500 text-[10px] mb-0.5">Tiêu đề chính:</p>
                    <p className="text-slate-300 text-[11px] line-clamp-2">{config.headline}</p>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={isLoading}
              className="w-full py-4 rounded-xl text-base font-semibold text-white shadow-xl transition-all disabled:opacity-50 hover:-translate-y-0.5"
              style={{ background: isLoading ? '#4b5563' : 'linear-gradient(135deg, #e11d48, #f97316)' }}
            >
              {isLoading ? 'Đang tạo ảnh...' : '✦ Tạo Ảnh Ngay'}
            </button>

            {/* Tips */}
            <div className="bg-slate-900/40 rounded-xl border border-slate-800/50 p-4">
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-2.5">Mẹo hay</p>
              <ul className="space-y-1.5 text-xs text-slate-500">
                <li>✦ Tiêu đề chính nên ngắn, mạnh, dễ nhớ</li>
                <li>✦ Bố cục "So Sánh" hiệu quả nhất khi có 2 nhân vật tương phản</li>
                <li>✦ Chọn biểu tượng phù hợp với chủ đề câu chuyện</li>
                <li>✦ Thêm quote truyền cảm hứng bằng tiếng Việt</li>
                <li>✦ Tạo nhiều biến thể để chọn ra cái ưng ý</li>
              </ul>
            </div>

            {/* Quick presets */}
            <div className="bg-slate-900/40 rounded-xl border border-slate-800/50 p-4">
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-2.5">Mẫu nhanh</p>
              <div className="space-y-2">
                {[
                  { label: '🐢 Rùa & Thỏ', action: () => setConfig({
                    ...DEFAULT_CONFIG,
                    layout: 'comparison',
                    style: 'gold_luxury',
                    colorScheme: 'gold_white',
                    headline: 'CHÚC BẠN KHÔNG SỢ CHẬM, CHỈ SỢ DỪNG LẠI',
                    leftLabel: 'KHÔNG SỢ CHẬM',
                    leftDescription: 'Chú rùa kiên nhẫn leo núi, mang túi nặng trên lưng nhưng bước đi chắc chắn. Bên dưới: đá cuội vàng, mầm cây nhỏ. Ánh sáng vàng ấm áp.',
                    rightLabel: 'CHỈ SỢ DỪNG LẠI',
                    rightDescription: 'Chú thỏ ngủ tựa tường gạch, có đồng hồ báo thức bên cạnh. Nền tối xám. Bên dưới: bánh răng gỉ sét, vũng bùn, cỏ khô.',
                    quote: '"Hãy cứ là người leo núi chậm chạp, còn hơn là người bỏ cuộc đứng dưới chân đồi."',
                    characters: ['turtle', 'rabbit'],
                    symbols: ['mountain', 'seedling', 'hourglass'],
                    journeyStart: '', journeyEnd: '', journeyMilestones: [], sceneDescriptions: ['','',''],
                    subheadline: '', bodyText: '', additionalNotes: '',
                  })},
                  { label: '🏃 Hành Trình Thành Công', action: () => setConfig({
                    ...DEFAULT_CONFIG,
                    layout: 'journey',
                    style: 'gold_luxury',
                    colorScheme: 'gold_white',
                    headline: 'CHÚC BẠN ĐỦ DŨNG KHÍ ĐỂ BẮT ĐẦU, VÀ ĐỦ KIÊN TRÌ ĐỂ ĐI ĐẾN CÙNG',
                    journeyStart: 'Một vận động viên trẻ năng động trong trang phục trắng bắt đầu chạy, trái tim có cánh vàng bên trên, nhãn BẮT ĐẦU',
                    journeyEnd: 'Người đàn ông lớn tuổi leo lên đỉnh núi đá vàng, cờ vàng trên đỉnh, nhãn ĐÍCH ĐẾN',
                    journeyMilestones: ['overcome_fear', 'discipline'],
                    characters: ['runner_young', 'climber_elder'],
                    symbols: ['golden_path', 'mountain', 'wings_heart', 'hourglass', 'shield'],
                    quote: '', bodyText: '', subheadline: '', sceneDescriptions: ['','',''],
                    leftLabel: '', leftDescription: '', rightLabel: '', rightDescription: '',
                    additionalNotes: '',
                  })},
                  { label: '📅 Banner Ngày Mới', action: () => setConfig({
                    ...DEFAULT_CONFIG,
                    layout: 'banner',
                    style: 'gold_luxury',
                    colorScheme: 'gold_dark',
                    headline: '02.02.2025   THỨ HAI',
                    quote: '"Khởi đầu tuần mới với tâm thế vững vàng. Hãy biến mọi thử thách thành cơ hội để tỏa sáng theo cách của riêng bạn."',
                    bodyText: 'Thứ Hai, 02.02.2025 - Năng lượng tích cực cho tuần mới thành công',
                    symbols: ['compass', 'scroll', 'seedling', 'sunrise'],
                    characters: [],
                    journeyStart: '', journeyEnd: '', journeyMilestones: [],
                    sceneDescriptions: ['','',''],
                    subheadline: '', leftLabel: '', leftDescription: '', rightLabel: '', rightDescription: '',
                    additionalNotes: '',
                  })},
                ].map(preset => (
                  <button key={preset.label} onClick={preset.action} className="w-full text-left text-xs text-slate-400 hover:text-white transition-colors px-3 py-2 rounded-lg border border-slate-800 hover:border-slate-600 hover:bg-slate-800/30">
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
