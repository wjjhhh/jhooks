---
nav:
  path: /hooks
group:
  title: Browser相关
  order: 1
---

## usePointerLock

能使鼠标移动范围脱离浏览器窗体的限制

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx">

## API

```typescript
const { isLocked, requestPointerLock, exitPointerLock } = usePointrLock(options);
```

### Params

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| Options.onLock | 进入指针锁定模式回调 | () => void | - |
| Options.onExit | 退出指针锁定模式回调 | () => void | - |
| Options.onError | 异常回调 | (e: Event) => void | - |
| Options.onMove | 鼠标移动事件 | (position: Position, event: MouseEvent) => void | - |

### Result

| 参数               | 说明                 | 类型                           |
| ------------------ | -------------------- | ------------------------------ |
| isLocked           | 是否在指针锁定模式中 | boolean                        |
| requestPointerLock | 进入指针锁定         | (element: HTMLElement) => void |
| exitPointerLock    | 退出指针锁定         | () => void                     |
