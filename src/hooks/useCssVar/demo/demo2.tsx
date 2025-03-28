import { useCssVar } from '@wjjhhh/jhooks';
import React, { useRef } from 'react';
import './demo.less';

export default () => {
  const ref = useRef(null);
  const { set, get } = useCssVar(ref, {
    '--color': 'yellow',
    '--background-color': '#000',
  });
  return (
    <>
      <button
        onClick={() =>
          // set({
          //   '--color': 'green',
          // })
          set('--color', 'green')
        }
      >
        字体改成绿色
      </button>
      <button
        onClick={() =>
          set({
            '--color': 'blue',
          })
        }
      >
        字体改成蓝色
      </button>
      <button
        onClick={() =>
          set({
            '--color': 'red',
          })
        }
      >
        字体改成红色
      </button>
      <button onClick={() => {
        set('--color', undefined)
      }}>
        字体颜色变量重置
      </button>
      <button
        onClick={() =>
          set({
            '--child-color': get()?.['--child-color'] === 'green' ? 'red' : 'green',
          })
        }
      >
        child字体改变
      </button>
      <div ref={ref} className="useCssVar">
        我是useCssVar的div
        <div className="child">我是child</div>
      </div>
      <button
        onClick={() => {
          console.log(get());
        }}
      >
        打开控制台点击我看看此时css变量
      </button>
    </>
  );
};
