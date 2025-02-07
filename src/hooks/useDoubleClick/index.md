---
nav:
  path: /hooks
group:
  title: Dom相关
  order: 1
---

# useDoubleClick

支持双击回调，主要应付移动端不支持双击事件的场景

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

### 额外支持单击回调

<code src="./demo/demo2.tsx" />

## API

```typescript
useDoubleClick(target?: BasicTarget, doubleClick: Function, options: Options)
```

### Params

| 参数        | 说明       | 类型        | 默认值 |
| ----------- | ---------- | ----------- | ------ |
| target      | 传入的 dom | BasicTarget | -      |
| doubleClick | 双击回调   | Function    | -      |
| options     | 配置       | Options     | -      |

### Options

| 参数    | 说明     | 类型                   |
| ------- | -------- | ---------------------- |
| delay   | 双击时限 | number                 |
| onClick | 单击回调 | (event: Event) => void |
