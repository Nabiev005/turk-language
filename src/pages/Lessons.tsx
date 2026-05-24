import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { turkishLessons } from '../data/lessons';

const Container = styled.div`
  width: min(720px, calc(100% - 32px));
  margin: 0 auto;
  padding: 32px 0 56px;
  text-align: center;
`;

const LessonMap = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
  margin-top: 32px;
`;

const LessonTile = styled.div`
  background: white;
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 8px;
  box-shadow: var(--shadow);
  padding: 18px 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LessonNode = styled.div<{ $completed?: boolean; $locked?: boolean }>`
  width: 86px;
  height: 86px;
  border-radius: 8px;
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
  font-size: 1rem;
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
      <h1 style={{fontSize: '2rem', color: 'var(--text)', letterSpacing: 0}}>Түрк тили курсу</h1>
      <p style={{color: '#777'}}>Сабактарды ирети менен бүтүрүп, жаңыларын ачыңыз</p>

      <LessonMap>
        {turkishLessons.map((lesson, index) => {
          // Сабак бүткөнбү?
          const isCompleted = completedLessons.includes(lesson.id);
          
          // Сабак ачыкпы? (Биринчи сабак же мурункусу бүткөн болсо ачык)
          const isLocked = index !== 0 && !completedLessons.includes(turkishLessons[index - 1].id);

          return (
            <LessonTile key={lesson.id}>
              <LessonNode 
                $completed={isCompleted}
                $locked={isLocked}
                onClick={() => !isLocked && navigate(`/lesson/${lesson.id}`)}
              >
                {isCompleted ? '✅' : isLocked ? '🔒' : (index + 1)}
              </LessonNode>
              <LessonLabel>{lesson.title}</LessonLabel>
            </LessonTile>
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
