import { useState } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

const Nav = styled.nav`
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 800;
  color: #2ecc71;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 8px;
  z-index: 1100;

  span { color: #2c3e50; }
  &::before { content: '🇹🇷'; font-size: 1.6rem; }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;

  @media (max-width: 992px) {
    display: none; 
  }
`;

const NavItem = styled(Link)<{ $active?: boolean }>`
  text-decoration: none;
  color: ${props => props.$active ? '#2ecc71' : '#5a6c7d'};
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: ${props => props.$active ? '100%' : '0'};
    height: 2px;
    background: #2ecc71;
    transition: width 0.3s ease;
  }

  &:hover { color: #2ecc71; &::after { width: 100%; } }
`;

/* --- HAMBURGER MENU ICON --- */
const Hamburger = styled.div<{ $isOpen: boolean }>`
  display: none;
  flex-direction: column;
  cursor: pointer;
  gap: 6px;
  z-index: 1100;

  @media (max-width: 992px) { display: flex; }

  div {
    width: 28px;
    height: 3px;
    background: #2c3e50;
    border-radius: 10px;
    transition: all 0.3s ease;
    
    &:nth-child(1) { transform: ${props => props.$isOpen ? 'rotate(45deg) translate(6px, 6px)' : 'none'}; }
    &:nth-child(2) { opacity: ${props => props.$isOpen ? '0' : '1'}; }
    &:nth-child(3) { transform: ${props => props.$isOpen ? 'rotate(-45deg) translate(7px, -7px)' : 'none'}; }
  }
`;

/* --- SIDEBAR MENU --- */
const Sidebar = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 280px;
  height: 100vh;
  background: white;
  box-shadow: 20px 0 40px rgba(0,0,0,0.1);
  padding: 100px 30px;
  display: flex;
  flex-direction: column;
  gap: 25px;
  transition: transform 0.4s cubic-bezier(0.77, 0, 0.175, 1);
  transform: ${props => props.$isOpen ? 'translateX(0)' : 'translateX(-100%)'};
  z-index: 1050;
`;

const Overlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.4);
  backdrop-filter: blur(4px);
  display: ${props => props.$isOpen ? 'block' : 'none'};
  z-index: 1040;
`;

const ActionButton = styled.button`
  background: linear-gradient(135deg, #2ecc71 0%, #27ae60 100%);
  color: white;
  padding: 10px 24px;
  border-radius: 12px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(46, 204, 113, 0.3);
  transition: transform 0.2s;

  &:hover { transform: scale(1.05); }

  @media (max-width: 992px) {
    display: none; 
  }
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  // Сабактар барагында же ички сабакта жүргөнүн текшерүү
  const isLessonsPath = location.pathname.startsWith('/lessons') || location.pathname.startsWith('/lesson/');

  return (
    <>
      <Nav>
        <Logo to="/" onClick={() => setIsOpen(false)}>
          TR<span>Лингво</span>
        </Logo>
        
        <NavLinks>
          <NavItem to="/" $active={location.pathname === '/'}>Башкы бет</NavItem>
          <NavItem to="/dictionary" $active={location.pathname === '/dictionary'}>Сөздүк</NavItem>
          <NavItem to="/quiz" $active={location.pathname === '/quiz'}>Тесттер</NavItem>
          <NavItem to="/grammar" $active={location.pathname === '/grammar'}>Грамматика</NavItem>
          {/* Өзгөртүү: /lessonview ордуна /lessons тизмесине багыттайбыз */}
          <NavItem to="/lessons" $active={isLessonsPath}>Сабактар</NavItem>
          <ActionButton>Катталуу</ActionButton>
        </NavLinks>

        <Hamburger $isOpen={isOpen} onClick={toggleMenu}>
          <div /> <div /> <div />
        </Hamburger>
      </Nav>

      <Overlay $isOpen={isOpen} onClick={toggleMenu} />

      <Sidebar $isOpen={isOpen}>
        <NavItem to="/" $active={location.pathname === '/'} onClick={toggleMenu}>Башкы бет</NavItem>
        <NavItem to="/dictionary" $active={location.pathname === '/dictionary'} onClick={toggleMenu}>Сөздүк</NavItem>
        <NavItem to="/quiz" $active={location.pathname === '/quiz'} onClick={toggleMenu}>Тесттер</NavItem>
        <NavItem to="/grammar" $active={location.pathname === '/grammar'} onClick={toggleMenu}>Грамматика</NavItem>
        <NavItem to="/lessons" $active={isLessonsPath} onClick={toggleMenu}>Сабактар</NavItem>
        <div style={{marginTop: '20px'}}>
           <ActionButton style={{display: 'block', width: '100%'}}>Катталуу</ActionButton>
        </div>
      </Sidebar>
    </>
  );
};

export default Navbar;