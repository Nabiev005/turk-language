import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { turkishLessons } from '../data/lessons';

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 40px 20px;
  text-align: center;
`;

const LessonMap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  margin-top: 50px;
`;

const LessonNode = styled.div<{ $completed?: boolean; $locked?: boolean }>`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  transition: all 0.2s;
  color: white;
  position: relative;
  
  /* Ачык сабактын стили */
  background: #58cc02;
  border-bottom: 8px solid #46a302;
  cursor: pointer;

  /* Жабык сабактын стили */
  ${props => props.$locked && css`
    background: #e2e8f0;
    border-bottom: 8px solid #cbd5e1;
    cursor: not-allowed;
    color: #afafaf;
  `}

  /* Бүткөн сабактын стили */
  ${props => props.$completed && css`
    background: #ffc800;
    border-bottom: 8px solid #e5a400;
  `}

  &:hover {
    transform: ${props => props.$locked ? 'none' : 'translateY(-5px)'};
    filter: brightness(1.1);
  }

  &:active {
    transform: ${props => props.$locked ? 'none' : 'translateY(2px)'};
    border-bottom-width: ${props => props.$locked ? '8px' : '2px'};
  }
`;

const LessonLabel = styled.div`
  font-weight: bold;
  color: #4b4b4b;
  margin-top: 10px;
  font-size: 1.1rem;
`;

const Lessons = () => {
  const navigate = useNavigate();
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  useEffect(() => {
    // localStorage'дан бүткөн сабактарды окуйбуз
    const saved = localStorage.getItem('completed_lessons');
    if (saved) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCompletedLessons(JSON.parse(saved));
    }
  }, []);

  return (
    <Container>
      <h1 style={{fontSize: '2rem', color: '#3c3c3c'}}>Түрк тили курсу</h1>
      <p style={{color: '#777'}}>Сабактарды ирети менен бүтүрүп, жаңыларын ачыңыз</p>

      <LessonMap>
        {turkishLessons.map((lesson, index) => {
          // Сабак бүткөнбү?
          const isCompleted = completedLessons.includes(lesson.id);
          
          // Сабак ачыкпы? (Биринчи сабак же мурункусу бүткөн болсо ачык)
          const isLocked = index !== 0 && !completedLessons.includes(turkishLessons[index - 1].id);

          return (
            <div key={lesson.id} style={{ textAlign: 'center' }}>
              <LessonNode 
                $completed={isCompleted}
                $locked={isLocked}
                onClick={() => !isLocked && navigate(`/lesson/${lesson.id}`)}
              >
                {isCompleted ? '✅' : isLocked ? '🔒' : (index + 1)}
              </LessonNode>
              <LessonLabel>{lesson.title}</LessonLabel>
            </div>
          );
        })}
      </LessonMap>
      
      {/* Тест үчүн баскыч (тазалоо) */}
      <button 
        onClick={() => {localStorage.clear(); window.location.reload();}}
        style={{marginTop: '50px', background: 'none', border: 'none', color: '#ccc', cursor: 'pointer', fontSize: '0.8rem'}}
      >
        Прогрессти башынан баштоо
      </button>
    </Container>
  );
};

export default Lessons;