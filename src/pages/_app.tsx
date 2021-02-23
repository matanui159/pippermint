import { ErrorBoundary } from '@sentry/react';
import { AppProps } from 'next/app';
import { useEffect } from 'react';
import { logEvent, setupLogging } from '../analytics';
import { ThemeProvider } from '../components/ThemeProvider';
import { useRouteChange } from '../hooks/useRouteChange';

import 'tailwindcss/tailwind.css';

export default function App({ Component, pageProps }: AppProps): JSX.Element {
   useEffect(() => {
      setupLogging();
   }, []);

   useRouteChange(() =>
      logEvent('page_view', {
         page_title: document.title,
         page_location: window.location.href,
         page_path: window.location.pathname,
      })
   );

   return (
      <ErrorBoundary>
         <ThemeProvider>
            <Component {...pageProps} />
         </ThemeProvider>
      </ErrorBoundary>
   );
}
