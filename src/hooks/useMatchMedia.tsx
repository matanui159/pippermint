import { useEffect, useState } from 'react';
import { MediaQueryListPolyfill } from '../compat/media-polyfill';
import { useEventListener } from './useEventListener';

export function useMatchMedia(query: string): boolean {
   const [media, setMedia] = useState<MediaQueryList>();
   const [matches, setMatches] = useState(false);

   useEffect(() => {
      let newMedia = window.matchMedia(query);
      if (!(newMedia instanceof EventTarget)) {
         newMedia = new MediaQueryListPolyfill(newMedia);
      }
      setMedia(newMedia);
      setMatches(newMedia.matches);
   }, [query]);

   useEventListener(media, 'change', (event) => {
      setMatches(event.matches);
   });

   return matches;
}
