<template>
  <div class="fy-swipe">
    <div
      ref="track"
      class="fy-swipe__track"
      :style="trackStyle"
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
      @touchcancel="onTouchEnd">
      <slot></slot>
    </div>
    <slot name="indicator">
      <div
        :class="['fy-swipe__indicators', vertical && 'fy-swipe__indicators--vertical']"
        v-if="showIndicators && count > 1">
        <i
          v-for="(num, index) in count"
          :key="num"
          :class="['fy-swipe__indicator', (index === activeIndicator) && 'fy-swipe__indicator--active']"
          :style="index === activeIndicator ? indicatorStyle : null">
        </i>
      </div>
    </slot>
  </div>
</template>

<script>
import TouchMixin from '../mixins/touch'
import {on, off} from '../utils/event'
export default {
  name: 'fy-swipe',
  mixins: [TouchMixin],
  props: {
    width: Number,
    height: Number,
    autoplay: Number,
    vertical: Boolean,
    initialSwipe: Number,
    indicatorColor: String,
    loop: {
      type: Boolean,
      default: true
    },
    touchable: {
      type: Boolean,
      default: true
    },
    showIndicators: {
      type: Boolean,
      default: true
    },
    duration: {
      type: Number,
      default: 500
    }
  },

  data() {
    return {
      computedWidth: 0,
      computedHeight: 0,
      offset: 0,
      active: 0,
      deltaX: 0,
      deltaY: 0,
      swipes: [],
      swiping: false
    }
  },

  computed: {
    count() {
      return this.swipes.length
    },

    delta() {
      return this.vertical ? this.deltaY : this.deltaX
    },

    size() {
      return this[this.vertical ? 'computedHeight' : 'computedWidth']
    },

    trackSize() {
      return this.count * this.size
    },

    trackStyle() {
      const mainAxis = this.vertical ? 'height' : 'width'
      const crossAxis = this.vertical ? 'width' : 'height'

      return {
        [mainAxis]: `${this.trackSize}px`,
        [crossAxis]: this[crossAxis] ? `${this[crossAxis]}px` : '',
        transitionDuration: `${this.swiping ? 0 : this.duration}ms`,
        transform: `translate${this.vertical ? 'Y' : 'X'}(${this.offset}px)`
      }
    },

    activeIndicator() {
      return (this.active + this.count) % this.count
    },

    indicatorStyle() {
      return {
        backgroundColor: this.indicatorColor
      }
    },

    isCorrectDirection() {
      const expect = this.vertical ? 'vertical' : 'horizontal'
      return this.direction === expect
    }
  },

  watch: {
    swipes() {
      this.initialize();
    },

    initialSwipe() {
      this.initialize();
    },

    autoplay(autoplay) {
      if (!autoplay) {
        this.clear();
      } else {
        this.autoPlay();
      }
    }
  },

  methods: {
    initialize(active = this.initialSwipe) {
      clearTimeout(this.timer)
      if (this.$el) {
        const rect = this.$el.getBoundingClientRect()
        this.computedWidth = this.width || rect.width
        this.computedHeight = this.height || rect.height
      }

      this.swiping = true
      this.active = active
      this.offset = this.count > 1 ? -this.size * this.active : 0
      this.swipes.forEach(swipe=> {
        swipe.offset = 0
      })
      this.autoPlay()
    },

    autoPlay() {
      const { autoplay } = this;

      if (autoplay && this.count > 1) {
        this.clear();
        this.timer = setTimeout(() => {
          this.swiping = true;
          this.resetTouchStatus();
          this.correctPosition();

          setTimeout(() => {
            this.swiping = false;
            this.move({
              pace: 1,
              emitChange: true
            });
            this.autoPlay();
          }, 30);
        }, autoplay);
      }
    },

    clear() {
      clearTimeout(this.timer)
    },

    onResize() {
      this.initialize(this.activeIndicator)
    },
    
    correctPosition() {
      if (this.active <= -1) {
        this.move({pace: this.count})
      }

      if (this.active >= this.count) {
        this.move({pace: -this.count})
      }
    },

    move({ pace = 0, offset = 0, emitChange }) {
      const { delta, active, count, swipes, trackSize } = this;
      const atFirst = active === 0;
      const atLast = active === count - 1;
      const outOfBounds =
        !this.loop &&
        ((atFirst && (offset > 0 || pace < 0)) || (atLast && (offset < 0 || pace > 0)));

      if (outOfBounds || count <= 1) {
        return;
      }

      if (swipes[0]) {
        swipes[0].offset = atLast && (delta < 0 || pace > 0) ? trackSize : 0;
      }

      if (swipes[count - 1]) {
        swipes[count - 1].offset = atFirst && (delta > 0 || pace < 0) ? -trackSize : 0;
      }

      if (pace && active + pace >= -1 && active + pace <= count) {
        this.active += pace;

        if (emitChange) {
          this.$emit('change', this.activeIndicator);
        }
      }

      this.offset = Math.round(offset - this.active * this.size);
    },

    swipeTo(index) {
      this.swiping = true;
      this.resetTouchStatus();
      this.correctPosition();
      setTimeout(() => {
        this.swiping = false;
        this.move({
          pace: (index % this.count) - this.active,
          emitChange: true
        });
      }, 30);
    },

    onTouchStart(event) {
      if (!this.touchable) return;

      this.clear()
      this.swiping = true
      this.touchStart(event)
      this.correctPosition()
    },

    onTouchMove(event) {
      if (!this.touchable || !this.swiping) return;

      this.touchMove(event);

      if (this.isCorrectDirection) {
        event.preventDefault();
        event.stopPropagation();
        this.move({ offset: Math.min(Math.max(this.delta, -this.size), this.size) });
      }
    },

    onTouchEnd() {
      if (!this.touchable || !this.swiping) return;

      if (this.delta && this.isCorrectDirection) {
        const offset = this.vertical ? this.offsetY : this.offsetX;
        this.move({
          pace: offset > 0 ? (this.delta > 0 ? -1 : 1) : 0,
          emitChange: true
        });
      }

      this.swiping = false;
      this.autoPlay();
    }
  },

  mounted() {
    this.initialize();

    if (!this.$isServer) {
      on(window, 'resize', this.onResize, true);
    }
  },

  activated() {
    if (this.rendered) {
      this.initialize();
    }

    this.rendered = true;
  },

  destroyed() {
    this.clear();

    if (!this.$isServer) {
      off(window, 'resize', this.onResize, true);
    }
  }
}
</script>

<style lang="less">
  @import './index.less';
</style>
