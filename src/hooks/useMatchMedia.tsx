import { useEffect, useState } from 'react';
import { useMediaListener } from './useListener';

export function useMatchMedia(query: string): boolean {
   const [media, setMedia] = useState<MediaQueryList>();
   const [matches, setMatches] = useState(false);

   useEffect(() => {
      const newMedia = window.matchMedia(query);
      setMedia(newMedia);
      setMatches(newMedia.matches);
   }, [query]);

   useMediaListener(media, (event) => {
      setMatches(event.matches);
   });

   return matches;
}
