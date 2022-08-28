import useStorage from '../useStorage';

function useSessionStorage<T>(key: string, initialValue?: T) {
  return useStorage(window.sessionStorage, key, initialValue);
}

export default useSessionStorage;
