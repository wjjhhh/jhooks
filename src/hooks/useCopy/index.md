---
nav:
  path: /hooks
group:
  title: 数据相关
  order: 3
---

## useCopy

复制功能

## 代码演示

### 基础用法

支持监听 DOM 元素和 ref <code src="./demo/demo1.tsx">

### 简单用法

甚至不需要传入 DOM 元素和 ref <code src="./demo/demo2.tsx">

### 禁止复制

可在复制时加入弹窗提示 <code src="./demo/demo3.tsx">

## API

```typescript

const {
  ref,
  copy,
  paste,
  error,
} = useCopy(target?: BasicTarget | Options, options?: Options);
```

### Params

| 参数    | 说明       | 类型        | 默认值 |
| ------- | ---------- | ----------- | ------ |
| target  | 传入的 dom | BasicTarget | -      |
| options | 配置       | Options     | -      |

### Options

| 参数      | 说明           | 类型                        |
| --------- | -------------- | --------------------------- |
| onSuccess | 成功回调       | () => void                  |
| onError   | 失败回调       | () => void                  |
| trigger   | 触发行为       | 'click' \| 'dblclick'       |
| forbid    | 是否禁止复制   | boolean                     |
| onForbid  | 禁止复制时回调 | (e: ClipboardEvent) => void |

### Result

| 参数  | 说明         | 类型                      |
| ----- | ------------ | ------------------------- |
| ref   | 元素对应 ref | React.MutableRefObject<T> |
| copy  | 复制         | () => void                |
| paste | 粘贴         | () => void                |
| error | 错误信息     | string                    |
