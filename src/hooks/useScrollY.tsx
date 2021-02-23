import { useEffect, useState } from 'react';
import { useWindowListener } from './useListener';

export function useScrollY(): number {
   const [scroll, setScroll] = useState(0);

   useEffect(() => {
      setScroll(window.pageYOffset);
   }, []);

   useWindowListener('scroll', () => {
      setScroll(window.pageYOffset);
   });

   return scroll;
}
