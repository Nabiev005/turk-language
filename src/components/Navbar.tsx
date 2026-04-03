import { useState } from 'react';
import styled from 'styled-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Авторизация контекстин коштук

const Nav = styled.nav`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(15px);
  height: 75px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 6%;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.04);
  position: sticky;
  top: 0;
  z-index: 1000;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
`;

const Logo = styled(Link)`
  font-size: 1.6rem;
  font-weight: 900;
  color: #2ecc71;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 10px;
  
  .flag-box {
    background: #e74c3c;
    color: white;
    padding: 2px 8px;
    border-radius: 8px;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  span { color: #2c3e50; letter-spacing: -0.5px; }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;

  @media (max-width: 1024px) {
    display: none; 
  }
`;

const NavItem = styled(Link)<{ $active?: boolean }>`
  text-decoration: none;
  color: ${props => props.$active ? '#2ecc71' : '#5a6c7d'};
  font-weight: 700;
  font-size: 0.95rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  padding: 5px 0;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: ${props => props.$active ? '100%' : '0'};
    height: 3px;
    background: #2ecc71;
    border-radius: 10px;
    transition: width 0.3s ease;
  }

  &:hover { 
    color: #2ecc71; 
    &::after { width: 100%; } 
  }
`;

const ActionButton = styled.button`
  background: #2ecc71;
  color: white;
  padding: 12px 28px;
  border-radius: 14px;
  font-weight: 700;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 6px 15px rgba(46, 204, 113, 0.2);

  &:hover { 
    background: #27ae60;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(46, 204, 113, 0.3);
  }

  @media (max-width: 1024px) {
    display: none; 
  }
`;

const LogoutButton = styled.button`
  background: #fff1f2;
  color: #ef4444;
  padding: 10px 20px;
  border-radius: 12px;
  font-weight: 700;
  border: 1px solid #fee2e2;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #ef4444;
    color: white;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 700;
  color: #2c3e50;
  
  .avatar {
    width: 35px;
    height: 35px;
    background: #f1f5f9;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
  }
`;

const Hamburger = styled.div<{ $isOpen: boolean }>`
  display: none;
  flex-direction: column;
  cursor: pointer;
  gap: 7px;
  z-index: 1100;
  
  @media (max-width: 1024px) { display: flex; }
  
  div {
    width: 30px;
    height: 3px;
    background: #2c3e50;
    border-radius: 10px;
    transition: 0.3s;
    &:nth-child(1) { transform: ${props => props.$isOpen ? 'rotate(45deg) translate(7px, 7px)' : 'none'}; }
    &:nth-child(2) { opacity: ${props => props.$isOpen ? '0' : '1'}; }
    &:nth-child(3) { transform: ${props => props.$isOpen ? 'rotate(-45deg) translate(7px, -7px)' : 'none'}; }
  }
`;

const Sidebar = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 300px;
  height: 100vh;
  background: white;
  padding: 100px 40px;
  display: flex;
  flex-direction: column;
  gap: 25px;
  transition: 0.4s ease-in-out;
  transform: ${props => props.$isOpen ? 'translateX(0)' : 'translateX(-100%)'};
  box-shadow: 15px 0 40px rgba(0,0,0,0.08);
  z-index: 1050;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(4px);
  z-index: 1040;
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth(); // Контексттен маалыматтарды алабыз

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate('/welcome');
  };

  const isLessonsPath = location.pathname.startsWith('/lessons') || location.pathname.startsWith('/lesson/');

  return (
    <>
      <Nav>
        <Logo to="/" onClick={closeMenu}>
          <div className="flag-box">TR</div>
          <span>Лингво</span>
        </Logo>
        
        <NavLinks>
          <NavItem to="/" $active={location.pathname === '/'}>Башкы бет</NavItem>
          <NavItem to="/dictionary" $active={location.pathname === '/dictionary'}>Сөздүк</NavItem>
          <NavItem to="/quiz" $active={location.pathname === '/quiz'}>Тесттер</NavItem>
          <NavItem to="/grammar" $active={location.pathname === '/grammar'}>Грамматика</NavItem>
          <NavItem to="/lessons" $active={isLessonsPath}>Сабактар</NavItem>
          <NavItem to="/cinema" $active={location.pathname === '/cinema'}>Кино-Театр</NavItem>
          
          {/* Авторизация абалына жараша баскычтарды алмаштыруу */}
          {isAuthenticated ? (
            <UserInfo>
              <div className="avatar">👤</div>
              <span>{user?.name}</span>
              <LogoutButton onClick={handleLogout}>Чыгуу</LogoutButton>
            </UserInfo>
          ) : (
            <ActionButton onClick={() => navigate('/welcome')}>Кирүү</ActionButton>
          )}
        </NavLinks>

        <Hamburger $isOpen={isOpen} onClick={toggleMenu}>
          <div /> <div /> <div />
        </Hamburger>
      </Nav>

      {isOpen && <Overlay onClick={closeMenu} />}

      <Sidebar $isOpen={isOpen}>
        {isAuthenticated && (
           <UserInfo style={{ marginBottom: '20px' }}>
              <div className="avatar">👤</div>
              <span>{user?.name}</span>
           </UserInfo>
        )}

        <NavItem to="/" $active={location.pathname === '/'} onClick={closeMenu}>Башкы бет</NavItem>
        <NavItem to="/dictionary" $active={location.pathname === '/dictionary'} onClick={closeMenu}>Сөздүк</NavItem>
        <NavItem to="/quiz" $active={location.pathname === '/quiz'} onClick={closeMenu}>Тесттер</NavItem>
        <NavItem to="/grammar" $active={location.pathname === '/grammar'} onClick={closeMenu}>Грамматика</NavItem>
        <NavItem to="/lessons" $active={isLessonsPath} onClick={closeMenu}>Сабактар</NavItem>
        <NavItem to="/cinema" $active={location.pathname === '/cinema'} onClick={closeMenu}>Кино-Театр</NavItem>
        
        <div style={{ marginTop: 'auto', paddingBottom: '40px' }}>
          {isAuthenticated ? (
            <LogoutButton style={{ width: '100%' }} onClick={handleLogout}>Чыгуу</LogoutButton>
          ) : (
            <ActionButton style={{ display: 'block', width: '100%' }} onClick={() => { closeMenu(); navigate('/welcome'); }}>
              Кирүү
            </ActionButton>
          )}
        </div>
      </Sidebar>
    </>
  );
};

export default Navbar;