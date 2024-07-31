---
nav:
  path: /hooks
group:
  title: Dom相关
  order: 1
---

# useComposition

用于限制在输入法中拼写完成才触发回调事件,请打开中文输入法验证

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

### 在 antd Input 中使用

需 onChange 回调 <code src="./demo/demo2.tsx" />

### 在 antd Select 中使用

<code src="./demo/demo3.tsx" />

## API

```typescript
type Target = Element | (() => Element) | React.MutableRefObject<Element>;

const { onChange, onCompositionEnd, onCompositionStart } = useComposition(target: Target, options?: Options);

const { onChange, onCompositionEnd, onCompositionStart } = useComposition(options: Options)

```

### Params

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| target | DOM 节点或者 Ref | Target | - |
| options.onChange | 输入回调 | ((v: string) => void) \| Dispatch<SetStateAction\<string>> | - |
| options.onSearch | antd 的 Select 搜索触发函数 | (v: string) => void | - |
| options.active | 是否开启合成,默认开启 | boolean | - |

### Result

```typescirpt
type InputEle = HTMLInputElement | HTMLTextAreaElement
```

| 参数               | 说明         | 类型                                            |
| ------------------ | ------------ | ----------------------------------------------- |
| onChange           | 输入回调     | (e: React.ChangeEvent\<InputEle>) => void       |
| onCompositionStart | 合成事件开始 | （）=> void                                     |
| onCompositionEnd   | 合成事件结束 | （e: React.CompositionEvent\<InputEle>）=> void |
