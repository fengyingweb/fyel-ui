<template>
  <div
    :class="['fy-switch',
      value && 'fy-switch--on',
      disabled && 'fy-switch--disabled']"
    :style="switchStyle"
    @click="onClick">
    <div class="fy-switch__node">
      <fy-loading v-if="loading" class="fy-switch__loading"></fy-loading>
    </div>
  </div>
</template>

<script>
import {switchProps} from './share'
import Loading from '../loading/index'
export default {
  name: 'fy-switch',
  components: {
    [Loading.name]: Loading
  },
  props: {
    ...switchProps
  },
  computed: {
    switchStyle() {
      let {size, value, activeColor, inactiveColor} = this
      let style = {
        fontSize: size,
        backgroundColor: value ? activeColor : inactiveColor
      }
      return style
    }
  },
  methods: {
    onClick() {
      if (!this.disabled && !this.loading) {
        let nVal = this.value ? false : true
        this.$emit('input', nVal)
        this.$emit('change', nVal)
      }
    }
  }
}
</script>

<style lang="less">
  @import './index.less';
</style>
