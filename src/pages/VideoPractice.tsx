import { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenerativeAI } from "@google/generative-ai";

// .env файлынан API ачкычты алуу
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

const VideoPracticeContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const UrlInputArea = styled.div`
  background: white;
  padding: 20px;
  border-radius: 20px;
  margin-bottom: 25px;
  border: 2px solid #eef2f3;
  display: flex;
  gap: 15px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);

  input {
    flex: 1;
    border: 2px solid #e0e0e0;
    border-radius: 12px;
    padding: 12px 15px;
    font-size: 1rem;
    outline: none;
    transition: 0.3s;
    &:focus { border-color: #2ecc71; }
  }

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const VideoWrapper = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  background: #1a1a1a;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0,0,0,0.15);
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
`;

const InteractionArea = styled.div`
  background: white;
  padding: 30px;
  border-radius: 24px;
  border: 2px solid #f0f0f0;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 150px;
  padding: 20px;
  border-radius: 16px;
  border: 2px solid #e0e0e0;
  font-family: inherit;
  font-size: 1.1rem;
  resize: none;
  margin-bottom: 20px;
  transition: 0.3s;
  &:focus { outline: none; border-color: #2ecc71; box-shadow: 0 0 10px rgba(46, 204, 113, 0.1); }
`;

const SubmitButton = styled.button<{ $secondary?: boolean }>`
  background: ${props => props.$secondary ? '#34495e' : 'linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)'};
  color: white;
  padding: 14px 25px;
  border-radius: 12px;
  font-weight: 700;
  border: none;
  cursor: pointer;
  transition: 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  &:hover { opacity: 0.9; transform: translateY(-2px); }
  &:disabled { background: #bdc3c7; cursor: not-allowed; transform: none; }
`;

const FeedbackBox = styled(motion.div)`
  margin-top: 20px;
  padding: 25px;
  border-radius: 16px;
  background: #f0fdf4;
  border-left: 5px solid #2ecc71;
  color: #1e4010;
  line-height: 1.6;
  white-space: pre-wrap; /* AI берген абзацтарды сактоо үчүн */
`;

const VideoPractice = () => {
  const [url, setUrl] = useState('');
  const [videoId, setVideoId] = useState<string | null>(null);
  const [text, setText] = useState('');
  const [feedback, setFeedback] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);

  const extractVideoId = (inputUrl: string) => {
    // eslint-disable-next-line no-useless-escape
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = inputUrl.match(regExp);
    if (match && match[2].length === 11) {
      setVideoId(match[2]);
      setFeedback(null);
      setText('');
    } else {
      alert("Сураныч, туура YouTube шилтемесин коюңуз!");
    }
  };

  const handleAIAnalysis = async () => {
    if (!text.trim()) return alert("Алгач видео боюнча оюңузду жазыңыз!");
    if (!API_KEY) return alert("API Key табылган жок. .env файлын текшериңиз.");

    setLoading(true);
    try {
      // Gemini 1.5 Flash моделин колдонуу (тез жана эффективдүү)
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `
        Сен түрк тили боюнча эксперт мугалимсиң. 
        Колдонуучу YouTube видеосун көрдү (ID: ${videoId}).
        Анын видео боюнча түшүндүрмөсү: "${text}".
        
        Тапшырма:
        1. Видеонун мазмунуна жараша колдонуучу канчалык туура түшүнгөнүн талда (0-100%).
        2. Түрк тилинин грамматикасы же сөз байлыгы боюнча 2-3 катасын оңдо.
        3. Кийинки жолу жакшыраак түшүнүү үчүн кыска кеңеш бер.
        Жоопту абдан сылык жана мотивация берүүчү тондо кыргыз тилинде жаз.
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      setFeedback(response.text());
    } catch (error) {
      console.error("AI Error:", error);
      setFeedback("Кечиресиз, AI талдоо учурунда ката кетти. Интернетти же API ачкычты текшериңиз.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <VideoPracticeContainer>
      <motion.h2 
        initial={{ x: -20, opacity: 0 }} 
        animate={{ x: 0, opacity: 1 }}
        style={{ marginBottom: '25px', color: '#2c3e50' }}
      >
        🎬 Кино-Практика AI менен
      </motion.h2>

      <UrlInputArea>
        <input 
          type="text" 
          placeholder="YouTube шилтемесин коюңуз..." 
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <SubmitButton $secondary onClick={() => extractVideoId(url)}>
          Видеону жүктөө
        </SubmitButton>
      </UrlInputArea>

      <VideoWrapper>
        {videoId ? (
          <iframe 
            width="100%" 
            height="100%" 
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <div style={{padding: '20px'}}>
            <p style={{fontSize: '1.3rem', marginBottom: '10px'}}>📺 Видео тандооңузду күтүп жатам</p>
            <p style={{opacity: 0.8}}>Түркчө видеонун шилтемесин жогоруга коюп, практиканы баштаңыз.</p>
          </div>
        )}
      </VideoWrapper>

      <AnimatePresence>
        {videoId && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
          >
            <InteractionArea>
              <h3 style={{color: '#2c3e50'}}>Сиздин түшүнүгүңүз</h3>
              <p style={{ color: '#7f8c8d', marginBottom: '15px', fontSize: '0.9rem' }}>
                Видеодо эмне болуп жатканын, каармандар эмне дегенин кыргызча же түркчө жазыңыз.
              </p>

              <TextArea 
                placeholder="Мисалы: Бул видеодо Эмир Стамбулга келип, такси күтүп жатат..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              />

              <SubmitButton onClick={handleAIAnalysis} disabled={loading} style={{width: '100%'}}>
                {loading ? (
                  <>⌛ AI талдап жатат...</>
                ) : (
                  <>🚀 AI Анализ алуу</>
                )}
              </SubmitButton>

              {feedback && (
                <FeedbackBox
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px'}}>
                    <span style={{fontSize: '1.5rem'}}>🤖</span>
                    <strong style={{fontSize: '1.1rem'}}>Ainabi AI Мугалим:</strong>
                  </div>
                  {feedback}
                </FeedbackBox>
              )}
            </InteractionArea>
          </motion.div>
        )}
      </AnimatePresence>
    </VideoPracticeContainer>
  );
};

export default VideoPractice;