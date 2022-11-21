import { useEffect, useLayoutEffect, useMemo, version } from 'react';

import ReactDom from 'react-dom/client';

import { useRef } from 'react';

type EffectHookType = typeof useEffect | typeof useLayoutEffect;
type FuncType = (hook: EffectHookType) => EffectHookType;

type MemoHookType = (hook: typeof useMemo) => typeof useMemo;

let oldDeps: any = Symbol();

const createStrictMemo: MemoHookType = (hook) => (effect, deps) => {
  return hook(() => {
    if (deps === null) {
      deps = void 0;
    }
    if (Array.isArray(oldDeps) && Array.isArray(deps) && oldDeps.length === deps.length) {
      for (let i = 0; i < oldDeps.length; ++i) {
        if (!Object.is(oldDeps[i], deps[i])) {
          oldDeps = deps;
          return effect();
        }
      }
    } else {
      if (!Object.is(oldDeps, deps)) {
        oldDeps = deps;
        return effect();
      }
    }
  }, [deps]) as ReturnType<typeof effect>;
};

const mp: Record<string, number> = {};
const createUnStrictHook: FuncType = (hook) => {
  return (effect, deps) => {
    const cleanUp = useRef<ReturnType<typeof effect>>();
    const key = effect.toString() + deps?.toString();
    mp[key] = mp[key] ? mp[key] + 1 : 1;
    hook(() => {
      // 非开发模式或18以下正常返回
      if (process.env.NODE_ENV !== 'development' || +version.split('.')[0] < 18) {
        return effect();
      }

      if (mp[key] === 2) {
        cleanUp.current = effect();
      }
      return () => {
        if (mp[key]) {
          mp[key] = 0;
          return;
        }
        if (!mp[key]) {
          return cleanUp.current?.();
        }
      };
    }, [deps]);
  };
};

export default createUnStrictHook;
