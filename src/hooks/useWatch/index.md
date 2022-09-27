---
nav:
  path: /hooks
group:
  title: State相关
  order: 1
---

# useWatch

模仿vue的watch使用习惯



## 代码演示

### 基础用法

通过控制台看回调
<code src="./demo/demo1.tsx" />

支持通过lodash/isEqual对deps进行深比较
<code src="./demo/demo2.tsx" />

支持停止和启动watch
<code src="./demo/demo3.tsx" />

## API

```typescript
const { cancel, run, isWatching } = useWatch(dep: any, callback: Callback, options?: WatchOptions);
```

### Parms
| 参数    | 说明 | 类型 |
| ------- | -------------------- | --------------------------- |
| dep | 侦听变化的数据 | any |
| callback | 侦听数据发生变化触发的回调 | Callback |
| options | 额外配置 | WatchOptions |

### WatchOptions
| 参数    | 说明 | 类型 | 默认值 |
| ------- | -------------------- | --------------------------- |---|
| immediate | 是否首次渲染立即执行回调 | boolean | false |
| deep | 是否深度比较 | boolean | false |

### Result
| 参数    | 说明 | 类型 |
| ------- | -------------------- | --------------------------- |
| cancel | 取消watch | any |
| run | 启动watch | Callback |
| isWatching | 是否正在watch | boolean |