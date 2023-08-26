import { useEffect, useState } from 'react';

function useCycleList<T>(list: T[]) {
  const [index, setIndex] = useState(0);
  const len = list.length;
  const prev = () => {
    setIndex((old) => (old === 0 ? len - 1 : old - 1));
  };
  const next = () => {
    setIndex((old) => (old + 1) % len);
  };
  return {
    index,
    prev,
    next,
    data: list[index],
  };
}

export default useCycleList;
