---
nav:
  path: /hooks
group:
  title: Other
  order: 3
---

# useVolume

利用 AudioWorklet 获取音频的音量

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

## API

```typescript
const {
  stream,
  error,
  audioContext,
  volume,
  closeStream,
  startStream,
} = useVolume(constraints: MediaStreamConstraints)
```

### Params

| 参数        | 说明       | 类型                   | 默认值 |
| ----------- | ---------- | ---------------------- | ------ |
| constraints | 媒体流约束 | MediaStreamConstraints | -      |

### Result

| 参数         | 说明              | 类型         |
| ------------ | ----------------- | ------------ | 
| stream       | 媒体流            | MediaStream  |
| error        | 错误信息          | Error        | 
| audioContext | AudioContext 实例 | AudioContext | 
| volume       | 音量              | number       | 
| closeStream  | 关闭媒体流        | () => void   |
| startStream  | 开启媒体流        | () => void   | 
