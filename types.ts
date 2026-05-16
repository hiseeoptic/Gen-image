export enum AppMode {
  RESTORATION = 'RESTORATION',
  PERSONAL = 'PERSONAL',
}

export interface GeneratedImage {
  originalParams: string;
  imageUrl: string;
  timestamp: number;
}

export type SubjectType = 'MALE' | 'FEMALE' | 'COUPLE' | 'GROUP' | 'PRODUCT';
export type GenerationSource = 'UPLOAD' | 'TEXT_ONLY';

export interface PhotoConfig {
  source: GenerationSource;
  subjectType: SubjectType;
  customSubjectCount: string;
  
  // Outfit
  outfitCategory: string; 
  outfitDetail: string;   
  outfitImage: string | null; 
  
  // Context
  contextCategory: string; 
  contextDetail: string;   

  // Pose
  pose: string;

  // Photography Style (New)
  photographyStyle: string;
  photographyStyleCategory: 'special' | 'standard';

  // Technical & Vibe
  lighting: string;
  cameraAngle: string;
  aspectRatio: string;

  // Face & Quality
  quality: string;        
  expression: string;     
  faceEnhancements: string[]; 
  
  additionalPrompt: string;
}

export const DEFAULT_CONFIG: PhotoConfig = {
  source: 'UPLOAD',
  subjectType: 'FEMALE',
  customSubjectCount: '',
  
  outfitCategory: 'suit',
  outfitDetail: 'classic_suit',
  outfitImage: null,
  
  contextCategory: 'office',
  contextDetail: 'ceo_desk',

  pose: 'Standing naturally, confident posture', 
  photographyStyle: 'Front-facing studio portrait, symmetrical face, clean neutral background', // Default style
  
  photographyStyleCategory: 'standard',

  lighting: 'Soft Studio',
  cameraAngle: 'Eye Level',
  aspectRatio: '9:16',

  quality: 'Photorealistic 8K',
  expression: 'Friendly', 
  faceEnhancements: [], 
  
  additionalPrompt: '',
};

export interface OptionItem {
  id: string;
  label: string;
  value: string; 
}

export interface CategoryItem {
  id: string;
  label: string;
  options: OptionItem[];
}

export type LoadingState = 'IDLE' | 'UPLOADING' | 'PROCESSING' | 'SUCCESS' | 'ERROR';