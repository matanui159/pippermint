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
      target.addEventListener(type, listener);
      return () => target.removeEventListener(type, listener);
   }, [target, type, listener]);
}
