---
nav:
  path: /hooks
group:
  title: 数据相关
  order: 3
---

# useStateFromProps

同步 props 到 state

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

对象类型也支持 <code src="./demo/demo2.tsx" />

## API

```typescript
const [data, setData] = useStateFromProps(props);
```

### Params

| 参数  | 说明       | 类型 | 默认值 |
| ----- | ---------- | ---- | ------ |
| props | 传入属性值 | T    | -      |

### Result

| 参数    | 说明     | 类型               |
| ------- | -------- | ------------------ |
| data    | 状态值   | T                  |
| setData | 更新状态 | (value: T) => void |
