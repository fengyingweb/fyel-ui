<template>
  <div
    class="fy-tree-select"
    :style="{height: `${height}px`}">
    <div class="fy-tree-select__nav">
      <div
        v-for="(nItem, index) in items"
        :key="index"
        :class="[
          'fy-ellipsis',
          'fy-tree-select__nitem',
          mainActiveIndex === index && 'fy-tree-select__nitem--active',
          nItem.disabled && 'fy-tree-select__nitem--disabled']"
          @click="onClickNav(nItem, index)">
        {{nItem.text}}
      </div>
    </div>

    <div class="fy-tree-select__content">
      <div
        v-for="sItem in subItems"
        :key="sItem.id"
        :class="[
          'fy-ellipsis',
          'fy-tree-select__item',
          activeId === sItem.id && 'fy-tree-select__item--active',
          sItem.disabled && 'fy-tree-select__item--disabled']"
          @click="onClickSubItem(sItem)">
        {{sItem.text}}
        <fy-icon v-if="activeId === sItem.id" class="fy-tree-select__selected" name="checked" size="16px"/>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '../icon/index'
export default {
  name: 'fy-tree-select',
  components: {
    [Icon.name]: Icon
  },
  props: {
    items: Array,
    mainActiveIndex: {
      type: Number,
      default: 0
    },
    activeId: {
      type: [Number, String],
      default: 0
    },
    height: {
      type: Number,
      default: 300
    }
  },

  computed: {
    subItems() {
      let selectedItem = this.items[this.mainActiveIndex] || {}
      return selectedItem.children || []
    }
  },

  methods: {
    onClickNav(item, index) {
      if (!item.disabled) {
        this.$emit('nav-click', index)
      }
    },

    onClickSubItem(item) {
      if (!item.disabled) {
        this.$emit('item-click', item)
      }
    }
  }
}
</script>

<style lang="less">
  @import './index.less';
</style>
