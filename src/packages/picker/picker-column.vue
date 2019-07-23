<template>
  <div
    :class="['fy-picker-column', className]"
    :style="columnStyle"
    @touchstart="onTouchstart"
    @touchmove="onTouchmove"
    @touchend="onTouchend"
    @touchcancel="onTouchend">
    <ul :style="wrapperStyle">
      <li
        v-for="(option, index) in options"
        :key="index"
        :style="optionStyle"
        :class="['fy-ellipsis',
          'fy-picker-column__item',
          isDisabled(option) && 'fy-picker-column__item--disabled',
          index === currentIndex && 'fy-picker-column__item--selected']"
        v-html="getOptionText(option)"
        @click="onClick(index)">
      </li>
    </ul>
  </div>
</template>

<script>
import { deepClone } from '../utils/deep-clone'
import { isObject, range } from '../utils/index'

const DEFAULT_DURATION = 200;
export default {
  name: 'picker-column',
  props: {
    valueKey: String,
    className: String,
    itemHeight: Number,
    defaultIndex: Number,
    initialOptions: Array,
    visibleItemCount: Number
  },

  data() {
    return {
      startY: 0,
      offset: 0,
      duration: 0,
      startOffset: 0,
      options: deepClone(this.initialOptions),
      currentIndex: this.defaultIndex
    }
  },

  computed: {
    count() {
      return this.options.length
    },

    columnStyle() {
      const {itemHeight, visibleItemCount} = this
      return {
        height: `${itemHeight * visibleItemCount}px`
      }
    },

    wrapperStyle() {
      const {itemHeight, visibleItemCount, duration, offset} = this
      const baseOffset = (itemHeight * (visibleItemCount - 1)) / 2

      return {
        transition: `${duration}ms`,
        transform: `translate3d(0, ${offset + baseOffset}px, 0)`,
        lineHeight: `${itemHeight}px`
      }
    },

    optionStyle() {
      const {itemHeight} = this
      return {
        height: `${itemHeight}px`
      }
    }
  },
  
  watch: {
    defaultIndex() {
      this.setIndex(this.defaultIndex)
    }
  },

  methods: {
    onTouchstart(event) {
      this.startY = event.touches[0].clientY
      this.startOffset = this.offset
      this.duration = 0
    },

    onTouchmove(event) {
      event.preventDefault()
      const deltaY = event.touches[0].clientY - this.startY
      this.offset = range(
        this.startOffset + deltaY,
        -(this.count * this.itemHeight),
        this.itemHeight
      )
    },

    onTouchend(event) {
      if (this.offset !== this.startOffset) {
        this.duration = DEFAULT_DURATION
        const index = range(Math.round(-this.offset / this.itemHeight), 0, this.count - 1)
        this.setIndex(index, true)
      }
    },

    isDisabled(option) {
      return isObject(option) && option.disabled
    },

    getOptionText(option) {
      return (isObject(option) && (this.valueKey in option)) ? option[this.valueKey] : option
    },

    onClick(index) {
      this.setIndex(index, true)
    },

    setIndex(index, bool) {
      index = this.adjustIndex(index) || 0
      this.offset = -index * this.itemHeight

      if (index !== this.currentIndex) {
        this.currentIndex = index
        bool && this.$emit('change', index)
      }
    },

    adjustIndex(index) {
      index = range(index, 0, this.count)
      for(let i = index; i < this.count; i++) {
        if (!this.isDisabled(this.options[i])) return i
      }

      for(let i = index - 1; i >= 0; i--) {
        if (!this.isDisabled(this.options[i])) return i
      }
    },

    setValue(value) {
      const {options} = this
      const length = options.length
      for(let i = 0; i < length; i++) {
        if (this.getOptionText(options[i]) === value) {
          return this.setIndex(i)
        }
      }
    },

    getValue() {
      return this.options[this.currentIndex]
    }
  },

  created() {
    this.$parent.children && this.$parent.children.push(this)
    this.setIndex(this.currentIndex)
  },

  destroyed() {
    this.$parent.children && this.$parent.children.splice(this.$parent.children.indexOf(this), 1)
  }
}
</script>