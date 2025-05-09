import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';

interface UserContextType {
  userCoins: number;
  addCoins: (amount: number) => void;
  removeCoins: (amount: number) => void;
}

const UserContext = createContext<UserContextType | null>(null);

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [userCoins, setUserCoins] = useState(0);
  const { user } = useAuth();
  
  useEffect(() => {
    if (user) {
      // Load saved coins from localStorage
      const savedCoins = localStorage.getItem(`coins-${user.id}`);
      if (savedCoins) {
        setUserCoins(parseInt(savedCoins, 10));
      } else {
        // Start with 50 coins for new users
        setUserCoins(50);
        localStorage.setItem(`coins-${user.id}`, '50');
      }
    } else {
      setUserCoins(0);
    }
  }, [user]);
  
  const addCoins = (amount: number) => {
    if (user) {
      const newTotal = userCoins + amount;
      setUserCoins(newTotal);
      localStorage.setItem(`coins-${user.id}`, newTotal.toString());
    }
  };
  
  const removeCoins = (amount: number) => {
    if (user) {
      const newTotal = Math.max(0, userCoins - amount);
      setUserCoins(newTotal);
      localStorage.setItem(`coins-${user.id}`, newTotal.toString());
    }
  };
  
  const value = {
    userCoins,
    addCoins,
    removeCoins,
  };
  
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}