---
nav:
  path: /hooks
group:
  title: 数据相关
  order: 3
---

# useCustomEvent

利用**dispatchEvent**和**CustomEvent**通信

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

## API

```typescript

const {
  dispatch,
} = useCustomEvent(name, options: Options);
```

### Params

| 参数 | 说明         | 类型   | 默认值 |
| ---- | ------------ | ------ | ------ |
| name | 自定义事件名 | string | -      |

### Result

| 参数             | 说明               | 类型                   |
| ---------------- | ------------------ | ---------------------- |
| Options.onChange | 数据收到推送后触发 | (event: Event) => void |
| dispatch         | 推送数据           | （data: any）=> void 0 |
