import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { turkishWords, categories } from '../data/words';
import type { Word } from '../types';

// --- Үн коштоо функциясы ---
const speakTurkish = (text: string) => {
  if ('speechSynthesis' in window) {
    // Мурунку сүйлөп жаткан үндөрдү токтотуу
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
`;

const TimerBarContainer = styled.div`
  width: 100%;
  height: 6px;
  background: #f1f5f9;
  border-radius: 10px;
  margin: 20px 0;
  overflow: hidden;
`;

const TimerBar = styled.div<{ $width: number }>`
  height: 100%;
  background: ${props => props.$width < 30 ? '#e74c3c' : '#2ecc71'};
  width: ${props => props.$width}%;
  transition: width 1s linear;
`;

const BackButton = styled.button`
  position: absolute;
  top: 20px;
  left: 20px;
  background: none;
  border: 1px solid #e2e8f0;
  padding: 8px 12px;
  border-radius: 10px;
  cursor: pointer;
  color: #64748b;
  font-size: 0.8rem;
  &:hover { background: #f8fafc; }
`;

const SetupScreen = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
`;

const OptionGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin: 15px 0;
`;

const SelectButton = styled.button<{ $active: boolean }>`
  padding: 12px;
  border-radius: 15px;
  border: 2px solid ${props => props.$active ? '#2ecc71' : '#f0f0f0'};
  background: ${props => props.$active ? '#2ecc71' : 'white'};
  color: ${props => props.$active ? 'white' : '#2c3e50'};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
`;

const StartButton = styled.button`
  background: #2ecc71;
  color: white;
  padding: 18px;
  border: none;
  border-radius: 15px;
  font-size: 1.2rem;
  font-weight: 700;
  cursor: pointer;
  margin-top: 20px;
  &:hover { background: #27ae60; }
`;

const OptionButton = styled.button<{ $status: 'correct' | 'wrong' | 'none' }>`
  padding: 18px;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 16px;
  border: 2px solid #edf2f7;
  background: ${props => 
    props.$status === 'correct' ? '#2ecc71' : 
    props.$status === 'wrong' ? '#e74c3c' : 'white'};
  color: ${props => props.$status === 'none' ? '#2c3e50' : 'white'};
  cursor: pointer;
  transition: all 0.2s;
  &:disabled { cursor: default; }
`;

const SpeakerButton = styled.button`
  background: #f1f5f9;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.1s;
  &:active { transform: scale(0.9); }
`;

const Quiz = () => {
  const [gameState, setGameState] = useState<'setup' | 'playing' | 'result'>('setup');
  const [selectedCat, setSelectedCat] = useState('all');
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      : turkishWords.filter(w => w.category === (selectedCat as any));
    
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
        <SetupScreen>
          <h2>Тест жөндөөлөрү</h2>
          <div>
            <p>Категория тандаңыз:</p>
            <OptionGrid>
              <SelectButton $active={selectedCat === 'all'} onClick={() => setSelectedCat('all')}>Баары</SelectButton>
              {categories.map(c => (
                <SelectButton key={c.id} $active={selectedCat === c.id} onClick={() => setSelectedCat(c.id)}>{c.title}</SelectButton>
              ))}
            </OptionGrid>
          </div>
          <div>
            <p>Суроолордун саны:</p>
            <OptionGrid>
              {[10, 20, 30, 40].map(n => (
                <SelectButton key={n} $active={questionLimit === n} onClick={() => setQuestionLimit(n)}>{n}</SelectButton>
              ))}
            </OptionGrid>
          </div>
          <StartButton onClick={startQuiz}>Тестти баштоо</StartButton>
        </SetupScreen>
      </QuizContainer>
    );
  }

  if (gameState === 'result') {
    const percentage = Math.round((score / quizWords.length) * 100);
    return (
      <QuizContainer>
        <h1 style={{fontSize: '4rem'}}>🏁</h1>
        <h2>Тест аяктады!</h2>
        <p style={{fontSize: '1.2rem', margin: '20px 0'}}>
          Жыйынтык: <b>{score} / {quizWords.length}</b> ({percentage}%)
        </p>
        <StartButton onClick={() => setGameState('setup')}>Кайра баштоо</StartButton>
      </QuizContainer>
    );
  }

  const currentWord = quizWords[currentIndex];

  return (
    <QuizContainer>
      <BackButton onClick={() => setGameState('setup')}>← Чыгуу</BackButton>
      
      <div style={{marginTop: '25px', display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontSize: '0.8rem'}}>
        <span>Суроо: {currentIndex + 1} / {quizWords.length}</span>
        <span style={{color: timeLeft < 5 ? '#e74c3c' : '#2ecc71', fontWeight: 'bold'}}>⏱ {timeLeft}с</span>
      </div>

      <TimerBarContainer>
        <TimerBar $width={(timeLeft / 15) * 100} />
      </TimerBarContainer>
      
      <p style={{color: '#7f8c8d', fontSize: '0.9rem', marginBottom: '5px'}}>Төмөнкү сөздүн котормосу:</p>
      
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', marginBottom: '20px' }}>
        <h1 style={{fontSize: '2.8rem', margin: 0, color: '#2c3e50'}}>{currentWord?.turkish}</h1>
        <SpeakerButton onClick={() => speakTurkish(currentWord?.turkish || "")} title="Угуу">
          🔊
        </SpeakerButton>
      </div>
      
      <div style={{display: 'grid', gap: '15px'}}>
        {options.map((opt, i) => (
          <OptionButton
            key={i}
            onClick={() => handleAnswer(opt)}
            disabled={isAnswered}
            $status={
              isAnswered 
                ? (opt === currentWord.kyrgyz ? 'correct' : (opt === selectedAnswer ? 'wrong' : 'none'))
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