import { useState, useEffect, useRef, useCallback } from 'react';

const useStateFromProps = (props: any) => {
  const [state, setState] = useState(props);
  const oldValue = useRef(props);
  if (oldValue.current !== props) {
    setState(props);
    oldValue.current = props;
  }
  return [state, setState];
};

export default useStateFromProps;
