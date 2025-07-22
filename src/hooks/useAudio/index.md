---
nav:
  path: /hooks
group:
  title: Browser相关
  order: 3
---

# useAudio

用于管理音频的播放、暂停、音量控制等功能

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

## API

```typescript
const { isPlaying, volume, play, pause, togglePlay, setNewVolume} = useAudio(UseAudioOptions)
```

### Params
#### UseAudioOptions
| 参数          | 说明             | 类型    | 默认值 |
| ------------- | ---------------- | ------- | ------ |
| src           | 音频源           | string  | -      |
| autoPlay      | 初始是否自动播放 | boolean | false  |
| initialVolume | 初始音量         | number  | 0.5    |
| loop          | 是否循环播放     | boolean | false  |
| muted         | 是否静音         | boolean | false  |

### Result
| 参数         | 说明         | 类型                        |
| ------------ | ------------ | --------------------------- |
| isPlaying    | 是否正在播放 | boolean                     |
| volume       | 音量，0 - 1  | number                      |
| play         | 播放         | () => void                  |
| pause        | 暂停         | () => void                  |
| togglePlay   | 状态切换     | () => void                  |
| setNewVolume | 设置音量     | (newVolume: number) => void |


