---
nav:
  path: /hooks
group:
  title: Effect相关
  order: 1
---

# useUpdateLayoutEffect

跟 useLayoutEffect 用法一样，同时忽略首次执行，可限制依赖更新时执行的次数

## 基础用法
跟[useUpdateEffect](./use-update-effect)基本一致

## API

跟 useLayoutEffect 的 api 用法相似，增加次数参数

```typescript
useUpdateLayoutEffect(
  effect: React.EffectCallback,
  deps?: React.DependencyList,
  times?: number,
)
```
