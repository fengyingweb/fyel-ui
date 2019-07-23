<template>
  <fy-popup
    :value="value"
    :overlay="false"
    :lockScroll="false"
    position="top"
    :class="['fy-notify', className]"
    :style="notifyStyle"
    @input="onInput">
    {{message}}
  </fy-popup>
</template>

<script>
import { RED, WHITE } from '../utils/color'
import PopupMixin from '../mixins/popup/index';
import Popup from '../popup/index';
export default {
  name: 'fy-notify',
  components: {
    [Popup.name]: Popup
  },
  props: {
    ...PopupMixin.props,
    className: String,
    message: [String, Number],
    color: {
      type: String,
      default: WHITE
    },
    background: {
      type: String,
      default: RED
    },
    duration: {
      type: Number,
      default: 3000
    }
  },
  computed: {
    notifyStyle() {
      let {color, background} = this
      let style = {
        background,
        color
      }
      return style
    }
  },

  methods: {
    onInput(value) {
      this.$emit('input', value)
    }
  }
}
</script>

<style lang="less">
  @import './index.less';
</style>
