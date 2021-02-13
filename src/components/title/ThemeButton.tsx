import { useTheme } from '../ThemeProvider';
import { MoonIcon } from './MoonIcon';
import { SunIcon } from './SunIcon';

export function ThemeButton(): JSX.Element {
   const [theme, setTheme] = useTheme();

   return (
      <button aria-label='Toggle Theme' onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
         {theme === 'dark' ? <MoonIcon /> : <SunIcon />}
      </button>
   );
}
