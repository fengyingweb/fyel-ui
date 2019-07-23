<template>
  <transition
    :name="transitionName"
    @after-enter="onAfterEnter"
    @after-leave="onAfterLeave">
      <div v-if="value && shouldRender" :class="popupClass">
        <slot></slot>
      </div>
  </transition>
</template>

<script>
import PopupMixin from '../mixins/popup/index'
export default {
  name: 'fy-popup',
  mixins: [PopupMixin],
  props: {
    position: {
      type: String,
      default: 'bottom'
    },
    transition: String,
    overlay: {
      type: Boolean,
      default: true
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: true
    }
  },

  computed:{
    popupClass() {
      let {position} = this
      let classes = [
        'fy-popup',
        `fy-popup--${position}`
      ]
      return classes
    },

    transitionName() {
      let {position, transition} = this
      let transitionName = transition || (position ? `fy-popup-slide-${position}` : 'fy-fade')
      return transitionName
    }
  },

  methods: {
    onAfterEnter() {
      this.$emit('opened')
    },

    onAfterLeave() {
      this.$emit('closed')
    }
  }
}
</script>

<style lang="less">
  @import './index.less';
</style>
