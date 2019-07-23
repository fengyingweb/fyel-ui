<template>
  <div
    :class="navClass"
    :style="navStyle">
    <div class="fy-nav-bar__left" @click="onClickLeft">
      <slot name="left">
        <fy-icon v-if="leftArrow" class="fy-nav-bar__arrow" name="arrow-left"></fy-icon>
        <span v-if="leftText" class="fy-nav-bar__text">{{leftText}}</span>
      </slot>
    </div>

    <div class="fy-nav-bar__title fy-ellipsis">
      <slot name="title">{{title}}</slot>
    </div>

    <div class="fy-nav-bar__right" @click="onClickRight">
      <slot name="right">
        <span v-if="rightText" class="fy-nav-bar__text">{{rightText}}</span>
      </slot>
    </div>
  </div>
</template>

<script>
import Icon from '../icon/index'
export default {
  name: 'fy-nav-bar',
  components: {
    [Icon.name]: Icon
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    fixed: {
      type: Boolean,
      default: false
    },
    leftText: {
      type: String,
      default: ''
    },
    rightText: {
      type: String,
      default: ''
    },
    leftArrow: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: true
    },
    zIndex: {
      type: Number,
      default: 2000
    },
    backgroundColor: {
      type: String,
      default: '#fff'
    }
  },

  computed: {
    navStyle() {
      let {zIndex, backgroundColor} = this
      let style = {
        backgroundColor: backgroundColor,
        zIndex: zIndex
      }
      return style
    },

    navClass() {
      let {fixed, border} = this
      let classes = [
        'fy-nav-bar',
        fixed && 'fy-nav-bar--fixed',
        border && 'fy-hairline--bottom'
      ]
      return classes
    }
  },

  methods: {
    // 点击左边
    onClickLeft(event) {
      this.$emit('click-left', event)
    },

    // 点击右边
    onClickRight(event) {
      this.$emit('click-right', event)
    }
  }
}
</script>

<style lang="less">
  @import './index.less';
</style>

