---
nav:
  path: /hooks
group:
  title: Effect相关
  order: 1
---

# useSharedWorker

使用sharedWorker的hook
调试方式：启动一个新的标签页，网址输入：chrome://inspect/#workers
## 代码演示

### 基础用法
主线程收到子线程的信息来更改数据
<code src="./demo/demo1.tsx" />
