import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { turkishWords, categories } from '../data/words';
import type { Word, CategoryId, Category } from '../types';

// --- Үн коштоо функциясы ---
const speakTurkish = (text: string) => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'tr-TR';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  }
};

// --- Стильдер ---
const QuizContainer = styled.div`
  max-width: 600px;
  margin: 40px auto;
  padding: 35px;
  background: white;
  border-radius: 30px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.06);
  text-align: center;
  position: relative;
  @media (max-width: 500px) { margin: 15px; padding: 20px; }
`;

const TimerBarContainer = styled.div`
  width: 100%;
  height: 8px;
  background: #f1f5f9;
  border-radius: 10px;
  margin: 20px 0;
  overflow: hidden;
`;

const TimerBar = styled.div<{ $width: number }>`
  height: 100%;
  background: ${props => props.$width < 30 ? '#ef4444' : '#2ecc71'};
  width: ${props => props.$width}%;
  transition: width 1s linear;
`;

const BackButton = styled.button`
  position: absolute;
  top: 20px;
  left: 20px;
  background: white;
  border: 1px solid #e2e8f0;
  padding: 8px 15px;
  border-radius: 12px;
  cursor: pointer;
  color: #64748b;
  font-weight: 600;
  font-size: 0.85rem;
  &:hover { background: #f8fafc; border-color: #cbd5e1; }
`;

const OptionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  gap: 12px;
  margin: 15px 0;
`;

const SelectButton = styled.button<{ $active: boolean }>`
  padding: 12px;
  border-radius: 15px;
  border: 2px solid ${props => props.$active ? '#2ecc71' : '#f1f5f9'};
  background: ${props => props.$active ? '#2ecc71' : 'white'};
  color: ${props => props.$active ? 'white' : '#475569'};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  &:hover { border-color: #2ecc71; }
`;

const StartButton = styled.button`
  background: #2ecc71;
  color: white;
  width: 100%;
  padding: 18px;
  border: none;
  border-radius: 20px;
  font-size: 1.2rem;
  font-weight: 800;
  cursor: pointer;
  margin-top: 30px;
  box-shadow: 0 10px 20px rgba(46, 204, 113, 0.2);
  &:hover { background: #27ae60; transform: translateY(-2px); }
`;

const OptionButton = styled.button<{ $status: 'correct' | 'wrong' | 'none' }>`
  padding: 20px;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 18px;
  border: 2px solid #f1f5f9;
  background: ${props => 
    props.$status === 'correct' ? '#2ecc71' : 
    props.$status === 'wrong' ? '#ef4444' : 'white'};
  color: ${props => props.$status === 'none' ? '#1e293b' : 'white'};
  cursor: pointer;
  transition: all 0.2s;
  &:disabled { cursor: default; }
`;

const SpeakerButton = styled.button`
  background: #f8fafc;
  border: 2px solid #f1f5f9;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  cursor: pointer;
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Quiz = () => {
  const [gameState, setGameState] = useState<'setup' | 'playing' | 'result'>('setup');
  const [selectedCat, setSelectedCat] = useState<CategoryId | 'all'>('all');
  const [questionLimit, setQuestionLimit] = useState(10);
  
  const [quizWords, setQuizWords] = useState<Word[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [options, setOptions] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(15);

  const loadQuestion = useCallback((index: number, wordsList: Word[]) => {
    if (!wordsList[index]) return;
    const correctWord = wordsList[index];
    const otherOptions = turkishWords
      .filter(w => w.kyrgyz !== correctWord.kyrgyz)
      .map(w => w.kyrgyz)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    setOptions([...otherOptions, correctWord.kyrgyz].sort(() => 0.5 - Math.random()));
    setIsAnswered(false);
    setSelectedAnswer(null);
    setTimeLeft(15);
  }, []);

  const handleAnswer = useCallback((option: string | null) => {
    if (isAnswered) return;
    setIsAnswered(true);
    setSelectedAnswer(option);

    if (option === quizWords[currentIndex]?.kyrgyz) {
      setScore(prev => prev + 1);
    }

    setTimeout(() => {
      if (currentIndex + 1 < quizWords.length) {
        const nextIndex = currentIndex + 1;
        setCurrentIndex(nextIndex);
        loadQuestion(nextIndex, quizWords);
      } else {
        setGameState('result');
      }
    }, 1200);
  }, [currentIndex, isAnswered, quizWords, loadQuestion]);

  useEffect(() => {
    let timer: number;
    if (gameState === 'playing' && !isAnswered && timeLeft > 0) {
      timer = window.setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && !isAnswered) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      handleAnswer(null); 
    }
    return () => clearInterval(timer);
  }, [gameState, isAnswered, timeLeft, handleAnswer]);

  const startQuiz = () => {
    const filtered = selectedCat === 'all' 
      ? [...turkishWords] 
      : turkishWords.filter(w => w.category === selectedCat);
    
    const shuffled = filtered.sort(() => 0.5 - Math.random()).slice(0, questionLimit);
    
    setQuizWords(shuffled);
    setCurrentIndex(0);
    setScore(0);
    setGameState('playing');
    loadQuestion(0, shuffled);
  };

  if (gameState === 'setup') {
    return (
      <QuizContainer>
        <h2 style={{fontSize: '1.8rem', color: '#1e293b', marginBottom: '30px'}}>🧠 Тест жөндөөлөрү</h2>
        
        <div style={{textAlign: 'left'}}>
          <p style={{fontWeight: 700, color: '#475569', marginBottom: '10px'}}>Категория тандаңыз:</p>
          <OptionGrid>
            <SelectButton $active={selectedCat === 'all'} onClick={() => setSelectedCat('all')}>
              Баары
            </SelectButton>
            {/* Бул жерде (c: Category) деп көрсөтүү маанилүү! */}
            {(categories as Category[]).map((c) => (
              <SelectButton 
                key={c.id} 
                $active={selectedCat === c.id} 
                onClick={() => setSelectedCat(c.id)}
              >
                {c.title}
              </SelectButton>
            ))}
          </OptionGrid>
        </div>

        <div style={{textAlign: 'left', marginTop: '20px'}}>
          <p style={{fontWeight: 700, color: '#475569', marginBottom: '10px'}}>Суроолордун саны:</p>
          <OptionGrid>
            {[10, 20, 30, 40].map(n => (
              <SelectButton key={n} $active={questionLimit === n} onClick={() => setQuestionLimit(n)}>{n}</SelectButton>
            ))}
          </OptionGrid>
        </div>

        <StartButton onClick={startQuiz}>Тестти баштоо ✨</StartButton>
      </QuizContainer>
    );
  }

  if (gameState === 'result') {
    const percentage = Math.round((score / quizWords.length) * 100);
    return (
      <QuizContainer>
        <h1 style={{fontSize: '5rem', margin: '20px 0'}}>🏆</h1>
        <h2 style={{fontSize: '2rem', color: '#1e293b'}}>Жыйынтык:</h2>
        <p style={{fontSize: '2.5rem', color: '#2ecc71', fontWeight: 900, margin: '10px 0'}}>
          {score} / {quizWords.length}
        </p>
        <p style={{fontSize: '1.2rem', color: '#64748b'}}>Ийгиликтүүлүк: {percentage}%</p>
        <StartButton onClick={() => setGameState('setup')}>Кайра баштоо</StartButton>
      </QuizContainer>
    );
  }

  const currentWord = quizWords[currentIndex];

  return (
    <QuizContainer>
      <BackButton onClick={() => setGameState('setup')}>← Чыгуу</BackButton>
      
      <div style={{marginTop: '35px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <span style={{background: '#f1f5f9', padding: '5px 12px', borderRadius: '10px', fontSize: '0.85rem', color: '#64748b'}}>
          Суроо: {currentIndex + 1} / {quizWords.length}
        </span>
        <span style={{color: timeLeft < 5 ? '#ef4444' : '#2ecc71', fontWeight: 800}}>
          ⏱ {timeLeft}с
        </span>
      </div>

      <TimerBarContainer>
        <TimerBar $width={(timeLeft / 15) * 100} />
      </TimerBarContainer>
      
      <p style={{color: '#94a3b8', fontSize: '1rem', marginBottom: '10px'}}>Түркчө котормосун табыңыз:</p>
      
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', marginBottom: '35px' }}>
        <h1 style={{fontSize: '3.2rem', margin: 0, color: '#1e293b'}}>{currentWord?.turkish}</h1>
        <SpeakerButton onClick={() => speakTurkish(currentWord?.turkish || "")}>🔊</SpeakerButton>
      </div>
      
      <div style={{display: 'grid', gap: '15px'}}>
        {options.map((opt, i) => (
          <OptionButton
            key={i}
            onClick={() => handleAnswer(opt)}
            disabled={isAnswered}
            $status={
              isAnswered 
                ? (opt === currentWord?.kyrgyz ? 'correct' : (opt === selectedAnswer ? 'wrong' : 'none'))
                : 'none'
            }
          >
            {opt}
          </OptionButton>
        ))}
      </div>
    </QuizContainer>
  );
};

export default Quiz;