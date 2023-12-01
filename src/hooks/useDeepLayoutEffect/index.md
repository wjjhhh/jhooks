---
nav:
  path: /hooks
group:
  title: Effect相关
  order: 0
---

# useDeepLayoutEffect

跟 useLayoutEffect 用法一样，但额外对依赖做深比较。

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

## API

```typescript
useDeepLayoutEffect(
  effect: React.EffectCallback,
  deps: React.DependencyList
)
```
