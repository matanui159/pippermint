import { useTheme } from '../ThemeProvider';
import { MoonIcon } from './MoonIcon';
import { SunIcon } from './SunIcon';

export function ThemeButton(): JSX.Element {
   const [theme, setTheme] = useTheme();

   return (
      <button
         className='transform transition-transform hover:scale-110'
         type='button'
         aria-label='Toggle Theme'
         onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      >
         {theme === 'dark' ? <MoonIcon /> : <SunIcon />}
      </button>
   );
}
