import { useState, useLayoutEffect, useEffect, useRef, useReducer } from 'react';

class Singleton<T> {
  private value: T;
  subscribers;
  constructor() {
    this.value = null!;
    this.subscribers = new Set<Function>();
  }
  notify() {
    console.log('notify', this.subscribers)
    for (const subscriber of this.subscribers) {
      console.log('n', this.value)
      subscriber(this.value);
    }
  }
  update(value: T) {
    console.log('update', value)
    this.value = value;
    this.notify()
  }
}

const useForceUpdate = () => {
  const [,s] = useReducer(x => x + 1, 0)
  return s
}

export default <T>(hook: () => T) => {
  const singleton = new Singleton();
  
  return () => {
    const forceUpdate = useForceUpdate()
    const data = hook();
    // console.log('data',  data)
    // const [state, setState] = useState(data);
    const ref = useRef(data)
    useLayoutEffect(() => {
      console.log('jso', data, ref.current)
      if (JSON.stringify(data) === JSON.stringify(ref.current)) {
        return
      }
      singleton.update(data);
    }, [JSON.stringify(data)]);

    useEffect(() => {
      if (!singleton) return;

      const subscriber = (val: T) => {
        // setState(val)
        if (JSON.stringify(val) !== JSON.stringify(ref.current)) {
          console.log('强更')
            ref.current = val
            forceUpdate()
        }
      };
      singleton.subscribers.add(subscriber);

      return () => {
        singleton.subscribers.delete(subscriber);
      };
    }, [singleton]);
    console.log('ref.current:', ref.current, 'data:',  data)
    return ref.current;
  };
};
