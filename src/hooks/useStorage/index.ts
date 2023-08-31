import { useEffect, useReducer, useRef } from 'react';
import Singleton from '../../utils/Storage';
import { generateUUID } from '../../utils';

function useStorage<T>(storage: Storage, key: string, initialValue?: T) {
  const [, update] = useReducer((x) => x + 1, 0);

  const watcher = useRef(Singleton.getInstance(initialValue)).current;
  const uuidCurrent = useRef(generateUUID());
  useEffect(() => {
    watcher?.subscribe(key, uuidCurrent.current, update);

    return () => {
      watcher.del(key, uuidCurrent.current);
      // watcher?.clean();
    };
  }, []);

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      if (typeof window !== 'undefined') {
        storage.setItem(key, JSON.stringify(value));
      }
      watcher.setValue(key, value);
    } catch (error) {
      console.log(error);
    }
  };
  const getValue = () => {
    try {
      const value = watcher.getValue(key);
      if (value === null) {
        return null;
      }
      if (value) {
        return value;
      }

      const item = storage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  };
  const removeValue = () => {
    storage.removeItem(key);
    watcher.setValue(key, null);
  };
  const v = getValue()
  return [v, setValue, removeValue] as const;
}

export default useStorage;
