import { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { turkishLessons } from '../data/lessons';

// --- Анимациялар ---
const slideIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.08); }
  100% { transform: scale(1); }
`;

// --- Styled Components ---
const Container = styled.div`
  max-width: 650px;
  margin: 40px auto;
  padding: 0 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  padding-bottom: 120px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 30px;
`;

const ProgressBar = styled.div<{ $width: number }>`
  flex: 1;
  height: 14px;
  background: #e2e8f0;
  border-radius: 10px;
  overflow: hidden;
  div {
    width: ${props => props.$width}%;
    height: 100%;
    background: linear-gradient(90deg, #58cc02, #2ecc71);
    transition: width 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    border-radius: 10px;
  }
`;

const ScoreBadge = styled.span<{ $active: boolean }>`
  font-weight: bold;
  color: #58cc02;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  gap: 4px;
  ${props => props.$active && css`animation: ${pulse} 0.5s ease-in-out;`}
`;

const LessonCard = styled.div`
  background: white;
  padding: 40px;
  border-radius: 24px;
  box-shadow: 0 15px 35px rgba(0,0,0,0.08);
  text-align: center;
  animation: ${slideIn} 0.5s ease-out;
`;

const WordGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin: 30px 0;
  @media (max-width: 480px) { grid-template-columns: 1fr; }
`;

const WordItem = styled.div`
  background: #f8fafc;
  padding: 20px;
  border-radius: 16px;
  border: 2px solid #e2e8f0;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    border-color: #2ecc71;
    background: #f0fff4;
    transform: translateY(-3px);
  }
  strong { font-size: 1.2rem; display: block; color: #2c3e50; }
  span { color: #64748b; margin-top: 5px; display: block; }
`;

const OptionButton = styled.button<{ $status?: 'correct' | 'wrong' | 'idle' }>`
  width: 100%;
  padding: 18px;
  margin-bottom: 12px;
  border-radius: 16px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.1s;
  border: 2px solid #e2e8f0;
  border-bottom: 5px solid #e2e8f0;
  background: white;

  ${props => props.$status === 'correct' && css`
    background: #d7ffb8 !important;
    border-color: #58cc02 !important;
    color: #58cc02 !important;
    border-bottom: 5px solid #58cc02 !important;
  `}

  ${props => props.$status === 'wrong' && css`
    background: #ffdfe0 !important;
    border-color: #ff4b4b !important;
    color: #ff4b4b !important;
    border-bottom: 5px solid #ff4b4b !important;
  `}

  &:active:not(:disabled) { transform: translateY(2px); border-bottom-width: 2px; }
  &:disabled { cursor: default; }
`;

const FooterAction = styled.div<{ $visible: boolean; $isCorrect: boolean }>`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 30px 20px;
  background: ${props => props.$isCorrect ? '#d7ffb8' : '#ffdfe0'};
  border-top: 2px solid rgba(0,0,0,0.05);
  display: flex;
  justify-content: center;
  transform: translateY(${props => props.$visible ? '0' : '100%'});
  transition: transform 0.3s ease-in-out;
  z-index: 1000;
`;

const ContinueButton = styled.button<{ $color?: string }>`
  background: ${props => props.$color || '#58cc02'};
  color: white;
  border: none;
  padding: 15px 60px;
  border-radius: 15px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 0 rgba(0,0,0,0.15);
  &:hover { filter: brightness(1.1); }
  &:active { transform: translateY(2px); box-shadow: 0 2px 0 rgba(0,0,0,0.15); }
`;

const LessonView = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [step, setStep] = useState<'study' | 'quiz' | 'result'>('study');
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [answerStatus, setAnswerStatus] = useState<'correct' | 'wrong' | 'idle'>('idle');
  const [score, setScore] = useState(0);

  const currentLesson = turkishLessons.find(lesson => lesson.id === id) || turkishLessons[0];
  const currentQuestion = currentLesson.questions[quizIndex];
  
  const progress = step === 'study' ? 5 : ((quizIndex + 1) / currentLesson.questions.length) * 100;

  const speak = (text: string) => {
    const msg = new SpeechSynthesisUtterance(text);
    msg.lang = 'tr-TR';
    window.speechSynthesis.speak(msg);
  };

  const handleOptionClick = (option: string) => {
    if (selectedOption) return;
    
    setSelectedOption(option);
    if (option === currentQuestion.correctAnswer) {
      setAnswerStatus('correct');
      setScore(prev => prev + 1);
    } else {
      setAnswerStatus('wrong');
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    setAnswerStatus('idle');

    if (step === 'study') {
      setStep('quiz');
    } else if (quizIndex < currentLesson.questions.length - 1) {
      setQuizIndex(quizIndex + 1);
    } else {
      setStep('result');
    }
  };

  // Прогрессти сактоо функциясы
  const handleFinish = () => {
    const saved = localStorage.getItem('completed_lessons');
    const completed = saved ? JSON.parse(saved) : [];
    
    if (!completed.includes(currentLesson.id)) {
      completed.push(currentLesson.id);
      localStorage.setItem('completed_lessons', JSON.stringify(completed));
    }
    
    navigate('/lessons');
  };

  return (
    <Container>
      <Header>
        <button 
          onClick={() => navigate('/lessons')} 
          style={{background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#afafaf'}}
        >✕</button>
        <ProgressBar $width={progress}><div /></ProgressBar>
        <ScoreBadge $active={answerStatus === 'correct'}>⭐ {score}</ScoreBadge>
      </Header>

      {step === 'study' && (
        <LessonCard>
          <h2 style={{marginBottom: '10px'}}>{currentLesson.title}</h2>
          <p style={{color: '#64748b'}}>Жаңы сөздөрдү угуп, эстеп калыңыз:</p>
          <WordGrid>
            {currentLesson.vocabulary.map((v, i) => (
              <WordItem key={i} onClick={() => speak(v.turkish)}>
                <strong>{v.turkish} 🔊</strong>
                <span>{v.kyrgyz}</span>
              </WordItem>
            ))}
          </WordGrid>
          <div style={{ 
            background: '#f0f9ff', 
            padding: '20px', 
            borderRadius: '15px', 
            textAlign: 'left', 
            marginBottom: '30px',
            borderLeft: '4px solid #3498db' 
          }}>
            <strong style={{color: '#3498db', display: 'block', marginBottom: '5px'}}>Грамматика:</strong>
            {currentLesson.grammarNote}
          </div>
          <ContinueButton onClick={handleNext}>БАШТОО</ContinueButton>
        </LessonCard>
      )}

      {step === 'quiz' && (
        <LessonCard>
          <span style={{color: '#afafaf', fontWeight: 'bold', fontSize: '0.9rem'}}>ТАПШЫРМА {quizIndex + 1} / {currentLesson.questions.length}</span>
          <h3 style={{fontSize: '1.5rem', margin: '20px 0 30px'}}>{currentQuestion.question}</h3>
          {currentQuestion.options.map((opt, i) => (
            <OptionButton 
              key={i}
              $status={selectedOption === opt ? answerStatus : 'idle'}
              onClick={() => handleOptionClick(opt)}
              disabled={!!selectedOption}
            >
              {opt}
            </OptionButton>
          ))}
        </LessonCard>
      )}

      {step === 'result' && (
        <LessonCard>
          <div style={{fontSize: '5rem', marginBottom: '10px'}}>🏆</div>
          <h2 style={{color: '#58cc02', fontSize: '2rem'}}>Сабак аяктады!</h2>
          <p style={{color: '#64748b', marginBottom: '30px'}}>Азаматсыз! Сиз "{currentLesson.title}" сабагын ийгиликтүү өттүңүз.</p>
          
          <div style={{display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '30px'}}>
            <div style={{background: '#f8fafc', padding: '15px 25px', borderRadius: '15px', border: '2px solid #e2e8f0'}}>
              <div style={{color: '#afafaf', fontSize: '0.8rem', fontWeight: 'bold'}}>УПАЙ</div>
              <div style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#58cc02'}}>{score * 10}</div>
            </div>
            <div style={{background: '#f8fafc', padding: '15px 25px', borderRadius: '15px', border: '2px solid #e2e8f0'}}>
              <div style={{color: '#afafaf', fontSize: '0.8rem', fontWeight: 'bold'}}>ТАКТЫК</div>
              <div style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#3498db'}}>
                {Math.round((score / currentLesson.questions.length) * 100)}%
              </div>
            </div>
          </div>

          <ContinueButton onClick={handleFinish}>АЯКТОО</ContinueButton>
        </LessonCard>
      )}

      <FooterAction $visible={!!selectedOption} $isCorrect={answerStatus === 'correct'}>
        <div style={{maxWidth: '650px', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <div style={{color: answerStatus === 'correct' ? '#58cc02' : '#ea2b2b', fontWeight: 'bold', fontSize: '1.2rem'}}>
            {answerStatus === 'correct' ? (
              <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                <span style={{fontSize: '1.5rem'}}>✅</span> Керемет! Туура жооп.
              </div>
            ) : (
              <div style={{display: 'flex', flexDirection: 'column'}}>
                <span>❌ Жообу ката...</span>
                <span style={{fontSize: '0.9rem', fontWeight: 'normal'}}>Туура жооп: {currentQuestion.correctAnswer}</span>
              </div>
            )}
          </div>
          <ContinueButton 
            $color={answerStatus === 'correct' ? '#58cc02' : '#ff4b4b'} 
            onClick={handleNext}
          >
            УЛАНТУУ
          </ContinueButton>
        </div>
      </FooterAction>
    </Container>
  );
};

export default LessonView;