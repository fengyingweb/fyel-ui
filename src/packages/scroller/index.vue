<template>
  <div class="fy-scroller">
    <template v-if="type === 'vertical'">
      <fy-vert-scroll 
        :stretch="stretch"
        :is-un-more="isUnMore"
        :is-loading="isLoading"
        :threshold="threshold"
        :pulldown-txt="pulldownTxt"
        :load-more-txt="loadMoreTxt"
        :unload-more-txt="unloadMoreTxt"
        @loadMore="loadMore"
        @pulldown="pulldown">

        <slot name="list"  slot="list"></slot>

      </fy-vert-scroll>
    </template>

    <template v-else-if="type === 'horizontal'">
        <fy-hor-scroll :stretch="stretch" @jump="jump">
          <slot name="list"  slot="list"></slot>
          <slot name="more"  slot="more"></slot>
          <slot name="arrow" slot="arrow"></slot>
        </fy-hor-scroll>
    </template>
  </div>
</template>

<script>
import FyVertScroll from "./vertical-scroll.vue";
import FyHorScroll from "./horizontal-scroll.vue";
export default {
  name: 'fy-scroller',
  components: {
    [FyVertScroll.name]: FyVertScroll,
    [FyHorScroll.name]: FyHorScroll
  },
  props: {
    type: {
      type: String,
      default: 'horizontal' 
    },
    stretch: {
      type: Number,
      default: 100
    },
    isUnMore: {
      type: Boolean,
      default: false
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    threshold: {
      type: Number,
      default: 100
    },
    pulldownTxt: {
      type: String,
      default: '下拉刷新'
    },
    loadMoreTxt: {
      type: String,
      default: '上拉加载'
    },
    unloadMoreTxt: {
      type: String,
      default: '没有更多了'
    }
  },
  data() {
    return {}
  },
  methods: {
    loadMore() {
      this.$emit('loadMore');
    },

    jump() {
      this.$emit('jump');
    },

    pulldown() {
      this.$emit('pulldown');
    }
  }
}
</script>

<style lang="less">
  @import './index.less';
</style>
