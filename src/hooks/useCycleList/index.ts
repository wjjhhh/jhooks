import { useEffect, useState } from 'react';

function useCycleList<T>(list: T[]) {
  const [index, setIndex] = useState(0);
  const [innerList, setInnerList] = useState<any[]>(list)
  const len = innerList.length;
  const prev = () => {
    setIndex((old) => (old === 0 ? len - 1 : old - 1));
  };
  const next = () => {
    setIndex((old) => (old + 1) % len);
  };
  const push = (arr: any) => {
    setInnerList(prev => [...prev, arr])
  }
  const pop = () => {
    setInnerList(prev => prev.slice(0, -1))
  }
  
  return {
    index,
    prev,
    next,
    data: innerList[index],
    push,
    pop,
    list: innerList
  };
}

export default useCycleList;
