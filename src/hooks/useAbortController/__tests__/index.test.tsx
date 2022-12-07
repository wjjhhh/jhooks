import { fireEvent, render, renderHook, act, screen } from '@testing-library/react';
import React, { useEffect, useState, useRef, useId } from 'react';
import useAbortController from '../index';

const sleep = (time: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
};

const myFetch = async (signal: AbortSignal) => {
  await fetch('https://mock.mengxuegu.com/mock/605c30690d58b864da03da46/example/getAllAdcode', {
    signal,
  })
    .then((r) => r.json())
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      if (err.name === 'AbortError') {
        console.warn('Fetch was aborted');
      } else {
        console.error('Error', err);
      }
    });
};
describe('useAbortController', () => {
  it('should be defined', () => {
    expect(useAbortController).toBeDefined();
  });

  it('should work abort fetch', async () => {
    const hook = renderHook(() => useAbortController());
    const mockSpy = jest.spyOn(console, 'warn').mockImplementationOnce(() => {});
    myFetch(hook.result.current.signal);
    expect(hook.result.current.signal.aborted).toBe(false)
    act(() => {
      hook.result.current.abort();
    });

    await sleep(100);

    expect(mockSpy).toBeCalled();
    expect(hook.result.current.signal.aborted).toBe(true)

  });

  it('should work abort after unmount', async () => {
    const mockSpy = jest.spyOn(console, 'warn').mockImplementationOnce(() => {});
    const Component = () => {
      const { signal } = useAbortController();
      useEffect(() => {
        myFetch(signal);
      }, []);

      return null;
    };
    const App = () => {
      const [visible, setVisible] = useState(true);
      useEffect(() => {
        setVisible(false);
      }, []);
      return (
        <>
          App
          {visible && <Component />}
        </>
      );
    };
    render(<App />);
    await sleep(100);
    expect(mockSpy).toBeCalled();
  });

  it('should abort eventListener', async () => {
    let num = 0;

    const E = ({ id }: any) => {
      const abc = useAbortController();
      const { signal } = abc;
      useEffect(() => {
        document.getElementById(id)?.addEventListener(
          'click',
          () => {
            // Amazing! signal.aborted === true but it can still run ?
            if (!signal.aborted) {
              num++;
            }
            
          },
          { signal },
        );
      }, []);
      return null;
    };

    const App = () => {
      const id = useId();

      const [hasEvent, setHasEvent] = useState(true);

      return (
        <>
          <button id={id}>plus1</button>
          <button onClick={() => setHasEvent(false)}>setHasEvent</button>
          {hasEvent && (
            <>
              <E id={id} />
            </>
          )}
        </>
      );
    };
    const result = render(<App />);
    fireEvent.click(result.getByText('plus1'));

    expect(num).toBe(1);
    fireEvent.click(result.getByText('setHasEvent'));
    fireEvent.click(result.getByText('plus1'));
    fireEvent.click(result.getByText('plus1'));

    expect(num).toBe(1);
  });
});
