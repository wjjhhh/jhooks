import { act, renderHook } from '@testing-library/react';
import useCopy from '../index';
import type { Options } from '../index';

const originalClipboard = { ...global.navigator.clipboard };

const CONTENT = 'I love China!';

describe('useCopy', () => {
  it('should be defined', () => {
    expect(useCopy).toBeDefined();
  });
  document.execCommand = jest.fn().mockReturnValue(true);
  const mockClipboard = {
    readText: jest.fn(() => Promise.resolve(CONTENT)),
  };
  let textDom: HTMLDivElement;
  beforeEach(() => {
    textDom = document.createElement('div');
    textDom.innerHTML = CONTENT;
    document.body.appendChild(textDom);
    (global.navigator as any).clipboard = mockClipboard;
  });
  afterEach(() => {
    document.body.removeChild(textDom);
    (global.navigator as any).clipboard = originalClipboard;
  });
  afterAll(() => {
    jest.resetAllMocks();
  });
  const setUp = <T>(target: HTMLDivElement, options?: Options) => {
    return renderHook(() => {
      return useCopy(target, options);
    });
  };

  it('should work click on text', (done) => {
    const hook = setUp(textDom);
    let clipText = '';
    act(() => {
      hook.result.current.copy();
      clipText = hook.result.current.paste();
      setTimeout(() => {
        clipText = hook.result.current.paste();
        expect(clipText).toEqual(CONTENT);
        done();
      }, 0);
    });
  });
});
