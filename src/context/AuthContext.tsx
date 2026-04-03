import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

// 1. Колдонуучунун тибин ачык көрсөтөбүз (any дегенди колдонбош үчүн)
interface User {
  name: string;
  email?: string;
  id?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('lingvo_user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("User маалыматын окууда ката чыкты:", error);
        localStorage.removeItem('lingvo_user');
      }
    }
  }, []);

  const login = (userData: User) => {
    localStorage.setItem('lingvo_user', JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('lingvo_user');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth сөзсүз AuthProvider ичинде колдонулушу керек!");
  }
  return context;
};