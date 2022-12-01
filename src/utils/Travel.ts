import { produce, applyPatches, enablePatches } from 'immer';

interface IObj {
  [key: string]: any;
}

class Travel {
  public value: { value?: any };
  private patchesList: [];
  private inverseReplacesList: [];
  private maxLength: number;
  private current: number;
  private farthest: number; //  最远走过的步骤

  private initialValue: any;
  constructor(initialValue = {}, maxLength = Infinity) {
    this.initialValue = initialValue;

    this.value = { value: initialValue }; // 兼容简单类型和复杂类型
    this.patchesList = [];
    this.inverseReplacesList = [];
    this.maxLength = maxLength; // 记录的长度
    this.current = 0;
    this.farthest = 0; // 最远走过的步骤

    enablePatches();
  }
  private deepDiff = (newValue: IObj, originValue: IObj) => {
    if (!newValue || Object.keys(newValue).length === 0) {
      originValue = newValue;
    } else {
      for (const i in newValue) {
        if (
          newValue[i] &&
          originValue[i] &&
          typeof newValue[i] === 'object' &&
          typeof originValue[i] === 'object'
        ) {
          this.deepDiff(newValue[i], originValue[i]);
        } else if (newValue[i] !== originValue[i]) {
          originValue[i] = newValue[i];
        } else {
          originValue[i] = newValue[i];
        }
      }
    }
  };
  // 前进步数, step < 0 为后退， step > 0 时为前进
  go(step: number) {
    if (typeof step !== 'number') {
      step = 1;
    }
    if (step > 0) {
      return this.forward(step);
    } else if (step < 0) {
      return this.back(-step);
    }
    return this.getValue();
  }
  // 向前前进step步
  forward(step = 1) {
    if (typeof step !== 'number') {
      step = 1;
    }
    if (step < 1 || this.getForwardLength() < 1) {
      return this.getValue();
    }
    const canFast = Math.min(this.current + step, this.farthest);
    this.current = canFast;

    if (this.current <= this.farthest) {
      this.value = applyPatches(this.value, this.patchesList[canFast - 1]);
    }

    return this.getValue();
  }
  // 向后回退step步
  back(step: number | undefined = 1) {
    if (typeof step !== 'number') {
      step = 1;
    }
    if (step < 1 || this.getBackLength() < 1) {
      return this.getValue();
    }
    if (this.current < step) {
      step = this.current;
    }
    if (step <= this.maxLength) {
      this.value = applyPatches(this.value, this.inverseReplacesList[(this.current -= step)]);
    }
    return this.getValue();
  }
  setValue(newValue: any, options?: { overwrite?: boolean }) {
    //覆盖当前步的值，不添加到步数中
    this.value = produce(
      this.value,
      (_) => {
        _.value = newValue;
      },
      <T>(patches: T, inverseReplaces: T) => {
        if (options?.overwrite) {
          this.farthest = this.current;
          if (this.current > 0) {
            (this.patchesList as T[]).splice(
              this.current - 1,
              this.patchesList.length - this.current + 1,
              patches,
            );

            (this.inverseReplacesList as T[]).splice(
              this.current,
              this.inverseReplacesList.length - this.current,
            );
          }
        } else {
          this.farthest = ++this.current;

          (this.patchesList as T[]).splice(
            this.current - 1,
            this.patchesList.length - this.current + 1,
            patches,
          );
          (this.inverseReplacesList as T[]).splice(
            this.current - 1,
            this.inverseReplacesList.length - this.current + 1,
            inverseReplaces,
          );
        }
        if (this.current > this.maxLength) {
          this.current = this.farthest = this.maxLength;
          this.patchesList.shift();
          this.inverseReplacesList.shift();
        }
      },
    );

    return this.value['value'];
  }
  getValue() {
    return this.value['value'];
  }
  getCurrent() {
    return this.current;
  }
  getBackLength() {
    return this.current;
  }
  getForwardLength() {
    return this.farthest - this.current;
  }
  canBack() {
    return this.current > 0;
  }
  canForward() {
    return this.current < this.farthest;
  }
  reset = (...params: any[]) => {
    this.value = params.length ? params[0] : this.initialValue;
    this.current = 0;
    this.farthest = 0;
    this.patchesList = [];
    this.inverseReplacesList = [];
    return this.value;
  };
}

export default Travel;
