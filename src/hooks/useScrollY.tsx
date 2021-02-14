import { useEffect, useState } from 'react';
import { useEventListener } from './useEventListener';

export function useScrollY(): number {
   const [scroll, setScroll] = useState(0);

   useEffect(() => {
      setScroll(window.pageYOffset);
   }, []);

   useEventListener(globalThis, 'scroll', () => {
      setScroll(window.pageYOffset)
   });

   return scroll;
}
