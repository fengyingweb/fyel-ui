<template>
  <div
    :class="['fy-steps' , `fy-steps--${direction}`]">
    <div
      v-if="title || description"
      class="fy-steps__status">
      <div
        v-if="$slot.icon || icon"
        class="fy-steps__icon">
        <slot name="icon">
          <fy-icon :name="icon" :class="iconClass"/>
        </slot>
      </div>

      <div class="fy-steps__message">
        <div class="fy-steps__title">{{title}}</div>
        <div class="fy-steps__desc fy-ellipsis">{{description}}</div>
      </div>

      <slot name="message-extra"></slot>
    </div>

    <div
      :class="[
        'fy-steps__items',
        !title && !description && 'fy-steps__items--alone']">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import {GREEN} from '../utils/color'
import Icon from '../icon/index'
export default {
  name: 'fy-steps',
  components: {
    [Icon.name]: Icon
  },
  props: {
    icon: String,
    title: String,
    active: Number,
    iconClass: String,
    description: String,
    direction: {
      type: String,
      default: 'horizontal'
    },
    activeColor: {
      type: String,
      default: GREEN
    },
    activeIcon: {
      type: String,
      default: 'checked'
    }
  },

  data() {
    return {
      steps: []
    };
  },
}
</script>

<style lang="less">
  @import './index.less';
</style>
