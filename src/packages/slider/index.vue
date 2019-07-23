<template>
  <div
    :class="['fy-slider',
      disabled && 'fy-slider--disabled',
      vertical && 'fy-slider--vertical']"
    :style="{background: inactiveColor}"
    @click="onClick">
    <div class="fy-slider__bar" :style="barStyle">
      <div
        class="fy-slider__button-wrapper"
        @touchstart="onTouchstart"
        @touchmove="onTouchmove"
        @touchend="onTouchend"
        @touchcancel="onTouchend">
        <slot name="button">
          <div class="fy-slider__button"></div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import TouchMixin from '../mixins/touch'
export default {
  name: 'fy-slider',
  mixins: [TouchMixin],
  props: {
    value: Number,
    disabled: Boolean,
    vertical: Boolean,
    activeColor: String,
    inactiveColor: String,
    max: {
      type: Number,
      default: 100
    },
    min: {
      type: Number,
      default: 0
    },
    step: {
      type: Number,
      default: 1
    },
    barHeight: {
      type: String,
      default: '2px'
    }
  },

  computed: {
    barStyle() {
      let {vertical, barHeight, activeColor} = this
      const mainAxis = vertical ? 'height' : 'width'
      const crossAxis = vertical ? 'width' : 'height'
      let style = {
        [mainAxis]: `${this.format(this.value)}%`,
        [crossAxis]: barHeight,
        background: activeColor
      }
      return style
    }
  },

  methods: {
    format(value) {
      return (Math.round(Math.max(this.min, Math.min(value, this.max)) / this.step) * this.step)
    },

    updateValue(value, end) {
      value = this.format(value)
      this.$emit('input', value)

      if (end) {
        this.$emit('change', value)
      }
    },

    onClick(event) {
      event.stopPropagation()
      if (this.disabled) return;
      let rect = this.$el.getBoundingClientRect()
      let delta = this.vertical ? event.clientY - rect.top : event.clientX - rect.left
      let total = this.vertical ? rect.height : rect.width
      let value = (delta / total) * 100

      this.updateValue(value, true)
    },

    onTouchstart(event) {
      if (this.disabled) return;
      this.touchStart(event)
      this.startValue = this.format(this.value)
    },

    onTouchmove(event) {
      event.preventDefault()
      event.stopPropagation()
      if (this.disabled) return;
      this.touchMove(event)
      let rect = this.$el.getBoundingClientRect()
      let delta = this.vertical ? this.deltaY : this.deltaX
      let total = this.vertical ? rect.height : rect.width
      let diff = (delta / total) *100

      this.updateValue(this.startValue + diff, false)
    },

    onTouchend() {
      if (this.disabled) return;
      this.updateValue(this.value, true)
    }
  }
}
</script>

<style lang="less">
  @import './index.less';
</style>