import { useRouter } from 'next/dist/client/router';
import { useEffect } from 'react';

export function useRouteChange(fn: () => void): void {
   const router = useRouter();

   useEffect(() => {
      router.events.on('routeChangeComplete', fn);
      return () => router.events.off('routeChangeComplete', fn);
   }, [fn]);
}
