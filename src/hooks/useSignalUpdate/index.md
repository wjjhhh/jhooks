---
nav:
  path: /hooks
group:
  title: State相关
  order: 1
---

# useSignalUpdate

同步useSignal的状态到useEffect中


## 代码演示

### 用法

需配合useSignal使用，其所有signal变化都会触发回调

<code src="./demo/demo1.tsx" />
## API

```typescript
useSignalUpdate(() => {
  getter()
})
```