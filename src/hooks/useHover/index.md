---
nav:
  path: /hooks
group:
  title: Dom相关
  order: 2
---

# useHover

检测鼠标是否在给悬停元素上。


## 代码演示

### 用法

控制导出的 ref
<code src="./demo/demo1.tsx" />

### 传入 ref









<code src="./demo/demo2.tsx" />

### 传入 dom

<code src="./demo/demo3.tsx" />

## API

```typescript
const { ref, hovered } = useHover();
```

### Result

| 参数    | 说明                 | 类型                        |
| ------- | -------------------- | --------------------------- |
| ref     | 元素对应 ref         | `React.MutableRefObject<T>` |
| hovered | 是否悬停在对应元素上 | `boolean`                   |
