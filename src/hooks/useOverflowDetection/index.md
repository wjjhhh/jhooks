---
nav:
  path: /hooks
group:
  title: Dom相关
  order: 2
---

# useOverflowDetection

检测内容是否超出容器。


## 代码演示

### 基本用法
尝试增减下面的输入框内容
<code src="./demo/demo1.tsx" />

### 同时检测水平垂直方向
尝试增减下面的输入框内容
<code src="./demo/demo2.tsx" />

## API

```typescript
const [isOverflow] = useOverflowDection(target, Options?)

```

### Params

| 参数                 | 说明         | 类型                                 | 默认值       |
| -------------------- | ------------ | ------------------------------------ | ------------ |
| targat               | 元素对应 ref | React.MutableRefObject<T>            | BasicTarget  | - |
| Options.direction    | 检测方向     | 'horizontal' \| 'vertical' \| 'both' | 'horizontal' |
| Options.debounceTime | 防抖时间(ms) | number                               | 100          |

### Result
| 参数       | 说明         | 类型    |
| ---------- | ------------ | ------- |
| isOverflow | 内容是否溢出 | boolean |