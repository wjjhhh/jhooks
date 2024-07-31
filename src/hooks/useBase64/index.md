---
nav:
  path: /hooks
group:
  title: 数据相关
  order: 3
---

# useBase64

支持文本，文件利用 FileReader 转换成 base64

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

### 文件转换

<code src="./demo/demo2.tsx" />

## API

```typescript
const { base64, isSupported } = useBase64(target);
```

### Params

| 参数    | 说明       | 类型                          | 默认值 |
| ------- | ---------- | ----------------------------- | ------ |
| target  | 转换的内容 | string \| File                | -      |
| options | 配置       | QRCode.QRCodeToDataURLOptions | -      |

### Result

| 参数        | 说明                           | 类型             |
| ----------- | ------------------------------ | ---------------- |
| base64      | 转换后的 base64                | string           |
| isSupported | 是否支持底层的 FileReader 方法 | boolean          |
| promise     | 转换的 Promise 状态            | Promise\<string> |
