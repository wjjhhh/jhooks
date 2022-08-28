import { fireEvent, render } from '@testing-library/react';
import { Input, Select } from 'antd';
import React, { useState } from 'react';
import useInput from '../index';

describe('useInput', () => {
  it('should be defined', () => {
    expect(useInput).toBeDefined();
  });
  it('should be used with native input', async () => {
    const inputId = `inpupt_${Date.now()}`;
    const spanId = `content_${Date.now()}`;
    const Component = () => {
      const [value, setValue] = useState('');
      const props = useInput({
        onChange: setValue,
      });
      return (
        <>
          <span data-testid={spanId}>{value}</span>
          <input {...props} data-testid={inputId} />
        </>
      );
    };
    const result = render(<Component />);
    const input = result.getByTestId(inputId) as HTMLInputElement;
    const span = result.getByTestId(spanId);
    fireEvent.compositionStart(input, { target: { value: '777' } });
    expect(input.value).toBe('777');
    expect(span.innerHTML).toBe('');
  });

  it('should be used with antd Input', async () => {
    const inputId = `inpupt_${Date.now()}`;
    const spanId = `content_${Date.now()}`;
    const Component = () => {
      const [value, setValue] = useState('');
      const props = useInput({
        onChange: setValue,
      });
      return (
        <>
          <span data-testid={spanId}>{value}</span>
          <Input {...props} data-testid={inputId} />
        </>
      );
    };
    const result = render(<Component />);
    const input = result.getByTestId(inputId) as HTMLInputElement;
    const span = result.getByTestId(spanId);
    fireEvent.compositionStart(input, { target: { value: '777' } });
    expect(input.value).toBe('777');
    expect(span.innerHTML).toBe('');
    fireEvent.compositionEnd(input, { target: { value: 'aaa' } });
    expect(span.innerHTML).toBe('aaa');
  });

  it('should be used with antd Select', async () => {
    const selectId = `select_${Date.now()}`;
    const spanId = `content_${Date.now()}`;
    const Component = () => {
      const [value, setValue] = useState('');
      const props = useInput({
        onSearch: setValue,
      });

      return (
        <>
          <span data-testid={spanId}>{value}</span>
          <Select {...props} mode="multiple" data-testid={selectId} />
        </>
      );
    };
    const result = render(<Component />);
    const select = result.getByTestId(selectId) as HTMLSelectElement;
    // console.log('select', select.querySelector('.ant-select-selection-search-input'));
    const span = result.getByTestId(spanId);
    fireEvent.compositionStart(select, 'aaa');
    const input = select.querySelector('.ant-select-selection-search-input');
    expect(span.innerHTML).toBe('');
    fireEvent.compositionEnd(input!, { target: { value: 'bbb' } });

    expect(span.innerHTML).toBe('bbb');
  });
});
