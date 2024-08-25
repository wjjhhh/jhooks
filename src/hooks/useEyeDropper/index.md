---
nav:
  path: /hooks
group:
  title: Other
  order: 3
---

# useEyeDropper

利用 EyeDropper API 获取屏幕上的像素数据。

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

## API

```typescript
const { color, openEyeDropper, isSupported } = useEyeDropper();
```

### Result

| 参数 | 说明 | 类型 |
| ---- | ---- | ---- |
| color | 当前拾取到的颜色值 | string |
| openEyeDropper | 打开 EyeDropper API | () => void |
| isSupported | EyeDropper API 是否可用 | boolean |
