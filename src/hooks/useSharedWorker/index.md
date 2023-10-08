---
nav:
  path: /hooks
group:
  title: Effect相关
  order: 1
---

# useSharedWorker

使用sharedWorker的hook

调试方式：启动一个新的标签页，chrome调试需在网址输入：chrome://inspect/#workers
## 代码演示

### 基础用法
主线程收到子线程的信息来更改数据，新建一个页面，可以看到num是共享的

**注意只能用资源地址，不能用blob方式，否则会失去共享能力**
<code src="./demo/demo1.tsx" />
