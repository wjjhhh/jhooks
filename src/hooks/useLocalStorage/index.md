---
nav:
  path: /hooks
group:
  title: State相关
  order: 2
---

## useLocalStorage

同时具备 localStorage 读写和跨组件响应功能

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx">

### 清空 localStorage

<code src="./demo/demo2.tsx">

## API

```typescript
const [value, setValue, remove] = useLocalStorage<T>(key: string, initialValue?: T);
```

### Params

| 参数         | 说明               | 类型   | 默认值   |
| ------------ | ------------------ | ------ | -------- |
| key          | 必填，全局唯一标识 | string | -        |
| initialValue | 可选，默认值       | T      | Infinity |

### Result

| 参数     | 说明         | 类型       |
| -------- | ------------ | ---------- |
| value    | 当前值 value | any        |
| setValue | 设置 value   | (value: T  | ((val: T) => T)) => void |
| remove   | 清除 value   | () => void |
