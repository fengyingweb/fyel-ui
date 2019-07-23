<template>
  <div
    :class="wrapperClass"
    :style="style">
    <span :class="spanClass" v-if="type === 'circular'">
      <svg class="fy-loading__circular" viewBox="25 25 50 50">
        <circle cx="50" cy="50" r="20" fill="none" />
      </svg>
    </span>
    <span :class="spanClass" v-if="type === 'spinner'">
      <i v-for="val in 12" :key="val"></i>
    </span>
  </div>
</template>

<script>
export default {
  name: 'fy-loading',
  props: {
    type: {
      type: String,
      default: 'circular' // 可选值circular, spinner
    },

    size: String,

    color: {
      type: String,
      default: '#c9c9c9'
    }
  },

  computed: {
    style() {
      let {size, color} = this
      let style = {
        color: color === 'black' ? '#c0c0c0' : color,
        width: size,
        height: size
      }
      return style
    },

    wrapperClass() {
      let {color, type} = this
      const colorType = color === 'white' || color === 'black' ? color : ''
      let classes = [
        'fy-loading',
        `fy-loading--${type}`,
        colorType && `fy-loading--${colorType}`
      ]

      return classes
    },

    spanClass() {
      let {type} = this
      let classes = [
        'fy-loading__spinner',
        `fy-loading__spinner--${type}`
      ]
      return classes
    }
  }
}
</script>

<style lang="less">
  @import './index.less';
</style>
