declare module '*.css';
declare module '*.less';
export {}
declare global {
  interface Window {
    onconnect: (event: MessageEvent) => void;
  }
  interface WakeLockSentinel {
    release(): Promise<void>;
    readonly released: boolean;
    readonly type: 'screen';
    addEventListener(
        type: 'release',
        listener: (this: WakeLockSentinel, ev: Event) => any,
        options?: boolean | AddEventListenerOptions
    ): void;
    removeEventListener(
        type: 'release',
        listener: (this: WakeLockSentinel, ev: Event) => any,
        options?: boolean | EventListenerOptions
    ): void;
  }
  interface Navigator {
    wakeLock: {
      request(type: 'screen'): Promise<WakeLockSentinel>
    }
  }
}
