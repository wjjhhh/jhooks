// @ts-nocheck
import { produce, applyPatches, enablePatches } from 'immer';

interface IObj {
  [key: string]: any;
}

const isSimpleType = value => typeof value !== 'object' || value === null;

class Travel {
  public value: object;
  private patchesList: [];
  private inverseReplacesList: [];
  private maxLength: number;
  private current: number;
  private farthest: number; //  最远走过的步骤
  private isTypeObject: boolean;
  private initialValue: any;
  constructor(initialValue = {}, maxLength = Infinity) {
    this.initialValue = initialValue;
    this.value = isSimpleType(initialValue)
      ? { _: initialValue }
      : initialValue;
    this.patchesList = [];
    this.inverseReplacesList = [];
    this.maxLength = maxLength; // 记录的长度
    this.current = 0;
    this.farthest = 0; // 最远走过的步骤
    this.isTypeObject = !isSimpleType(initialValue); // 是否复杂类型
    enablePatches();
  }
  private deepDiff = (newValue: IObj, oldValue: IObj) => {
    if (!newValue || Object.keys(newValue).length === 0) {
      oldValue = newValue;
    } else {
      for (const i in newValue) {
        if (
          newValue[i] &&
          oldValue[i] &&
          typeof newValue[i] === 'object' &&
          typeof oldValue[i] === 'object'
        ) {
          this.deepDiff(newValue[i], oldValue[i]);
        } else if (newValue[i] !== oldValue[i]) {
          oldValue[i] = newValue[i];
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
      this.value = applyPatches(
        this.value,
        this.inverseReplacesList[(this.current -= step)],
      );
    }
    return this.getValue();
  }
  setValue(newValue: any, isCover: boolean = false) {
    //覆盖当前步的值，不添加到步数中
    if (isCover) {
      this.value = produce(
        this.value,
        _ => {
          // 简单类型
          if (isSimpleType(newValue)) {
            this.isTypeObject = false;
            _['_'] = newValue;
          } else {
            this.isTypeObject = true;
            this.deepDiff(newValue, _);
          }
        },
        <T>(patches: T, inverseReplaces: T) => {
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

          if (this.current > this.maxLength) {
            this.current = this.farthest = this.maxLength;
            this.patchesList.shift();
            this.inverseReplacesList.shift();
          }
        },
      );
    } else {
      this.value = produce(
        this.value,
        _ => {
          // 简单类型
          if (isSimpleType(newValue)) {
            this.isTypeObject = false;
            _['_'] = newValue;
          } else {
            this.isTypeObject = true;
            this.deepDiff(newValue, _);
          }
        },
        <T>(patches: T, inverseReplaces: T) => {
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
          if (this.current > this.maxLength) {
            this.current = this.farthest = this.maxLength;

            this.patchesList.shift();
            this.inverseReplacesList.shift();
          }
        },
      );
    }

    if (!this.isTypeObject) {
      return this.value['_'];
    }
    return this.value;
  }
  getValue() {
    if (this.isTypeObject) {
      return this.value;
    }
    return this.value['_'];
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
