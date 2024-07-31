---
nav:
  path: /hooks
group:
  title: 数据相关
  order: 3
---

# useNow

时间信息显示

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

### 规定时间格式

getTime 方法 <code src="./demo/demo2.tsx" />

## API

```typescript

const {
  now,
  pause,
  resume,
} = useNow(millisecond?: number, wrapper?: Wrapper);
```

### Params

| 参数        | 说明       | 类型                    | 默认值 |
| ----------- | ---------- | ----------------------- | ------ |
| millisecond | 每毫秒更新 | number                  | -      |
| wrapper     | 转换函数   | (date: Date) => string; | -      |

### Result

| 参数   | 说明         | 类型       |
| ------ | ------------ | ---------- |
| now    | 显示当前时间 | string     |
| pause  | 暂停更新时间 | () => void |
| resume | 恢复更新时间 | () => void |
