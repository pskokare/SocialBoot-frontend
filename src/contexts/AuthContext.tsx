
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  username?: string;
  bio?: string;
  website?: string;
  avatar?: string | null;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUserProfile: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('user');
      if (savedUser && savedUser !== 'undefined') {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
      }
    } catch (err) {
      console.error('Failed to parse user from localStorage:', err);
      localStorage.removeItem('user');
    }
  }, []);

  const login = async (email: string, password: string) => {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (email && password) {
          const mockUser: User = {
            id: '1',
            name: 'Demo User',
            email: email,
            username: 'demouser',
            bio: 'I love creating content and connecting with others!',
            website: 'https://example.com',
            avatar: null,
          };

          setUser(mockUser);
          localStorage.setItem('user', JSON.stringify(mockUser));
          resolve();
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 800);
    });
  };

  const signup = async (name: string, email: string, password: string) => {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (name && email && password) {
          const mockUser: User = {
            id: '1',
            name: name,
            email: email,
            username: email.split('@')[0],
            bio: '',
            website: '',
            avatar: null,
          };

          setUser(mockUser);
          localStorage.setItem('user', JSON.stringify(mockUser));
          resolve();
        } else {
          reject(new Error('Please fill all required fields'));
        }
      }, 800);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const updateUserProfile = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const value = {
    user,
    login,
    signup,
    logout,
    updateUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
