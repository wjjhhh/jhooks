---
nav:
  path: /hooks
group:
  title: Other
  order: 2
---

# useOnline

是否网络在线

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx">

## API

```typescript
const isOnline = useOnline();
```

### Result

| 参数     | 说明         | 类型    |
| -------- | ------------ | ------- |
| isOnline | 是否网络在线 | boolean |

### Params

| 参数     | 说明                 | 类型                          | 默认值 |
| -------- | -------------------- | ----------------------------- | ------ |
| callback | 网络是否在线转换回调 | （isOnline: boolean） => void | -      |
