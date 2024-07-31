---
nav:
  path: /hooks
group:
  title: Effect相关
  order: 0
---

# useUpdateEffect

跟 useEffect 用法一样，同时忽略首次执行，也可限制依赖更新时执行的次数



## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

### 限制只执行一次
<code src="./demo/demo2.tsx" />

## API

跟 useEffect 的 api 用法相似，增加次数参数

```typescript
useUpdateEffect(
  effect: React.EffectCallback,
  deps?: React.DependencyList,
  times?: number,
)
```
