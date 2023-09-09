---
nav:
  path: /hooks
group:
  title: 数据相关
  order: 3
---

# useBroadcastChannel

具备 BroadcastChannel API 功能

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

### 关闭通道

<code src="./demo/demo2.tsx" />

## API

```typescript

const {
  isSupported,
  data,
  error,
  post,
} = useBroadcastChannel(name: string);
```
