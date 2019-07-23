<template>
  <div :class="cellClass" @click="onClick">
    <slot name="icon">
      <fy-icon v-if="icon" class="fy-cell__left-icon" :name="icon"></fy-icon>
    </slot>
    <div :class="['fy-cell__title', titleClass]" v-if="showTitle">
      <slot name="title">
        <span>{{title}}</span>
      </slot>
      <slot name="label">
        <div :class="['fy-cell__label', labelClass]">
          {{label}}
        </div>
      </slot>
    </div>
    <div
      :class="['fy-cell__value', !title && 'fy-cell__value--alone']"
      v-if="showValue">
      <slot><span>{{value}}</span></slot>
    </div>
    <slot name="right-icon">
      <fy-icon v-if="isLink" class="fy-cell__right-icon" :name="arrowDirection ? `arrow-${arrowDirection}` : 'arrow'"></fy-icon>
    </slot>
  </div>
</template>

<script>
import Icon from '../icon/index'
import {routeProps, functionalRoute} from '../utils/router'
export default {
  name: 'fy-cell',
  components: {
    [Icon.name]: Icon
  },
  props: {
    ...routeProps,
    icon: String,
    size: String, // 可选值large
    center: {
      type: Boolean,
      default: false
    },
    isLink: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    titleClass: String,
    valueClass: String,
    labelClass: String,
    title: [String, Number],
    value: [String, Number],
    label: [String, Number],
    border: {
      type: Boolean,
      default: true
    },
    clickable: {
      type: Boolean,
      default: false
    },
    arrowDirection: String // 可选值left up down
  },

  computed: {
    cellClass() {
      let {size, center, isLink, required, border, clickable} = this
      let classes = [
        'fy-cell',
        {'fy-cell--center': center},
        {'fy-cell--required': required},
        {'fy-cell--borderless': !border},
        {'fy-cell--clickable': isLink || clickable},
        size && `fy-cell-${size}`
      ]
      return classes
    },

    showTitle() {
      return this.$slots.title
        || typeof this.title !== 'undefined'
        || this.$slots.label
        || typeof this.label !== 'undefined'
    },

    showValue() {
      return this.$slots.default || typeof this.value !== 'undefined'
    }
  },

  methods: {
    onClick(event) {
      this.$emit('click', event)
      functionalRoute(this)
    }
  }
}
</script>

<style lang="less">
  @import './index.less';
</style>
