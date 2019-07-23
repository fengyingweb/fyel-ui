<template>
  <span :class="tagClass" :style="tagStyle" @click="onClick">
    <slot></slot>
  </span>
</template>

<script>
import { RED, BLUE, GREEN, GRAY_DARK } from '../utils/color'

const COLOR_MAP = {
  danger: RED,
  primary: BLUE,
  success: GREEN
}
export default {
  name: 'fy-tag',
  props: {
    size: String,
    type: String,
    mark: Boolean,
    color: String,
    plain: Boolean,
    round: Boolean,
    textColor: String
  },
  computed: {
    tagClass() {
      const {size, mark, round, plain} = this
      let classes = [
        'fy-tag',
        `fy-tag--${size}`,
        plain && 'fy-tag--plain',
        mark && 'fy-tag--mark',
        round && 'fy-tag--round',
        plain && 'fy-hairline--surround',
      ]

      return classes
    },

    tagStyle() {
      const {type, plain, textColor} = this
      const color = this.color || (type && COLOR_MAP[type]) || GRAY_DARK
      const key = plain ? 'color' : 'backgroundColor'
      let style = {
        [key]: color
      }
      if (textColor) {
        style.color = textColor
      }
      return style
    }
  },
  methods: {
    onClick(event) {
      this.$emit('click', event)
    }
  }
}
</script>

<style lang="less">
  @import './index.less';
</style>
