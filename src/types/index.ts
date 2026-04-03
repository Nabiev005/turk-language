// 1. Бардык колдонулган категорияларды бул жерге кошуу керек
export type CategoryId = 
  | 'daily' 
  | 'verbs' 
  | 'family' 
  | 'colors' 
  | 'numbers' 
  | 'adjectives' 
  | 'grammar'
  | 'food'   
  | 'health' 
  | 'nature' 
  | 'place'  
  | 'time';

export interface Word {
  id: number;
  turkish: string;
  kyrgyz: string;
  pronunciation: string; // Сөздүн окулушу
  category: CategoryId;  // CategoryId тибиндеги маанилер гана кабыл алынат
  
  // Кошумча маалыматтар
  exampleSentence?: string; 
  exampleKyrgyz?: string;   
  
  difficulty?: 'easy' | 'medium' | 'hard'; 
  isLearned?: boolean; 
}

export interface Category {
  id: CategoryId;
  title: string;
  icon: string;   
  color?: string; 
}