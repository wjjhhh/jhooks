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

### 监听document 滚动

<code src="./demo/demo4.tsx" />

### 使用 selector 选择性监听

监听垂直滚动 <code src="./demo/demo2.tsx" />

### 滚动状态

<code src="./demo/demo3.tsx" />

## API

```typescript

const { top, left, status } = useScroll(ref, selector?);
```
