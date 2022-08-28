import useStorage from '../useStorage';

function useLocalStorage<T>(key: string, initialValue?: T) {
  return useStorage(window.localStorage, key, initialValue);
}

export default useLocalStorage;
