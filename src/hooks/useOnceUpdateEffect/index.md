---
nav:
  path: /hooks
group:
  title: Effect相关
  order: 0
---

# useOnceUpdateEffect

跟 useEffect 用法一样，同时忽略首次执行，只在第一次依赖更新时执行



## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

## API

跟 useEffect 的 api 用法一样

```typescript
useOnceUpdateEffect(
  effect: React.EffectCallback,
  deps?: React.DependencyList,
)
```
