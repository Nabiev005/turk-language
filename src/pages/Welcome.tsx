import { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const WelcomeContainer = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #2ecc71 0%, #27ae60 100%);
  padding: 20px;
`;

const FormCard = styled.div`
  background: white;
  padding: 40px;
  border-radius: 30px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.15);
  max-width: 400px;
  width: 100%;
  text-align: center;
`;

const Title = styled.h2`
  color: #2c3e50;
  margin-bottom: 10px;
  font-size: 1.8rem;
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

const Input = styled.input`
  padding: 15px;
  border-radius: 12px;
  border: 1px solid #dfe6e9;
  font-size: 1rem;
  outline: none;
  transition: border 0.3s;
  &:focus {
    border-color: #2ecc71;
  }
`;

const SubmitButton = styled.button`
  background: #2ecc71;
  color: white;
  border: none;
  padding: 15px;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  width: 100%;
  transition: background 0.3s;
  &:hover {
    background: #27ae60;
  }
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
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    

    const displayName = isLogin ? formData.email.split('@')[0] : formData.name;
    login({ 
      name: displayName || 'Колдонуучу',
      email: formData.email 
    });

    navigate('/');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <WelcomeContainer>
      <FormCard>
        <Title>{isLogin ? 'Кош келиңиз!' : 'Катталуу'}</Title>
        <Subtitle>
          {isLogin 
            ? 'Прогрессиңизди улантуу үчүн кириңиз' 
            : 'Түрк тилин үйрөнүүнү биз менен баштаңыз'}
        </Subtitle>

        <form onSubmit={handleSubmit}>
          <InputGroup>
            {!isLogin && (
              <Input 
                type="text" 
                name="name" 
                placeholder="Атыңыз" 
                required 
                onChange={handleChange}
              />
            )}
            <Input 
              type="email" 
              name="email" 
              placeholder="Email почтаңыз" 
              required 
              onChange={handleChange}
            />
            <Input 
              type="password" 
              name="password" 
              placeholder="Пароль" 
              required 
              onChange={handleChange}
            />
          </InputGroup>
          
          <SubmitButton type="submit">
            {isLogin ? 'Кирүү ✨' : 'Катталуу 🚀'}
          </SubmitButton>
        </form>

        <SwitchText>
          {isLogin ? 'Аккаунтуңуз жокпу? ' : 'Аккаунтуңуз барбы? '}
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Катталуу' : 'Кирүү'}
          </span>
        </SwitchText>
      </FormCard>
    </WelcomeContainer>
  );
};

export default Welcome;