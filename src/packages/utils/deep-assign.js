import {isObject, isDef} from './index'

const {hasOwnProperty} = Object.prototype

function assignKey(to, from, key) {
  let val = from[key]

  if (!isDef(val) || (hasOwnProperty.call(to, key) && !isDef(to[key]))) {
    return;
  }

  if (!hasOwnProperty.call(to, key) || !isObject(to[key])) {
    to[key] = val
  } else {
    to[key] = deepAssign(Object(to[key]), from[key])
  }
}

export function deepAssign(to, from) {
  Object.keys(from).forEach(key=> {
    assignKey(to, from, key)
  })

  return to
}
