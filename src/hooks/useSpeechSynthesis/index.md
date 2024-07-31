---
nav:
  path: /hooks
group:
  title: Dom相关
  order: 1
---

# useSpeechSynthesis

文字转语音，原理 window.SpeechSynthesisUtterance。**注意移动端的支持率基本全军覆没**

## 代码演示

### 用法

<code src="./demo/demo1.tsx" />

### Params

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| text | 转换语音的文本 | string |  |
| option.lang | 可选，使用的语言，字符串， 例如："zh-cn" | SpeechSynthesisUtterance.lang | en-US |
| option.pitch | 可选，表示说话的音高，数值，范围从 0（最小）到 2（最大）。默认值为 1 | SpeechSynthesisUtterance.pitch | 1 |
| option.rate | 可选，语速，数值，默认值是 1，范围是 0.1 到 10，表示语速的倍数，例如 2 表示正常语速的两倍。 | SpeechSynthesisUtterance.rate | 1 |
| option.voice | 可选，用于说出话语的声音 | SpeechSynthesisUtterance.voice | null |
| option.volume | 可选，声音的音量，区间范围是 0 到 1，默认是 1 | SpeechSynthesisUtterance.volume | 1 |

### Result

| 参数        | 说明     | 类型                        |
| ----------- | -------- | --------------------------- |
| isSupported | 当前值   | boolean                     |
| stop        | 终止播报 | () => void                  |
| speak       | 开始播报 | () => void                  |
| pause       | 暂停播报 | () => void                  |
| resume      | 恢复播报 | () => void                  |
| resume      | 恢复播报 | () => void                  |
| status      | 状态     | init \| ing \| pause \| end |
| error       | 异常信息 | SpeechSynthesisErrorEvent   |
| utterance   | 实例     | SpeechSynthesisUtterance    |
