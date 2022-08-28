import type { MutableRefObject } from 'react';

export type TargetValue<T> = T | undefined | null;

export type TargetType = HTMLElement | Element | Window | Document;
export type BasicTarget<T extends TargetType = Element> =
  | (() => TargetValue<T>)
  | TargetValue<T>
  | MutableRefObject<TargetValue<T>>;
