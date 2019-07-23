<template>
  <button 
    :type="nativeType"
    :disabled="disabled"
    :class="classes"
    @click="onClick"
    @touchstart="onTouchstart">
    <fy-loading v-if="loading" :size="loadingSize" :color="type === 'default' ? undefined : ''" />
    <span v-if="loading && loadingText" class="fy-button__loading-text">{{loadingText}}</span>
    <span v-if="!loading" class="fy-button__text">
      <slot>{{text}}</slot>
    </span>
  </button>
</template>

<script>
import { routeProps, functionalRoute } from '../utils/router'
import Loading from '../loading/index'
export default {
  components: {
    [Loading.name]: Loading
  },
  name: 'fy-button',
  props: {
    ...routeProps,
    type: {
      type: String,
      default: 'default' // 可选值: primary, info, danger, warning
    },

    size: {
      type: String,
      default: 'normal' // 可选值: large, normal, small, mini
    },

    text: {
      type: String,
      default: ''
    },

    nativeType: {
      type: String,
      default: 'button' // 可选值submit, reset, button
    },

    block: {
      type: Boolean,
      default: false
    },

    plain: {
      type: Boolean,
      default: false
    },

    square: {
      type: Boolean,
      default: false
    },

    round: {
      type: Boolean,
      default: false
    },

    loading: {
      type: Boolean,
      default: false
    },

    loadingSize: {
      type: String,
      default: '20px'
    },

    loadingText: {
      type: String,
      default: ''
    },

    hairline: {  // 是否为细边框0.5px
      type: Boolean,
      default: false
    },

    disabled: {
      type: Boolean,
      default: false
    },

    bottomAction: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    classes () {
      let {type, size, loading, disabled, hairline, block, plain, round, square, bottomAction} = this
      let classes = [
        'fy-button',
        `fy-button--${type}`,
        `fy-button--${size}`,
        {
          'fy-button--loading': loading,
          'fy-button--disabled': disabled,
          'fy-button--hairline': hairline,
          'fy-button--block': block,
          'fy-button--plain': plain,
          'fy-button--round': round,
          'fy-button--square': square,
          'fy-button--bottom-action': bottomAction,
          'fy-hairline--surround': hairline
        }
      ]

      return classes
    }
  },

  methods: {
    onClick(event) {
      if (!this.loading && !this.disabled) {
        this.$emit('click', event)
        functionalRoute(this)
      }
    },

    onTouchstart(event) {
      this.$emit('touchstart', event)
    }
  }
}
</script>

<style lang="less">
  @import './index.less';
</style>
