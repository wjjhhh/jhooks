import React, { useState } from 'react';
import { useSpeechSynthesis } from 'jhooks';

export default () => {
  const [text, setText] = useState('很久不见 到底发生过什么事');
  const { speak, stop, isSupported, status, error, pause, resume } = useSpeechSynthesis(text);
  return isSupported ? (
    <>
      <div>状态：{status}</div>
      <button disabled={!['init', 'end'].includes(status) && !error} onClick={speak}>speak</button>
      <button disabled={status !== 'ing'} onClick={pause}>pause</button>
      <button disabled={status !== 'pause'} onClick={resume}>resume</button>
      <button disabled={status !== 'ing'} onClick={stop}>stop</button>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <div>异常：{error && JSON.stringify(error)}</div>
    </>
  ) : (
    '抱歉，您的浏览器不支持SpeechSynthesi API'
  );
};
