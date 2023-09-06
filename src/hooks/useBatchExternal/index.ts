// @ts-nocheck
import { useState, useEffect, useRef } from 'react';

type JsOptions = Partial<HTMLScriptElement>
type CssOptions = Partial<HTMLStyleElement>

type Into = 'head'

export type Options = JsOptions | CssOptions

function loadScript(fileName: string, callback?, options?: JsOptions, into?: Into) {
  callback = callback || function () {};
  let script = document.querySelector(`script[src="${fileName}"]`);
  if (script) {
    callback();
  }
  into = into || 'head';

  script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = fileName;

  script.onload = function () {
    callback();
  };
  if (options) {
    for(let k in options) {
      script[k] = options[k]
    }
  }
  if (into === 'head') {
    document.getElementsByTagName('head')[0].appendChild(script);
  } else {
    document.body.appendChild(script);
  }
  return {
    dom: script,
    callback,
  };
}

function loadCSS(fileName: string, callback?, options?: CssOptions, into?: Into) {
  callback = callback || function () {};
  let css = document.querySelector(`link[href="${fileName}"]`);
  if (css) {
    callback();
  } else {
    into = into || 'head';

    css = document.createElement('link');
    css.type = 'text/css';
    css.rel = 'stylesheet';
    css.onload = css.onreadystatechange = function () {
      callback();
    };
    css.href = fileName;
    if (options) {
      for(let k in options) {
        css[k] = options[k]
      }
    }
    console.log('into', into)
    if (into === 'head') {
      document.getElementsByTagName('head')[0].appendChild(css);
    } else {
      document.body.appendChild(css);
    }
  }
  return {
    dom: css,
    callback,
  };
}

function getResources(
  arr: (string | { url: string; action?: Function, options?: Options, into?: Into })[],
  i = 0,
  map: any,
  callback?: Function,
) {
  if (!Array.isArray(arr)) return;
  const currentResource = arr[i];

  let exc, url, action, options, into;
  if (typeof currentResource === 'string') {
    url = currentResource;
  } else if (typeof currentResource === 'object') {
    url = currentResource?.url;
    action = currentResource?.action;
    options = currentResource?.options
    into = currentResource?.into
  }
  if (url) {
    if (/\.js$/.test(url)) {
      exc = loadScript;
    } else if (/\.css$/.test(url)) {
      exc = loadCSS;
    }
  }
  if (exc && url) {
    const resource = exc(url, function () {
      if (typeof action === 'function') {
        action();
      }
      ++i;
      arr.length > i && getResources(arr, i, map, callback);
      arr.length === i && callback?.();
    }, options, into);
    map.set(url, resource);
  } else {
    ++i;
    arr.length === i && callback?.();
  }
}

const useBatchExternal = (resource?: (string | { url: string; action?: Function, options?: Options, into? })[]) => {
  const [pending, setPending] = useState('unset');

  const map = useRef(new Map()); // 加载表

  useEffect(() => {
    if (resource?.length) {
      setPending('pending');
      getResources(resource, 0, map.current, () => {
        setPending('finished');
      });
    }

    return () => {
      // 卸载资源
      map.current.forEach((res) => res?.dom?.remove());
      map.current.clear();
    };
  }, []);


  const load = (newResource) => {
    const hasKeys = [...map.current.keys()];
    const shouldLoadSource = newResource.filter((_) => !hasKeys.includes(_));
    if (shouldLoadSource.length) {
      setPending('pending');
      getResources(shouldLoadSource, 0, map.current, () => {
        setPending('finished');
      });
    }
  };
  const unload = (target) => {
    if (!map.current) return;
    map.current.forEach((value, key) => {
      console.log(key, target);
      if (
        !target ||
        (typeof target === 'string' && target === key) ||
        (Array.isArray(target) && target.includes(key))
      ) {
        value.dom.remove();
        map.current.delete(key);
      }
    });
  };
  return {
    pending,
    load,
    unload,
  };
};

export default useBatchExternal;
