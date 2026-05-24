import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
// Сүрөттүн дарегин текшерип ал (assets папкасында болушу керек)
import flagBg from '../assets/флаг.png'; 

const HubContainer = styled.div`
  width: min(1120px, calc(100% - 32px));
  margin: 0 auto;
  padding: 24px 0 40px;

  @media (max-width: 760px) {
    width: min(100% - 24px, 1120px);
    padding-top: 16px;
  }
`;

const HeroSection = styled.div`
  text-align: center;
  padding: clamp(40px, 8vw, 78px) 18px;
  /* Сүрөт бардык экранда жакшы көрүнүшү үчүн жана текст окулушу үчүн караңгылатуу */
  background: 
    linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), 
    url(${flagBg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 8px;
  margin-bottom: 28px;
  color: white;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;

  @media (min-width: 768px) {
    padding: 80px 20px;
    margin-bottom: 50px;
  }
`;

const Title = styled.h1`
  /* Телефондо кичирээк, ноутбукта чоңоюп турат */
  font-size: clamp(2rem, 7vw, 4rem);
  margin-bottom: 10px;
  font-weight: 900;
  letter-spacing: 0;
  text-shadow: 0 4px 15px rgba(0, 0, 0, 0.6);
`;

const HeroSubtitle = styled.p`
  font-size: clamp(1rem, 3vw, 1.4rem);
  opacity: 0.95;
  max-width: 700px;
  margin: 0 auto;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.6);
`;

const StatsRow = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 30px;
`;

const StatItem = styled.div`
  /* Телефондо даана көрүнүү үчүн Glassmorphism */
  background: rgba(255, 255, 255, 0.2);
  padding: 10px 18px;
  border-radius: 50px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.95rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

  @media (min-width: 768px) {
    padding: 12px 25px;
    font-size: 1.1rem;
  }
`;

const ModulesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 250px), 1fr));
  gap: 16px;

  @media (min-width: 900px) {
    gap: 20px;
  }
`;

const ModuleCard = styled(motion.create(Link))<{ $bgColor: string }>`
  text-decoration: none;
  background: white;
  padding: 28px 20px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border: 1px solid rgba(148, 163, 184, 0.18);
  position: relative;
  overflow: hidden;
  box-shadow: var(--shadow);

  @media (min-width: 768px) {
    padding: 34px 28px;
  }

  &:hover {
    border-color: ${props => props.$bgColor};
  }
`;

const IconCircle = styled.div<{ $color: string }>`
  width: 80px;
  height: 80px;
  background: ${props => props.$color};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  margin-bottom: 20px;
  transition: transform 0.3s ease;

  @media (min-width: 768px) {
    width: 100px;
    height: 100px;
    font-size: 3rem;
  }

  ${ModuleCard}:hover & {
    transform: scale(1.1) rotate(5deg);
  }
`;

const ModuleTitle = styled.h3`
  font-size: 1.5rem;
  color: #2c3e50;
  margin-bottom: 12px;
  letter-spacing: 0;
  @media (min-width: 768px) {
    font-size: 1.7rem;
  }
`;

const ModuleDesc = styled.p`
  color: #7f8c8d;
  font-size: 0.95rem;
  line-height: 1.5;
  @media (min-width: 768px) {
    font-size: 1.05rem;
  }
`;

const ProgressTrack = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 6px;
  background: #f0f0f0;
`;

const ProgressFill = styled.div<{ $width: number }>`
  height: 100%;
  width: ${props => props.$width}%;
  background: #2ecc71;
  transition: width 1s ease-in-out;
`;

const Home = () => {
  const [completedCount, setCompletedCount] = useState(0);
  const totalLessons = 16; 

  useEffect(() => {
    const saved = localStorage.getItem('completed_lessons');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCompletedCount(Array.isArray(parsed) ? parsed.length : 0);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        setCompletedCount(0);
      }
    }
  }, []);

  const progressPercentage = Math.min((completedCount / totalLessons) * 100, 100);

  return (
    <HubContainer>
      <HeroSection>
        <Title>AiNabi: Түрк тили</Title>
        <HeroSubtitle>
          Кыргызстан жана Түркия достугу менен тил үйрөнүү эми жеңил жана кызыктуу!
        </HeroSubtitle>
        
        <StatsRow>
          <StatItem>
            <span>✅</span> {completedCount} / {totalLessons} Сабак
          </StatItem>
          <StatItem>
            <span>⭐</span> {completedCount * 125} Упай
          </StatItem>
        </StatsRow>
      </HeroSection>

      <ModulesGrid>
        <ModuleCard 
          to="/lessons" 
          $bgColor="#2ecc71"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ y: -8 }}
        >
          <IconCircle $color="#e8f8f5">📖</IconCircle>
          <ModuleTitle>Негизги Курс</ModuleTitle>
          <ModuleDesc>
            Нөлдөн баштап эркин сүйлөөгө чейинки интерактивдүү сабактар топтому.
          </ModuleDesc>
          <ProgressTrack>
            <ProgressFill $width={progressPercentage} />
          </ProgressTrack>
        </ModuleCard>

        <ModuleCard 
          to="/dictionary" 
          $bgColor="#3498db"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          whileHover={{ y: -8 }}
        >
          <IconCircle $color="#ebf5fb">📚</IconCircle>
          <ModuleTitle>Акылдуу Сөздүк</ModuleTitle>
          <ModuleDesc>Ар бир сөздүн мааниси жана анын колдонулуш логикасы сиздин колуңузда.</ModuleDesc>
        </ModuleCard>

        <ModuleCard 
          to="/quiz" 
          $bgColor="#f1c40f"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          whileHover={{ y: -8 }}
        >
          <IconCircle $color="#fef9e7">🎮</IconCircle>
          <ModuleTitle>Машыгуу</ModuleTitle>
          <ModuleDesc>Алдыңкы билимдерди оюндар жана тесттер аркылуу бышыктаңыз.</ModuleDesc>
        </ModuleCard>

        <ModuleCard 
          to="/grammar" 
          $bgColor="#9b59b6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          whileHover={{ y: -8 }}
        >
          <IconCircle $color="#f5eef8">🧠</IconCircle>
          <ModuleTitle>Тил Логикасы</ModuleTitle>
          <ModuleDesc>Түрк тилинин математикалык формулаларын оңой өздөштүрүңүз.</ModuleDesc>
        </ModuleCard>
      </ModulesGrid>
    </HubContainer>
  );
};

export default Home;
