---
nav:
  path: /hooks
group:
  title: Other
  order: 3
---

# useIdle

对浏览器在一定时间内一直没操作后做出回调

## 代码演示

### 基础用法

持续 3 秒不动后转为静止状态 <code src="./demo/demo1.tsx" />

## API

```typescript
const { isIdle, lastActive, reset } = useIdle(timeout);
```

### Params

| 参数    | 说明                   | 类型   | 默认值 |
| ------- | ---------------------- | ------ | ------ |
| timeout | 保持静止时间，单位毫秒 | number | -      |

### Result

| 参数       | 说明                 | 类型       |
| ---------- | -------------------- | ---------- |
| isIdle     | 是否属于静止状态     | boolean    |
| lastActive | 上次活动的数字时间戳 | number     |
| reset      | 重置计时             | （）=>void |
