---
nav:
  path: /hooks
group:
  title: Effect相关
  order: 3
---

# useSleep
提供延时和打断能力的hook

## 代码演示

### 基础用法
<code src="./demo/demo1.tsx" />

### Promise内容也可打断
<code src="./demo/demo2.tsx" />

## API

```typescript

const { sleep, destory } = useSleep(fn?);
```

### Params

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| fn | 打断的回调函数 | () => void | - |

### Result
| 参数 | 说明 | 类型 |
| --- | --- | --- |
| sleep | 延时函数 | (time: number) => void |
| destory | 打断函数 | () => void |
| makeCancelable | 输出一个可打断的promise | (promise: Promise<any>) => Promise<unknown> |