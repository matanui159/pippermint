/* eslint-disable no-console */

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export function logProperties(props: Record<string, unknown>): void {
   if (GA_MEASUREMENT_ID === undefined) {
      console.log(props);
   } else {
      gtag('set', props);
   }
}

export function logEvent(name: string, props: Record<string, unknown>): void {
   if (GA_MEASUREMENT_ID === undefined) {
      console.log(name, props);
   } else {
      gtag('event', name, props);
   }
}
