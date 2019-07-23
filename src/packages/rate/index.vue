<template>
  <div class="fy-rate" @touchmove="onTouchmove">
    <div
      class="fy-rate__item"
      v-for="(status, index) in rateList"
      :key="index">
      <fy-icon
        :name="status === 'full' ? icon : voidIcon"
        :size="`${size}px`"
        class="fy-rate__icon"
        :data-score="index + 1"
        :color="disabled ? disabledColor : (status === 'full') ? color : voidColor"
        @click.native="onSelect(index + 1)"/>
      
      <fy-icon
        v-if="allowHalf"
        :name="status === 'void' ? voidIcon : icon"
        :size="`${size}px`"
        class="fy-rate__icon fy-rate__icon--half"
        :data-score="index + 0.5"
        :color="disabled ? disabledColor : (status === 'void') ? voidColor : color"
        @click.native="onSelect(index + 0.5)"/>
    </div>
  </div>
</template>

<script>
import Icon from '../icon/index'
const getRateStatus = (value, index, allowHalf)=> {
  if (value >= index) {
    return 'full'
  }

  if (value + 0.5 >= index && allowHalf) {
    return 'half'
  }

  return 'void'
}
export default {
  name: 'fy-rate',
  components: {
    [Icon.name]: Icon
  },
  props: {
    value: Number,
    readonly: Boolean,
    disabled: Boolean,
    size: {
      type: Number,
      default: 20
    },
    icon: {
      type: String,
      default: 'star'
    },
    voidIcon: {
      type: String,
      default: 'star-o'
    },
    color: {
      type: String,
      default: '#ffd21e'
    },
    voidColor: {
      type: String,
      default: '#c7c7c7'
    },
    disabledColor: {
      type: String,
      default: '#bdbdbd'
    },
    count: {
      type: Number,
      default: 5
    },
    allowHalf: Boolean
  },

  computed: {
    rateList() {
      let {value, count, allowHalf} = this
      let list = []
      for(let i = 1; i <= count; i++) {
        list.push(getRateStatus(value, i, allowHalf))
      }
      return list
    }
  },

  methods: {
    onSelect(score) {
      if (!this.disabled && !this.readonly) {
        this.$emit('input', score)
        this.$emit('change', score)
      }
    },

    onTouchmove(event) {
      if (this.disabled || this.readonly || !document.elementFromPoint) {
        return;
      }
      event.preventDefault()
      const {clientX, clientY} = event.touches[0]
      const target = document.elementFromPoint(clientX, clientY)

      if (target && target.dataset) {
        let {score} = target.dataset
        
        if (score) {
          this.onSelect(+score)
        }
      }
    }
  }
}
</script>

<style lang="less">
  @import './index.less';
</style>
