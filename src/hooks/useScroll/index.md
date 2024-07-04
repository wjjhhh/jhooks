---
nav:
  path: /hooks
group:
  title: Dom相关
  order: 1
---

# useScroll

监听滚动获取相应信息

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

### 监听 document 滚动

<code src="./demo/demo4.tsx" />

### 使用 selector 选择性监听

监听垂直滚动 <code src="./demo/demo2.tsx" />

### 滚动状态

<code src="./demo/demo3.tsx" />

## API

```typescript

const { top, left, status } = useScroll(ref, selector?);
```

### Params

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| ref | dom 或 ref | Element \| MutableRefObject\<Element> \| Document | document |
| selector | 滚动信息返回过滤器 | ({ top: number, left: number, status: 'idle' \| 'scrolling' \| 'scrollend'}) => any | - |

### Result

| 参数   | 说明         | 类型                                |
| ------ | ------------ | ----------------------------------- |
| top    | 滚动高度     | number                              |
| left   | 滚动横向距离 | number                              |
| status | 滚动状态     | idle' \| 'scrolling' \| 'scrollend' |
