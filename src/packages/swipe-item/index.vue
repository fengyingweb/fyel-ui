<template>
  <div class="fy-swipe-item" :style="itemStyle" @click="onClick">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'fy-swipe-item',
  data() {
    return {
      offset: 0
    }
  },

  computed: {
    itemStyle() {
      const {vertical, computedWidth, computedHeight} = this.$parent
      return {
        width: `${computedWidth}px`,
        height: vertical ? `${computedHeight}px` : '100%',
        transform: `translate${vertical ? 'Y' : 'X'}(${this.offset}px)`
      }
    }
  },

  methods: {
    onClick(event) {
      this.$emit('click', event)
    }
  },

  beforeCreate() {
    this.$parent.swipes.push(this)
  },

  destroyed() {
    this.$parent.swipes = this.$parent.swipes.filter(item=> item !== this)
  }
}
</script>

<style lang="less">
  @import './index.less';
</style>
