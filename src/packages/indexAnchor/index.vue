<template>
  <div :style="{height: sticky ? `${height}px` : null }">
        <div
          :style="anchorStyle"
          :class="[
            'fy-index-anchor',
            sticky && 'fy-index-anchor--sticky',
            sticky && 'fy-hairline--bottom']">
          <slot>{{index}}</slot>
        </div>
  </div>
</template>

<script>
import FindParentMixin from '../mixins/find-parent'
export default {
  name: 'fy-index-anchor',
  mixins: [FindParentMixin],
  props: {
    index: [String, Number]
  },
  data() {
    return {
      top: 0,
      active: false,
      height: 0
    }
  },
  computed: {
    childrenIndex() {
      return this.parent.children.indexOf(this);
    },
    
    sticky() {
      return this.active && this.parent.sticky;
    },

    anchorStyle() {
      if (this.sticky) {
        return {
          transform: `translate3d(0, ${this.top}px, 0)`,
          color: this.parent.highlightColor,
          zIndex: `${this.parent.zIndex}`
        };
      }
      return null;
    }
  },
  methods: {
    scrollIntoView() {
      this.$el.scrollIntoView();
    }
  },
  created() {
    this.findParent('fy-index-bar')
  },
  mounted() {
    this.parent.children.push(this)
    this.height = this.$el.offsetHeight
  },
  beforeDestory() {
    this.parent.children = this.parent.children.filter(item => item !== this)
  }
}
</script>

<style lang="less">
  @import './index.less';
</style>
