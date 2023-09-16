import { renderHook, render, fireEvent } from '@testing-library/react';
import React, { useRef } from 'react';
import useScroll from '../index';

const containerId = `containerId_${Date.now()}`;
const inputId = `inputId_${Date.now()}`;

const createComponent = (selector?: any) => {
  const Component = () => {
    const ref = useRef();
    const res = useScroll(ref, selector);
    return (
      <>
        <input readOnly data-testid={inputId} value={JSON.stringify(res)} />
        <div
          ref={ref}
          style={{
            height: '160px',
            width: '160px',
            border: 'solid 1px #000',
            overflow: 'scroll',
            whiteSpace: 'nowrap',
            fontSize: '22px',
          }}
          data-testid={containerId}
        >
          <div style={{ height: '1000px' }}>
            我是很长的内容,我是很长的内容,我是很长的内容,我是很长的内容,我是很长的内容，我是很长的内容
          </div>
        </div>
      </>
    );
  };
  return render(<Component />);
};

describe('useScroll', () => {
  it('document position initialValue', () => {
    const hook = renderHook(() => useScroll(document));
    expect(hook.result.current).toEqual({ top: 0, left: 0 });
  });
  it('should scroll in component', () => {
    const result = createComponent();
    const scrollContainer = result.getByTestId(containerId);
    const input = result.getByTestId(inputId) as HTMLInputElement;
    expect(input.value).toBe(JSON.stringify({ top: 0, left: 0, status: 'idle' }));
    fireEvent.scroll(scrollContainer, { target: { scrollTop: 100 } });
    expect(input.value).toBe(JSON.stringify({ top: 100, left: 0, status: 'scrolling' }));
    fireEvent.scroll(scrollContainer, { target: { scrollLeft: 111 } });
    expect(input.value).toBe(JSON.stringify({ top: 100, left: 111, status: 'scrolling' }));
  });
  it('should scroll with selector', () => {
    const result = createComponent((r) => r.left);
    const scrollContainer = result.getByTestId(containerId);
    const input = result.getByTestId(inputId) as HTMLInputElement;
    expect(input.value).toBe(JSON.stringify(0));
    fireEvent.scroll(scrollContainer, { target: { scrollTop: 100 } });
    expect(input.value).toBe(JSON.stringify(0));
    fireEvent.scroll(scrollContainer, { target: { scrollLeft: 111 } });
    expect(input.value).toBe(JSON.stringify(111));
  });
});
