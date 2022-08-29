import { renderHook, act } from '@testing-library/react-hooks';
import useTravel from '../index';

describe('useTravel', () => {
  const INITIALVALUE = 'initialValue';
  // it('should be defined', () => {
  //   expect(useTravel).toBeDefined();
  // });

  // it('should work without initial value', async () => {
  //   const hook = renderHook(() => useTravel());
  //   expect(hook.result.current.value).toEqual(undefined);
  //   act(() => {
  //     hook.result.current.setValue(INITIALVALUE);
  //   });
  //   expect(hook.result.current.value).toEqual(INITIALVALUE);
  // });

  // it('should work with null an undefined without initial value', async () => {
  //   const nullHook = renderHook(() => useTravel());
  //   expect(nullHook.result.current.value).toEqual(undefined);
  //   act(() => {
  //     nullHook.result.current.setValue(null);
  //   });
  //   expect(nullHook.result.current.value).toEqual(null);

  //   const undefinedHook = renderHook(() => useTravel());
  //   act(() => {
  //     undefinedHook.result.current.setValue('hi!');
  //     undefinedHook.result.current.setValue(undefined);
  //   });
  //   expect(undefinedHook.result.current.value).toEqual(undefined);
  //   expect(undefinedHook.result.current.backLength).toEqual(2);
  // });

  // it('should work with initial value', async () => {
  //   const NEXTVALUE = 'hi';
  //   const hook = renderHook(() => useTravel(INITIALVALUE));
  //   expect(hook.result.current.value).toEqual(INITIALVALUE);
  //   act(() => {
  //     hook.result.current.setValue(NEXTVALUE);
  //   });
  //   expect(hook.result.current.value).toEqual(NEXTVALUE);
  // });

  // it('should work with null and undefined with initial value', async () => {
  //   const nullHook = renderHook(() => useTravel(INITIALVALUE));
  //   act(() => {
  //     nullHook.result.current.setValue(null);
  //   });
  //   expect(nullHook.result.current.value).toEqual(null);
  //   const undefinedHook = renderHook(() => useTravel(INITIALVALUE));
  //   act(() => {
  //     undefinedHook.result.current.setValue(undefined);
  //   });
  //   expect(undefinedHook.result.current.value).toEqual(undefined);
  //   expect(undefinedHook.result.current.backLength).toEqual(1);
  // });

  // it('back and forward should work', () => {
  //   const hook = renderHook(() => useTravel());
  //   act(() => {
  //     hook.result.current.setValue('a');
  //     hook.result.current.setValue('b');
  //   });
  //   expect(hook.result.current.value).toEqual('b');
  //   act(() => {
  //     hook.result.current.setValue('c');
  //   });
  //   expect(hook.result.current.value).toEqual('c');
  //   act(() => {
  //     hook.result.current.back();
  //   });
  //   expect(hook.result.current.value).toEqual('b');
  //   act(() => {
  //     hook.result.current.forward();
  //   });
  //   expect(hook.result.current.value).toEqual('c');
  // });

  // it('go should work for negative step', () => {
  //   const hook = renderHook(() => useTravel('init'));
  //   act(() => {
  //     hook.result.current.setValue('abc');
  //   });
  //   act(() => {
  //     hook.result.current.setValue('def');
  //   });
  //   act(() => {
  //     hook.result.current.setValue('hij');
  //   });
  //   act(() => {
  //     hook.result.current.go(-2);
  //   });
  //   expect(hook.result.current.value).toEqual('abc');
  //   act(() => {
  //     hook.result.current.go(-100);
  //   });
  //   expect(hook.result.current.value).toEqual('init');
  // });

  // it('go should work for positive step', () => {
  //   const hook = renderHook(() => useTravel('init'));
  //   act(() => {
  //     hook.result.current.setValue('abc');
  //   });
  //   act(() => {
  //     hook.result.current.setValue('def');
  //   });
  //   act(() => {
  //     hook.result.current.setValue('hij');
  //   });
  //   act(() => {
  //     hook.result.current.go(-3);
  //   });
  //   expect(hook.result.current.value).toEqual('init');
  //   act(() => {
  //     hook.result.current.go(2);
  //   });
  //   expect(hook.result.current.value).toEqual('def');
  //   act(() => {
  //     hook.result.current.go(100);
  //   });
  //   expect(hook.result.current.value).toEqual('hij');
  // });

  // it('reset should reset state to initial by default', () => {
  //   const hook = renderHook(() => useTravel('init'));
  //   act(() => {
  //     hook.result.current.setValue('abc');
  //   });
  //   act(() => {
  //     hook.result.current.setValue('def');
  //   });
  //   act(() => {
  //     hook.result.current.setValue('hij');
  //   });
  //   act(() => {
  //     hook.result.current.go(-1);
  //   });
  //   expect(hook.result.current.backLength).toEqual(2);
  //   expect(hook.result.current.forwardLength).toEqual(1);
  //   act(() => {
  //     hook.result.current.reset();
  //   });
  //   expect(hook.result.current.value).toEqual('init');
  //   expect(hook.result.current.backLength).toEqual(0);
  //   expect(hook.result.current.forwardLength).toEqual(0);
  // });

  // it('reset should reset state to new initial if provided', () => {
  //   const hook = renderHook(() => useTravel('init'));
  //   act(() => {
  //     hook.result.current.setValue('abc');
  //   });
  //   act(() => {
  //     hook.result.current.setValue('def');
  //   });
  //   act(() => {
  //     hook.result.current.setValue('hij');
  //   });
  //   act(() => {
  //     hook.result.current.go(-1);
  //   });
  //   expect(hook.result.current.backLength).toEqual(2);
  //   expect(hook.result.current.forwardLength).toEqual(1);
  //   act(() => {
  //     hook.result.current.reset('new init');
  //   });
  //   expect(hook.result.current.value).toEqual('new init');
  //   expect(hook.result.current.backLength).toEqual(0);
  //   expect(hook.result.current.forwardLength).toEqual(0);
  // });

  // it('reset new initial value should work with undefined', () => {
  //   const hook = renderHook(() => useTravel(INITIALVALUE));
  //   act(() => {
  //     hook.result.current.setValue('abc');
  //   });
  //   act(() => {
  //     hook.result.current.setValue('def');
  //   });
  //   act(() => {
  //     hook.result.current.setValue('hij');
  //   });
  //   act(() => {
  //     hook.result.current.go(-1);
  //   });
  //   expect(hook.result.current.backLength).toEqual(2);
  //   expect(hook.result.current.forwardLength).toEqual(1);
  //   act(() => {
  //     hook.result.current.reset(undefined);
  //   });
  //   expect(hook.result.current.value).toEqual(undefined);
  //   expect(hook.result.current.backLength).toEqual(0);
  //   expect(hook.result.current.forwardLength).toEqual(0);
  // });

  // it('return index correctly', () => {
  //   const hook = renderHook(() => useTravel(INITIALVALUE));
  //   act(() => {
  //     hook.result.current.setValue('abc');
  //   });
  //   act(() => {
  //     hook.result.current.setValue('def');
  //   });
  //   expect(hook.result.current.current).toEqual(2);
  //   act(() => {
  //     hook.result.current.go(-1);
  //   })
  //   expect(hook.result.current.current).toEqual(1);
  //   act(() => {
  //     hook.result.current.back();
  //   })
  //   expect(hook.result.current.current).toEqual(0);
  //   act(() => {
  //     hook.result.current.go(-1000);
  //   })
  //   act(() => {
  //     hook.result.current.go(2);
  //   })
  //   expect(hook.result.current.current).toEqual(2);
  // })
  // it('back and forward should work after overwrite first step', () => {
  //   const hook = renderHook(() => useTravel({}));
  //   act(() => {
  //     hook.result.current.setValue({ a: 1 }, { overwrite: true });
  //   });
  //   act(() => {
  //     hook.result.current.setValue({ a: 1, b: 2 });
  //   });
  //   act(() => {
  //     hook.result.current.back();
  //   });

  //   expect(hook.result.current.value).toEqual({ a: 1 });
  // });
  // it('back and forward should work after overwrite later step', () => {
  //   const hook = renderHook(() => useTravel({}));
  //   act(() => {
  //     hook.result.current.setValue({ a: 1 });
  //   });
  //   act(() => {
  //     hook.result.current.setValue({ a: 2 });
  //   });
  //   act(() => {
  //     hook.result.current.setValue({ a: 2, b: 1 }, { isCover: true });
  //   });
  //   act(() => {
  //     hook.result.current.setValue({ a: 2, b: 2 }, { isCover: true });
  //   });
  //   act(() => {
  //     hook.result.current.setValue({ a: 3 });
  //   });
  //   act(() => {
  //     hook.result.current.back();
  //   });

  //   expect(hook.result.current.value).toEqual({ a: 2, b: 2 });
  //   act(() => {
  //     hook.result.current.back();
  //   });
  //   expect(hook.result.current.value).toEqual({ a: 1 });
  //   act(() => {
  //     hook.result.current.forward();
  //   });
  //   expect(hook.result.current.value).toEqual({ a: 2, b: 2 });
  //   act(() => {
  //     hook.result.current.forward();
  //   });
  //   expect(hook.result.current.value).toEqual({ a: 3 });
  // });

  it('测试重置', () => {
    const hook = renderHook(() => useTravel(''));
    act(() => {
      hook.result.current.setValue('1');
    });
    act(() => {
      hook.result.current.setValue('12');
    });
    act(() => {
      hook.result.current.setValue('123');
    });
    act(() => {
      hook.result.current.setValue('124', true);
    });
    act(() => {
      hook.result.current.back();
    });
    expect(hook.result.current.backLength).toEqual(2);
    expect(hook.result.current.forwardLength).toEqual(1);
    expect(hook.result.current.value).toEqual('12');
  });

  it('测试重置2', () => {
    const hook = renderHook(() => useTravel(''));
    act(() => {
      hook.result.current.setValue('1', true);
    });
    act(() => {
      hook.result.current.setValue('12', true);
    });
    act(() => {
      hook.result.current.setValue('123', true);
    });
    act(() => {
      hook.result.current.setValue('124', true);
    });
    act(() => {
      hook.result.current.back();
    });
    expect(hook.result.current.backLength).toEqual(0);
    expect(hook.result.current.forwardLength).toEqual(0);
    expect(hook.result.current.value).toEqual('124');
  });

  it('测试回退前进', () => {
    const hook = renderHook(() => useTravel(''));
    act(() => {
      hook.result.current.setValue('1');
    });
    act(() => {
      hook.result.current.setValue('12');
    });
    act(() => {
      hook.result.current.setValue('123');
    });
    act(() => {
      hook.result.current.back();
    });
    act(() => {
      hook.result.current.back();
    });
    act(() => {
      hook.result.current.back();
    });
    expect(hook.result.current.backLength).toEqual(0);
    expect(hook.result.current.forwardLength).toEqual(3);
    expect(hook.result.current.value).toEqual('');
    act(() => {
      hook.result.current.back();
    });
    act(() => {
      hook.result.current.back();
    });
    act(() => {
      hook.result.current.back();
    });
    expect(hook.result.current.backLength).toEqual(0);
    expect(hook.result.current.forwardLength).toEqual(3);
    expect(hook.result.current.value).toEqual('');
    act(() => {
      hook.result.current.forward();
    });
    expect(hook.result.current.backLength).toEqual(1);
    expect(hook.result.current.forwardLength).toEqual(2);
    expect(hook.result.current.value).toEqual('1');
    act(() => {
      hook.result.current.forward();
    });
    expect(hook.result.current.backLength).toEqual(2);
    expect(hook.result.current.forwardLength).toEqual(1);
    expect(hook.result.current.value).toEqual('12');
    act(() => {
      hook.result.current.forward();
    });
    expect(hook.result.current.backLength).toEqual(3);
    expect(hook.result.current.forwardLength).toEqual(0);
    expect(hook.result.current.value).toEqual('123');
    act(() => {
      hook.result.current.forward();
    });
    act(() => {
      hook.result.current.forward();
    });
    act(() => {
      hook.result.current.forward();
    });
    expect(hook.result.current.backLength).toEqual(3);
    expect(hook.result.current.forwardLength).toEqual(0);
    expect(hook.result.current.value).toEqual('123');
  });

  it('测试回退前进2', () => {
    const hook = renderHook(() => useTravel(''));
    act(() => {
      hook.result.current.setValue('1');
    });
    act(() => {
      hook.result.current.setValue('12');
    });
    act(() => {
      hook.result.current.setValue('123');
    });
    act(() => {
      hook.result.current.setValue('1234');
    });
    act(() => {
      hook.result.current.back(2);
    });
    act(() => {
      hook.result.current.setValue('127');
    });
    expect(hook.result.current.backLength).toEqual(3);
    expect(hook.result.current.forwardLength).toEqual(0);
    expect(hook.result.current.value).toEqual('127');
    act(() => {
      hook.result.current.setValue('1278');
    });
    expect(hook.result.current.backLength).toEqual(4);
    expect(hook.result.current.forwardLength).toEqual(0);
    expect(hook.result.current.value).toEqual('1278');
    act(() => {
      hook.result.current.back();
    });
    expect(hook.result.current.backLength).toEqual(3);
    expect(hook.result.current.forwardLength).toEqual(1);
    expect(hook.result.current.value).toEqual('127');
    act(() => {
      hook.result.current.back();
    });
    expect(hook.result.current.backLength).toEqual(2);
    expect(hook.result.current.forwardLength).toEqual(2);
    expect(hook.result.current.value).toEqual('12');
  });

  it('测试回退前进重置', () => {
    const hook = renderHook(() => useTravel(''));
    act(() => {
      hook.result.current.setValue('1');
    });
    act(() => {
      hook.result.current.setValue('12');
    });
    act(() => {
      hook.result.current.setValue('123');
    });
    act(() => {
      hook.result.current.setValue('1234');
    });
    act(() => {
      hook.result.current.back(2);
    });
    act(() => {
      hook.result.current.setValue('127', true);
    });
    expect(hook.result.current.backLength).toEqual(2);
    expect(hook.result.current.forwardLength).toEqual(0);
    expect(hook.result.current.value).toEqual('127');
    act(() => {
      hook.result.current.setValue('1278');
    });
    expect(hook.result.current.backLength).toEqual(3);
    expect(hook.result.current.forwardLength).toEqual(0);
    expect(hook.result.current.value).toEqual('1278');
    act(() => {
      hook.result.current.back();
    });
    expect(hook.result.current.backLength).toEqual(2);
    expect(hook.result.current.forwardLength).toEqual(1);
    expect(hook.result.current.value).toEqual('127');
    act(() => {
      hook.result.current.back();
    });
    expect(hook.result.current.backLength).toEqual(1);
    expect(hook.result.current.forwardLength).toEqual(2);
    expect(hook.result.current.value).toEqual('1');
    act(() => {
      hook.result.current.go(1);
    });
    expect(hook.result.current.backLength).toEqual(2);
    expect(hook.result.current.forwardLength).toEqual(1);
    expect(hook.result.current.value).toEqual('127');
    act(() => {
      hook.result.current.go(100);
    });
    expect(hook.result.current.backLength).toEqual(3);
    expect(hook.result.current.forwardLength).toEqual(0);
    expect(hook.result.current.value).toEqual('1278');
  });
});
