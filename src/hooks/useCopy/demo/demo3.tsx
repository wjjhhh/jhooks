import { useCopy } from '@wjjhhh/jhooks';

export default () => {
  const { ref } = useCopy({
    forbid: true,
    onForbid: (e) => {
      e.clipboardData?.setData('text/plain', '不能复制!')
      alert('不能复制')
    }

  });

  return (
    <>
      <div ref={ref}>
        <div>
          <div>
            <span>看看能不能复制我</span>
          </div>
        </div>
      </div>
      <textarea
        style={{ height: 100 }}
        placeholder="我是空的，粘贴到这里验证吧"
      />
    </>
  );
};
