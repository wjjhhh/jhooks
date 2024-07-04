---
nav:
  path: /hooks
group:
  title: Dom相关
  order: 2
---

# useAbortController

利用 AborController，常用于取消 fetch 请求，卸载事件的 hook

## 代码演示

### 用法

请将浏览器网速切换至**3G**方便看慢速请求并 abort 的效果

默认 abort 后 fetch 不能再使用

可设置 recovery 为 true 后自动恢复 fetch 的使用也可手动 restore 恢复请求 <code src="./demo/demo1.tsx" />

addEventListener 也能移除，支持同时移除多个绑定事件 <code src="./demo/demo2.tsx" />

## API



```typescript
type Props = { 
    unmoutAbort?: boolean; 
    recovery?: boolean; 
}
const abc = useAbortController({ unmoutAbort, recovery });
```

### Params

| 参数        | 说明                        | 类型    | 默认值 |
| ----------- | --------------------------- | ------- | ------ |
| unmoutAbort | 卸载时自动 abort            | boolean | true  |
| recovery    | abort 后自动重新创建 signal | boolean | false  |

### Result

| 参数 | 说明       | 类型            |
| ---- | ---------- | --------------- |
| abc  | 控制器对象 | AbortController |
