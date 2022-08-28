import { act, renderHook } from '@testing-library/react-hooks';
import { sleep } from '../../../utils';
import useDataMask from '../index';

describe('useHover', () => {
  it('should be defined', () => {
    expect(useDataMask).toBeDefined();
  });
  const setUp = (...args: any) => {
    return renderHook(() => {
      // @ts-ignore
      return useDataMask(...args);
    });
  };
  it('should work simply', () => {
    const { result } = setUp('1234');
    expect(result.current.visible).toBe(false);
    expect(result.current.data).toBe('*'.repeat(4));
    act(() => {
      result.current.show();
    });
    expect(result.current.visible).toBe(true);
    expect(result.current.data).toBe('1234');
    act(() => {
      result.current.hide();
    });
    expect(result.current.visible).toBe(false);
    expect(result.current.data).toBe('*'.repeat(4));
  });

  it('should work replace emoji', () => {
    const { result } = setUp(12121, {
      mask: '😃',
    });
    expect(result.current.data).toBe('😃'.repeat(5));
  });

  it('should work custom replacer', () => {
    const { result } = setUp('41048119621273442X', {
      replacer: (value: any) =>
        value?.replace(/^(\d{1})\d+(\d|X|x{1})$/, `$1${'*'.repeat(16)}$2`),
    });
    expect(result.current.data).toBe(`4${'*'.repeat(16)}X`);
  });

  it('should work remote data', async () => {
    const { result } = setUp('****', {
      request: async () => {
        await sleep(1);
        return '我是明文';
      },
    });
    expect(result.current.data).toBe('****');
    act(() => {
      result.current.show();
    });
    await sleep(10);
    expect(result.current.data).toBe('我是明文');
  });
});
