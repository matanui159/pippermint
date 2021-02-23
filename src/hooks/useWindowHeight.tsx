import { useEffect, useState } from 'react';
import { useWindowListener } from './useListener';

export function useWindowHeight(): number {
   const [height, setHeight] = useState(0);

   useEffect(() => {
      setHeight(window.innerHeight);
   }, []);

   useWindowListener('resize', () => {
      setHeight(window.innerHeight);
   });

   return height;
}
