<template>
  <div v-if="title">
    <div class="fy-cell-group__title">{{title}}</div>
    <div :class="['fy-cell-group', border && 'fy-hairline--top-bottom']">
      <slot></slot>
    </div>
  </div>
  <div v-else :class="['fy-cell-group', border && 'fy-hairline--top-bottom']">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'fy-cell-group',
  props: {
    title: {
      type: String,
      default: ''
    },

    border: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="less">
  @import './index.less';
</style>
