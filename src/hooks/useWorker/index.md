---
nav:
  path: /hooks
group:
  title: Effect相关
  order: 1
---

# useWorker

使用 web workers 的 hook

## 代码演示

### 基础用法

适合计算量大的情况 <code src="./demo/demo1.tsx" />

### 导入函数

除了传入 worker 代码模块，还能直接传入函数 <code src="./demo/demo2.tsx" />

### 简洁写法

配置回调里可以接收信息，返回参数可以直接发送和终止，不用再操作 worker 实例方法 <code src="./demo/demo3.tsx" />

## API

```typescript

const [worker, { post, terminate, start, status }] = useWorker(fn, options?);
```

### Params

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| fn | 资源路径或函数 | Function |  |
| options.onMessage | 获取消息回调 | (message: MessageEvent) => void | - |
| options.onMessageError | Worker 收到的消息不能进行反序列化时触发 | (evt: MessageEvent) => void | - |
| options.onerror | 在 Worker 的 error 事件触发并冒泡时执行 | (evt: ErrorEvent) => void | - |
| options.type | worker 参数 | WorkerOptions.type | - |
| options.credentials | worker 参数 | WorkerOptions.credentials | - |
| options.name | worker 参数 | WorkerOptions.name | - |

### Result

| 参数 | 说明 | 类型 |
| --- | --- | --- |
| worker | Worker 实例 | Worker |
| post | 发送消息 | (message: any, transfer: Transferable[]) => void |
| terminate | 终止连接 | （）=>void |
| start | 终止连接的情况下，开启连接，默认是已开启的 | （）=>void |
| status | 状态 | 'idle' \| 'open' \| 'closed' \| 'error' |
