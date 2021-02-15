import { AppProps } from 'next/app';
import { ThemeProvider } from '../components/ThemeProvider';
import 'tailwindcss/tailwind.css';

export default function App({ Component, pageProps }: AppProps): JSX.Element {
   return (
      <ThemeProvider>
         <Component {...pageProps} />
      </ThemeProvider>
   );
}
