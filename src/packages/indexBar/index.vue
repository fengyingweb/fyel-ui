<template>
  <div class="fy-index-bar">
    <div
      class="fy-index-bar__sidebar"
      :style="{ zIndex: zIndex }"
      @click="onClick"
      @touchstart="touchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
      @touchcancel="onTouchEnd">
      <span
        v-for="item in indexList"
        :key="item"
        class="fy-index-bar__index"
        :data-index="item"
        :style="item === activeAnchorIndex ? highlightStyle : null">
        {{item}}
      </span>
    </div>
    <slot></slot>
  </div>
</template>

<script>
import TouchMixin from '../mixins/touch'
import { GREEN } from '../utils/color'
import { on, off } from '../utils/event'
import { getScrollTop, getElementTop, getScrollEventTarget } from '../utils/scroll'
export default {
  name: 'fy-index-bar',
  mixins: [
    TouchMixin
  ],
  props: {
    sticky: {
      type: Boolean,
      default: true
    },
    zIndex: {
      type: Number,
      default: 1
    },
    highlightColor: {
      type: String,
      default: GREEN
    },
    indexList: {
      type: Array,
      default() {
        const indexList = [];
        const charCodeOfA = 'A'.charCodeAt(0);

        for (let i = 0; i < 26; i++) {
          indexList.push(String.fromCharCode(charCodeOfA + i));
        }

        return indexList;
      }
    }
  },
  data() {
    return {
      children: [],
      activeAnchorIndex: null
    }
  },
  computed: {
    highlightStyle() {
      const { highlightColor } = this;
      if (highlightColor) {
        /* istanbul ignore else */
        return {
          color: highlightColor
        };
      }
      return null;
    }
  },
  methods: {
    onScroll() {
      if (!this.sticky) {
        return;
      }

      const scrollTop = getScrollTop(this.scroller);
      const rects = this.children.map(item => ({
        height: item.height,
        top: getElementTop(item.$el)
      }));

      const active = this.getActiveAnchorIndex(scrollTop, rects);

      this.activeAnchorIndex = this.indexList[active];
      this.children.forEach((item, index) => {
        if (index === active) {
          item.active = true;
          item.top = Math.max(0, rects[index].top - scrollTop);
        } else if (index === active - 1) {
          const activeItemTop = rects[active].top - scrollTop;
          item.active = activeItemTop > 0;
          item.top = activeItemTop - item.height;
        } else {
          item.active = false;
        }
      });
    },

    getActiveAnchorIndex(scrollTop, rects) {
      for (let i = this.children.length - 1; i >= 0; i--) {
        const prevHeight = i > 0 ? rects[i - 1].height : 0;

        if (scrollTop + prevHeight >= rects[i].top) {
          return i;
        }
      }
      return -1;
    },

    onClick(event) {
      this.scrollToElement(event.target);
    },

    onTouchMove(event) {
      this.touchMove(event);

      if (this.direction === 'vertical') {
        /* istanbul ignore else */
        if (event.cancelable) {
          event.preventDefault();
        }

        const { clientX, clientY } = event.touches[0];
        const target = document.elementFromPoint(clientX, clientY);
        if (target) {
          const { index } = target.dataset;

          /* istanbul ignore else */
          if (this.touchActiveIndex !== index) {
            this.touchActiveIndex = index;
            this.scrollToElement(target);
          }
        }
      }
    },

    scrollToElement(element, setActive) {
      const { index } = element.dataset;
      if (!index) {
        return;
      }

      const match = this.children.filter(item => String(item.index) === index);
      if (match[0]) {
        match[0].scrollIntoView();
        this.$emit('select', match[0].index);
      }
    },

    onTouchEnd() {
      this.active = null;
    },

    bindEvent(bind) {
      if (!this.scroller) {
        this.scroller = getScrollEventTarget(this.$el);
      }

      (bind ? on : off)(this.scroller, 'scroll', this.onScroll)
    }
  },

  mounted() {
    this.bindEvent(true)
  },

  activated() {
    this.bindEvent(true)
  },

  destroyed() {
    this.bindEvent(false)
  },

  deactivated() {
    this.bindEvent(false)
  }
}
</script>

<style lang="less">
  @import './index.less';
</style>
