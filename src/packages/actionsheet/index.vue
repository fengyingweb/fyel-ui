<template>
  <fy-popup 
    class="fy-actionsheet"
    :value="value"
    @input="onInput"
    position="bottom"
    :overlay="overlay"
    :close-on-click-overlay="closeOnClickOverlay"
    :lazy-render="lazyRender"
    :lock-scroll="lockScroll"
    :get-container="getContainer">
    <div class="fy-actionsheet__header fy-hairline--top-bottom" v-if="title">
      <span>{{title}}</span>
      <fy-icon name="close" class="fy-actionsheet__close" @click="onCancel"/>
    </div>
    <div v-else>
      <div
        v-for="(item, index) in actions"
        :key="index"
        :class="[
          'fy-actionsheet__item',
          (item.disabled || item.loading) && 'fy-actionsheet__item--disabled',
          item.className,
          'fy-hairline--top']"
        @click="onSelect($event, item, index)">
          <fy-loading v-if="item.loading" class="fy-actionsheet__loading" size="20px"/>
          <div v-else>
            <span class="fy-actionsheet__name">{{item.name}}</span>
            <span v-if="item.subname" class="fy-actionsheet__subname">{{item.subname}}</span>
          </div>
      </div>
    </div>
    <div class="fy-actionsheet__content">
      <slot></slot>
    </div>
    <div v-if="cancelText" class="fy-actionsheet__cancel" @click="onCancel">{{cancelText}}</div>
  </fy-popup>
</template>

<script>
import PopupMixin from '../mixins/popup/index';
import Icon from '../icon/index';
import Loading from '../loading/index';
import Popup from '../popup/index';
export default {
  name: 'fy-actionsheet',

  components: {
    [Icon.name]: Icon,
    [Loading.name]: Loading,
    [Popup.name]: Popup
  },

  props: {
    ...PopupMixin.props,
    overlay: {
      type: Boolean,
      default: true
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: true
    },
    actions: {
      type: Array,
      default: ()=> []
    },
    title: {
      type: String,
      default: ''
    },
    cancelText: {
      type: String,
      default: ''
    }
  },

  methods: {
    onInput(value) {
      this.$emit('input', value)
    },
    onCancel() {
      this.$emit('input', false)
      this.$emit('cancel')
    },

    onSelect(event, item, index) {
      event.stopPropagation()
      if (!item.disabled && !item.loading) {
        item.callback && item.callback(item)
        this.$emit('select', item, index)
      }
    }
  }
}
</script>

<style lang="less">
  @import './index.less';
</style>
