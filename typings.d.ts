declare module '*.css';
declare module '*.less';
export {}
declare global {
  interface Window {
    onconnect: (event: MessageEvent) => void;
  }
}
