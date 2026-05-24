import { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const WelcomeContainer = styled.div`
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  background:
    linear-gradient(rgba(15, 23, 42, 0.45), rgba(15, 23, 42, 0.55)),
    url('/src/assets/флаг.png');
  background-size: cover;
  background-position: center;
  padding: 20px;
`;

const FormCard = styled.div`
  background: rgba(255, 255, 255, 0.94);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  padding: clamp(24px, 5vw, 40px);
  border-radius: 8px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.15);
  max-width: 400px;
  width: 100%;
  text-align: center;
  border: 1px solid rgba(255,255,255,0.45);
`;

const Brand = styled.div`
  width: 54px;
  height: 54px;
  border-radius: 8px;
  display: grid;
  place-items: center;
  margin: 0 auto 18px;
  background: linear-gradient(135deg, var(--brand), #15803d);
  color: white;
  font-weight: 900;
  box-shadow: 0 12px 26px rgba(22, 163, 74, 0.28);
`;

const Title = styled.h2`
  color: #2c3e50;
  margin-bottom: 10px;
  font-size: 1.8rem;
  letter-spacing: 0;
`;

const Subtitle = styled.p`
  color: #7f8c8d;
  margin-bottom: 25px;
  font-size: 1rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 25px;
`;

const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: 6px;
  text-align: left;
  color: #334155;
  font-size: 0.86rem;
  font-weight: 800;
`;

const Input = styled.input`
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #dfe6e9;
  font-size: 1rem;
  outline: none;
  transition: border 0.3s;
  &:focus {
    border-color: #2ecc71;
    box-shadow: 0 0 0 4px rgba(22, 163, 74, 0.12);
  }
`;

const PasswordRow = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 8px;
  align-items: stretch;
`;

const GhostButton = styled.button`
  border-radius: 8px;
  padding: 0 12px;
  background: #f8fafc;
  color: #475569;
  border: 1px solid #dfe6e9;
  font-weight: 800;

  &:hover {
    border-color: var(--brand);
    color: var(--brand);
  }
`;

const SubmitButton = styled.button`
  background: var(--brand);
  color: white;
  border: none;
  padding: 15px;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  width: 100%;
  transition: background 0.3s;
  &:hover {
    background: #15803d;
  }
`;

const SecondaryButton = styled.button`
  width: 100%;
  margin-top: 10px;
  padding: 14px;
  border-radius: 8px;
  border: 1px solid #dbe4ee;
  background: white;
  color: #334155;
  font-weight: 800;

  &:hover {
    border-color: var(--brand);
    color: var(--brand);
  }
`;

const Alert = styled.div<{ $type: 'error' | 'success' }>`
  text-align: left;
  padding: 12px 14px;
  border-radius: 8px;
  margin-bottom: 16px;
  color: ${props => props.$type === 'error' ? '#991b1b' : '#166534'};
  background: ${props => props.$type === 'error' ? '#fef2f2' : '#f0fdf4'};
  border: 1px solid ${props => props.$type === 'error' ? '#fecaca' : '#bbf7d0'};
  font-size: 0.9rem;
  font-weight: 700;
`;

const SwitchText = styled.p`
  margin-top: 20px;
  color: #7f8c8d;
  font-size: 0.9rem;
  span {
    color: #2ecc71;
    cursor: pointer;
    font-weight: bold;
    &:hover { text-decoration: underline; }
  }
`;

const Welcome = () => {
  const [isLogin, setIsLogin] = useState(true); // Кирүү же Каттоо режимин которуу
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const { login, register, continueAsGuest } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = isLogin
      ? login(formData.email, formData.password)
      : register(formData);

    if (!result.ok) {
      setMessage({ type: 'error', text: result.message || 'Ката кетти.' });
      return;
    }

    navigate('/');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage(null);
  };

  const handleGuest = () => {
    continueAsGuest();
    navigate('/');
  };

  return (
    <WelcomeContainer>
      <FormCard>
        <Brand>TR</Brand>
        <Title>{isLogin ? 'Кош келиңиз!' : 'Жаңы аккаунт'}</Title>
        <Subtitle>
          {isLogin 
            ? 'Прогрессиңизди улантуу үчүн кириңиз' 
            : 'Түрк тилин үйрөнүүнү биз менен баштаңыз'}
        </Subtitle>

        {message && <Alert $type={message.type}>{message.text}</Alert>}

        <form onSubmit={handleSubmit}>
          <InputGroup>
            {!isLogin && (
              <Field>
                Атыңыз
                <Input 
                  type="text" 
                  name="name" 
                  placeholder="Мисалы: Айдана" 
                  value={formData.name}
                  required 
                  onChange={handleChange}
                />
              </Field>
            )}
            <Field>
              Email
              <Input 
                type="email" 
                name="email" 
                placeholder="name@email.com" 
                value={formData.email}
                required 
                onChange={handleChange}
              />
            </Field>
            <Field>
              Пароль
              <PasswordRow>
                <Input 
                  type={showPassword ? 'text' : 'password'} 
                  name="password" 
                  placeholder="Кеминде 6 белги" 
                  value={formData.password}
                  minLength={6}
                  required 
                  onChange={handleChange}
                />
                <GhostButton type="button" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? 'Жашыр' : 'Көр'}
                </GhostButton>
              </PasswordRow>
            </Field>
          </InputGroup>
          
          <SubmitButton type="submit">
            {isLogin ? 'Кирүү' : 'Катталуу'}
          </SubmitButton>
        </form>

        <SecondaryButton type="button" onClick={handleGuest}>
          Конок катары кирүү
        </SecondaryButton>

        <SwitchText>
          {isLogin ? 'Аккаунтуңуз жокпу? ' : 'Аккаунтуңуз барбы? '}
          <span onClick={() => { setIsLogin(!isLogin); setMessage(null); }}>
            {isLogin ? 'Катталуу' : 'Кирүү'}
          </span>
        </SwitchText>
      </FormCard>
    </WelcomeContainer>
  );
};

export default Welcome;
