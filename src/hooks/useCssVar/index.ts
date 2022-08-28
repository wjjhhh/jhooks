import { useLayoutEffect, useRef } from 'react';
import { BasicTarget } from '../../types';
import { getTargetElement } from '../../utils';

type Variables = Record<string, string | null>;

function setProperty(target: BasicTarget, variables?: Variables) {
  if (variables) {
    const arr = Object.keys(variables);
    if (arr?.length) {
      arr.forEach((property) => {
        let _property = property;
        if (property.indexOf('--') !== 0) {
          _property = `--${property}`;
        }
        (target as HTMLElement)?.style.setProperty(
          _property,
          variables[property],
        );
      });
    }
  }
}

export default function useCssVar(target: BasicTarget, variables?: Variables) {
  const currentVariables = useRef(variables);
  useLayoutEffect(() => {
    const targetElement = getTargetElement(target);
    setProperty(targetElement, variables);
  }, [variables]);
  const get = () => {
    return currentVariables.current;
  };
  const set = (newVariables: Variables) => {
    setProperty(getTargetElement(target), newVariables);
    currentVariables.current = {
      ...currentVariables.current,
      ...newVariables,
    };
  };

  return {
    get,
    set,
  };
}
