// @ts-nocheck
import { useState, useRef } from 'react';
dataType: type Options = {
  dataType?: 'Text' | 'ArrayBuffer' | 'Blob';
  types: {
    description?: string;
    accept: Record<string, string[]>;
  }[];
  multiple?: boolean;
};

export default (options: Options) => {
  const [file, setFile] = useState();
  const [data, setData] = useState();
  const handleRef = useRef();
  const isSupported = 'showSaveFilePicker' in window && 'showOpenFilePicker' in window;
  const getFile = async () => {
    const value = await handleRef.current.getFile();
    setFile(value);

    if (options?.dataType === 'Text') {
      const text = await value.text();
      updateData(text);
    }
  };
  const updateData = (value) => {
    setData(value);
  };
  const open = async (_options) => {
    const [newFile] = await showOpenFilePicker({ ...options, ..._options });

    handleRef.current = newFile;

    getFile();
  };
  const save = async (_options) => {
    if (!handleRef.current) {
      return saveAs(_options);
    }

    const writableStream = await handleRef.current.createWritable();
    await writableStream.write(data);
    await writableStream.close();
  };
  const saveAs = async (_options) => {
    handleRef.current = await showSaveFilePicker({ ...options, ..._options });
    const writableStream = await handleRef.current.createWritable();
    await writableStream.write(data);
    await writableStream.close();
  };

  const create = async () => {
    handleRef.current = await showSaveFilePicker(options);
    setData(void 0);
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
  };
};
