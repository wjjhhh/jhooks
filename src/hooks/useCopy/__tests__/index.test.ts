import { act, renderHook } from '@testing-library/react';
import useCopy from '../index';

const originalClipboard = { ...global.navigator.clipboard };

const CONTENT = 'I love China!';

describe('useCopy', () => {
  it('should be defined', () => {
    expect(useCopy).toBeDefined();
  });
  document.execCommand = jest.fn().mockReturnValue(true);

  let textDom: HTMLDivElement;
  // let inpuDom: HTMLInputElement;
  beforeEach(() => {
    textDom = document.createElement('div');
    textDom.innerHTML = CONTENT;
    // inpuDom = document.createElement('input')
    document.body.appendChild(textDom);
    // document.body.appendChild(inpuDom);
    const mockClipboard = {
      readText: jest.fn(() => Promise.resolve(CONTENT)),
    };
    global.navigator.clipboard = mockClipboard;
  });
  afterEach(() => {
    document.body.removeChild(textDom);
    // document.body.removeChild(inpuDom);
    jest.resetAllMocks();
    global.navigator.clipboard = originalClipboard;
  });

  const setUp = <T>(target: HTMLDivElement, options?: T) => {
    return renderHook(() => {
      return useCopy(target, options);
    });
  };

  it('should work click on text', () => {
    const hook = setUp(textDom);
    let clipText = '';
    act(() => {
      hook.result.current.copy();
      setTimeout(() => {
        clipText = hook.result.current.paste();
        expect(clipText).toEqual(CONTENT);
      }, 0);
    });
  });
});
