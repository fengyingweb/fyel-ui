<template>
  <div
    v-if="showNoticeBar"
    :class="['fy-notice-bar',
      mode && 'fy-notice-bar--withicon',
      !scrollable && wrapable && 'fy-notice-bar--wrapable']"
    :style="barStyle"
    @click="onClick">
    <slot name="left-icon">
      <fy-icon v-if="leftIcon" :name="leftIcon" class="fy-notice-bar__left-icon"/>
    </slot>
    <div class="fy-notice-bar__wrap" ref="wrap">
      <div
        ref="content"
        :class="['fy-notice-bar__content',
           animationClass,
          !scrollable && !wrapable && 'fy-ellipsis']"
        :style="contentStyle"
        @animationend="onAnimationEnd"
        @webkitanimationend="onAnimationEnd">
        <slot>{{text}}</slot>
      </div>
    </div>
    <slot name="right-icon">
      <fy-icon
        v-if="iconName"
        :name="iconName"
        class="fy-notice-bar__right-icon"
        @click.native="onClickRightIcon"/>
    </slot>
  </div>
</template>

<script>
import Icon from '../icon/index'
export default {
  name: 'fy-notice-bar',
  components: {
    [Icon.name]: Icon
  },
  props: {
    text: String,
    mode: String,
    color: String,
    leftIcon: String,
    wrapable: Boolean,
    background: String,
    delay: {
      type: [String, Number],
      default: 1
    },
    scrollable: {
      type: Boolean,
      default: true
    },
    speed: {
      type: Number,
      default: 50
    }
  },

  data() {
    return {
      wrapWidth: 0,
      firstRound: true,
      duration: 0,
      offsetWidth: 0,
      showNoticeBar: true,
      animationClass: ''
    };
  },

  computed: {
    iconName() {
      const {mode} = this
      let name = ''
      if (mode === 'closeable') {
        name = 'cross'
      } else if (mode === 'link') {
        name = 'arrow'
      }
      return name
    },

    barStyle() {
      return {
        color: this.color,
        background: this.background
      }
    },

    contentStyle() {
      return {
        paddingLeft: this.firstRound ? 0 : `${this.wrapWidth}px`,
        animationDelay: `${this.firstRound ? this.delay : 0}s`,
        animationDuration: `${this.duration}s`
      }
    }
  },

  watch: {
    text: {
      handler() {
        this.$nextTick(() => {
          const { wrap, content } = this.$refs;
          if (!wrap || !content) {
            return;
          }

          const wrapWidth = wrap.getBoundingClientRect().width;
          const offsetWidth = content.getBoundingClientRect().width;
          if (this.scrollable && offsetWidth > wrapWidth) {
            this.wrapWidth = wrapWidth;
            this.offsetWidth = offsetWidth;
            this.duration = offsetWidth / this.speed;
            this.animationClass = 'fy-notice-bar__play';
          }
        });
      },
      immediate: true
    }
  },

  methods: {
    onClick(event) {
      this.$emit('click', event)
    },

    onAnimationEnd() {
      this.firstRound = false;
      this.$nextTick(() => {
        this.duration = (this.offsetWidth + this.wrapWidth) / this.speed;
        this.animationClass = 'fy-notice-bar__play--infinite';
      });
    },

    onClickRightIcon() {
      if (this.mode === 'closeable') {
        this.showNoticeBar = false;
        this.$emit('close');
      }
    }
  }
}
</script>

<style lang="less">
  @import './index.less';
</style>
