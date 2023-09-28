---
nav:
  path: /hooks
group:
  title: Effect相关
  order: 1
---

# useWorker

使用web workers的hook


## 代码演示

### 基础用法
适合计算量大的情况
<code src="./demo/demo1.tsx" />

### 导入函数
除了传入worker代码模块，还能直接传入函数
<code src="./demo/demo2.tsx" />

### 简洁写法
配置回调里可以接收信息，返回参数可以直接发送，不用在操作worker实例方法
<code src="./demo/demo3.tsx" />