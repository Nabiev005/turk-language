import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Авторизация контекстин коштук

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

const Nav = styled.nav`
  background: rgba(255, 255, 255, 0.86);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 clamp(16px, 5vw, 72px);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.04);
  position: sticky;
  top: 0;
  z-index: 1000;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);

  @media (max-width: 760px) {
    height: 64px;
  }
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
    background: linear-gradient(135deg, var(--brand-2), #b91c1c);
    color: white;
    width: 38px;
    height: 38px;
    border-radius: 12px;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 8px 20px rgba(239, 68, 68, 0.24);
  }

  span { color: var(--text); letter-spacing: 0; }

  @media (max-width: 420px) {
    font-size: 1.2rem;
    .flag-box { width: 34px; height: 34px; border-radius: 10px; }
  }
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
  color: ${props => props.$active ? 'var(--brand)' : 'var(--muted)'};
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
    background: var(--brand);
    border-radius: 10px;
    transition: width 0.3s ease;
  }

  &:hover { 
    color: var(--brand); 
    &::after { width: 100%; } 
  }
`;

const ActionButton = styled.button`
  background: var(--brand);
  color: white;
  padding: 12px 28px;
  border-radius: 14px;
  font-weight: 700;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 6px 15px rgba(46, 204, 113, 0.2);

  &:hover { 
    background: #15803d;
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
  color: var(--text);
  
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
    background: var(--text);
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
  background: var(--surface);
  padding: 96px 28px 28px;
  display: flex;
  flex-direction: column;
  gap: 25px;
  transition: 0.4s ease-in-out;
  transform: ${props => props.$isOpen ? 'translateX(0)' : 'translateX(-100%)'};
  box-shadow: 15px 0 40px rgba(0,0,0,0.08);
  z-index: 1050;

  @media (max-width: 360px) {
    width: 86vw;
  }
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

const InstallButton = styled.button`
  background: #ecfdf5;
  color: var(--brand);
  border: 1px solid #bbf7d0;
  padding: 10px 16px;
  border-radius: 14px;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: var(--brand);
    color: white;
  }

  @media (max-width: 1024px) {
    display: none;
  }
`;

const BottomNav = styled.nav`
  display: none;

  @media (max-width: 760px) {
    position: fixed;
    left: 12px;
    right: 12px;
    bottom: calc(10px + env(safe-area-inset-bottom));
    height: 66px;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    align-items: center;
    gap: 4px;
    background: rgba(255, 255, 255, 0.94);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    border: 1px solid rgba(148, 163, 184, 0.22);
    border-radius: 22px;
    box-shadow: 0 18px 45px rgba(15, 23, 42, 0.14);
    z-index: 1030;
  }
`;

const BottomItem = styled(Link)<{ $active?: boolean }>`
  min-width: 0;
  height: 56px;
  border-radius: 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  color: ${props => props.$active ? 'var(--brand)' : '#64748b'};
  background: ${props => props.$active ? '#ecfdf5' : 'transparent'};
  font-size: 0.68rem;
  font-weight: 800;

  span:first-child {
    font-size: 1.2rem;
    line-height: 1;
  }
`;

const InstallBanner = styled.div`
  position: fixed;
  left: 16px;
  right: 16px;
  bottom: calc(86px + env(safe-area-inset-bottom));
  z-index: 1025;
  background: #172033;
  color: white;
  border-radius: 20px;
  padding: 14px;
  box-shadow: 0 18px 45px rgba(15, 23, 42, 0.24);
  display: none;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  strong {
    display: block;
    font-size: 0.9rem;
  }

  small {
    color: #cbd5e1;
    display: block;
  }

  button {
    border-radius: 14px;
    padding: 10px 12px;
    background: var(--brand);
    color: white;
    font-weight: 800;
    white-space: nowrap;
  }

  @media (max-width: 760px) {
    display: flex;
  }
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth(); // Контексттен маалыматтарды алабыз
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallHint, setShowInstallHint] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  const isLessonsPath = location.pathname.startsWith('/lessons') || location.pathname.startsWith('/lesson/');

  const navItems = useMemo(() => [
    { to: '/', label: 'Башкы бет', icon: '⌂', active: location.pathname === '/' },
    { to: '/dictionary', label: 'Сөздүк', icon: 'Aa', active: location.pathname === '/dictionary' },
    { to: '/quiz', label: 'Тесттер', icon: '✓', active: location.pathname === '/quiz' },
    { to: '/grammar', label: 'Грамматика', icon: '∑', active: location.pathname === '/grammar' },
    { to: '/lessons', label: 'Сабактар', icon: '▶', active: isLessonsPath },
    { to: '/cinema', label: 'Видео', icon: '▣', active: location.pathname === '/cinema' },
  ], [isLessonsPath, location.pathname]);

  useEffect(() => {
    const onBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as BeforeInstallPromptEvent);
      if (!localStorage.getItem('pwa_install_hint_closed')) {
        setShowInstallHint(true);
      }
    };

    window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt);
  }, []);

  const handleInstall = async () => {
    if (!installPrompt) return;
    await installPrompt.prompt();
    await installPrompt.userChoice;
    setInstallPrompt(null);
    setShowInstallHint(false);
    localStorage.setItem('pwa_install_hint_closed', '1');
  };

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate('/welcome');
  };

  return (
    <>
      <Nav>
        <Logo to="/" onClick={closeMenu}>
          <div className="flag-box">TR</div>
          <span>Лингво</span>
        </Logo>
        
        <NavLinks>
          {navItems.map(item => (
            <NavItem key={item.to} to={item.to} $active={item.active}>{item.label}</NavItem>
          ))}
          {installPrompt && <InstallButton onClick={handleInstall}>Телефонго сактоо</InstallButton>}
          
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

        {navItems.map(item => (
          <NavItem key={item.to} to={item.to} $active={item.active} onClick={closeMenu}>{item.label}</NavItem>
        ))}
        {installPrompt && <InstallButton style={{ display: 'block' }} onClick={handleInstall}>Телефонго сактоо</InstallButton>}
        
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

      {showInstallHint && installPrompt && (
        <InstallBanner>
          <div>
            <strong>Тиркеме катары сактаңыз</strong>
            <small>Иконка менен ачылып, app сыяктуу иштейт.</small>
          </div>
          <button onClick={handleInstall}>Сактоо</button>
        </InstallBanner>
      )}

      <BottomNav aria-label="Төмөнкү навигация">
        {navItems.slice(0, 5).map(item => (
          <BottomItem key={item.to} to={item.to} $active={item.active}>
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </BottomItem>
        ))}
      </BottomNav>
    </>
  );
};

export default Navbar;
