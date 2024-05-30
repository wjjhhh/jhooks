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

