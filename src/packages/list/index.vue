<template>
  <div class="fy-list">
    <slot></slot>
    <div v-if="loading" class="fy-list__loading" key="loading">
      <slot name="loading">
        <fy-loading class="fy-list__loading-icon"/>
        <span class="fy-list__loading-text">{{loadingText}}</span>
      </slot>
    </div>

    <div v-if="finished && finishedText" class="fy-list__finished-text">{{finishedText}}</div>

    <div v-if="error && errorText" class="fy-list__error-text" @click="clickErrorText">
      {{errorText}}
    </div>
  </div>
</template>

<script>
import Loading from '../loading/index'
import { on, off } from '../utils/event'
import {
  getScrollTop,
  getElementTop,
  getVisibleHeight,
  getScrollEventTarget
} from '../utils/scroll'
export default {
  name: 'fy-list',
  components: {
    [Loading.name]: Loading
  },
  model: {
    prop: 'loading'
  },
  props: {
    error: Boolean,
    loading: Boolean,
    finished: Boolean,
    errorText: String,
    loadingText: {
      type: String,
      default: '加载中...'
    },
    finishedText: String,
    immediateCheck: {
      type: Boolean,
      default: true
    },
    offset: {
      type: Number,
      default: 300
    }
  },
  
  watch: {
    loading() {
      this.$nextTick(this.check)
    },

    finished() {
      this.$nextTick(this.check)
    }
  },

  methods: {
    clickErrorText() {
      this.$emit('update:error', false);
      this.$nextTick(this.check);
    },

    check() {
      if (this.loading || this.finished || this.error) {
        return;
      }

      const el = this.$el;
      const { scroller } = this;
      const scrollerHeight = getVisibleHeight(scroller);

      /* istanbul ignore next */
      if (!scrollerHeight || window.getComputedStyle(el).display === 'none' || el.offsetParent === null) {
        return;
      }

      const scrollTop = getScrollTop(scroller);
      const targetBottom = scrollTop + scrollerHeight;

      let reachBottom = false;

      /* istanbul ignore next */
      if (el === scroller) {
        reachBottom = scroller.scrollHeight - targetBottom < this.offset;
      } else {
        const elBottom = getElementTop(el) - getElementTop(scroller) + getVisibleHeight(el);
        reachBottom = elBottom - scrollerHeight < this.offset;
      }

      /* istanbul ignore else */
      if (reachBottom) {
        this.$emit('input', true);
        this.$emit('load');
      }
    },

    handler(bind) {
      /* istanbul ignore else */
      if (this.binded !== bind) {
        this.binded = bind;
        (bind ? on : off)(this.scroller, 'scroll', this.check);
      }
    }
  },

  mounted() {
    this.scroller = getScrollEventTarget(this.$el);
    this.handler(true);

    if (this.immediateCheck) {
      this.$nextTick(this.check);
    }
  },

  destroyed() {
    this.handler(false)
  },

  activated() {
    this.handler(true)
  },

  deactivated() {
    this.handler(false)
  }
}
</script>

<style lang="less">
  @import './index.less';
</style>
