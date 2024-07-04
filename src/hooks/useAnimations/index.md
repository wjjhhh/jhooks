---
nav:
  path: /hooks
group:
  title: Animation
  order: 3
---

# useAnimations

适合复杂动画，原理调用 web Animations API

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

## API

```typescript
const { play, pause, reverse, cancel, finish, animate, status, isSupported } = useAnimations(
  target,
  keyframes,
  options,
);
```

### Params

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| target | 传入的 dom | BasicTarget | - |
| keyframes | 关键帧的属性和值 | PropertyIndexedKeyframes | - |
| options | 配置 | KeyframeAnimationOptions & \| Partial\<{immediate: boolean;commitStyles: boolean;}> | - |

### Result

| 参数    | 说明     | 类型       |
| ------- | -------- | ---------- |
| play    | 执行动画 | () => void |
| pause   | 执行动画 | () => void |
| reverse | 反转动画 | () => void |
| finish  | 完成动画 | () => void |
| cancel  | 取消动画 | () => void |
| animate  | Animation对象 | Animation |
| status  | 动画状态 | () => void |
| isSupported  | 是否支持Web Animations API | boolean |
