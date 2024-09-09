import { renderHook, waitFor } from '@testing-library/react';
import useQRCode from '..';

beforeAll(async () => {
  global.TextEncoder = require('util').TextEncoder;
  global.TextDecoder = require('util').TextDecoder;
});

describe('useQRCode', () => {
    it('should return an empty string if the text is empty', () => {
      const { result } = renderHook(() => useQRCode(''));
      expect(result.current).toBe('');
    });

    it('should generate a valid data URL for the given text', async () => {
      const { result } = renderHook(() => useQRCode('Hello, World!'));
      await waitFor(() => {
          expect(result.current).toMatch(/^data:image\/png;base64,/);
      })
    });

    it('should update the data URL when the text changes', async () => {
      const { result, rerender } = renderHook(({ text }) => useQRCode(text), {
        initialProps: { text: 'Hello' },
      });
      await waitFor(() => {
        expect(result.current).toMatch(/^data:image\/png;base64,/);
      });

      rerender({ text: 'World' });

      await waitFor(() => {
        expect(result.current).toMatch(/^data:image\/png;base64,/);
      });
    });

  it('should update the data URL when the options change', async () => {
    const { result, rerender } = renderHook(({ options }) => useQRCode('Hello', options), {
      initialProps: { options: { width: 200 } },
    });
    await waitFor(() => {
      expect(result.current).toMatch(/^data:image\/png;base64,/);
    });

    rerender({ options: { width: 300 } });
    await waitFor(() => {
      expect(result.current).toMatch(/^data:image\/png;base64,/);
    });
  });
});
