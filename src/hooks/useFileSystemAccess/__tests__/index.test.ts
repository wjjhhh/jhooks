import { renderHook, act, waitFor } from '@testing-library/react';
import useFileSystemAccess from '..';
import type { Options } from '..';

describe('useFileSystemAccess', () => {
  const options: Options = {
    dataType: 'Text',
    types: [
      {
        description: 'Text Files',
        accept: {
          'text/plain': ['.txt'],
        },
      },
    ],
  };

  beforeAll(() => {
    global.showOpenFilePicker = jest.fn();
    global.showSaveFilePicker = jest.fn();
    global.showDirectoryPicker = jest.fn();
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useFileSystemAccess(options));
    expect(result.current.file).toBeUndefined();
    expect(result.current.data).toBeUndefined();
    expect(result.current.isSupported).toBe(true);
  });

  it('should open a file and read its content', async () => {
    const file = new File(['file content'], 'test.txt', { type: 'text/plain' });
    const fileHandle = {
      getFile: jest.fn().mockResolvedValue(file),
    };
    file.text = jest.fn().mockResolvedValue('file content');
    (global.showOpenFilePicker as jest.Mock).mockResolvedValue([fileHandle]);

    const { result } = renderHook(() => useFileSystemAccess(options));

    await act(async () => {
      await result.current.open(options);
    });

    await waitFor(() => {
      expect(result.current.file).toEqual(file);
      expect(result.current.data).toEqual('file content');
    });
  });

  it('should save data to an existing file', async () => {
    const writableStream = {
      write: jest.fn().mockResolvedValue(undefined),
      close: jest.fn().mockResolvedValue(undefined),
    };
    const fileHandle = {
      createWritable: jest.fn().mockResolvedValue(writableStream),
    };
    (global.showSaveFilePicker as jest.Mock).mockResolvedValue(fileHandle);

    const { result } = renderHook(() => useFileSystemAccess(options));

    act(() => {
      result.current.setData('new content');
    });

    await act(async () => {
      await result.current.save(options);
    });

    expect(writableStream.write).toHaveBeenCalledWith('new content');
    expect(writableStream.close).toHaveBeenCalled();
  });

  it('should save data as a new file', async () => {
    const writableStream = {
      write: jest.fn().mockResolvedValue(undefined),
      close: jest.fn().mockResolvedValue(undefined),
    };
    const fileHandle = {
      createWritable: jest.fn().mockResolvedValue(writableStream),
    };
    (global.showSaveFilePicker as jest.Mock).mockResolvedValue(fileHandle);

    const { result } = renderHook(() => useFileSystemAccess(options));

    act(() => {
      result.current.setData('new content');
    });

    await act(async () => {
      await result.current.saveAs(options);
    });

    expect(writableStream.write).toHaveBeenCalledWith('new content');
    expect(writableStream.close).toHaveBeenCalled();
  });

  it('should create a new file', async () => {
    const fileHandle = {};
    (global.showSaveFilePicker as jest.Mock).mockResolvedValue(fileHandle);

    const { result } = renderHook(() => useFileSystemAccess(options));

    await act(async () => {
      await result.current.create();
    });

    expect(result.current.data).toBeUndefined();
  });

  it('should read a directory', async () => {
    const dirHandle = {};
    const callback = jest.fn();
    (global.showDirectoryPicker as jest.Mock).mockResolvedValue(dirHandle);

    const { result } = renderHook(() => useFileSystemAccess(options));

    await act(async () => {
      await result.current.readDirectory(callback);
    });

    expect(callback).toHaveBeenCalledWith(dirHandle);
  });
});
