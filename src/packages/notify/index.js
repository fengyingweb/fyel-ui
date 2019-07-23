import Vue from 'vue'
import FyNotify from './index.vue'
import { RED, WHITE } from '../utils/color'
import { isObject, isServer } from '../utils'
import { mount } from '../utils/functional'

let timer
let instance

const parseOptions = message => isObject(message) ? message : {message}

function Notify(options) {
  if (isServer) {
    return;
  }

  if (!instance) {
    instance = mount(FyNotify)
  }

  options = {
    ...Notify.currentOptions,
    ...parseOptions(options)
  }

  Object.assign(instance, options)
  clearTimeout(timer)

  if (options.duration && options.duration > 0) {
    timer = setTimeout(Notify.clear, options.duration)
  }

  return instance
}

const defaultOptions = {
  value: true,
  message: '',
  color: WHITE,
  background: RED,
  duration: 3000,
  className: ''
}

Notify.currentOptions = {...defaultOptions}

Notify.clear = () => {
  if (instance) {
    instance.value = false
  }
}

Notify.setDefaultOptions = (options) => {
  Object.assign(Notify.currentOptions, options)
}

Notify.resetDefaultOptions = () => {
  Notify.currentOptions = {...defaultOptions}
}

Notify.install = () => {
  Vue.component(FyNotify.name, FyNotify)
}

Vue.prototype.$notify = Notify

export default Notify
