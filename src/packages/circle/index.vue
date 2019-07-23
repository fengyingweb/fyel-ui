<template>
  <div class="fy-circle" :style="circleStyle">
    <svg viewBox="0 0 1060 1060">
      <path class="fy-circle__hover" :style="hoverStyle" :d="path" />
      <path class="fy-circle__layer" :style="layerStyle" :d="path"/>
    </svg>
    <slot>
      <div class="fy-circle__text" v-if="text">{{text}}</div>
    </slot>
  </div>
</template>

<script>
import { raf, cancel } from '../utils/raf'
import { BLUE, WHITE } from '../utils/color'
const PERIMETER = 3140
const PATH = 'M 530 530 m -500, 0 a 500, 500 0 1, 1 1000, 0 a 500, 500 0 1, 1 -1000, 0'
const format = (rate)=> {
  return Math.min(Math.max(rate, 0), 100)
}
export default {
  name: 'fy-circle',
  props: {
    text: String,
    value: Number,
    speed: Number,
    size: {
      type: String,
      default: '100px'
    },
    fill: {
      type: String,
      default: 'none'
    },
    rate: {
      type: Number,
      default: 100
    },
    layerColor: {
      type: String,
      default: WHITE
    },
    color: {
      type: String,
      default: BLUE
    },
    strokeWidth: {
      type: Number,
      default: 40
    },
    clockwise: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      path: PATH
    }
  },

  computed: {
    circleStyle() {
      return {
        width: this.size,
        height: this.size
      }
    },

    layerStyle() {
      let offset = (PERIMETER * (100 - this.value)) / 100;
      offset = this.clockwise ? offset : PERIMETER * 2 - offset;
      return {
        stroke: `${this.color}`,
        strokeDashoffset: `${offset}px`,
        strokeWidth: `${this.strokeWidth + 1}px`
      };
    },

    hoverStyle() {
      return {
        fill: `${this.fill}`,
        stroke: `${this.layerColor}`,
        strokeWidth: `${this.strokeWidth}px`
      };
    }
  },

  watch: {
    rate: {
      handler() {
        this.startTime = Date.now();
        this.startRate = this.value;
        this.endRate = format(this.rate);
        this.increase = this.endRate > this.startRate;
        this.duration = Math.abs(((this.startRate - this.endRate) * 1000) / this.speed);
        if (this.speed) {
          cancel(this.rafId);
          this.rafId = raf(this.animate);
        } else {
          this.$emit('input', this.endRate);
        }
      },
      immediate: true
    }
  },

  methods: {
    animate() {
      const now = Date.now();
      const progress = Math.min((now - this.startTime) / this.duration, 1);
      const rate = progress * (this.endRate - this.startRate) + this.startRate;
      this.$emit('input', format(parseFloat(rate.toFixed(1))));
      if (this.increase ? rate < this.endRate : rate > this.endRate) {
        this.rafId = raf(this.animate);
      }
    }
  }
}
</script>

<style lang="less">
  @import './index.less';
</style>
