class Singleton {
  private value;
  private oldValue;
  private queue: { key: string; notify: Function }[];
  private static instance: Singleton = null!;
  constructor(value: Record<string, unknown>) {
    this.value = value;
    this.oldValue = value;
    this.queue = [];
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
        this.queue.forEach(({ key: queueKey, notify }) => {
          if (queueKey === key) {
            notify();
          }
        });
      }
    }

    this.oldValue = this.value;
  };

  subscribe = (key: string, notify: Function) => {
    this.queue.push({
      key,
      notify,
    });
  };
  clean = () => {
    this.queue.length = 0;
  };
}

export default Singleton;
