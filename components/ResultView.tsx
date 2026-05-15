import React from 'react';
import { Download, Sparkles, RefreshCw } from 'lucide-react';
import { Button } from './Button';
import { AppMode } from '../types';

interface ResultViewProps {
  originalImage: string | null;
  resultImage: string;
  onReset: () => void;
  mode: AppMode;
}

export const ResultView: React.FC<ResultViewProps> = ({ originalImage, resultImage, onReset, mode }) => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = resultImage;
    link.download = `reminix-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full animate-fade-in space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
          Kết quả hoàn tất!
        </h3>
        <div className="flex gap-2">
           <Button onClick={onReset} variant="outline" className="px-4 py-2 text-sm">
             <RefreshCw size={16} className="mr-2" /> Làm mới
           </Button>
           <Button onClick={handleDownload} className="px-4 py-2 text-sm">
             <Download size={16} className="mr-2" /> Tải về
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Original (Only show if relevant, mainly for restoration) */}
        {mode === AppMode.RESTORATION && originalImage && (
          <div className="space-y-2">
            <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Ảnh gốc</p>
            <div className="rounded-xl overflow-hidden border border-slate-700 bg-slate-900/50 aspect-square md:aspect-auto h-64 md:h-96 relative">
               <img src={originalImage} alt="Original" className="w-full h-full object-contain" />
            </div>
          </div>
        )}

        {/* Result */}
        <div className={`${mode === AppMode.PERSONAL ? 'md:col-span-2' : ''} space-y-2`}>
           <p className="text-sm font-semibold text-blue-400 uppercase tracking-wider flex items-center gap-2">
             <Sparkles size={14} /> Ảnh AI tạo ra
           </p>
           <div className={`rounded-xl overflow-hidden border-2 border-blue-500/30 shadow-2xl shadow-blue-900/20 bg-slate-900/50 ${mode === AppMode.PERSONAL ? 'h-[500px]' : 'h-64 md:h-96'} relative`}>
              <img src={resultImage} alt="Result" className="w-full h-full object-contain" />
           </div>
        </div>
      </div>
    </div>
  );
};