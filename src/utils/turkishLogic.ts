// 1. Акыркы үндүү тамганы табуу
export const getLastVowel = (word: string): string => {
  const vowels = "aeıioöuü";
  const lowerWord = word.toLowerCase();
  for (let i = lowerWord.length - 1; i >= 0; i--) {
    if (vowels.includes(lowerWord[i])) return lowerWord[i];
  }
  return 'e';
};

// 2. Сөздүн аягындагы үнсүз тамганы жумшартуу (p, ç, t, k)
const softenWord = (word: string): string => {
  const lastChar = word.slice(-1).toLowerCase();
  const base = word.slice(0, -1);
  const mutations: Record<string, string> = {
    'p': 'b', 'ç': 'c', 't': 'd', 'k': 'ğ'
  };
  return mutations[lastChar] ? base + mutations[lastChar] : word;
};

// 3. Менин ... (Possessive: -ım, -im, -um, -üm)
export const getMySuffix = (word: string): string => {
  const lastVowel = getLastVowel(word);
  const lastChar = word.slice(-1).toLowerCase();
  const vowels = "aeıioöuü";
  if (vowels.includes(lastChar)) return word + 'm';
  const softened = softenWord(word);
  const harmony: Record<string, string> = {
    'a': 'ım', 'ı': 'ım', 'e': 'im', 'i': 'im',
    'o': 'um', 'u': 'um', 'ö': 'üm', 'ü': 'üm'
  };
  return softened + (harmony[lastVowel] || 'im');
};

// 4. Көптүк түр (Plural: -lar, -ler)
export const getPluralSuffix = (word: string): string => {
  const lastVowel = getLastVowel(word);
  return "aıou".includes(lastVowel) ? word + "lar" : word + "ler";
};

// 5. -да / -де (Locative: Кайда?)
export const getInSuffix = (word: string): string => {
  const lastVowel = getLastVowel(word);
  const lastChar = word.slice(-1).toLowerCase();
  const hardConsonants = "fstkçşhp";
  const dOrT = hardConsonants.includes(lastChar) ? 't' : 'd';
  const aOrE = "aıou".includes(lastVowel) ? 'a' : 'e';
  return word + dOrT + aOrE;
};

// 6. -га / -ге (Dative: Кайда?) - VS Code'догу катаны ушул функция оңдойт!
export const getToSuffix = (word: string): string => {
  const lastVowel = getLastVowel(word);
  const lastChar = word.slice(-1).toLowerCase();
  const vowels = "aeıioöuü";
  const aOrE = "aıou".includes(lastVowel) ? 'a' : 'e';

  // Эгер үндүү менен бүтсө, арага 'y' кирет
  if (vowels.includes(lastChar)) return word + 'y' + aOrE;
  return word + aOrE;
};

// 7. -ны / -ни (Accusative: Кимди?)
export const getObjectSuffix = (word: string): string => {
  const lastVowel = getLastVowel(word);
  const lastChar = word.slice(-1).toLowerCase();
  const vowels = "aeıioöuü";
  const harmony: Record<string, string> = {
    'a': 'ı', 'ı': 'ı', 'e': 'i', 'i': 'i', 'o': 'u', 'u': 'u', 'ö': 'ü', 'ü': 'ü'
  };
  const suffix = harmony[lastVowel] || 'i';
  if (vowels.includes(lastChar)) return word + 'y' + suffix;
  return softenWord(word) + suffix;
};

// 8. -дан / -ден (Ablative: Кайдан?)
export const getFromSuffix = (word: string): string => {
  const lastVowel = getLastVowel(word);
  const lastChar = word.slice(-1).toLowerCase();
  const hardConsonants = "fstkçşhp";
  const dOrT = hardConsonants.includes(lastChar) ? 't' : 'd';
  const aOrE = "aıou".includes(lastVowel) ? 'a' : 'e';
  return word + dOrT + aOrE + 'n';
};

// 9. -нын / -нин (Genitive: Кимдин?)
export const getOfSuffix = (word: string): string => {
  const lastVowel = getLastVowel(word);
  const lastChar = word.slice(-1).toLowerCase();
  const vowels = "aeıioöuü";
  const harmony: Record<string, string> = {
    'a': 'ın', 'ı': 'ın', 'e': 'in', 'i': 'in', 'o': 'un', 'u': 'un', 'ö': 'ün', 'ü': 'ün'
  };
  const suffix = harmony[lastVowel] || 'in';
  // Үндүү менен бүтсө 'n' тамгасы кошулат (Мисалы: Araba-n-ın)
  if (vowels.includes(lastChar)) return word + 'n' + suffix;
  return softenWord(word) + suffix;
};