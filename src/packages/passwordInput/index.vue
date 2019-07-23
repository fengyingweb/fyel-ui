<template>
  <div class="fy-password-input">
    <ul class="fy-password-input__security fy-hairline--surround" @touchstart="onTouchstart">
      <li
        class="fy-hairline"
        v-for="k in length"
        :key="k">
        <i v-if="mask" :style="{visibility: charts[k-1] ? 'visible' : 'hidden'}"></i>
        <span v-else>{{charts[k-1]}}</span>
      </li>
    </ul>
    <div :class="errorClass" v-if="infoMsg">{{infoMsg}}</div>
  </div>
</template>

<script>
export default {
  name: 'fy-password-input',
  props: {
    info: String,
    errorInfo: String,
    mask: {
      type: Boolean,
      default: true
    },
    value: {
      type: String,
      default: ''
    },
    length: {
      type: Number,
      default: 6
    }
  },

  computed: {
    errorClass() {
      let {errorInfo} = this
      let classes = [
        errorInfo ? 'fy-password-input__error-info' : 'fy-password-input__info'
      ]
      return classes
    },

    infoMsg() {
      return this.info || this.errorInfo
    },

    charts() {
      return this.value
    }
  },

  methods: {
    onTouchstart(event) {
      event.stopPropagation()
      this.$emit('focus', event)
    }
  }
}
</script>

<style lang="less">
  @import './index.less';
</style>
