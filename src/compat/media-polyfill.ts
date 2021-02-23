type MediaQueryListListener =
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   ((this: MediaQueryList, event: MediaQueryListEvent) => any) | null;

export class MediaQueryListPolyfill extends EventTarget implements MediaQueryList {
   public get matches(): boolean {
      return this.original.matches;
   }

   public get media(): string {
      return this.original.media;
   }

   public get onchange(): MediaQueryListListener {
      return this.original.onchange;
   }

   public set onchange(listener: MediaQueryListListener) {
      this.original.onchange = listener;
   }

   public constructor(private readonly original: MediaQueryList) {
      super();
      original.addListener((event) => this.dispatchEvent(event));
   }

   public addListener(listener: MediaQueryListListener): void {
      this.original.addListener(listener);
   }

   public removeListener(listener: MediaQueryListListener): void {
      this.original.removeListener(listener);
   }
}
