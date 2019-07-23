<template>
  <fy-cell
    :class="cellClass"
    :icon="leftIcon"
    :size="size"
    :title="label"
    :center="center"
    :border="border"
    :is-Link="isLink"
    :required="required"
    :title-class="titleClass">
    <div
      slot="icon"
      class="fy-field__left-icon"
      v-if="showLeftIcon"
      @click="onClickLeftIcon">
      <slot name="left-icon">
        <fy-icon :name="leftIcon"/>
      </slot>
    </div>
    <span slot="title" v-if="$slots.label">
      <slot name="label">{{label}}</slot>
    </span>
    <div class="fy-field__body">
      <textarea 
        v-if="type === 'textarea'"
        :class="inputClass"
        :value="value"
        :disabled="disabled"
        :readonly="readonly"
        :placeholder="$attrs.placeholder"
        ref="input"
        @input="onInput"
        @focus="onFocus"
        @blur="onBlur"
        @keypress="onKeypress">
      </textarea>
      <input
        ref="input"
        :class="inputClass"
        :value="value"
        :disabled="disabled"
        :readonly="readonly"
        :placeholder="$attrs.placeholder"
        @input="onInput"
        @focus="onFocus"
        @blur="onBlur"
        @keypress="onKeypress"
        v-else/>
      <fy-icon v-if="showClear" name="clear" class="fy-field__clear" @touchstart.native="onClear" />
      <div v-if="showRightIcon" class="fy-field__right-icon" @click="onClickRightIcon">
        <slot name="right-icon">
          <fy-icon :name="rightIcon || icon"/>
        </slot>
      </div>
      <div v-if="$slots.button" class="fy-field__button">
        <slot name="button"></slot>
      </div>
    </div>
    <div v-if="errorMessage" :class="errorMessageClass">{{errorMessage}}</div>
  </fy-cell>
</template>

<script>
import {isObject, isDef} from '../utils/index'
import Icon from '../icon/index'
import Cell from '../cell/index'
export default {
  name: 'fy-field',
  components: {
    [Icon.name]: Icon,
    [Cell.name]: Cell
  },
  props: {
    icon: String,
    size: String,
    center: Boolean,
    isLink: Boolean,
    required: Boolean,
    valueClass: String,
    labelClass: String,
    title: [String, Number],
    value: [String, Number],
    label: [String, Number],
    border: {
      type: Boolean,
      default: true
    },
    error: Boolean,
    leftIcon: String,
    rightIcon: String,
    readonly: Boolean,
    clearable: Boolean,
    labelAlign: String,
    inputAlign: String,
    onIconClick: Function,
    autosize: [Boolean, Object],
    errorMessage: String,
    errorMessageAlign: String,
    type: {
      type: String,
      default: 'text'
    },
    disabled: Boolean
  },
  data() {
    return {
      focused: false
    }
  },
  computed: {
    cellClass() {
      let {error, type, autosize, disabled} = this
      let classes = [
        'fy-field',
        error && 'fy-field--error',
        disabled && 'fy-field--disabled',
        type === 'textarea' && !autosize && 'fy-field--min-height'
      ]
      return classes
    },
    titleClass() {
      let {labelAlign} = this
      return labelAlign ? `fy-field__label fy-field__label--${labelAlign}`: 'fy-field__label'
    },
    inputClass() {
      let {inputAlign} = this
      let classes = [
        'fy-field__control',
        inputAlign && `fy-field__control--${inputAlign}`
      ]
      return classes
    },
    showClear() {
      return this.clearable && this.focused && this.value !== '' && isDef(this.value) && !this.readonly
    },
    showLeftIcon() {
      return this.$slots['left-icon'] || this.leftIcon
    },
    showRightIcon() {
      return this.$slots['right-icon'] || this.rightIcon || this.icon
    },
    errorMessageClass() {
      let {errorMessageAlign} = this
      let classes = [
        'fy-field__error-message',
        errorMessageAlign && `fy-field__error-message--${errorMessageAlign}`
      ]
      return classes
    }
  },
  methods: {
    onClickLeftIcon() {
      this.$emit('click-left-icon')
    },

    onClickRightIcon() {
      this.$emit('click-icon')
      this.$emit('click-right-icon')
      this.onIconClick && this.onIconClick()
    },

    onClear(event) {
      event.preventDefault()
      this.$emit('input', '')
      this.$emit('clear')
    },
    
    format(target = this.$refs.input) {
      let {value} = target
      let {maxLength} = this.$attrs
      if (this.type === 'number'
        && isDef(maxLength)
        && value.length > maxLength) {
        value = value.substr(0, maxLength)
        target.value = value
      }
      return value
    },

    onInput(event) {
      this.$emit('input', this.format(event.target))
    },

    focus() {
      this.$refs.input && this.$refs.input.focus()
    },

    blur() {
      this.$refs.input && this.$refs.input.blur()
    },

    onFocus(event) {
      this.focused = true
      this.$emit('focus', event)
      if (this.readonly) {
        this.blur()
      }
    },

    onBlur(event) {
      this.focused = false;
      this.$emit('blur', event)
    },

    onKeypress(event) {
      if (this.type === 'number') {
        const { keyCode } = event
        const allowPoint = String(this.value).indexOf('.') === -1
        const isValidKey =
          (keyCode >= 48 && keyCode <= 57) || (keyCode === 46 && allowPoint) || keyCode === 45
        if (!isValidKey) {
          event.preventDefault()
        }
      }

      // trigger blur after click keyboard search button
      /* istanbul ignore next */
      if (this.type === 'search' && event.keyCode === 13) {
        this.blur()
      }

      this.$emit('keypress', event)
    },

    adjustSize() {
      const { input } = this.$refs;
      if (!(this.type === 'textarea' && this.autosize) || !input) {
        return;
      }

      input.style.height = 'auto';

      let height = input.scrollHeight;
      if (isObject(this.autosize)) {
        const { maxHeight, minHeight } = this.autosize;
        if (maxHeight) {
          height = Math.min(height, maxHeight);
        }
        if (minHeight) {
          height = Math.max(height, minHeight);
        }
      }

      if (height) {
        input.style.height = height + 'px';
      }
    }
  },

  mounted() {
    this.$nextTick(()=> {
      this.format()
      this.adjustSize()
    })
  }
}
</script>

<style lang="less">
  @import './index.less';
</style>
