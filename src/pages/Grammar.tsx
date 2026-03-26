import { useState } from 'react';
import styled from 'styled-components';
import { 
  getMySuffix, 
  getPluralSuffix, 
  getInSuffix, 
  getToSuffix, 
  getFromSuffix 
} from '../utils/turkishLogic';

// --- Styled Components ---
const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const LogicCard = styled.div`
  background: white;
  padding: 40px;
  border-radius: 30px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
  margin-bottom: 40px;
`;

const Title = styled.h2`
  color: #2c3e50;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Subtitle = styled.p`
  color: #7f8c8d;
  line-height: 1.6;
  margin-bottom: 30px;
`;

const InteractiveZone = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: #f8fafc;
  padding: 30px;
  border-radius: 20px;
  border: 2px dashed #e2e8f0;
`;

const TabGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 25px;
  flex-wrap: wrap;
`;

const Tab = styled.button<{ $active: boolean }>`
  padding: 10px 20px;
  border-radius: 12px;
  border: 2px solid ${props => props.$active ? '#2ecc71' : '#f0f0f0'};
  background: ${props => props.$active ? '#2ecc71' : 'white'};
  color: ${props => props.$active ? 'white' : '#2c3e50'};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #2ecc71;
  }
`;

const InputGroup = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  flex-wrap: wrap;

  input {
    padding: 12px 20px;
    border-radius: 12px;
    border: 2px solid #2ecc71;
    font-size: 1.1rem;
    outline: none;
    width: 250px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.02);
  }
`;

const ResultDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-top: 20px;
`;

const ResultBox = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: #2c3e50;
  
  span {
    color: #2ecc71;
    text-decoration: underline;
  }
`;

const SpeakerButton = styled.button`
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.5rem;
  transition: all 0.2s;
  &:hover { background: #f1f5f9; transform: scale(1.05); }
`;

const InfoBox = styled.div`
  background: #fff9db;
  padding: 15px;
  border-radius: 12px;
  border-left: 5px solid #fcc419;
  margin-top: 10px;
  font-size: 0.9rem;
  color: #856404;
  line-height: 1.4;
`;

const RuleTable = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 40px;
`;

const RuleItem = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 15px;
  border: 1px solid #edf2f7;
  
  b { color: #e74c3c; font-size: 1.1rem; }
  i { color: #64748b; display: block; margin-top: 5px; }
`;

// --- Негизги Компонент ---
const Grammar = () => {
  const [word, setWord] = useState('Kitap');
  const [mode, setMode] = useState<'possessive' | 'plural' | 'locative' | 'dative' | 'ablative'>('possessive');

  // Түркчө сүйлөтүү функциясы
  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const msg = new SpeechSynthesisUtterance(text);
      msg.lang = 'tr-TR';
      window.speechSynthesis.speak(msg);
    }
  };

  const getResult = () => {
    if (!word.trim()) return "";
    switch (mode) {
      case 'possessive': return getMySuffix(word);
      case 'plural': return getPluralSuffix(word);
      case 'locative': return getInSuffix(word);
      case 'dative': return getToSuffix(word);
      case 'ablative': return getFromSuffix(word);
      default: return word;
    }
  };

  const fullWord = getResult();
  
  // Мүчөнү бөлүп алуу логикасы (визуалдык үчүн)
  const getSuffixOnly = () => {
    if (!word || !fullWord) return "";
    // Жумшаруу болгондо (Kitap -> Kitabım), кесүүнү тууралоо
    // eslint-disable-next-line prefer-const
    let baseLength = word.length;
    const lastChar = word.toLowerCase().slice(-1);
    if (fullWord.length > word.length && "ptçk".includes(lastChar) && mode !== 'plural' && mode !== 'locative' && mode !== 'ablative') {
        return fullWord.slice(baseLength - 1); // b-ım сыяктуу
    }
    return fullWord.slice(baseLength);
  };

  const displaySuffix = getSuffixOnly();
  const displayBase = fullWord.replace(displaySuffix, "");

  return (
    <Container>
      <LogicCard>
        <Title>🧠 Түрк тилинин конструктору</Title>
        <Subtitle>
          Түрк тили — бул математика сыяктуу так система. Сөздөрдү жазып, мүчөлөр кандайча 
          "үндүү тамгалардын шайкештиги" эрежеси менен өзгөрөрүн байкаңыз.
        </Subtitle>

        <InteractiveZone>
          <h3>Эрежени тандаңыз:</h3>
          <TabGroup>
            <Tab $active={mode === 'possessive'} onClick={() => setMode('possessive')}>Менин (-ым)</Tab>
            <Tab $active={mode === 'plural'} onClick={() => setMode('plural')}>Көптүк (-лар)</Tab>
            <Tab $active={mode === 'locative'} onClick={() => setMode('locative')}>-да (Кайда?)</Tab>
            <Tab $active={mode === 'dative'} onClick={() => setMode('dative')}>-га (Кайда?)</Tab>
            <Tab $active={mode === 'ablative'} onClick={() => setMode('ablative')}>-дан (Кайдан?)</Tab>
          </TabGroup>

          <InputGroup>
            <label>Түркчө сөз:</label>
            <input 
              type="text" 
              value={word} 
              onChange={(e) => setWord(e.target.value)}
              placeholder="Мисалы: Okul, Göz, Ağaç..."
            />
          </InputGroup>

          <ResultDisplay>
            <ResultBox>
              {displayBase}<span>{displaySuffix}</span>
            </ResultBox>
            <SpeakerButton onClick={() => speak(fullWord)} title="Угуу">
              🔊
            </SpeakerButton>
          </ResultDisplay>

          <InfoBox>
            {mode === 'possessive' && "💡 Эгер сөз p, ç, t, k менен бүтсө, алар b, c, d, ğ тамгаларына айланат (Жумшаруу)."}
            {mode === 'locative' && "💡 'Fıstıkçı Şahap' үнсүздөрү менен бүтсө, -da/-de мүчөсү -ta/-te болуп өзгөрөт."}
            {mode === 'plural' && "💡 Бул жерде болгону эки вариант бар: -lar же -ler."}
            {mode === 'dative' && "💡 Эгер сөз үндүү менен бүтсө, арага 'y' тамгасы кирет (Мисалы: Araba-y-a)."}
          </InfoBox>
        </InteractiveZone>

        <h3 style={{marginTop: '40px'}}>Кандай иштейт?</h3>
        <RuleTable>
          <RuleItem>
            <b>Үндүү тамгалар:</b> <br/>
            Жоон: <b>a, ı, o, u</b> <br/>
            Ичке: <b>e, i, ö, ü</b>
          </RuleItem>
          <RuleItem>
            <b>Жумшаруу:</b> <br/>
            Kitap {'->'} Kita<b>b</b>ım <br/>
            Sözlük {'->'} Sözлү<b>ğ</b>үм
          </RuleItem>
          <RuleItem>
            <b>Катуу үнсүздөр:</b> <br/>
            f, s, t, k, ç, ş, h, p <br/>
            <i>(Fıstıkçı Şahap)</i>
          </RuleItem>
        </RuleTable>
      </LogicCard>
    </Container>
  );
};

export default Grammar;