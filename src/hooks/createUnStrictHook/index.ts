import type { useEffect, useLayoutEffect, useMemo } from 'react';
import { useRef } from 'react';

type EffectHookType = typeof useEffect | typeof useLayoutEffect;
type FuncType = (hook: EffectHookType) => EffectHookType;

type MemoHookType = (hook:  typeof useMemo) =>  typeof useMemo

let oldDeps: any = Symbol()

const createStrictMemo: MemoHookType = (hook) => (effect, deps) =>  {
    
    return hook(() => {
        
        if (deps === null) {
            deps = void 0
        }
        if (Array.isArray(oldDeps) && Array.isArray(deps) && oldDeps.length === deps.length) {
            for(let i = 0; i < oldDeps.length; ++i) {
                if (!Object.is(oldDeps[i], deps[i])) {
                    oldDeps = deps
                    return effect()
                    
                }
            }
        } else {
            if (!Object.is(oldDeps, deps)) {
                oldDeps = deps
                return effect()
            }
            
        }
    }, [deps]) as ReturnType<typeof effect>
    
}


const createUnStrictHook: FuncType = (hook) => (effect, deps) => {
  const isFirst = useRef(true);

  hook(() => {
    return () => {
      isFirst.current = false;
    };
  }, []);

  hook(() => {
    if (isFirst.current) {
      return;
    }
    return effect();
  }, [deps]);
};

export default createUnStrictHook;
