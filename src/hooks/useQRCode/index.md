---
nav:
  path: /hooks
group:
  title: 数据相关
  order: 3
---

# useQRCode

利用qrcode将文本信息转成二维码信息

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

## API

```typescript

const url = useQRCode(text: string, options?: QRCode.QRCodeToDataURLOptions);
```
### Params

| 参数        | 说明       | 类型                    | 默认值 |
| ----------- | ---------- | ----------------------- | ------ |
| text | 需转换文本 | string                  | -      |
| options     | 配置   | QRCode.QRCodeToDataURLOptions | -      |

### Result

| 参数   | 说明         | 类型       |
| ------ | ------------ | ---------- |
| url    | 二维码链接 | string     |