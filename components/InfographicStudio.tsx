import React, { useState, useRef, useCallback } from 'react';
import { Download, RefreshCw, Plus, X, Check, ChevronDown, Zap, Sparkles, Image } from 'lucide-react';
import {
  InfographicConfig, InfographicType, InfographicStyle, InfographicLayout,
  InfographicIngredient, InfographicStep, InfographicBadge,
} from '../types';
import {
  TYPE_TEMPLATES, STYLE_TEMPLATES, LAYOUT_TEMPLATES,
  getBadgePresets, generateHeroImage,
} from '../services/infographicService';
import { InfographicRenderer } from './InfographicRenderer';

const BADGE_COLORS = ['pink', 'mint', 'peach', 'lavender', 'blue', 'green', 'orange', 'yellow'];
const BADGE_COLOR_STYLES: Record<string, string> = {
  pink: 'bg-pink-100 border-pink-200 text-pink-700',
  mint: 'bg-teal-100 border-teal-200 text-teal-700',
  peach: 'bg-orange-100 border-orange-200 text-orange-700',
  lavender: 'bg-purple-100 border-purple-200 text-purple-700',
  blue: 'bg-blue-100 border-blue-200 text-blue-700',
  green: 'bg-green-100 border-green-200 text-green-700',
  orange: 'bg-amber-100 border-amber-200 text-amber-700',
  yellow: 'bg-yellow-100 border-yellow-200 text-yellow-700',
};

const makeIngredient = (): InfographicIngredient => ({ amount: '', name: '', note: '' });
const makeStep = (): InfographicStep => ({ title: '', description: '' });
const makeBadge = (): InfographicBadge => ({ label: '', value: '', color: 'pink' });

const RECIPE_PRESET: Partial<InfographicConfig> = {
  title: 'Lẩu Nấm',
  heroDescription: 'Nồi lẩu nấm đang sôi sục trong nồi gốm màu trắng kem trên bếp ga mini. Trong nồi đầy nấm hương, nấm kim châm, thịt bò thái lát mỏng, đậu hũ trắng, bắp ngô, rau cải xanh tươi. Nhìn từ hơi trên xuống.',
  ingredients: [
    { amount: '500g', name: 'Nấm các loại', note: 'hương, kim châm, đùi gà' },
    { amount: '200g', name: 'Thịt bò thái lát mỏng', note: '' },
    { amount: '2 miếng', name: 'Đậu hũ non', note: '' },
    { amount: '1 bó', name: 'Rau xanh', note: 'cải, tần ô' },
    { amount: '1 gói', name: 'Gia vị lẩu nấm', note: '' },
    { amount: '2 lít', name: 'Nước dùng rau củ', note: '' },
  ],
  steps: [
    { title: 'Chuẩn bị nước dùng', description: 'Đun sôi nước dùng rau củ trong nồi lẩu, thêm gia vị lẩu nấm.' },
    { title: 'Sơ chế nguyên liệu', description: 'Rửa sạch và cắt nhỏ các loại nấm, rau xanh. Thái lát thịt bò và đậu hũ.' },
    { title: 'Thưởng thức', description: 'Nhúng lần lượt các loại nấm, rau, đậu hũ và thịt bò vào nồi lẩu đang sôi. Dùng kèm bún hoặc mì.' },
  ],
  badges: [
    { label: 'Thời gian nấu', value: '45 phút', color: 'pink' },
    { label: 'Độ khó', value: 'Dễ', color: 'mint' },
    { label: 'Khẩu phần', value: '4 người', color: 'peach' },
  ],
  leftSectionTitle: 'Nguyên Liệu',
  rightSectionTitle: 'Quy Trình Thực Hiện',
};

const SKINCARE_PRESET: Partial<InfographicConfig> = {
  title: 'Serum Vitamin C',
  subtitle: 'Làm sáng & Chống lão hóa',
  heroDescription: 'Chai serum thủy tinh màu vàng hổ phách trong suốt, nắp vàng ánh kim, đứng thẳng trên bề mặt đá cẩm thạch trắng. Xung quanh có cam tươi, lá trà xanh, viên ngọc trai. Ánh sáng từ bên trái.',
  ingredients: [
    { amount: '15%', name: 'Vitamin C (Ascorbic Acid)', note: 'Làm sáng da' },
    { amount: '2%', name: 'Niacinamide', note: 'Thu nhỏ lỗ chân lông' },
    { amount: '1%', name: 'Hyaluronic Acid', note: 'Cấp ẩm sâu' },
    { amount: '', name: 'Chiết xuất Cam biển', note: 'Chống oxy hóa' },
    { amount: '', name: 'Collagen Peptide', note: 'Căng da' },
  ],
  steps: [
    { title: 'Làm sáng tức thì', description: 'Giảm thâm nám, đều màu da chỉ sau 2 tuần sử dụng.' },
    { title: 'Chống lão hóa', description: 'Kích thích sinh collagen, giảm nếp nhăn rõ rệt.' },
    { title: 'Dưỡng ẩm 24h', description: 'Giữ ẩm suốt cả ngày, da mềm mịn không bong tróc.' },
  ],
  badges: [
    { label: 'Da', value: 'Mọi loại da', color: 'pink' },
    { label: '100%', value: 'Tự nhiên', color: 'mint' },
    { label: 'Dung tích', value: '30ml', color: 'peach' },
  ],
  leftSectionTitle: 'Thành Phần Chính',
  rightSectionTitle: 'Công Dụng',
};

const DEFAULT_CONFIG: InfographicConfig = {
  type: 'recipe',
  style: 'soft_pastel',
  layout: 'classic_recipe',
  title: '',
  subtitle: '',
  heroDescription: '',
  ingredients: [makeIngredient(), makeIngredient(), makeIngredient()],
  steps: [makeStep(), makeStep(), makeStep()],
  badges: [
    { label: '', value: '', color: 'pink' },
    { label: '', value: '', color: 'mint' },
  ],
  leftSectionTitle: 'Nguyên Liệu',
  rightSectionTitle: 'Quy Trình Thực Hiện',
  additionalNotes: '',
};

function SectionCard({ title, children }: { title: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="bg-slate-900/40 border border-slate-800/60 rounded-2xl p-5">
      <div className="mb-4">{title}</div>
      {children}
    </div>
  );
}

function StepBadge({ n }: { n: number }) {
  return (
    <span className="bg-amber-600/80 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0">{n}</span>
  );
}

export function InfographicStudio() {
  const [config, setConfig] = useState<InfographicConfig>(DEFAULT_CONFIG);
  const [heroImageUrl, setHeroImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showStylePanel, setShowStylePanel] = useState(false);
  const rendererRef = useRef<HTMLDivElement>(null);

  const update = <K extends keyof InfographicConfig>(key: K, val: InfographicConfig[K]) => {
    setConfig(p => ({ ...p, [key]: val }));
    setHeroImageUrl(null);
  };

  // Ingredient helpers
  const updateIngredient = (i: number, field: keyof InfographicIngredient, val: string) => {
    const arr = [...config.ingredients];
    arr[i] = { ...arr[i], [field]: val };
    update('ingredients', arr);
  };
  const addIngredient = () => update('ingredients', [...config.ingredients, makeIngredient()]);
  const removeIngredient = (i: number) => update('ingredients', config.ingredients.filter((_, idx) => idx !== i));

  // Step helpers
  const updateStep = (i: number, field: keyof InfographicStep, val: string) => {
    const arr = [...config.steps];
    arr[i] = { ...arr[i], [field]: val };
    update('steps', arr);
  };
  const addStep = () => update('steps', [...config.steps, makeStep()]);
  const removeStep = (i: number) => update('steps', config.steps.filter((_, idx) => idx !== i));

  // Badge helpers
  const updateBadge = (i: number, field: keyof InfographicBadge, val: string) => {
    const arr = [...config.badges];
    arr[i] = { ...arr[i], [field]: val };
    update('badges', arr);
  };
  const addBadge = () => update('badges', [...config.badges, makeBadge()]);
  const removeBadge = (i: number) => update('badges', config.badges.filter((_, idx) => idx !== i));

  const applyPreset = (preset: Partial<InfographicConfig>, type: InfographicType) => {
    setConfig({ ...DEFAULT_CONFIG, type, ...preset });
    setHeroImageUrl(null);
  };

  const applyTypeDefaults = (type: InfographicType) => {
    const tmpl = TYPE_TEMPLATES[type];
    update('type', type);
    update('leftSectionTitle', tmpl.leftTitle);
    update('rightSectionTitle', tmpl.rightTitle);
  };

  const handleGenerate = async () => {
    if (!config.title.trim()) {
      setError('Vui lòng nhập tên sản phẩm/món ăn.');
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const url = await generateHeroImage(config);
      setHeroImageUrl(url);
    } catch (err: any) {
      setError(err.message || 'Có lỗi xảy ra. Thử lại nhé!');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = useCallback(async () => {
    if (!rendererRef.current) return;
    setIsExporting(true);
    setError(null);
    try {
      await document.fonts.ready;
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(rendererRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        logging: false,
      });
      const link = document.createElement('a');
      link.download = `infographic-${config.title.replace(/\s+/g, '-')}-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
    } catch (err: any) {
      setError('Lỗi khi xuất ảnh: ' + (err.message || 'Thử lại nhé!'));
    } finally {
      setIsExporting(false);
    }
  }, [config.title]);

  const currentType = TYPE_TEMPLATES[config.type];
  const currentStyle = STYLE_TEMPLATES[config.style];
  const badgePresets = getBadgePresets();

  // ─── RESULT VIEW ───────────────────────────────────────────────────────────
  if (heroImageUrl) {
    return (
      <div className="space-y-6">
        {/* Action bar */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h3 className="text-xl font-bold text-white">{currentType.icon} Infographic sẵn sàng!</h3>
            <p className="text-slate-400 text-sm mt-1">{config.title} · {currentStyle.label} · Text tiếng Việt chuẩn</p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <button onClick={() => setHeroImageUrl(null)} className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white transition-colors text-sm">
              <RefreshCw size={14} /> Tạo lại ảnh hero
            </button>
            <button onClick={handleGenerate} disabled={isLoading} className="flex items-center gap-2 px-4 py-2 rounded-lg border border-amber-700/60 text-amber-300 hover:border-amber-500 hover:bg-amber-900/20 transition-colors text-sm disabled:opacity-50">
              <Zap size={14} /> {isLoading ? 'Đang tạo...' : 'Biến thể mới'}
            </button>
            <button
              onClick={handleDownload}
              disabled={isExporting}
              className="flex items-center gap-2 px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold shadow-lg transition-colors disabled:opacity-60"
            >
              <Download size={14} /> {isExporting ? 'Đang xuất...' : 'Tải về PNG'}
            </button>
          </div>
        </div>

        {error && <div className="bg-red-500/10 border border-red-500/40 text-red-200 px-4 py-3 rounded-xl text-sm">⚠️ {error}</div>}

        {/* Renderer — scaled to fit screen width, full 1200px internally */}
        <div className="rounded-2xl overflow-auto border border-slate-700/60 bg-slate-900/30 shadow-2xl p-2">
          <div style={{ minWidth: 320 }}>
            <div style={{
              transformOrigin: 'top left',
              transform: 'scale(var(--infographic-scale, 1))',
            }}>
              <style>{`
                @media (max-width: 1280px) { :root { --infographic-scale: calc((min(100vw, 1200px) - 32px) / 1200) } }
              `}</style>
              <InfographicRenderer ref={rendererRef} config={config} heroImageUrl={heroImageUrl} />
            </div>
          </div>
        </div>

        <div className="flex gap-3 justify-center pt-1">
          <button
            onClick={() => { setHeroImageUrl(null); setConfig(DEFAULT_CONFIG); }}
            className="flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white transition-colors font-semibold text-sm"
          >
            Tạo infographic mới
          </button>
        </div>
      </div>
    );
  }

  // ─── MAIN FORM ─────────────────────────────────────────────────────────────
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold px-3 py-1 rounded-full mb-2">
          <Image size={12} /> Infographic Creator
        </div>
        <h2 className="text-3xl font-bold text-white">Tạo Infographic Sản Phẩm & Công Thức</h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Nhập thành phần, quy trình và thông tin — AI tự động tạo ra infographic đẹp như tạp chí chuyên nghiệp.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* ── Left ── */}
        <div className="lg:col-span-8 space-y-5">

          {/* STEP 1: Quick presets */}
          <div className="bg-gradient-to-r from-amber-950/40 to-slate-900/40 border border-amber-900/30 rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-amber-400 text-sm font-semibold">⚡ Mẫu nhanh</span>
              <span className="text-slate-600 text-xs">— Click để điền sẵn dữ liệu</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { label: '🍜 Lẩu Nấm (Món ăn)', action: () => applyPreset({ ...RECIPE_PRESET, type: 'recipe', style: 'soft_pastel', layout: 'classic_recipe' } as InfographicConfig, 'recipe') },
                { label: '🧴 Serum Vitamin C (Mỹ phẩm)', action: () => applyPreset({ ...SKINCARE_PRESET, type: 'product_ingredients', style: 'soft_pastel', layout: 'classic_recipe' } as InfographicConfig, 'product_ingredients') },
              ].map(p => (
                <button key={p.label} onClick={p.action} className="px-4 py-2 rounded-xl border border-amber-800/50 bg-amber-900/20 text-amber-200 text-sm hover:border-amber-600 hover:bg-amber-900/40 transition-colors">
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* STEP 2: Type */}
          <SectionCard title={
            <div className="flex items-center gap-3">
              <StepBadge n={1} />
              <div><h3 className="font-semibold text-white text-sm">Loại infographic</h3><p className="text-slate-500 text-xs">Sản phẩm gì? Mục đích gì?</p></div>
            </div>
          }>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
              {(Object.entries(TYPE_TEMPLATES) as [InfographicType, typeof TYPE_TEMPLATES[InfographicType]][]).map(([id, tmpl]) => (
                <button key={id} onClick={() => applyTypeDefaults(id)}
                  className={`p-3 rounded-xl border text-center transition-all hover:scale-[1.02] ${config.type === id ? 'border-amber-500 bg-amber-500/10 text-amber-200' : 'border-slate-700/60 bg-slate-800/30 text-slate-400 hover:border-slate-500'}`}>
                  <div className="text-2xl mb-1.5">{tmpl.icon}</div>
                  <div className="text-xs font-semibold leading-tight">{tmpl.label}</div>
                  {config.type === id && <Check size={10} className="mx-auto mt-1 text-amber-400" />}
                </button>
              ))}
            </div>
          </SectionCard>

          {/* STEP 3: Basic Info */}
          <SectionCard title={
            <div className="flex items-center gap-3">
              <StepBadge n={2} />
              <div><h3 className="font-semibold text-white text-sm">Thông tin cơ bản</h3></div>
            </div>
          }>
            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Tên sản phẩm / Tên món ăn *</label>
                  <input type="text" value={config.title} onChange={e => update('title', e.target.value)}
                    placeholder={currentType.heroHint.split('.')[0].replace('VD: ', '').split(',')[0]}
                    className="mt-1.5 w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-amber-500" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Tagline / Mô tả ngắn</label>
                  <input type="text" value={config.subtitle} onChange={e => update('subtitle', e.target.value)}
                    placeholder="VD: Thanh mát, bổ dưỡng cho ngày se lạnh"
                    className="mt-1.5 w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-amber-500" />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Mô tả hình ảnh chính (AI sẽ vẽ hình này)</label>
                <textarea value={config.heroDescription} onChange={e => update('heroDescription', e.target.value)}
                  placeholder={currentType.heroHint}
                  rows={3}
                  className="mt-1.5 w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 resize-none" />
                <p className="text-slate-600 text-[10px] mt-1">Mô tả càng chi tiết → hình AI tạo ra càng giống ý bạn</p>
              </div>
            </div>
          </SectionCard>

          {/* STEP 4: Ingredients */}
          <SectionCard title={
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <StepBadge n={3} />
                <div>
                  <h3 className="font-semibold text-white text-sm">{currentType.ingredientLabel}</h3>
                  <p className="text-slate-500 text-xs">Tên tiêu đề cột: <span className="text-slate-400">"{config.leftSectionTitle}"</span></p>
                </div>
              </div>
              <input type="text" value={config.leftSectionTitle} onChange={e => update('leftSectionTitle', e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-lg px-2 py-1 text-xs text-white w-32 focus:outline-none focus:border-amber-500" placeholder="Tiêu đề cột" />
            </div>
          }>
            <div className="space-y-2">
              {config.ingredients.map((ing, i) => (
                <div key={i} className="flex gap-2 items-center group">
                  <span className="text-slate-600 text-xs w-4 text-center shrink-0">{i + 1}</span>
                  <input type="text" value={ing.amount} onChange={e => updateIngredient(i, 'amount', e.target.value)}
                    placeholder="Số lượng" className="w-20 shrink-0 bg-slate-800 border border-slate-700 rounded-lg px-2 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-500" />
                  <input type="text" value={ing.name} onChange={e => updateIngredient(i, 'name', e.target.value)}
                    placeholder="Tên nguyên liệu / thành phần *" className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-500" />
                  <input type="text" value={ing.note} onChange={e => updateIngredient(i, 'note', e.target.value)}
                    placeholder="Ghi chú (tùy chọn)" className="w-32 shrink-0 bg-slate-800 border border-slate-700 rounded-lg px-2 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-500" />
                  {config.ingredients.length > 1 && (
                    <button onClick={() => removeIngredient(i)} className="opacity-0 group-hover:opacity-100 text-slate-600 hover:text-red-400 transition-all shrink-0"><X size={14} /></button>
                  )}
                </div>
              ))}
              {config.ingredients.length < 10 && (
                <button onClick={addIngredient} className="flex items-center gap-2 text-xs text-slate-500 hover:text-amber-300 transition-colors px-3 py-2 rounded-lg border border-dashed border-slate-700 hover:border-amber-700 w-full justify-center mt-1">
                  <Plus size={13} /> Thêm thành phần
                </button>
              )}
            </div>
          </SectionCard>

          {/* STEP 5: Steps */}
          <SectionCard title={
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <StepBadge n={4} />
                <div>
                  <h3 className="font-semibold text-white text-sm">{currentType.stepLabel}</h3>
                  <p className="text-slate-500 text-xs">Tên tiêu đề cột: <span className="text-slate-400">"{config.rightSectionTitle}"</span></p>
                </div>
              </div>
              <input type="text" value={config.rightSectionTitle} onChange={e => update('rightSectionTitle', e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-lg px-2 py-1 text-xs text-white w-36 focus:outline-none focus:border-amber-500" placeholder="Tiêu đề cột" />
            </div>
          }>
            <div className="space-y-2.5">
              {config.steps.map((step, i) => (
                <div key={i} className="flex gap-2 items-start group">
                  <span className="bg-amber-700/40 text-amber-300 text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-2">{i + 1}</span>
                  <div className="flex-1 space-y-1.5">
                    <input type="text" value={step.title} onChange={e => updateStep(i, 'title', e.target.value)}
                      placeholder={`Tiêu đề bước ${i + 1} (VD: Sơ chế nguyên liệu)`}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-500" />
                    <input type="text" value={step.description} onChange={e => updateStep(i, 'description', e.target.value)}
                      placeholder="Mô tả chi tiết bước này..."
                      className="w-full bg-slate-800/60 border border-slate-700/60 rounded-lg px-3 py-2 text-xs text-slate-300 placeholder-slate-600 focus:outline-none focus:border-amber-500/60" />
                  </div>
                  {config.steps.length > 1 && (
                    <button onClick={() => removeStep(i)} className="opacity-0 group-hover:opacity-100 text-slate-600 hover:text-red-400 transition-all shrink-0 mt-2"><X size={14} /></button>
                  )}
                </div>
              ))}
              {config.steps.length < 6 && (
                <button onClick={addStep} className="flex items-center gap-2 text-xs text-slate-500 hover:text-amber-300 transition-colors px-3 py-2 rounded-lg border border-dashed border-slate-700 hover:border-amber-700 w-full justify-center mt-1">
                  <Plus size={13} /> Thêm bước
                </button>
              )}
            </div>
          </SectionCard>

          {/* STEP 6: Info Badges */}
          <SectionCard title={
            <div className="flex items-center gap-3">
              <StepBadge n={5} />
              <div><h3 className="font-semibold text-white text-sm">Thẻ thông tin nhanh</h3><p className="text-slate-500 text-xs">Các badge hiển thị ngay cạnh hình chính</p></div>
            </div>
          }>
            {/* Badge presets */}
            <div className="mb-3">
              <p className="text-xs text-slate-500 mb-2">Chọn nhanh:</p>
              <div className="flex flex-wrap gap-1.5">
                {badgePresets.map(bp => (
                  <button key={bp.label + bp.value}
                    onClick={() => update('badges', [...config.badges, { label: bp.label, value: bp.value, color: bp.color }])}
                    className="px-2.5 py-1 rounded-full border border-slate-700 text-slate-400 text-[10px] hover:border-amber-700 hover:text-amber-300 transition-colors">
                    + {bp.label}: {bp.value}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              {config.badges.map((badge, i) => (
                <div key={i} className="flex gap-2 items-center group">
                  <select value={badge.color} onChange={e => updateBadge(i, 'color', e.target.value)}
                    className="w-24 shrink-0 bg-slate-800 border border-slate-700 rounded-lg px-2 py-2 text-xs text-white focus:outline-none focus:border-amber-500">
                    {BADGE_COLORS.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <input type="text" value={badge.label} onChange={e => updateBadge(i, 'label', e.target.value)}
                    placeholder="Nhãn (VD: Thời gian)" className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-500" />
                  <input type="text" value={badge.value} onChange={e => updateBadge(i, 'value', e.target.value)}
                    placeholder="Giá trị (VD: 45 phút)" className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-500" />
                  {/* Live badge preview */}
                  {badge.label && badge.value && (
                    <span className={`shrink-0 text-[10px] font-semibold px-2 py-1 rounded-full border ${BADGE_COLOR_STYLES[badge.color] || BADGE_COLOR_STYLES.pink}`}>
                      {badge.label}: {badge.value}
                    </span>
                  )}
                  <button onClick={() => removeBadge(i)} className="opacity-0 group-hover:opacity-100 text-slate-600 hover:text-red-400 transition-all shrink-0"><X size={14} /></button>
                </div>
              ))}
              {config.badges.length < 5 && (
                <button onClick={addBadge} className="flex items-center gap-2 text-xs text-slate-500 hover:text-amber-300 transition-colors px-3 py-2 rounded-lg border border-dashed border-slate-700 hover:border-amber-700 w-full justify-center mt-1">
                  <Plus size={13} /> Thêm thẻ thông tin
                </button>
              )}
            </div>
          </SectionCard>

          {/* STEP 7: Layout & Style (collapsible) */}
          <div className="bg-slate-900/40 border border-slate-800/60 rounded-2xl overflow-hidden">
            <button onClick={() => setShowStylePanel(!showStylePanel)} className="w-full px-5 py-4 flex items-center justify-between hover:bg-slate-800/30 transition-colors">
              <div className="flex items-center gap-3">
                <StepBadge n={6} />
                <div className="text-left">
                  <h3 className="font-semibold text-white text-sm">Bố cục & Phong cách</h3>
                  <p className="text-slate-500 text-xs">{LAYOUT_TEMPLATES[config.layout].label} · {currentStyle.label}</p>
                </div>
              </div>
              <ChevronDown size={18} className={`text-slate-400 transition-transform ${showStylePanel ? 'rotate-180' : ''}`} />
            </button>

            {showStylePanel && (
              <div className="px-5 pb-5 pt-2 border-t border-slate-800/60 space-y-5">
                {/* Layout */}
                <div>
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2.5">Bố cục</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                    {(Object.entries(LAYOUT_TEMPLATES) as [InfographicLayout, typeof LAYOUT_TEMPLATES[InfographicLayout]][]).map(([id, tmpl]) => (
                      <button key={id} onClick={() => update('layout', id)}
                        className={`p-3 rounded-xl border text-center transition-all text-xs ${config.layout === id ? 'border-amber-500 bg-amber-500/10 text-amber-200' : 'border-slate-700/60 bg-slate-800/30 text-slate-400 hover:border-slate-500'}`}>
                        <div className="text-lg mb-1">{tmpl.icon}</div>
                        <div className="font-semibold leading-tight">{tmpl.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Style */}
                <div>
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2.5">Phong cách thiết kế</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                    {(Object.entries(STYLE_TEMPLATES) as [InfographicStyle, typeof STYLE_TEMPLATES[InfographicStyle]][]).map(([id, tmpl]) => (
                      <button key={id} onClick={() => update('style', id)}
                        className={`p-3 rounded-xl border text-center transition-all ${config.style === id ? 'border-amber-500 bg-amber-500/10 text-amber-200' : 'border-slate-700/60 bg-slate-800/30 text-slate-400 hover:border-slate-500'}`}>
                        <div className="w-full h-8 rounded-md mb-2" style={{ background: `linear-gradient(135deg, ${tmpl.bgFrom}, ${tmpl.bgTo})` }} />
                        <div className="text-[11px] font-semibold">{tmpl.label}</div>
                        <div className="text-[9px] text-slate-500 mt-0.5 leading-tight">{tmpl.description}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Additional notes */}
                <div>
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">Ghi chú thêm cho AI (tùy chọn)</label>
                  <textarea value={config.additionalNotes} onChange={e => update('additionalNotes', e.target.value)}
                    placeholder="VD: Thiết kế theo phong cách Nhật Bản, font chữ tròn dễ thương, thêm icon cute cho từng thành phần..."
                    rows={2} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 resize-none" />
                </div>
              </div>
            )}
          </div>

          {error && <div className="bg-red-500/10 border border-red-500/40 text-red-200 px-4 py-3 rounded-xl text-sm">⚠️ {error}</div>}
        </div>

        {/* ── Right Column ── */}
        <div className="lg:col-span-4">
          <div className="sticky top-24 space-y-5">

            {/* Summary */}
            <div className="bg-slate-900/60 rounded-2xl border border-slate-800/60 p-5">
              <h3 className="font-semibold text-white text-sm mb-4 flex items-center gap-2">
                <Sparkles size={14} className="text-amber-400" /> Tóm tắt
              </h3>
              <div className="space-y-2.5 text-xs">
                <div className="flex gap-2.5 p-2.5 bg-slate-800/40 rounded-lg">
                  <span className="text-2xl">{currentType.icon}</span>
                  <div>
                    <p className="text-white font-semibold">{currentType.label}</p>
                    <p className="text-slate-500 text-[10px]">{LAYOUT_TEMPLATES[config.layout].label}</p>
                  </div>
                </div>
                {config.title && (
                  <div className="p-2 bg-slate-800/40 rounded-lg">
                    <p className="text-slate-500 text-[10px]">Tên:</p>
                    <p className="text-white font-semibold">{config.title}</p>
                    {config.subtitle && <p className="text-slate-400 text-[10px]">{config.subtitle}</p>}
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-slate-500">{currentType.ingredientLabel}</span>
                  <span className="text-white">{config.ingredients.filter(i => i.name).length} mục</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">{currentType.stepLabel}</span>
                  <span className="text-white">{config.steps.filter(s => s.title).length} bước</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Thẻ thông tin</span>
                  <span className="text-white">{config.badges.filter(b => b.label && b.value).length} thẻ</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Phong cách</span>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full" style={{ background: currentStyle.bgTo }} />
                    <span className="text-white">{currentStyle.label}</span>
                  </div>
                </div>
                {/* Badge preview */}
                {config.badges.some(b => b.label && b.value) && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {config.badges.filter(b => b.label && b.value).map((b, i) => (
                      <span key={i} className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${BADGE_COLOR_STYLES[b.color] || BADGE_COLOR_STYLES.pink}`}>
                        {b.label}: {b.value}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={isLoading || !config.title.trim()}
              className="w-full py-4 rounded-xl text-base font-semibold text-white shadow-xl transition-all disabled:opacity-50 hover:-translate-y-0.5 disabled:cursor-not-allowed"
              style={{ background: (isLoading || !config.title.trim()) ? '#374151' : 'linear-gradient(135deg, #d97706, #f59e0b)' }}
            >
              {isLoading ? 'Đang tạo hình minh họa AI...' : '✦ Tạo Infographic'}
            </button>

            {!config.title.trim() && <p className="text-center text-xs text-slate-600">Nhập tên sản phẩm/món ăn để bắt đầu</p>}

            {/* Tips */}
            <div className="bg-slate-900/40 rounded-xl border border-slate-800/50 p-4">
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-2.5">Mẹo hay</p>
              <ul className="space-y-1.5 text-xs text-slate-500">
                <li>✦ Dùng mẫu nhanh để bắt đầu nhanh hơn</li>
                <li>✦ Mô tả hình ảnh chính càng chi tiết càng tốt</li>
                <li>✦ Soft Pastel phù hợp với món ăn & mỹ phẩm</li>
                <li>✦ Thêm badge thông tin tóm tắt điểm nổi bật</li>
                <li>✦ Thử tạo nhiều biến thể để chọn cái đẹp nhất</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
