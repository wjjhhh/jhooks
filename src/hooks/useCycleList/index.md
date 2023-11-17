---
nav:
  path: /hooks
group:
  title: 数据相关
  order: 3
---

# useCycleList

循环一个数组

## 代码演示

### 基础用法

对原数组['first', 'second', 'third', 'four', 'five']进行操作

可push、pop内容
 <code src="./demo/demo1.tsx" />

## API

```typescript
const { index, next, prev, cur } = useCycleList(list);
```

### Params

| 参数 | 说明         | 类型 | 默认值 |
| ---- | ------------ | ---- | ------ |
| list | 要循环的数组 | T[]  | -      |

### Result

| 参数  | 说明           | 类型          |
| ----- | -------------- | ------------- |
| index | 当前索引值     | number        |
| next  | 获取下一个成员 | （）=> void 0 |
| prev  | 获取上一个成员 | （）=> void 0 |
| cur   | 当前成员       | T             |
