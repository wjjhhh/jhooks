import { MutableRefObject } from 'react';

type TargetValue<T> = T | undefined | null;

type TargetType = HTMLElement | Element | Window | Document;

export type BasicTarget<T extends TargetType = Element> =
  | (() => TargetValue<T>)
  | TargetValue<T>
  | MutableRefObject<TargetValue<T>>;

export const getTargetElement = <T extends TargetType>(
  target: BasicTarget<T>,
) => {
  if (!target) return null;
  if (typeof target === 'function') {
    return target();
  }
  if ('current' in target) {
    return target?.current;
  }
  return target;
};

export const isClient = typeof window !== 'undefined';
export const defaultWindow = /* #__PURE__ */ isClient ? window : undefined;
export const defaultDocument = /* #__PURE__ */ isClient
  ? window.document
  : undefined;
export const defaultNavigator = /* #__PURE__ */ isClient
  ? window.navigator
  : undefined;
export const defaultLocation = /* #__PURE__ */ isClient
  ? window.location
  : undefined;
export const sleep = (timeout: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

export function generateUUID() {
  let d = new Date().getTime();
  if (
    typeof performance !== 'undefined' &&
    typeof performance.now === 'function'
  ) {
    d += performance.now(); // 使用performance.now()精确到微秒级别
  }
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
    /[xy]/g,
    function (c) {
      const r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
    },
  );
  return uuid;
}

export function isEmptyObject(obj: object) {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}