<template>
  <transition name="fy-fade">
    <div v-if="value" :class="toastClass">
      <div v-if="toastType === 'text'">{{message}}</div>
      <div v-else-if="toastType === 'html'" v-html="message"></div>
      <div v-else>
        <fy-loading v-if="type === 'loading'" color="white" :type="loadingType"></fy-loading>
        <fy-icon v-else class="fy-toast__icon" :name="type" />
        <div v-if="isDef(message)" class="fy-toast__text">{{message}}</div>
      </div>
    </div>
  </transition>
</template>

<script>
import { isDef } from '../utils';
import PopupMixin from '../mixins/popup';
import Icon from '../icon';
import Loading from '../loading';
const STYLE = ['success', 'fail', 'loading']
export default {
  name: 'fy-toast',
  components: {
    [Icon.name]: Icon,
    [Loading.name]: Loading
  },
  mixins: [PopupMixin],
  props: {
    className: String,
    forbidClick: Boolean,
    message: [String, Number],
    type: {
      type: String,
      default: 'text'
    },
    loadingType: {
      type: String,
      default: 'circular'
    },
    position: {
      type: String,
      default: 'middle'
    },
    lockScroll: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      clickable: false,
      isDef,
    }
  },
  computed: {
    toastType() {
      let {type} = this
      const style = STYLE.indexOf(type) !== -1 ? 'default' : type
      return style
    },
    toastClass() {
      let {position, className} = this
      let classes = [
        'fy-toast',
        `fy-toast--${this.toastType}`,
        `fy-toast--${position}`,
        className
      ]
      return classes
    }
  },
  watch: {
    value() {
      this.toggleClickable()
    },
    forbidClick() {
      this.toggleClickable()
    }
  },
  methods: {
    toggleClickable() {
      const clickable = this.value && this.forbidClick
      if (this.clickable !== clickable) {
        this.clickable = clickable
        const action = clickable ? 'add' : 'remove'
        document.body.classList[action]('fy-toast--unclickable')
      }
    }
  },
  mounted() {
    this.toggleClickable()
  },
  destroyed() {
    this.toggleClickable()
  }
}
</script>

<style lang="less">
  @import './index.less';
</style>
