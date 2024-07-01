import { renderHook, act } from '@testing-library/react';
import useBase64 from '..';
import { sleep } from '../../../utils';

function decode(encoded: string) {
  const decodedStr = Buffer.from(encoded.split(',')[1], 'base64').toString('utf-8');

  if (!decodedStr) return '';

  return decodedStr;
}

describe('useBase64', () => {
  it('should be defined', () => {
    expect(useBase64).toBeDefined();
  });

  it('should make text to base64', async () => {
    const text = 'jhooks is good';
    const hook = renderHook(() => {
      return useBase64(text);
    });
    await sleep(400);
    expect(decode(hook.result.current.base64)).toBe(text);
  });

});
