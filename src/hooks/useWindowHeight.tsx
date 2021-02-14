import { useEffect, useState } from 'react';
import { useEventListener } from './useEventListener';

export function useWindowHeight(): number {
   const [height, setHeight] = useState(0);

   useEffect(() => {
      setHeight(window.innerHeight);
   }, []);

   useEventListener(globalThis, 'resize', () => {
      setHeight(window.innerHeight);
   });

   return height;
}
