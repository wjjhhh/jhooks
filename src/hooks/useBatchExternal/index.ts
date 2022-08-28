// @ts-nocheck
import { useState, useEffect, useRef } from 'react';

function loadScript(fileName: string, callback?, into?) {
  callback = callback || function() {};
  let js = document.querySelector(`script[src="${fileName}"]`);
  if (js) {
    callback();
  }
  into = into || 'head';

  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = fileName;

  script.onload = function() {
    callback();
  };

  if (into === 'head') {
    document.getElementsByTagName('head')[0].appendChild(script);
  } else {
    document.body.appendChild(script);
  }
  return {
    dom: js,
    callback,
  };
}

function loadCSS(fileName: string, callback?, into?) {
  callback = callback || function() {};
  let css = document.querySelector(`link[href="${fileName}"]`);
  if (css) {
    callback();
  } else {
    into = into || 'head';

    css = document.createElement('link');
    css.type = 'text/css';
    css.rel = 'stylesheet';
    css.onload = css.onreadystatechange = function() {
      callback();
    };

    css.href = fileName;

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
  arr: (string | { url: string; action?: Function })[],
  i = 0,
  map: any,
  callback?: Function,
) {
  if (!Array.isArray(arr)) return;
  const currentResource = arr[i];

  let exc, url, action;
  if (typeof currentResource === 'string') {
    url = currentResource;
  } else if (typeof currentResource === 'object') {
    url = currentResource?.url;
    action = currentResource?.action;
  }
  if (url) {
    if (/\.js$/.test(url)) {
      exc = loadScript;
    } else if (/\.css$/.test(url)) {
      exc = loadCSS;
    }
  }
  if (exc && url) {
    const resource = exc(url, function() {
      if (typeof action === 'function') {
        action();
      }
      ++i;
      arr.length > i && getResources(arr, i, map, callback);
      arr.length === i && callback?.();
    });
    map.set(url, resource);
  } else {
    ++i;
    arr.length === i && callback?.();
  }
}

const useBatchExternal = (
  resource?: (string | { url: string; action?: Function })[],
) => {
  const [pending, setPending] = useState('unset');

  const map = useRef(new Map()).current; // 加载表

  useEffect(() => {
    setPending('pending');
    getResources(resource, 0, map, () => {
      setPending('finished');
    });

    return () => {
      // 卸载资源
      map.forEach(res => res?.dom?.remove());
      map.clear();
    };
  }, []);
  const load = newResource => {
    setPending('pending');

    getResources(newResource, 0, map, () => {
      setPending('finished');
    });
  };
  const unload = target => {
    if (!map) return;
    map.forEach((value, key) => {
      console.log(key, target);
      if (
        !target ||
        (typeof target === 'string' && target === key) ||
        (Array.isArray(target) && target.includes(key))
      ) {
        value.dom.remove();
        map.delete(key);
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
