---
nav:
  path: /hooks
group:
  title: Dom相关
  order: 1
---

# useScrollMemory

记录滚动位置

## 代码演示

### 基础用法
记录页面window的位置
<code src="./demo/demo1.tsx" />

记录指定target的位置
<code src="./demo/demo2.tsx" />

## 记录水平位置
<code src="./demo/demo3.tsx" />

## API
```typescript
const { reset } = useScrollMemory(options?: Options)

```

### Params

| 参数              | 说明                                                         | 类型                                              | 默认值                |
| ----------------- | ------------------------------------------------------------ | ------------------------------------------------- | --------------------- |
| Options.level     | 存储级别                                                     | 'local' \| 'session'                              | 'session'             |
| Options.target    | dom 或 ref                                                   | Element \| MutableRefObject\<Element> \| Document | window                |
| Options.direction | 滚动方向                                                     | 'x' \| 'y' \| 'xy'                                | 'y'                   |
| Options.cacheName | 缓存在storage的名字，不填写的时候默认用useId()创建，但不稳定 | string                                            | -                     |
| Options.cacheTime | 缓存时间                                                     | number                                            | 3600 * 24 * 1000 毫秒 |

### Result
| 参数  | 说明     | 类型       |
| ----- | -------- | ---------- |
| reset | 清空缓存 | () => void |
`