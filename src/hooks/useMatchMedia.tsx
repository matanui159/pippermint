import { useEffect, useState } from 'react';
import { useEventListener } from './useEventListener';

export function useMatchMedia(query: string): boolean {
   const [media, setMedia] = useState<MediaQueryList>();
   const [matches, setMatches] = useState(false);

   useEffect(() => {
      const newMedia = window.matchMedia(query);
      setMedia(newMedia);
      setMatches(newMedia.matches);
   }, [query]);

   useEventListener(media, 'change', (event: MediaQueryListEvent) => {
      setMatches(event.matches);
   });

   return matches;
}
