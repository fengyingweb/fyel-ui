<template>
  <div :class="colClass" :style="colStyle">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'fy-col',
  props: {
    span: {
      type: [String, Number],
      default: ''
    },
    offset: {
      type: [String, Number],
      default: ''
    }
  },
  computed: {
    colClass() {
      let {span, offset} = this
      let classes = [
        'fy-col',
        span && `fy-col--${span}`,
        offset && `fy-col--offset-${offset}`
      ]
      return classes
    },

    colStyle() {
      let gutter = this.$parent && Number(this.$parent.gutter) || 0
      let padding = `${gutter / 2}px`
      let style = gutter ? {paddingLeft: padding, paddingRight: padding} : {}
      return style
    }
  }
}
</script>

<style lang="less">
  @import './index.less';
</style>
