<template>
  <i
    :class="iconClass"
    :style="iconStyle">
    <img v-if="urlIcon" :src="name" />
    <fy-info :info="info"></fy-info>
  </i>
</template>

<script>
import {isSrc} from '../utils/validate'
import Info from '../info/index'
export default {
  name: 'fy-icon',
  components: {
    [Info.name]: Info
  },
  props: {
    name: String,
    size: {
      type: String,
      default: ''
    },
    color: String,
    info: [String, Number],
    classPrefix: { // class前缀
      type: String,
      default: 'van-icon'
    }
  },
  data() {
    return {
      urlIcon: isSrc(this.name)
    }
  },
  computed: {
    iconStyle() {
      let {size, color} = this
      let style = {
        fontSize: size,
        color: color
      }
      return style
    },

    iconClass() {
      let {name, classPrefix, urlIcon} = this
      let classes = [
        classPrefix,
        urlIcon ? 'van-icon--image' : `${classPrefix}-${name}`
      ]
      return classes
    }
  }
}
</script>

<style lang="less">
  @import './index.less';
</style>
