<template>
  <div :class="rowClass" :style="rowStyle">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'fy-row',
  props: {
    type: String,
    justify: {
      type: String,
      default: '', // 可选值center, end, space-between, space-around
    },
    align: {
      type: String,
      default: '', // 可选值center, bottom
    },
    gutter: {
      type: [String, Number],
      default: 0
    }
  },

  computed: {
    rowClass() {
      let {type, justify, align} = this
      let flex = type === 'flex'
      let classes = [
        'fy-row',
        flex && 'fy-row--flex',
        flex && justify && `fy-row--justify-${justify}`,
        flex && justify && `fy-row--align-${align}`
      ]
      return classes
    },

    rowStyle() {
      let {gutter} = this
      let margin = `-${Number(gutter) / 2}px`
      let style = gutter ? {marginLeft: margin, marginRight: margin} : {}
      return style
    }
  }
}
</script>

<style lang="less">
  @import './index.less';
</style>
