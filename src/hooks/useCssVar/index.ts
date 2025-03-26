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
  const targetRef = useRef(target);

  useLayoutEffect(() => {
    const targetElement = getTargetElement(target);
    targetRef.current = targetElement;
    setProperty(targetElement, variables);
  }, [variables, target]);
  const get = () => {
    return currentVariables.current;
  };

  function set(newVariables: Variables): void
  function set(property: string, value: string | null): void
  function set(arg1: Variables | string, arg2?: string | null): void {
    if (typeof arg1 === 'string') {
      const newVariables: Variables = {
        [arg1]: arg2!
      }
      currentVariables.current = {
        ...currentVariables.current,
        ...newVariables,
      }
      setProperty(targetRef.current, newVariables)
    } else {
      setProperty(targetRef.current, arg1);
      currentVariables.current = {
        ...currentVariables.current,
        ...arg1,
      };
    }

  };

  return {
    get,
    set,
  };
}
