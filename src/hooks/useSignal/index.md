---
nav:
  path: /hooks
group:
  title: State相关
  order: 1
---

# useSignal

将Signal细粒度响应更新的思想封装成hook


## 代码演示

### 用法

打开控制台,会发现useState里的值改变导致整个组件re-render，而useSignal只改变其值，不会导致整个组件re-render
<code src="./demo/demo1.tsx" />

## API

```typescript
const [getter, setter, getValue] = useSignal<T>(initialValue);
```

### Params

| 参数         | 说明   | 类型 | 默认值 |
| ------------ | ------ | ---- | ------ |
| initialValue | 初始值 | T    | -      |

### Result

| 参数     | 说明                           | 类型                            |
| -------- | ------------------------------ | ------------------------------- |
| getter   | 获取 signal 的值,用于 jsx 渲染 | () => T                         |
| setter   | 设置 signal 的值               | Dispatch\<SetStateAction\<T\>\> |
| getValue | 获取值,用于非渲染的地方        | () => T                         |
