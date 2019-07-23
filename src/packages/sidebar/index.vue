<template>
  <div class="fy-sidebar fy-hairline--top-bottom">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'fy-sidebar',
  props: {
    activeKey: {
      type: [Number, String],
      default: 0
    }
  },

  data() {
    return {
      items: []
    }
  }
}
</script>

<style lang="less">
  @import './index.less';
</style>
