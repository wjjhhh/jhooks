import { useState, useRef } from 'react';
export type Options = {
  dataType?: 'Text' | 'ArrayBuffer' | 'Blob';
  types: {
    description?: string;
    accept: Record<string, string[]>;
  }[];
  multiple?: boolean;
};

interface FileHandleWritableStream extends WritableStream {
  write: (data: string) => Promise<void>;
}
type FileHandle = {
  getFile: () => Promise<File>;
  createWritable: () => Promise<FileHandleWritableStream>;
};

type DirHandleFunc = (dirHandle: FileSystemDirectoryHandle) => void;

export default (options: Options) => {
  const [file, setFile] = useState<File>();
  const [data, setData] = useState<string>();
  let handleRef = useRef<FileHandle | null>(null);
  const isSupported = 'showSaveFilePicker' in window && 'showOpenFilePicker' in window;
  const getFile = async () => {
    const value = await handleRef.current?.getFile();
    setFile(value);

    if (options?.dataType === 'Text') {
      const text = await value?.text();
      updateData(text);
    }
  };
  const updateData = (value: any) => {
    setData(value);
  };
  const open = async (_options: Options) => {
    if (!isSupported) {
      return;
    }
    const [newFile] = await showOpenFilePicker({ ...options, ..._options });

    handleRef.current = newFile;

    getFile();
  };
  const save = async (_options: Options) => {
    if (!handleRef.current) {
      return saveAs(_options);
    }

    const writableStream = await handleRef.current.createWritable();
    await writableStream.write(data!);
    await writableStream.close();
  };
  const saveAs = async (_options: Options) => {
    if (!isSupported) {
      return;
    }
    handleRef.current = await showSaveFilePicker({ ...options, ..._options });
    const writableStream = await handleRef.current?.createWritable();
    if (writableStream) {
      await writableStream.write(data!);
      await writableStream.close();
    }
  };

  const create = async () => {
    handleRef.current = await showSaveFilePicker(options);
    setData(void 0);
  };

  const readDirectory = async (callback?: DirHandleFunc) => {
    const dirHandle = await window.showDirectoryPicker();

    if (typeof callback === 'function') {
      callback(dirHandle);
    }
  };
  return {
    isSupported,
    open,
    file,
    save,
    saveAs,
    setData,
    data,
    create,
    readDirectory,
  } as const;
};
