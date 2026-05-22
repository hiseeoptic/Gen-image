import React, { useState, useCallback, useRef } from 'react';
import { Download, RefreshCw, Sparkles, ChevronDown, ChevronUp, Package, Zap, ImageIcon, Check } from 'lucide-react';
import { PosterConfig, PosterStyle, PosterFormat, ProductCategory } from '../types';
import { fileToGenerativePart } from '../services/openaiService';
import { STYLE_TEMPLATES, FORMAT_INFO, buildPosterPrompt, generatePoster } from '../services/posterService';
import { Button } from './Button';
import { PromptBox } from './PromptBox';

const DEFAULT_CONFIG: PosterConfig = {
  style: 'minimal_luxury',
  format: 'instagram_post',
  headline: '',
  subheadline: '',
  cta: '',
  colorPreference: '',
  productCategory: 'auto',
};

const PRODUCT_CATEGORIES: { id: ProductCategory; label: string }[] = [
  { id: 'auto', label: '✦ Tự động nhận diện' },
  { id: 'skincare', label: '🌸 Mỹ phẩm / Skincare' },
  { id: 'perfume', label: '🌺 Nước hoa' },
  { id: 'supplement', label: '💪 Thực phẩm chức năng' },
  { id: 'tech', label: '💻 Công nghệ' },
  { id: 'fashion', label: '👔 Thời trang' },
  { id: 'jewelry', label: '💎 Trang sức' },
  { id: 'beverage', label: '🍵 Đồ uống' },
  { id: 'food', label: '🍱 Thực phẩm' },
];

export function PosterStudio() {
  const [productFile, setProductFile] = useState<File | null>(null);
  const [productPreview, setProductPreview] = useState<string | null>(null);
  const [config, setConfig] = useState<PosterConfig>(DEFAULT_CONFIG);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [lastPrompt, setLastPrompt] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showTextOptions, setShowTextOptions] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) return;
    setProductFile(file);
    setProductPreview(URL.createObjectURL(file));
    setResultUrl(null);
    setError(null);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  }, [handleFileSelect]);

  const updateConfig = <K extends keyof PosterConfig>(key: K, value: PosterConfig[K]) => {
    setConfig(prev => ({ ...prev, [key]: value }));
    setResultUrl(null);
  };

  const handleGenerate = async () => {
    if (!productFile) {
      setError('Vui lòng tải ảnh sản phẩm lên trước.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setLastPrompt(buildPosterPrompt(config));
    try {
      const base64 = await fileToGenerativePart(productFile);
      const url = await generatePoster(base64, productFile.type || 'image/jpeg', config);
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
    a.download = `poster-${config.style}-${Date.now()}.png`;
    a.click();
  };

  const currentStyle = STYLE_TEMPLATES[config.style];
  const currentFormat = FORMAT_INFO[config.format];

  if (resultUrl) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h3 className="text-xl font-bold text-white">
              {currentStyle.emoji} Poster đã tạo xong!
            </h3>
            <p className="text-slate-400 text-sm mt-1">
              {currentStyle.label} · {currentFormat.label} ({currentFormat.ratio})
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setResultUrl(null)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white transition-colors text-sm"
            >
              <RefreshCw size={14} />
              Tạo lại
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-5 py-2 rounded-lg bg-green-600 hover:bg-green-500 text-white transition-colors text-sm font-semibold shadow-lg shadow-green-900/40"
            >
              <Download size={14} />
              Tải xuống
            </button>
          </div>
        </div>

        <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/50 shadow-2xl">
          <img src={resultUrl} alt="Generated poster" className="w-full max-h-[80vh] object-contain" />
        </div>

        <PromptBox prompt={lastPrompt} label="Xem Poster Prompt · Copy sang Nano Banana / Midjourney" />

        <div className="flex gap-4 justify-center pt-2">
          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold transition-all disabled:opacity-50 shadow-lg shadow-purple-900/40 hover:-translate-y-0.5"
          >
            <Zap size={16} />
            Tạo biến thể mới
          </button>
          <button
            onClick={() => { setResultUrl(null); setConfig(DEFAULT_CONFIG); setProductFile(null); setProductPreview(null); }}
            className="flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white transition-colors font-semibold"
          >
            Tạo poster mới
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold px-3 py-1 rounded-full mb-2">
          <Zap size={12} />
          AI Poster Creator
        </div>
        <h2 className="text-3xl font-bold text-white">Tạo Poster Quảng Cáo Chuyên Nghiệp</h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Upload ảnh sản phẩm → Chọn style → Tạo poster đẹp như agency thiết kế. Không cần Photoshop, không cần biết thiết kế.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Steps */}
        <div className="lg:col-span-8 space-y-5">

          {/* STEP 1: Upload */}
          <div className="bg-slate-900/40 border border-slate-800/60 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-purple-600 text-white text-xs font-bold w-7 h-7 rounded-full flex items-center justify-center shrink-0">1</span>
              <h3 className="font-semibold text-white">Tải ảnh sản phẩm lên</h3>
              <span className="text-xs text-slate-500 ml-auto">JPG · PNG · WEBP</span>
            </div>

            {!productPreview ? (
              <div
                onDrop={handleDrop}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all ${
                  isDragging
                    ? 'border-purple-400 bg-purple-500/10 scale-[1.01]'
                    : 'border-slate-700 hover:border-purple-500/60 hover:bg-slate-800/30'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                />
                <Package size={40} className="mx-auto mb-3 text-slate-500" />
                <p className="text-slate-200 font-medium">Kéo thả ảnh vào đây hoặc click để chọn</p>
                <p className="text-slate-500 text-sm mt-1.5">Ảnh nền trắng hoặc nền đơn giản cho kết quả tốt nhất</p>
              </div>
            ) : (
              <div className="flex items-center gap-4 p-3 bg-slate-800/40 rounded-xl border border-slate-700/50">
                <img
                  src={productPreview}
                  alt="Product"
                  className="h-20 w-20 object-contain rounded-lg border border-slate-700 bg-slate-900 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium text-sm truncate">{productFile?.name}</p>
                  <p className="text-slate-400 text-xs mt-0.5">
                    {productFile ? (productFile.size / 1024 < 1024
                      ? Math.round(productFile.size / 1024) + ' KB'
                      : (productFile.size / 1024 / 1024).toFixed(1) + ' MB') : ''}
                  </p>
                  <span className="inline-flex items-center gap-1 text-green-400 text-xs mt-1 font-medium">
                    <Check size={11} /> Đã tải lên thành công
                  </span>
                </div>
                <button
                  onClick={() => { setProductFile(null); setProductPreview(null); setResultUrl(null); }}
                  className="text-xs text-red-400 hover:text-red-300 transition-colors px-3 py-1.5 rounded-lg border border-red-900/50 hover:border-red-700 shrink-0"
                >
                  Đổi ảnh
                </button>
              </div>
            )}
          </div>

          {/* STEP 2: Style */}
          <div className="bg-slate-900/40 border border-slate-800/60 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-purple-600 text-white text-xs font-bold w-7 h-7 rounded-full flex items-center justify-center shrink-0">2</span>
              <h3 className="font-semibold text-white">Chọn phong cách poster</h3>
              <span className="text-xs text-slate-500 ml-auto">15 styles</span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2.5">
              {(Object.entries(STYLE_TEMPLATES) as [PosterStyle, typeof STYLE_TEMPLATES[PosterStyle]][]).map(([id, style]) => (
                <button
                  key={id}
                  onClick={() => updateConfig('style', id)}
                  className={`relative overflow-hidden rounded-xl p-2 border-2 transition-all hover:scale-[1.03] active:scale-[0.97] group ${
                    config.style === id
                      ? 'border-purple-400 shadow-lg shadow-purple-900/50 ring-1 ring-purple-500/50'
                      : 'border-slate-700/60 hover:border-slate-500'
                  }`}
                >
                  <div
                    className="h-14 rounded-lg mb-1.5 flex items-center justify-center text-xl font-bold transition-transform group-hover:scale-110"
                    style={{ background: `linear-gradient(135deg, ${style.bgFrom}, ${style.bgTo})`, color: style.textColor }}
                  >
                    {style.emoji}
                  </div>
                  <p className="text-[10px] font-semibold text-white text-center leading-tight">{style.label}</p>
                  {config.style === id && (
                    <div className="absolute top-1.5 right-1.5 w-3.5 h-3.5 bg-purple-500 rounded-full flex items-center justify-center">
                      <Check size={8} className="text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* STEP 3: Format */}
          <div className="bg-slate-900/40 border border-slate-800/60 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-purple-600 text-white text-xs font-bold w-7 h-7 rounded-full flex items-center justify-center shrink-0">3</span>
              <h3 className="font-semibold text-white">Chọn kích thước & nền tảng</h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
              {(Object.entries(FORMAT_INFO) as [PosterFormat, typeof FORMAT_INFO[PosterFormat]][]).map(([id, fmt]) => (
                <button
                  key={id}
                  onClick={() => updateConfig('format', id)}
                  className={`p-3 rounded-xl border text-center transition-all hover:scale-[1.02] ${
                    config.format === id
                      ? 'border-blue-500 bg-blue-500/10 text-blue-200 shadow-md shadow-blue-900/30'
                      : 'border-slate-700/60 bg-slate-800/30 text-slate-400 hover:border-slate-500 hover:text-slate-300'
                  }`}
                >
                  <div className="text-xl mb-1.5">{fmt.icon}</div>
                  <div className="text-xs font-semibold leading-tight">{fmt.label}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{fmt.description}</div>
                  <div className={`text-[10px] mt-1 font-mono ${config.format === id ? 'text-blue-400' : 'text-slate-600'}`}>
                    {fmt.ratio}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* STEP 4: Text & Details (Optional) */}
          <div className="bg-slate-900/40 border border-slate-800/60 rounded-2xl overflow-hidden">
            <button
              onClick={() => setShowTextOptions(!showTextOptions)}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-800/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="bg-slate-700 text-white text-xs font-bold w-7 h-7 rounded-full flex items-center justify-center shrink-0">4</span>
                <div className="text-left">
                  <h3 className="font-semibold text-white text-sm">Text, màu sắc & loại sản phẩm</h3>
                  <p className="text-slate-500 text-xs">Tùy chọn — bỏ qua nếu muốn AI tự sáng tạo</p>
                </div>
              </div>
              <div className={`text-slate-400 transition-transform ${showTextOptions ? 'rotate-180' : ''}`}>
                <ChevronDown size={18} />
              </div>
            </button>

            {showTextOptions && (
              <div className="px-6 pb-6 pt-2 border-t border-slate-800/60 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { key: 'headline' as const, label: 'Tiêu đề chính (Headline)', placeholder: 'VD: Làm sáng da trong 7 ngày' },
                    { key: 'subheadline' as const, label: 'Tiêu đề phụ (Subheadline)', placeholder: 'VD: Chiết xuất thiên nhiên 100%' },
                    { key: 'cta' as const, label: 'Nút kêu gọi hành động (CTA)', placeholder: 'VD: Mua ngay – Giảm 30%' },
                    { key: 'colorPreference' as const, label: 'Màu sắc ưa thích', placeholder: 'VD: Hồng pastel và vàng gold' },
                  ].map(({ key, label, placeholder }) => (
                    <div key={key}>
                      <label className="text-xs font-medium text-slate-400 uppercase tracking-wider block mb-1.5">
                        {label}
                      </label>
                      <input
                        type="text"
                        value={config[key] as string}
                        onChange={(e) => updateConfig(key, e.target.value)}
                        placeholder={placeholder}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-purple-500 transition-colors"
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-400 uppercase tracking-wider block mb-2.5">
                    Loại sản phẩm <span className="text-slate-600 normal-case font-normal">(giúp AI chọn ánh sáng phù hợp)</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {PRODUCT_CATEGORIES.map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => updateConfig('productCategory', cat.id)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                          config.productCategory === cat.id
                            ? 'border-purple-500 bg-purple-500/15 text-purple-300 shadow-sm'
                            : 'border-slate-700 bg-slate-800/50 text-slate-400 hover:border-slate-600 hover:text-slate-300'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/40 text-red-200 px-4 py-3 rounded-xl text-sm">
              ⚠️ {error}
            </div>
          )}
        </div>

        {/* Right: Summary + Generate */}
        <div className="lg:col-span-4">
          <div className="sticky top-24 space-y-5">

            {/* Config summary card */}
            <div className="bg-slate-900/60 rounded-2xl border border-slate-800/60 p-5">
              <h3 className="font-semibold text-white mb-4 flex items-center gap-2 text-sm">
                <Sparkles size={14} className="text-yellow-400" />
                Cấu hình hiện tại
              </h3>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div
                    className="w-10 h-10 rounded-lg shrink-0 flex items-center justify-center text-sm font-bold"
                    style={{ background: `linear-gradient(135deg, ${currentStyle.bgFrom}, ${currentStyle.bgTo})`, color: currentStyle.textColor }}
                  >
                    {currentStyle.emoji}
                  </div>
                  <div>
                    <p className="text-white text-xs font-semibold">{currentStyle.label}</p>
                    <p className="text-slate-500 text-[10px]">Phong cách poster</p>
                  </div>
                </div>

                <div className="h-px bg-slate-800" />

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Kích thước</span>
                    <span className="text-white font-medium">{currentFormat.label} ({currentFormat.ratio})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Sản phẩm</span>
                    <span className={productPreview ? 'text-green-400 font-medium' : 'text-slate-600'}>
                      {productPreview ? '✓ Đã tải lên' : 'Chưa có'}
                    </span>
                  </div>
                  {config.headline && (
                    <div className="flex justify-between gap-2">
                      <span className="text-slate-500 shrink-0">Tiêu đề</span>
                      <span className="text-slate-300 text-right truncate">{config.headline}</span>
                    </div>
                  )}
                  {config.productCategory !== 'auto' && (
                    <div className="flex justify-between">
                      <span className="text-slate-500">Danh mục</span>
                      <span className="text-slate-300">
                        {PRODUCT_CATEGORIES.find(c => c.id === config.productCategory)?.label}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Product preview with style overlay */}
            {productPreview && (
              <div className="relative overflow-hidden rounded-2xl aspect-square border border-slate-800/60 bg-slate-900">
                <img src={productPreview} alt="Product preview" className="w-full h-full object-contain p-6" />
                <div
                  className="absolute inset-0 opacity-20 pointer-events-none"
                  style={{ background: `linear-gradient(135deg, ${currentStyle.bgFrom}, ${currentStyle.bgTo})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-white text-[10px] font-semibold opacity-70">{currentStyle.label} preview</p>
                </div>
              </div>
            )}

            <Button
              onClick={handleGenerate}
              disabled={isLoading || !productFile}
              isLoading={isLoading}
              variant="secondary"
              className="w-full py-4 text-base font-semibold shadow-xl hover:-translate-y-0.5"
            >
              {isLoading ? 'Đang tạo poster...' : '✦ Tạo Poster Ngay'}
            </Button>

            {!productFile && (
              <p className="text-center text-xs text-slate-600">Tải ảnh sản phẩm lên để bắt đầu</p>
            )}

            {/* Tips */}
            <div className="bg-slate-900/40 rounded-xl border border-slate-800/50 p-4">
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <ImageIcon size={11} /> Mẹo hay
              </p>
              <ul className="space-y-1.5 text-xs text-slate-500">
                <li>✦ Ảnh sản phẩm nền trắng → poster đẹp hơn hẳn</li>
                <li>✦ Chọn đúng danh mục để AI tối ưu ánh sáng</li>
                <li>✦ Thêm headline ngắn gọn, dễ nhớ, gây tò mò</li>
                <li>✦ Thử nhiều style để chọn ra cái ưng ý nhất</li>
                <li>✦ Tạo biến thể mới để có nhiều lựa chọn</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
