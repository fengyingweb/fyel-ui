<template>
  <div
    :class="['fy-search', showAction && 'fy-search--show-action']"
    :style="{background: background}">
    <div :class="['fy-search__content', `fy-search__content--${shape}`]">
      <div class="fy-search__label" v-if="$slots.label || label">
        <slot name="label">{{label}}</slot>
      </div>
      <fy-field
        type="search"
        :clearable="clearable"
        :value="value"
        :border="false"
        :center="true"
        left-icon="search"
        :disabled="disabled"
        :readonly="readonly"
        :placeholder="$attrs.placeholder"
        @input="onInput"
        @keypress="onKeypress"
        @clear="onClear">
        <div slot="left-icon" v-if="$slots['left-icon']">
          <slot name="left-icon"></slot>
        </div>
      </fy-field>
    </div>
    <div v-if="showAction || $slots.action" class="fy-search__action">
      <slot name="action">
        <div @click="onCancel">取消</div>
      </slot>
    </div>
  </div>
</template>

<script>
import Field from '../field/index'
export default {
  name: 'fy-search',
  components: {
    [Field.name]: Field
  },
  props: {
    value: String,
    label: String,
    showAction: Boolean,
    inputAlign: String,
    error: Boolean,
    readonly: Boolean,
    disabled: Boolean,
    clearable: {
      type: Boolean,
      default: true
    },
    shape: {
      type: String,
      default: 'square'
    },
    background: {
      type: String,
      default: '#fff'
    }
  },
  methods: {
    onCancel() {
      this.$emit('input', '')
      this.$emit('cancel')
    },

    onInput(value) {
      this.$emit('input', value)
    },

    onKeypress(event) {
      if (event.keyCode === 13) {
        event.preventDefault()
        this.$emit('search', this.value)
      }
      this.$emit('keypress', event)
    },

    onClear() {
      this.$emit('clear')
    }
  }
}
</script>

<style lang="less">
  @import './index.less';
</style>
