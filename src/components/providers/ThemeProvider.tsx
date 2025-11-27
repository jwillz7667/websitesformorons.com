'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
  type ReactNode,
} from 'react';

interface ThemeContextType {
  isDark: boolean;
  toggle: () => void;
  setTheme: (dark: boolean) => void;
  theme: 'dark' | 'light';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: 'dark' | 'light';
}

export function ThemeProvider({
  children,
  defaultTheme = 'dark',
}: ThemeProviderProps) {
  const [isDark, setIsDark] = useState(defaultTheme === 'dark');
  const [mounted, setMounted] = useState(false);

  // Load saved theme preference
  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('theme');
    if (saved) {
      setIsDark(saved === 'dark');
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDark(prefersDark);
    }
  }, []);

  // Update document class and save preference
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    root.classList.remove('dark', 'light');
    root.classList.add(isDark ? 'dark' : 'light');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark, mounted]);

  const toggle = useCallback(() => {
    setIsDark((prev) => !prev);
  }, []);

  const setTheme = useCallback((dark: boolean) => {
    setIsDark(dark);
  }, []);

  const value: ThemeContextType = useMemo(
    () => ({
      isDark,
      toggle,
      setTheme,
      theme: isDark ? 'dark' : 'light',
    }),
    [isDark, toggle, setTheme]
  );

  // Prevent flash of unstyled content
  if (!mounted) {
    return (
      <div className="min-h-screen bg-neutral-950">
        {children}
      </div>
    );
  }

  return (
    <ThemeContext.Provider value={value}>
      <div
        className={`min-h-screen transition-colors duration-300 ${
          isDark ? 'bg-neutral-950 text-white' : 'bg-white text-neutral-900'
        }`}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}
