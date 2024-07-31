---
nav:
  path: /hooks
group:
  title: Effect相关
  order: 0
---

# useDeepEffect

跟 useEffect 用法一样，但额外对依赖做深比较。

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

## API

```typescript
useDeepEffect(
  effect: React.EffectCallback,
  deps: React.DependencyList
)
```
