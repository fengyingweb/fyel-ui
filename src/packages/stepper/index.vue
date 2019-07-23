<template>
  <div class="fy-stepper">
    <button
      :class="['fy-stepper__minus',
      minusDisabled && 'fy-stepper__minus--disabled']"
      @click="onChange('minus')"></button>
    <input
      type="number"
      class="fy-stepper__input"
      :style="{width: inputWidth}"
      :value="currentValue"
      :disabled="disabled || disableInput"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"/>
    <button
      :class="['fy-stepper__plus',
        plusDisabled && 'fy-stepper__plus--disabled']"
      @click="onChange('plus')"></button>
  </div>
</template>

<script>
import {isDef} from '../utils/index'
export default {
  name: 'fy-stepper',
  props: {
    value: null,
    integer: Boolean,
    disabled: Boolean,
    inputWidth: String,
    asyncChange: Boolean,
    disableInput: Boolean,
    min: {
      type: [String, Number],
      default: 1
    },
    max: {
      type: [String, Number],
      default: Infinity
    },
    step: {
      type: [String, Number],
      default: 1
    },
    defaultValue: {
      type: [String, Number],
      default: 1
    }
  },

  data() {
    let value = this.range(isDef(this.value) ? this.value : this.defaultValue)
    if (value !== +this.value) {
      this.$emit('input', value)
    }
    return {
      currentValue: value
    }
  },
  
  computed: {
    minusDisabled() {
      return this.disabled || this.currentValue <= this.min
    },

    plusDisabled() {
      return this.disabled || this.currentValue >= this.max
    }
  },

  watch: {
    value(val) {
      if (val !== this.currentValue) {
        this.currentValue = this.format(val)
      }
    },

    currentValue(val) {
      this.$emit('input', val)
      this.$emit('change', val)
    }
  },
  methods: {
    format(value) {
      value = String(value).replace(/[^0-9.-]/g, '')
      return value === '' ? 0 : this.integer ? Math.floor(value) : +value
    },

    range(value) {
      return Math.max(Math.min(this.max, this.format(value)), this.min)
    },

    onChange(type) {
      if (this[`${type}Disabled`]) {
        this.$emit('overlimit', type)
        return;
      }
      let diff = type === 'minus' ? -this.step : +this.step
      let value = Math.round((this.currentValue + diff) * 100) / 100

      if (!this.asyncChange) {
        this.currentValue = this.range(value)
      } else {
        this.$emit('input', value)
        this.$emit('change', value)
      }
      this.$emit(type)
    },

    onInput(event) {
      const { value } = event.target
      const formatted = this.format(value)

      if (!this.asyncChange) {
        if (+value !== formatted) {
          event.target.value = formatted
        }
        this.currentValue = formatted
      } else {
        event.target.value = this.currentValue
        this.$emit('input', formatted)
        this.$emit('change', formatted)
      }
    },

    onFocus(event) {
      this.$emit('focus', event)
    },

    onBlur(event) {
      this.currentValue = this.range(this.currentValue)
      this.$emit('blur', event)

      // fix edge case when input is empty and min is 0
      if (this.currentValue === 0) {
        event.target.value = this.currentValue
      }
    }
  }
}
</script>

<style lang="less">
  @import './index.less';
</style>
