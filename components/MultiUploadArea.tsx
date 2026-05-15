import React, { useRef } from 'react';
import { Upload, X, Plus, Image as ImageIcon } from 'lucide-react';

export interface UploadedImage {
  id: string;
  file: File;
  url: string;
}

interface MultiUploadAreaProps {
  images: UploadedImage[];
  onAdd: (files: File[]) => void;
  onRemove: (id: string) => void;
  maxFiles: number;
  label: string;
  subLabel?: string;
  accept?: string;
}

export const MultiUploadArea: React.FC<MultiUploadAreaProps> = ({ 
  images, 
  onAdd, 
  onRemove, 
  maxFiles, 
  label,
  subLabel,
  accept = "image/*" 
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      onAdd(newFiles);
    }
    // Reset input value to allow selecting the same file again if needed
    if (inputRef.current) inputRef.current.value = '';
  };

  const triggerUpload = () => {
    inputRef.current?.click();
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-slate-300 uppercase tracking-wider flex items-center gap-2">
           <ImageIcon size={16} className="text-blue-400" /> {label} <span className="text-slate-500 text-xs normal-case">({images.length}/{maxFiles})</span>
        </label>
      </div>
      
      <div className="grid grid-cols-3 gap-3">
        {/* Render Existing Images */}
        {images.map((img, index) => (
          <div key={img.id} className="relative aspect-square rounded-xl overflow-hidden border border-slate-600 group bg-slate-900">
            <img src={img.url} alt={`Upload ${index}`} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button 
                onClick={() => onRemove(img.id)}
                className="bg-red-500/80 hover:bg-red-600 p-1.5 rounded-full text-white transition-transform transform hover:scale-110"
              >
                <X size={14} />
              </button>
            </div>
            <div className="absolute bottom-1 right-1 bg-black/60 px-1.5 py-0.5 rounded text-[10px] text-white font-mono">
              #{index + 1}
            </div>
          </div>
        ))}

        {/* Add Button (if limit not reached) */}
        {images.length < maxFiles && (
          <div 
            onClick={triggerUpload}
            className="aspect-square rounded-xl border-2 border-dashed border-slate-700 hover:border-blue-500 hover:bg-slate-800/50 flex flex-col items-center justify-center cursor-pointer transition-all group"
          >
            <div className="bg-slate-800 p-2 rounded-full mb-1 group-hover:bg-blue-500/20 group-hover:text-blue-400 transition-colors">
              <Plus size={20} className="text-slate-400 group-hover:text-blue-400" />
            </div>
            <span className="text-[10px] text-slate-500 font-medium text-center px-1">
              {subLabel || "Thêm ảnh"}
            </span>
          </div>
        )}
      </div>

      <input 
        type="file" 
        ref={inputRef} 
        onChange={handleFileChange} 
        accept={accept} 
        multiple 
        className="hidden" 
      />
    </div>
  );
};
