import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

// 1. Колдонуучунун тибин ачык көрсөтөбүз (any дегенди колдонбош үчүн)
interface User {
  name: string;
  email?: string;
  id?: string;
}

interface StoredUser extends User {
  password: string;
  createdAt: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => { ok: boolean; message?: string };
  register: (userData: { name: string; email: string; password: string }) => { ok: boolean; message?: string };
  continueAsGuest: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const CURRENT_USER_KEY = 'lingvo_user';
const USERS_KEY = 'lingvo_users';

const normalizeEmail = (email: string) => email.trim().toLowerCase();

const readUsers = (): StoredUser[] => {
  const saved = localStorage.getItem(USERS_KEY);
  if (!saved) return [];

  try {
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    localStorage.removeItem(USERS_KEY);
    return [];
  }
};

const saveUsers = (users: StoredUser[]) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem(CURRENT_USER_KEY);
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("User маалыматын окууда ката чыкты:", error);
        localStorage.removeItem(CURRENT_USER_KEY);
      }
    }
  }, []);

  const setSession = (userData: User) => {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
  };

  const register = (userData: { name: string; email: string; password: string }) => {
    const email = normalizeEmail(userData.email);
    const name = userData.name.trim();
    const password = userData.password.trim();

    if (!name || !email || !password) {
      return { ok: false, message: 'Бардык талааларды толтуруңуз.' };
    }

    if (password.length < 6) {
      return { ok: false, message: 'Пароль кеминде 6 белгиден турсун.' };
    }

    const users = readUsers();
    if (users.some((savedUser) => savedUser.email === email)) {
      return { ok: false, message: 'Бул email менен аккаунт мурун катталган.' };
    }

    const newUser: StoredUser = {
      id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}`,
      name,
      email,
      password,
      createdAt: new Date().toISOString(),
    };

    saveUsers([...users, newUser]);
    setSession({ id: newUser.id, name: newUser.name, email: newUser.email });
    return { ok: true };
  };

  const login = (emailInput: string, passwordInput: string) => {
    const email = normalizeEmail(emailInput);
    const password = passwordInput.trim();
    const foundUser = readUsers().find((savedUser) => savedUser.email === email);

    if (!foundUser) {
      return { ok: false, message: 'Аккаунт табылган жок. Алгач катталыңыз.' };
    }

    if (foundUser.password !== password) {
      return { ok: false, message: 'Пароль туура эмес.' };
    }

    setSession({ id: foundUser.id, name: foundUser.name, email: foundUser.email });
    return { ok: true };
  };

  const continueAsGuest = () => {
    setSession({
      id: 'guest',
      name: 'Конок',
      email: 'guest@ainabi.local',
    });
  };

  const logout = () => {
    localStorage.removeItem(CURRENT_USER_KEY);
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, register, continueAsGuest, logout }}>
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
