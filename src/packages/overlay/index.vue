<template>
  <transition name="fy-fade">
    <div
      :class="['fy-overlay', className]"
      :style="overlayStyle"
      v-if="visible"
      @touchmove="onTouchmove"
      @click="onClick"></div>
  </transition>
</template>

<script>
export default {
  name: 'fy-overlay',

  props: {
    zIndex: Number,
    className: String,
    visible: Boolean,
    customStyle: Object
  },

  computed: {
    overlayStyle() {
      let {zIndex, customStyle} = this
      let style = {
        zIndex,
        ...customStyle
      }
      return style
    }
  },

  methods: {
    onTouchmove(event) {
      event.preventDefault()
      event.stopPropagation()
    },

    onClick(event) {
      this.$emit('click', event)
    }
  }
}
</script>

<style lang="less">
  @import './index.less';
</style>
