declare module '*.less';
declare module '*.png';
declare module '*.jpg';
declare module '*.sass';

declare module '*.svg' {
    export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    const src: string;
    export default src;
}