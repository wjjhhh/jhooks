import { isEmptyObject } from './';

let queueMap: Record<string, Record<string, Function>> = {};

class Singleton {
  private value;
  private oldValue;
  private static instance: Singleton = null!;
  constructor(value: Record<string, unknown>) {
    this.value = value;
    this.oldValue = value;
  }
  static getInstance = (value: any) => {
    if (!this.instance) {
      this.instance = new Singleton(value);
    }
    return this.instance;
  };
  getValue = (key: string) => {
    if (this.value) {
      return this.value[key];
    }
  };
  setValue = (key: string, value: unknown) => {
    this.value = {
      ...this.value,
      [key]: value,
    };
    for (let k in this.value) {
      if (this?.oldValue?.[k] !== this?.value?.[k]) {
        // 更新
        for (let queueKey in queueMap) {
          if (queueKey === key) {
            const _uuidMap = queueMap[queueKey];
            for (let _uuid in _uuidMap) {
              _uuidMap[_uuid]();
            }
          }
        }
      }
    }

    this.oldValue = this.value;
  };

  subscribe = (key: string, uuid: string, notify: Function) => {
    if (queueMap[key]) {
      queueMap[key][uuid] = notify;
    } else {
      queueMap[key] = {
        [uuid]: notify,
      };
    }
  };
  del = (key: string, uuid: string) => {
    delete queueMap[key][uuid];
    if (isEmptyObject(queueMap[key])) {
      delete queueMap[key];
    }
  };
  clean = () => {
    queueMap = {};
  };
}

export default Singleton;
