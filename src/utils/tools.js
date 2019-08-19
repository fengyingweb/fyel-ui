const _toString = Object.prototype.toString;
const MAX_SAFE_INTEGER = 9007199254740991;


// env判断
export const inBrowser = typeof window !== 'undefined';
export const ua = inBrowser && window.navigator.userAgent.toLowerCase();
export const isIE = ua && /msie|trident/.test(ua);
export const isIE9 = ua && ua.indexOf('msie 9.0') > 0;
export const isEdge = ua && ua.indexOf('edge/') > 0;
export const isChrome = ua && /chrome\/\d+/.test(ua) && !isEdge;
export const isFF = ua && /firefox\/\d+/.test(ua);
export const isAndroid = ua && /android/.test(ua);
export const isIOS = ua && /iphone|ipad|ipod|ios/.test(ua);

export const hasOwnProperty = Object.prototype.hasOwnProperty;

// 数据类型判断
export function isUndef(value) {
  return value === undefined || value === null;
}

export function isDef(value) {
  return value !== undefined && value !== null;
}

export function isObject(value) {
  const type = typeof value;
  return value !== null && (type === 'object' || type === 'function');
}

export function isPlainObject(value) {
  return getTag(value) === '[object Object]';
}

export function isObjectLike(value) {
  return typeof value === 'object' && value !== null;
}

export function isArray(value) {
  return Array.isArray ? Array.isArray(value) : getTag(value) === '[object Array]';
}

export function isArrayLike(value) {
  return value !== null && typeof value !== 'function' && isLength(value);
}

export function isRegExp(value) {
  return getTag(value) === '[object RegExp]';
}

export function isPromise(value) {
  return isDef(value)
    && typeof value.then === 'function'
    && typeof value.catch === 'function';
}

export function isSymbol(value) {
  return typeof value === 'symbol' || getTag(value) === '[object Symbol]';
}

export function isLength(value) {
  return typeof value === 'number'
    && value > -1
    && value % 1 === 0
    && value <= MAX_SAFE_INTEGER;
}

export function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }

  const tag = getTag(value);
  return tag === '[object Function]'
    || tag === '[object AsyncFunction]'
    || tag === '[object GeneratorFunction]'
    || tag === '[object Proxy]'
}

export function isElement(value) {
  return isObjectLike(value) && value.nodeType === 1 && !isPlainObject(value);
}

export function isDate(value) {
  return isObjectLike(value) && getTag(value) === '[object Date]';
}

export function isPrototype(value) {
  const ObjectProto = Object.prototype;
  const Ctor = value && value.constructor;
  const proto = (typeof Ctor === 'function' && Ctor.prototype) || ObjectProto;

  return value === proto;
}

export function isArguments(value) {
  return isObjectLike(value) && getTag(value) === '[object Arguments]';
}

export function isEmpty(value) {
  if (value == null) {
    return true;
  }

  if (isArrayLike(value)
    && (Array.isArray(value) || typeof value === 'string'
        || typeof value.splice === 'function'
        || isArguments(value)
      )
    ) {
    return !value.length;
  }

  const tag = getTag(value);
  if (tag === '[object Map]' || tag === '[object Set]') {
    return !value.size;
  }

  if (isPrototype(value)) {
    return !Object.keys(value).length;
  }

  for (const key in value) {
    if (hasOwnProperty.call(value, key)) {
      return false;
    }
  }

  return true;
}

export function isToParse(value) {
  if (typeof value !== 'string') {
    return false;
  }

  try {
    const parseObj = JSON.parse(value);
    return isObjectLike(parseObj);
  } catch (err) {
    return false;
  }
}

export function getTag(value) {
  if (value == null) {
    return value === undefined ? '[object Undefined]' : '[object Null]';
  }

  return _toString.call(value);
}

/**
 * 获取query string参数
 * @param queryString  type: String
 * @return Obj
 */
export function getQueryString(queryString) {
  const res = {};
  queryString = queryString.trim().replace(/^(\?|#|&)/, '');

  if (!queryString) {
    return res;
  }

  queryString.split('&').forEach(param => {
    let params = param.replace(/\+/g, ' ').split('=');
    let key = decodeURIComponent(params.shift());
    let val = params.length > 0
      ? decodeURIComponent(params.join('='))
      : null;

    if (res[key] === undefined) {
      res[key] = val;
    } else if (isArray(res[key])) {
      res[key].push(val);
    } else {
      res[key] = [res[key], val];
    }
  });

  return res;
}

/**
 * query param to string
 * @param  params type Object
 * @return String 
 */

const encodeReserveRE = /[!'()*]/g
const encodeReserveReplacer = c => '%' + c.charCodeAt(0).toString(16)
const commaRE = /%2C/g

const encode = str => encodeURIComponent(str)
  .replace(encodeReserveRE, encodeReserveReplacer)
  .replace(commaRE, ',');

export function stringifyQuery(params) {
  const res = params ? Object.keys(params).map(key => {
    const val = params[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encode(key);
    }

    if (isArray(val)) {
      let result = [];
      val.forEach(val1=> {
        if (val1 === undefined) {
          return
        }

        if (val1 === null) {
          result.push(encode(key));
        } else {
          result.push(encode(key) + '=' + encode(val1));
        }
      });

      return result.join('&');
    }

    return encode(key) + '=' + encode(val);
  }).filter(val => val.length > 0).join('&') : null;

  return res ? `?${res}` : '';
}

/**
 * 数组去重
 * @param arr type: Array
 * @param iteratee type: string or return string
 * @return arr
 */
const ARRAY_MAX_LENGTH = 200;
export function uniq(arr, iteratee) {
  let result = [];
  let {length} = arr;
  if (length >= ARRAY_MAX_LENGTH) {
    let set = iteratee ? null : new Set(arr);
    if (set) {
      return [...set];
    }
  }

  let arrIndex = -1;
  if (!iteratee) {
    while(++arrIndex < length) {
      let val = arr[arrIndex];
      if (val === val) {
        if (result.indexOf(val) === -1) {
          result.push(val);
        }
      }
    }
  } else {
    let seen = [];
    let mapArr = []
    let mapArrIndex = -1;
    while(++arrIndex < length) {
      let val = arr[arrIndex];
      iteratee = isFunction(iteratee) ? iteratee(val, arrIndex, arr) : iteratee;
      if (isPlainObject(val)) {
        Object.keys(val).forEach(key => {
          if (key === iteratee) {
            mapArr.push(val[key]);
          }
        });
      }
    }
    while(++mapArrIndex < length) {
      let mapVal = mapArr[mapArrIndex];
      if (seen.indexOf(mapVal) === -1) {
        seen.push(mapVal);
        result.push(arr[mapArrIndex]);
      }
    }
  }
  return result;
}

/**
 * 函数节流  用于搜索需求时延迟请求  同时减少请求次数，提高性能
 * @param  func  function
 * @param delay  需要延迟的时间
 */
export function throttling(func, delay) {
  let timer;
  return function(...args) {
      if (timer) {
          clearTimeout(timer);
      }
      timer = setTimeout(() => {
          func.apply(this, args)
      }, delay)
  }
}

// 防抖函数，让某个函数在上一次执行后，满足等待某个时间内不再触发此函数后再执行，
// 而在这个等待时间内再次触发此函数，等待时间会重新计算
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result;

  let later = function() {
      let last = Date.now() - timestamp;
      if (last < wait && last >= 0) {
          timeout = setTimeout(later, wait - last);
      } else {
          timeout = null;
          if (!immediate) {
              result = func.apply(context, args);
              if (!timeout) context = args = null;
          }
      }
  };

  return function(...argus) {
      context = this;
      args = argus;
      timestamp = Date.now();
      let callNow = immediate && !timeout;
      if (!timeout) timeout = setTimeout(later, wait);
      if (callNow) {
          result = func.apply(context, args);
          context = args = null;
      }

      return result;
  };
}