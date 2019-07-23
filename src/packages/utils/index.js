import Vue from 'vue'

export const isServer = Vue.prototype.$isServer

export function noop() {}

export function isDef(value) {
  return value !== null && value !== undefined
}

export function isObject(value) {
  let type = typeof value
  return value !== null && (type === 'object' || type === 'function')
}

export function isArray(value) {
  return Array.isArray(value)
}

export function isAndroid() {
  return /android/.test(navigator.userAgent.toLowerCase())
}

export function isIOS() {
  return /ios|iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase())
}

export function range(num, min, max) {
  return Math.min(Math.max(num, min), max)
}
