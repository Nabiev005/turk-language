import styled from 'styled-components';
import { getMySuffix, getPluralSuffix } from '../utils/turkishLogic';
import type { Word } from '../types';

const Card = styled.div<{ $isActive: boolean }>`
  background: ${props => props.$isActive ? 'linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)' : 'white'};
  color: ${props => props.$isActive ? 'white' : '#2c3e50'};
  padding: 25px;
  border-radius: 24px;
  box-shadow: ${props => props.$isActive ? '0 20px 40px rgba(46, 204, 113, 0.2)' : '0 10px 25px rgba(0,0,0,0.03)'};
  cursor: pointer;
  text-align: center;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: 1px solid ${props => props.$isActive ? 'transparent' : '#f0f0f0'};
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 35px rgba(0,0,0,0.08);
  }
`;

const Badge = styled.span`
  position: absolute;
  top: 15px;
  right: 15px;
  background: rgba(255, 255, 255, 0.2);
  padding: 4px 10px;
  border-radius: 10px;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
`;

const MainWord = styled.h3`
  font-size: 2rem;
  margin-bottom: 8px;
  letter-spacing: -0.5px;
`;

const GrammarGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 20px;
  padding-top: 15px;
  border-top: 1px solid rgba(255, 255, 255, 0.3);
  animation: fadeIn 0.3s ease-in;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const GrammarItem = styled.div`
  background: rgba(255, 255, 255, 0.15);
  padding: 10px;
  border-radius: 12px;
  font-size: 0.85rem;
  
  span {
    display: block;
    font-size: 0.75rem;
    opacity: 0.9;
    margin-bottom: 4px;
  }
  b { font-size: 1rem; }
`;

interface Props {
  word: Word;
  isActive: boolean;
  onClick: () => void;
}

const WordCard = ({ word, isActive, onClick }: Props) => {
  return (
    <Card $isActive={isActive} onClick={onClick}>
      {/* Категорияны көрсөтүүчү белги */}
      <Badge>{word.category}</Badge>
      
      <MainWord>{word.turkish}</MainWord>
      <p style={{ fontWeight: 600, fontSize: '1.1rem' }}>{word.kyrgyz}</p>
      <small style={{ opacity: 0.7, fontStyle: 'italic' }}>[ {word.pronunciation} ]</small>
      
      {isActive && (
        <GrammarGrid>
          <GrammarItem>
            <span>Менин:</span>
            <b>{getMySuffix(word.turkish)}</b>
          </GrammarItem>
          <GrammarItem>
            <span>Көптүк:</span>
            <b>{getPluralSuffix(word.turkish)}</b>
          </GrammarItem>
        </GrammarGrid>
      )}
    </Card>
  );
};

export default WordCard;