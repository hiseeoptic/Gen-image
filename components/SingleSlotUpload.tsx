import React, { useRef } from 'react';
import { X, Plus, Image as ImageIcon } from 'lucide-react';
import { UploadedImage } from './MultiUploadArea';

interface SingleSlotUploadProps {
  image: UploadedImage | null;
  onUpload: (file: File) => void;
  onRemove: () => void;
  label: string;
  accept?: string;
  placeholder?: string;
  compact?: boolean; // New prop for smaller styling
}

export const SingleSlotUpload: React.FC<SingleSlotUploadProps> = ({ 
  image, 
  onUpload, 
  onRemove, 
  label, 
  accept = "image/*",
  placeholder = "+",
  compact = false
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onUpload(e.target.files[0]);
    }
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className={`flex flex-col gap-1 ${compact ? 'w-full' : ''}`}>
      <div className="flex justify-between items-center px-1">
        <span className="text-[10px] md:text-xs font-semibold text-slate-400 uppercase truncate" title={label}>
            {label}
        </span>
        {image && (
             <button 
                onClick={(e) => { e.stopPropagation(); onRemove(); }}
                className="text-red-400 hover:text-red-300 text-[10px] bg-slate-800 rounded-full p-0.5"
                title="Xóa"
             >
                <X size={10} />
             </button>
        )}
      </div>

      <div 
        onClick={() => inputRef.current?.click()}
        className={`
            relative w-full rounded-lg overflow-hidden border transition-all group
            ${image ? 'border-slate-600 bg-black' : 'border-dashed border-slate-700 hover:border-blue-500 hover:bg-slate-800/50 cursor-pointer'}
            ${compact ? 'aspect-square' : 'aspect-[3/4]'}
        `}
      >
        {image ? (
            <>
                <img src={image.url} alt={label} className="w-full h-full object-cover" />
                {/* Overlay to change image */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-[10px] text-white font-medium">Thay đổi</span>
                </div>
            </>
        ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500">
                <Plus size={compact ? 20 : 24} className="mb-1" />
                {!compact && <span className="text-[10px] text-center px-1">{placeholder}</span>}
            </div>
        )}
        
        <input 
            type="file" 
            ref={inputRef} 
            onChange={handleFileChange} 
            accept={accept} 
            className="hidden" 
        />
      </div>
    </div>
  );
};