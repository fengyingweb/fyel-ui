<template>
  <div class="fy-progress">
    <span
      :class="['fy-progress__portion', isShowPivot && 'fy-progress__portion--with-pivot']"
      :style="portionStyle">
      <span ref="pivot" v-show="isShowPivot" :style="pivotStyle" class="fy-progress__pivot">
        {{text}}
      </span>
    </span>
  </div>
</template>

<script>
import {isDef} from '../utils/index'
import { BLUE, WHITE } from '../utils/color'
export default {
  name: 'fy-progress',
  props: {
    inactive: Boolean,
    pivotText: String,
    pivotColor: String,
    percentage: {
      type: Number,
      required: true,
      validator: value => value >= 0 && value <= 100
    },
    showPivot: {
      type: Boolean,
      default: true
    },
    color: {
      type: String,
      default: BLUE
    },
    textColor: {
      type: String,
      default: WHITE
    }
  },

  data() {
    return {
      pivotWidth: 0,
      progressWidth: 0
    };
  },

  computed: {
    text() {
      const { pivotText, percentage } = this
      return isDef(pivotText) ? pivotText : percentage + '%'
    },

    isShowPivot() {
      return this.showPivot && this.text
    },

    pivotStyle() {
      const background = this.inactive ? '#cacaca' : this.color
      return {
        color: this.textColor,
        background: this.pivotColor || background
      }
    },

    portionStyle() {
      const background = this.inactive ? '#cacaca' : this.color
      return {
        background,
        width: ((this.progressWidth - this.pivotWidth) * this.percentage) / 100 + 'px'
      }
    }
  },

  watch: {
    showPivot() {
      this.getWidth();
    },

    pivotText() {
      this.getWidth();
    }
  },

  methods: {
    getWidth() {
      this.progressWidth = this.$el.offsetWidth;
      this.pivotWidth = this.$refs.pivot ? this.$refs.pivot.offsetWidth : 0;
    }
  },

  mounted() {
    this.getWidth();
  }
}
</script>

<style lang="less">
  @import './index.less';
</style>
