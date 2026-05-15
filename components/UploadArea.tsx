import React, { useRef, useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface UploadAreaProps {
  onImageSelected: (file: File) => void;
  selectedImage: string | null;
  onClear: () => void;
  label: string;
}

export const UploadArea: React.FC<UploadAreaProps> = ({ onImageSelected, selectedImage, onClear, label }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageSelected(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onImageSelected(e.dataTransfer.files[0]);
    }
  };

  if (selectedImage) {
    return (
      <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden border-2 border-slate-700 group">
        <img 
          src={selectedImage} 
          alt="Selected" 
          className="w-full h-full object-contain bg-slate-800"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button 
            onClick={onClear}
            className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-full transform hover:scale-110 transition-transform"
          >
            <X size={24} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`
        w-full h-64 md:h-80 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all duration-300
        ${isDragging 
          ? 'border-blue-500 bg-blue-500/10' 
          : 'border-slate-600 hover:border-slate-400 hover:bg-slate-800/50 bg-slate-800/20'}
      `}
    >
      <input 
        type="file" 
        ref={inputRef} 
        onChange={handleFileChange} 
        accept="image/*" 
        className="hidden" 
      />
      <div className="bg-slate-700/50 p-4 rounded-full mb-4">
        <Upload size={32} className="text-blue-400" />
      </div>
      <p className="text-lg font-medium text-slate-200 mb-2">{label}</p>
      <p className="text-sm text-slate-400">Kéo thả hoặc click để tải ảnh lên</p>
      <p className="text-xs text-slate-500 mt-2">Hỗ trợ JPG, PNG</p>
    </div>
  );
};