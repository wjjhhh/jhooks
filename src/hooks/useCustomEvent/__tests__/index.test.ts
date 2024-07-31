import { renderHook, act } from '@testing-library/react';
import useCustomEvent from '..';

describe('useCustomEvent', () => {
  test('should dispatch custom event with correct name and data', () => {
    const { result } = renderHook(() =>
      useCustomEvent('myEvent', {
        onChange: (event) => {
          expect(event.detail).toEqual({ key: 'value' });
        },
      }),
    );

    act(() => {
      result.current.dispatch({ key: 'value' });
    });
  });

  test('should add event listener when onChange is provided', () => {
    const addEventListenerSpy = jest.spyOn(document, 'addEventListener');
    const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');

    const { unmount } = renderHook(() =>
      useCustomEvent('myEvent', {
        onChange: () => {},
      }),
    );

    expect(addEventListenerSpy).toHaveBeenCalledWith('myEvent', expect.any(Function));

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('myEvent', expect.any(Function));

    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
  });

  test('should throw an error if name is not provided or not a string', () => {
    expect(() => {
      renderHook(() =>
        useCustomEvent('', {
          onChange: () => {},
        }),
      );
    }).toThrow('name must be a Non empty string');

    expect(() => {
      renderHook(() =>
        useCustomEvent(123, {
          onChange: () => {},
        }),
      );
    }).toThrow('name must be a Non empty string');
  });
});
