export const speakTurkish = (text: string) => {
  // Браузерде сүйлөө мүмкүнчүлүгүн текшерүү
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'tr-TR'; // Түрк тилинин коду
    utterance.rate = 0.9;     // Сүйлөө ылдамдыгы (бир аз жайыраак)
    window.speechSynthesis.speak(utterance);
  } else {
    alert("Кечириңиз, сиздин браузериңиз үн коштоосун колдобойт.");
  }
};