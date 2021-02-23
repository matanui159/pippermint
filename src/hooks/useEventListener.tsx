import { useEffect } from 'react';

export function useEventListener<K extends keyof WindowEventMap>(
   target: Window | undefined,
   type: K,
   listener: (event: WindowEventMap[K]) => void
): void;
export function useEventListener<K extends keyof MediaQueryListEventMap>(
   target: MediaQueryList | undefined,
   type: K,
   listener: (event: MediaQueryListEventMap[K]) => void
): void;
export function useEventListener(
   target: EventTarget | undefined,
   type: string,
   listener: (event: Event) => void
): void;
export function useEventListener(
   target: EventTarget | undefined,
   type: string,
   listener: (event: Event) => void
): void {
   useEffect(() => {
      if (target === undefined) {
         return undefined;
      }
      if (target instanceof MediaQueryList && !(target instanceof EventTarget)) {
         // Support older versions of Safari
         const media = target as MediaQueryList;
         media.addListener(listener);
      } else {
         target.addEventListener(type, listener);
      }

      return () => {
         if (target instanceof MediaQueryList && !(target instanceof EventTarget)) {
            const media = target as MediaQueryList;
            media.removeListener(listener);
         } else {
            target.removeEventListener(type, listener);
         }
      };
   }, [target, type, listener]);
}
