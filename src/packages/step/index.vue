<template>
  <div
    :class="[
      'fy-hairline',
       'fy-step',
       `fy-step--${direction}`, 
       status && `fy-step--${status}`]">
    <div class="fy-step__title" :style="titleStyle">
      <slot></slot>
    </div>

    <div class="fy-step__circle-container">
      <i class="fy-step__circle" v-if="status !== 'process'"></i>
      <fy-icon v-else :name="activeIcon" :style="{ color: activeColor }"></fy-icon>
    </div>

    <div class="fy-step__line"></div>
  </div>
</template>

<script>
import Icon from '../icon/index'
export default {
  name: 'fy-step',

  components:{
    [Icon.name]: Icon
  },
  
  computed: {
    status() {
      const index = this.$parent.steps.indexOf(this);
      const { active } = this.$parent;
      let sta = ''
      if (index < active) {
        sta = 'finish'
      }
      if (index === active) {
        sta = 'process'
      }
      return sta
    },

    direction() {
      return this.$parent.direction
    },

    activeIcon() {
      return this.$parent.activeIcon
    },

    activeColor() {
      return this.$parent.activeColor
    },

    titleStyle() {
      const {status, activeColor} = this
      return status === 'process' && { color: activeColor }
    }
  },

  beforeCreate() {
    this.$parent.steps.push(this);
  },
}
</script>

<style lang="less">
  @import './index.less';
</style>
