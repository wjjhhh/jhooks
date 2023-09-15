---
nav:
  path: /hooks
group:
  title: Dom相关
  order: 1
---

# useScroll
监听滚动

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />


### 使用selector选择性监听

监听垂直滚动
<code src="./demo/demo2.tsx" />

### 滑动状态
<code src="./demo/demo3.tsx" />


## API

```typescript

const { top, left, status } = useScroll(ref, selector?);
```