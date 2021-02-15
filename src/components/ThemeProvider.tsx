import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useMatchMedia } from '../hooks/useMatchMedia';
import { ChildProps } from '../props';

export type Theme = 'light' | 'dark';
export type ThemeHook = [Theme, (theme: Theme) => void];

const ThemeContext = createContext<ThemeHook>(['light', () => {}]);

export function ThemeProvider({ children }: ChildProps): JSX.Element {
   const [theme, setTheme] = useState<Theme>('light');
   const prefersDark = useMatchMedia('(prefers-color-scheme: dark)');

   useEffect(() => {
      const localTheme = localStorage.getItem('theme');
      if (localTheme !== null) {
         setTheme(localTheme as Theme);
      } else if (prefersDark) {
         setTheme('dark');
      } else {
         setTheme('light');
      }
   }, [prefersDark]);

   useEffect(() => {
      const classes = document.documentElement.classList;
      if (theme === 'dark') {
         classes.add('dark');
      } else {
         classes.remove('dark');
      }
   }, [theme]);

   const setThemeStorage = useCallback((newTheme: Theme) => {
      setTheme(newTheme);
      localStorage.setItem('theme', newTheme);
   }, []);

   return (
      <ThemeContext.Provider value={[theme, setThemeStorage]}>
         {children}
      </ThemeContext.Provider>
   );
}

export function useTheme(): ThemeHook {
   return useContext(ThemeContext);
}
