---
nav:
  path: /hooks
group:
  title: Dom相关
  order: 2
---

# useCssVar

可以控制 css 变量。



## 代码演示

### 用法

直接配置变量使用
<code src="./demo/demo1.tsx" />

通过导出的 set 方法修改变量和 get 方法获取变量
<code src="./demo/demo2.tsx" />

甚至你可以简写变量的“--”
<code src="./demo/demo3.tsx" />


## API
```typescript

type Variables = Record<string, string | null>;

const {
  get,
  set
} = useCssVar(target: React.MutableRefObject<T>, variables?: Variables);
```

### Params

| 参数            | 说明                             | 类型                    | 默认值 |
| --------------- | -------------------------------- | ----------------------- | ------ |
| ref  | 元素对应 ref                 | React.MutableRefObject\<T>                  | -   |
| variables     | 可选，css变量值                 | Variables                  | -   |


### Result

| 参数    | 说明             | 类型       |
| ------- | ---------------- | ---------- |
| get    | 获取css变量           | Variables |
| set    | 设置css变量         | (newVariables: Variables) => void |
