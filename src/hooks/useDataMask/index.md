---
nav:
  path: /hooks
group:
  title: Dom相关
  order: 2
---

# useDataMask

用于数据脱敏场景



## 代码演示

### 用法

默认对除换行符以外的所有字符加密
<code src="./demo/demo1.tsx" />

数据曝光时需要异步接口下的场景，数据会第一次点显示时执行请求后缓存
<code src="./demo/demo2.tsx" />

自定义加密符号
<code src="./demo/demo3.tsx" />

自定义加密逻辑
<code src="./demo/demo4.tsx" />

## API

```typescript

type Options = {
  pattern?: RegExp;
  mask?: string;
  replacer?: (value: any) => string;
  request?: () => Promise<string>;
};

const {
  data,
  show,
  hide,
  visible,
  toggle,
} = useDataMask(data?: string | number, option?: Option);
```

### Params

| 参数            | 说明                             | 类型                    | 默认值 |
| --------------- | -------------------------------- | ----------------------- | ------ |
| option.pattern  | 可选，替换的正则                 | RegExp                  | /./g   |
| option.mask     | 可选，替换的符号                 | string                  | '\*'   |
| option.replacer | 可选，自定义遮挡规则             | (value: any) => string  | -      |
| option.request  | 可选，通过远端获取明文的 request | () => Promise\<string\> | -      |

### Result

| 参数    | 说明             | 类型       |
| ------- | ---------------- | ---------- |
| data    | 当前值           | () => void |
| show    | 显示明文         | () => void |
| hide    | 显示密文         | () => void |
| toggle  | 切换显示隐藏状态 | () => void |
| visible | 显示隐藏状态     | boolean    |
