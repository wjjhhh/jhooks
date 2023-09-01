---
nav:
  path: /hooks
group:
  title: Dom相关
  order: 2
---

# useAbortController

## 代码演示

### 用法

请将浏览器网速切换至**3G**看效果，并在请求中按隐藏按钮销毁组件

注意手动 abort 后需要 restore 恢复请求 <code src="./demo/demo1.tsx" />

addEventListener 也能移除，支持同时移除多个绑定事件 <code src="./demo/demo2.tsx" />

## API

```typescript
const abc = useAbortController();
```

### Result

| 参数 | 说明       | 类型            |
| ---- | ---------- | --------------- |
| abc  | 控制器对象 | AbortController |
