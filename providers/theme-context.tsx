import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const THEME_STORAGE_KEY = '@portfolio_app:theme_mode';

export type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  isDark: boolean;
  theme: ThemeMode;
  toggleTheme: () => void;
  colors: {
    primary: string;
    text: string;
    textMuted: string;
    surface: string;
    background: string;
    secondary?: string;
    accent?: string;
  };
}

const defaultContextValue: ThemeContextType = {
  isDark: false,
  theme: 'light',
  toggleTheme: () => {},
  colors: {
    primary: '#1E3A8A',
    text: '#111827',
    textMuted: '#6B7280',
    surface: '#F9FAFB',
    background: '#FFFFFF',
  },
};

const ThemeContext = createContext<ThemeContextType>(defaultContextValue);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeMode>('light');
  const [isLoading, setIsLoading] = useState(true);

  // Load theme preference on mount
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (savedTheme === 'dark' || savedTheme === 'light') {
          setTheme(savedTheme);
        }
      } catch (error) {
        console.warn('Failed to load theme preference:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTheme();
  }, []);

  const toggleTheme = async () => {
    try {
      const newTheme = theme === 'light' ? 'dark' : 'light';
      setTheme(newTheme);
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme);
    } catch (error) {
      console.warn('Failed to save theme preference:', error);
    }
  };

  const isDark = theme === 'dark';
  const colors = isDark
    ? {
        primary: '#FBBF24',
        text: '#FFFFFF',
        textMuted: '#9CA3AF',
        surface: '#0F172A',
        background: '#020617',
        secondary: '#10B981',
        accent: '#3B82F6',
      }
    : {
        primary: '#1E3A8A',
        text: '#111827',
        textMuted: '#6B7280',
        surface: '#F9FAFB',
        background: '#FFFFFF',
        secondary: '#059669',
        accent: '#1E40AF',
      };

  const value: ThemeContextType = {
    isDark,
    theme,
    toggleTheme,
    colors,
  };

  if (isLoading) {
    return null; // or a loading screen
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};