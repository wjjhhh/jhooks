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
  isClosed,
  close,
  channel
} = useBroadcastChannel(name: string);
```

### Params

| 参数 | 说明     | 类型   | 默认值 |
| ---- | -------- | ------ | ------ |
| name | 通道标识 | string | -      |

### Result

| 参数        | 说明                          | 类型             |
| ----------- | ----------------------------- | ---------------- |
| isSupported | 是否支持 BroadcastChannel API | boolean          |
| data        | 通信数据                      | any              |
| error       | 错误信息                      | Event            |
| post        | 发送数据                      | () => void       |
| isClosed    | 是否已经关闭通道              | boolean          |
| close       | 关闭通道                      | () => void       |
| channel     | channel 实例                  | BroadcastChannel |
