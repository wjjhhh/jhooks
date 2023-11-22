import { useEffect, useState } from 'react';

function useCycleList<T>(list: T[]) {
  const [index, setIndex] = useState(0);
  const [innerList, setInnerList] = useState<any[]>(list);
  const len = innerList.length;
  const prev = () => {
    if (len < 2) {
      return
    }
    setIndex((old) => (old === 0 ? len - 1 : old - 1));
  };
  const next = () => {
    if (len < 2) {
      return
    }
    setIndex((old) => (old + 1) % len);
  };
  const push = (member: any) => {
    setInnerList((prev) => [...prev, member]);
  };
  const pop = () => {
    if (len === 0) {
      return
    }
    if (index === len - 1) {
      setIndex(index - 1)
    }
    const res = innerList.pop()
    setInnerList([...innerList]);
    
    return res
  };

  const shift = () => {
    if (len === 0) {
      return
    }
    if (index === 0 && len === 1) {
      setIndex(-1)
    }
    const res = innerList.shift();
    setInnerList([...innerList]);
    return res;
  };

  const unshift = (member: any) => {
    const res = innerList.unshift(member);
    setInnerList([...innerList]);
    return res;
  };
  return {
    index,
    prev,
    next,
    data: innerList[index],
    push,
    pop,
    shift,
    unshift,
    list: innerList,
  };
}

export default useCycleList;
