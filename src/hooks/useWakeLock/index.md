---
nav:
  path: /hooks
group:
  title: Browser相关
  order: 1
---

## useWakeLock

屏幕唤起常驻

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx">

## API

```typescript
const { isSupported, wakeLock, release, lock } = useWakeLock(options: Options);
```

### Params

| 参数              | 说明             | 类型       | 默认值 |
| ----------------- | ---------------- | ---------- | ------ |
| Options.onRelease | 唤醒锁定释放回调 | () => void | -      |
| Options.onLock    | 唤醒锁定激活回调 | () => void | -      |

### Result

| 参数        | 说明                 | 类型               |
| ----------- | -------------------- | ------------------ |
| isSupported | 是否支持屏幕唤起常驻 | boolean            |
| wakeLock    | 唤醒对象             | WakeLockSentinel   |
| release     | 锁定释放             | () => Promise<void \| undefined> |
| lock     | 锁定激活             | () => Promise<void \| undefined> |
