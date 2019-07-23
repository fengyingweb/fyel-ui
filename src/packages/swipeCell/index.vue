<template>
  <div
    class="fy-swipe-cell"
    @click="onClick('cell')"
    @touchstart="startDrag"
    @touchmove="onDrag"
    @touchend="endDrag"
    @touchcancel="endDrag">
    <div
      class="fy-swipe-cell__wrapper"
      :style="wrapperStyle"
      @transitionend="onTransitionend">
      <div class="fy-swipe-cell__left" :style="leftStyle" v-if="leftWidth" @click.stop="onClick('left')">
        <slot name="left"></slot>
      </div>
      <slot></slot>
      <div class="fy-swipe-cell__right" :style="rightStyle" v-if="rightWidth" @click.stop="onClick('right')">
        <slot name="right"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { range } from '../utils/index'
import TouchMixin from '../mixins/touch'
import ClickOutsideMixin from '../mixins/click-outside'
const THRESHOLD = 0.15
export default {
  name: 'fy-swipe-cell',
  mixins: [TouchMixin, ClickOutsideMixin({
    event: 'touchstart',
    method: 'onClick'
  })],
  props: {
    onClose: Function,
    disabled: {
      type: Boolean,
      default: false
    },
    leftWidth: {
      type: Number,
      default: 0
    },
    rightWidth: {
      type: Number,
      default: 0
    },
    leftBackground: {
      type: String,
      default: '#f44'
    },
    rightBackground: {
      type: String,
      default: '#f44'
    },
    color: {
      type: String,
      default: '#fff'
    }
  },

  data() {
    return {
      offset: 0,
      dragging: false
    }
  },

  computed: {
    wrapperStyle() {
      let {offset, dragging} = this
      let style = {
        transform: `translate3d(${offset}px, 0, 0)`,
        transition: dragging ? 'none' : '.6s cubic-bezier(0.18, 0.89, 0.32, 1)'
      }
      return style
    },

    leftStyle() {
      let {leftWidth, leftBackground, color} = this
      let style = {
        width: `${leftWidth}px`,
        background: leftBackground,
        color
      }
      return style
    },

    rightStyle() {
      let {rightWidth, rightBackground, color} = this
      let style = {
        width: `${rightWidth}px`,
        background: rightBackground,
        color
      }
      return style
    }
  },

  methods: {
    onClick(position = 'outside') {
      this.$emit('click', position)

      if (!this.offset) {
        return;
      }

      if (this.onClose) {
        this.onClose(position, this)
      } else {
        this.swipeMove(0)
      }
    },

    swipeMove(offset = 0) {
      this.offset = range(offset, -this.rightWidth, this.leftWidth)
      if (this.offset) {
        this.swiping = true
      } else {
        this.opened = false
      }
    },

    resetSwipeStatus() {
      this.swiping = false
      this.opened = true
    },

    open(position) {
      const offset = position === 'left' ? this.leftWidth : -this.rightWidth
      this.swipeMove(offset)
      this.resetSwipeStatus()
    },

    close() {
      this.offset = 0
    },

    swipeLeaveTransition(direction) {
      let {offset, leftWidth, rightWidth} = this
      let threshold = this.opened ? 1 - THRESHOLD : THRESHOLD

      // right
      if (direction === 'right' && -offset > rightWidth * threshold && rightWidth > 0) {
        this.open('right')
        // left
      } else if (direction === 'left' && offset > leftWidth * threshold && leftWidth > 0) {
        this.open('left')
        // reset
      } else {
        this.swipeMove(0)
      }
    },

    startDrag(event) {
      if (this.disabled) {
        return;
      }

      this.dragging = true
      this.startOffset = this.offset
      this.touchStart(event)
    },

    onDrag(event) {
      if (this.disabled) {
        return;
      }
      this.touchMove(event)

      if (this.direction === 'horizontal') {
        event.preventDefault()
        this.swipeMove(this.deltaX + this.startOffset)
      }
    },

    endDrag(event) {
      if (this.disabled) {
        return;
      }
      this.dragging = false

      if (this.swiping) {
        this.swipeLeaveTransition(this.offset > 0 ? 'left' : 'right')
      }
    },

    onTransitionend() {
      this.swiping = false
    }
  }
}
</script>

<style lang="less">
  @import './index.less';
</style>
