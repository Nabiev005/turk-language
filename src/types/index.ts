// Сөздөрдүн категорияларынын тизмеси
export type CategoryId = 
  | 'daily' 
  | 'verbs' 
  | 'family' 
  | 'colors' 
  | 'numbers' 
  | 'adjectives' 
  | 'grammar';

export interface Word {
  id: number;
  turkish: string;
  kyrgyz: string;
  pronunciation: string; // Сөздүн окулушу
  category: CategoryId;  // Кайсы топко кирет
  
  // Кошумча маалыматтар (Мисалдар жана деңгээл)
  exampleSentence?: string; // Түркчө мисал: "Bugün hava çok güzel."
  exampleKyrgyz?: string;   // Кыргызча котормосу: "Бүгүн аба ырайы абдан сонун."
  
  difficulty?: 'easy' | 'medium' | 'hard'; // Сөздүн татаалдыгы
  isLearned?: boolean; // Колдонуучу бул сөздү жаттадыбы? (прогресс үчүн)
}

export interface Category {
  id: CategoryId;
  title: string;
  icon: string;   // Эмодзи же Lucide-react иконкасынын аты
  color?: string; // Интерфейсте ар бир категорияны ар башка түс менен көрсөтүү үчүн
}