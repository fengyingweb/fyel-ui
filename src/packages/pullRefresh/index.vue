<script>
import Loading from '../loading/index'
import TouchMixin from '../mixins/touch'
import SlotsMixin from '../mixins/slots'
import {getScrollEventTarget, getScrollTop} from '../utils/scroll'
const TEXT_STATUS = ['pulling', 'loosing', 'success']
export default {
  name: 'fy-pull-refresh',
  components: {
    [Loading.name]: Loading
  },
  mixins: [TouchMixin, SlotsMixin],
  props: {
    value: {
      type: Boolean,
      required: true
    },
    pullingText: {
      type: String,
      default: '下拉即可刷新...'
    },
    loosingText: {
      type: String,
      default: '释放即可刷新...'
    },
    loadingText: {
      type: String,
      default: '加载中...'
    },
    successText: {
      type: String,
      default: '刷新成功'
    },
    loadingType: {
      type: String,
      default: 'circular' // circular, spinner
    },
    successDuration: {
      type: Number,
      default: 500
    },
    animationDuration: {
      type: Number,
      default: 300
    },
    headHeight: {
      type: Number,
      default: 50
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      status: 'normal',
      height: 0,
      duration: 0
    }
  },

  computed: {
    untouchable() {
      let {status, disabled} = this
      return status === 'loading' || status === 'success' || disabled
    }
  },

  watch: {
    value(nVal) {
      this.duration = this.animationDuration
      if (!nVal && this.successText) {
        this.status = 'success'
        setTimeout(()=> {
          this.setStatus(0)
        }, this.successDuration)
      } else {
        this.setStatus(nVal ? this.headHeight : 0, nVal)
      }
    }
  },

  methods: {
    getCeiling() {
      this.ceiling = getScrollTop(this.scrollEl) === 0
      return this.ceiling
    },

    ease(height) {
      let {headHeight} = this
      return height < headHeight
        ? height
        : height < headHeight * 2
          ? Math.round(headHeight + (height - headHeight) / 2)
          : Math.round(headHeight * 1.5 + (height - headHeight * 2) / 4)
    },

    setStatus(height, isLoading) {
      this.height = height
      const status = isLoading
        ? 'loading'
        : height === 0
          ? 'normal'
          : height < this.headHeight
            ? 'pulling'
            : 'loosing'
      if (status !== this.status) {
        this.status = status
      }
    },

    onTouchStart(event) {
      if (!this.untouchable && this.getCeiling()) {
        this.duration = 0
        this.touchStart(event)
      }
    },

    onTouchMove(event) {
      if (this.untouchable) {
        return;
      }

      this.touchMove(event)

      if (!this.ceiling && this.getCeiling()) {
        this.duration = 0
        this.startY = event.touches[0].clientY
        this.deltaY = 0
      }

      if (this.ceiling && this.deltaY >= 0) {
        if (this.direction === 'vertical') {
          this.setStatus(this.ease(this.deltaY))
          event.cancelable && event.preventDefault()
        }
      }
    },

    onTouchEnd() {
      if (!this.untouchable && this.ceiling && this.deltaY) {
        this.duration = this.animationDuration
        if (this.status === 'loosing') {
          this.setStatus(this.headHeight, true)
          this.$emit('input', true)
          this.$emit('refresh')
        } else {
          this.setStatus(0)
        }
      }
    }
  },

  mounted() {
    this.scrollEl = getScrollEventTarget(this.$el)
  },

  render(h) {
    const {status, duration, height, loadingType} = this
    const text = this[`${status}Text`]
    const style = {
      transition: `${duration}ms`,
      transform: `translate3d(0, ${height}px, 0)`
    }

    const Status = this.slots(status) || [
      TEXT_STATUS.indexOf(status) !== -1 && <div class="fy-pull-refresh__text">{text}</div>,
      status === 'loading' && (
        <div class="fy-pull-refresh__loading">
          <fy-loading type={loadingType} />
          <span>{text}</span>
        </div>
      )
    ]

    return (
      <div class="fy-pull-refresh">
        <div
          class="fy-pull-refresh__track"
          style={style}
          onTouchstart={this.onTouchStart}
          onTouchmove={this.onTouchMove}
          onTouchend={this.onTouchEnd}
          onTouchcancel={this.onTouchEnd}>
          <div class="fy-pull-refresh__head">{Status}</div>
          {this.slots()}
        </div>
      </div>
    )
  }
}
</script>

<style lang="less">
  @import './index.less';
</style>
