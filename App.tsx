import React, { useState, useEffect } from 'react';
import { Sparkles, Briefcase, History, Wand2, RefreshCw, Layers, Box, User, Users, Package, ScanFace } from 'lucide-react';
import { AppMode, PhotoConfig, DEFAULT_CONFIG } from './types';
import { UploadArea } from './components/UploadArea';
import { UploadedImage } from './components/MultiUploadArea';
import { SingleSlotUpload } from './components/SingleSlotUpload';
import { Button } from './components/Button';
import { ResultView } from './components/ResultView';
import { ConfigPanel } from './components/ConfigPanel';
import { restorePhoto, generatePersonalPhoto, fileToGenerativePart } from './services/openaiService';

function App() {
  const [mode, setMode] = useState<AppMode>(AppMode.PERSONAL);
  
  // State cho Phục chế (1 ảnh duy nhất)
  const [restorationFile, setRestorationFile] = useState<File | null>(null);
  const [restorationPreview, setRestorationPreview] = useState<string | null>(null);

  // State cho Tạo ảnh - CHỈ 1 NGƯỜI
  const [faceImage, setFaceImage] = useState<UploadedImage | null>(null);
  
  // Products & Logo
  const [productImages, setProductImages] = useState<(UploadedImage | null)[]>([null]);
  const [logoImage, setLogoImage] = useState<UploadedImage | null>(null);

  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [photoConfig, setPhotoConfig] = useState<PhotoConfig>(DEFAULT_CONFIG);

  // --- HANDLERS FOR RESTORATION ---
  const handleRestorationSelect = (file: File) => {
    setRestorationFile(file);
    setRestorationPreview(URL.createObjectURL(file));
    setResultUrl(null);
    setError(null);
  };

  const handleRestorationClear = () => {
    setRestorationFile(null);
    setRestorationPreview(null);
    setResultUrl(null);
    setError(null);
  };

  // --- HANDLERS FOR SINGLE FACE ---
  const handleFaceSelect = (file: File) => {
    setFaceImage({
        id: 'main-face',
        file,
        url: URL.createObjectURL(file)
    });
    setResultUrl(null);
  };

  const handleFaceClear = () => {
    setFaceImage(null);
    setResultUrl(null);
  };

  // --- HANDLERS FOR PRODUCT & LOGO ---
  const updateProductSlot = (index: number, file: File) => {
     const newProducts = [...productImages];
     newProducts[index] = {
        id: Math.random().toString(36).substr(2, 9),
        file,
        url: URL.createObjectURL(file)
     };
     setProductImages(newProducts);
     setResultUrl(null);
  };

  const removeProductSlot = (index: number) => {
     const newProducts = [...productImages];
     newProducts[index] = null;
     setProductImages(newProducts);
  };

  const updateLogo = (file: File) => {
     setLogoImage({
        id: 'logo',
        file,
        url: URL.createObjectURL(file)
     });
     setResultUrl(null);
  };

  const handleModeSwitch = (newMode: AppMode) => {
    setMode(newMode);
    setResultUrl(null);
    setError(null);
    if (newMode === AppMode.PERSONAL) {
      setPhotoConfig(DEFAULT_CONFIG);
    }
  };

  const handleProcess = async () => {
    if (mode === AppMode.RESTORATION && !restorationFile) {
        setError("Vui lòng tải ảnh lên để phục chế.");
        return;
    }
    
    if (mode === AppMode.PERSONAL && photoConfig.source === 'UPLOAD') {
        const hasProduct = productImages.some(img => img !== null);
        
        if (!faceImage && !hasProduct) {
             setError("Vui lòng tải ảnh khuôn mặt của bạn (hoặc sản phẩm).");
             return;
        }
    }
    
    setIsLoading(true);
    setError(null);

    try {
      let generatedImageBase64 = '';

      if (mode === AppMode.RESTORATION) {
        if (!restorationFile) throw new Error("No file");
        const base64Data = await fileToGenerativePart(restorationFile);
        generatedImageBase64 = await restorePhoto(base64Data);
      } else {
        const facesData = faceImage ? [await fileToGenerativePart(faceImage.file)] : [];
        
        const validProducts = productImages.filter((img): img is UploadedImage => img !== null);
        const productsData = await Promise.all(validProducts.map(img => fileToGenerativePart(img.file)));
        
        const logoData = logoImage ? await fileToGenerativePart(logoImage.file) : null;

        generatedImageBase64 = await generatePersonalPhoto({
            faces: facesData, // Send array of 1 (or 0)
            products: productsData,
            logo: logoData
        }, photoConfig);
      }

      setResultUrl(generatedImageBase64);
    } catch (err: any) {
      console.error("Process Error:", err);
      setError(err.message || "Đã có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  const renderInputSection = () => {
    if (mode === AppMode.RESTORATION) {
      return (
        <UploadArea 
          onImageSelected={handleRestorationSelect}
          selectedImage={restorationPreview}
          onClear={handleRestorationClear}
          label="Tải lên ảnh cần phục hồi"
        />
      );
    }

    if (photoConfig.source === 'TEXT_ONLY') {
      return (
        <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-8 text-center text-slate-400">
           <Layers size={48} className="mx-auto mb-4 opacity-50" />
           <p>Chế độ sáng tạo tự do.</p>
           <p className="text-sm">Mô tả chi tiết ý tưởng của bạn trong phần cấu hình.</p>
        </div>
      );
    }

    return (
       <div className="space-y-6">
          {/* Main Face Upload - Prominent */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-blue-300">
                <ScanFace size={18} />
                <span className="text-sm font-bold uppercase tracking-wider">Ảnh Khuôn mặt của bạn (1 Người)</span>
            </div>
            <UploadArea 
                onImageSelected={handleFaceSelect}
                selectedImage={faceImage?.url || null}
                onClear={handleFaceClear}
                label="Tải ảnh chân dung rõ mặt"
            />
          </div>

          <div className="h-px bg-slate-800 my-2"></div>

          {/* Product & Logo Row */}
          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-2">
                <div className="flex items-center gap-2 text-purple-300">
                    <Package size={16} />
                    <span className="text-xs font-bold uppercase tracking-wider">Sản phẩm (Tùy chọn)</span>
                </div>
                <SingleSlotUpload
                    label="Ảnh Sản phẩm"
                    placeholder="+"
                    image={productImages[0]}
                    onUpload={(file) => updateProductSlot(0, file)}
                    onRemove={() => removeProductSlot(0)}
                />
             </div>

             <div className="space-y-2">
                <div className="flex items-center gap-2 text-yellow-300">
                    <Sparkles size={16} />
                    <span className="text-xs font-bold uppercase tracking-wider">Logo (Tùy chọn)</span>
                </div>
                <SingleSlotUpload
                    label="File Logo (PNG)"
                    placeholder="+"
                    accept="image/png,image/jpeg"
                    image={logoImage}
                    onUpload={updateLogo}
                    onRemove={() => setLogoImage(null)}
                />
             </div>
          </div>
       </div>
    );
  };

  const getPreviewImage = () => {
    if (mode === AppMode.RESTORATION) return restorationPreview;
    if (productImages[0] && !faceImage) return productImages[0].url;
    return faceImage?.url;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-blue-500/30">
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-tr from-blue-600 to-purple-600 p-2 rounded-lg">
              <Wand2 size={24} className="text-white" />
            </div>
            <h1 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              ReminiX
            </h1>
          </div>
          <div className="flex items-center gap-4">
             <span className="text-xs text-slate-500 border border-slate-800 rounded-full px-3 py-1">
               Powered by Google Gemini
             </span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="flex justify-center mb-10">
          <div className="bg-slate-900/50 p-1.5 rounded-2xl border border-slate-800 flex flex-col md:flex-row gap-2 md:gap-0">
            <button
              onClick={() => handleModeSwitch(AppMode.PERSONAL)}
              className={`flex items-center gap-3 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                mode === AppMode.PERSONAL 
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/50' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Briefcase size={18} />
              1. Tạo ảnh AI
            </button>
            <button
              onClick={() => handleModeSwitch(AppMode.RESTORATION)}
              className={`flex items-center gap-3 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                mode === AppMode.RESTORATION 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <History size={18} />
              2. Phục chế ảnh cũ
            </button>
          </div>
        </div>

        <div className="space-y-8">
          <div className="text-center space-y-2 mb-8">
            <h2 className="text-3xl font-bold text-white">
              {mode === AppMode.RESTORATION ? 'Phục chế ảnh cũ' : 'Studio Chân Dung AI'}
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              {mode === AppMode.RESTORATION 
                ? 'Tải lên những tấm ảnh cũ, bị xước hoặc mờ. AI sẽ phục hồi độ sắc nét và màu sắc.'
                : 'Tải lên 1 ảnh khuôn mặt rõ nét của bạn. AI sẽ tạo ra những bức ảnh chuyên nghiệp.'}
            </p>
          </div>

          {!resultUrl ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8">
              <div className="lg:col-span-8 space-y-6">
                {mode === AppMode.PERSONAL && (
                  <div className="flex gap-4 mb-4">
                     <button 
                        onClick={() => setPhotoConfig({...photoConfig, source: 'UPLOAD'})}
                        className={`flex-1 py-2 rounded-lg border text-sm font-medium transition-colors ${photoConfig.source === 'UPLOAD' ? 'border-purple-500 bg-purple-500/10 text-purple-200' : 'border-slate-700 bg-slate-800 text-slate-400'}`}
                     >
                       Từ ảnh mẫu
                     </button>
                     <button 
                        onClick={() => {
                           setPhotoConfig({...photoConfig, source: 'TEXT_ONLY'});
                        }}
                        className={`flex-1 py-2 rounded-lg border text-sm font-medium transition-colors ${photoConfig.source === 'TEXT_ONLY' ? 'border-purple-500 bg-purple-500/10 text-purple-200' : 'border-slate-700 bg-slate-800 text-slate-400'}`}
                     >
                       Tự tạo (Không cần ảnh)
                     </button>
                  </div>
                )}

                <div className="bg-slate-900/30 border border-slate-800/50 rounded-2xl p-4 md:p-6">
                   {renderInputSection()}
                </div>

                {mode === AppMode.PERSONAL && (
                  <ConfigPanel
                    config={photoConfig}
                    onChange={setPhotoConfig}
                    imageFlags={{
                      hasFaces: faceImage !== null,
                      hasProducts: productImages.some(img => img !== null),
                      hasLogo: logoImage !== null,
                    }}
                  />
                )}

                {error && (
                  <div className="bg-red-500/10 border border-red-500/50 text-red-200 p-4 rounded-lg text-sm animate-pulse">
                    ⚠️ {error}
                  </div>
                )}
              </div>

              <div className="lg:col-span-4 flex flex-col space-y-6">
                <div className="sticky top-24 space-y-6">
                  <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
                    <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                      <Sparkles size={16} className="text-yellow-400" />
                      Mẹo tối ưu
                    </h3>
                    <ul className="space-y-3 text-sm text-slate-400">
                      {mode === AppMode.RESTORATION ? (
                        <>
                          <li className="flex gap-2">✓ Ưu tiên ảnh scan độ phân giải cao.</li>
                          <li className="flex gap-2">✓ Chỉ phục hồi tốt nhất cho ảnh chân dung.</li>
                        </>
                      ) : (
                        <>
                           <li className="flex gap-2"><span className="text-blue-400 font-bold">✦</span> Upload ảnh mặt → AI giữ nguyên khuôn mặt bạn (OpenAI).</li>
                           <li className="flex gap-2">✓ Ảnh mặt nên nhìn thẳng, rõ nét, không bị che.</li>
                           <li className="flex gap-2">✓ Không upload ảnh → sáng tạo tự do theo prompt.</li>
                           <li className="flex gap-2">✓ Mô tả chi tiết trang phục, bối cảnh trong ghi chú.</li>
                        </>
                      )}
                    </ul>
                  </div>

                  <Button 
                    onClick={handleProcess} 
                    disabled={isLoading}
                    isLoading={isLoading}
                    variant={mode === AppMode.RESTORATION ? 'primary' : 'secondary'}
                    className="w-full text-lg py-4 shadow-xl hover:translate-y-[-2px]"
                  >
                    {mode === AppMode.RESTORATION ? 'Bắt đầu Phục hồi' : 'Tạo Ảnh Chân Dung'}
                  </Button>
                </div>
              </div>

            </div>
          ) : (
            <ResultView 
              originalImage={getPreviewImage() || ""}
              resultImage={resultUrl}
              onReset={() => {
                setResultUrl(null);
              }}
              mode={mode}
            />
          )}

        </div>
      </main>
    </div>
  );
}

export default App;