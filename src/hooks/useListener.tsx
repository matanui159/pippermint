import { useEffect } from 'react';

export function useWindowListener<T extends keyof WindowEventMap>(
   type: T,
   listener: (event: WindowEventMap[T]) => void
): void {
   useEffect(() => {
      window.addEventListener(type, listener);
      return () => window.removeEventListener(type, listener);
   }, [type, listener]);
}

export function useMediaListener(
   media: MediaQueryList | undefined,
   listener: (event: MediaQueryListEvent) => void
): void {
   useEffect(() => {
      if (media === undefined) {
         return () => {};
      }
      media.addListener(listener);
      return () => media.removeListener(listener);
   }, [media, listener]);
}
