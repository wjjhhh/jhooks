import { useEffect, useRef, useMemo, type DependencyList } from 'react'

export default (fn: Function, ms: number, deps: DependencyList) => {
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const funcRef = useRef<Function | null>(fn);

    useEffect(() => {
        return () => {
            clearTimeout(timerRef.current!);
            funcRef.current = null;
        };
    }, []);

    return useMemo(() => {
        funcRef.current = fn;
        return function (...args: any[]) {
            clearTimeout(timerRef.current!);
            timerRef.current = setTimeout(() => funcRef.current?.(...args), ms);
        };
    }, deps);
}
