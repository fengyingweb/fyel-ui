<template>
  <div class="wrapper">
    <fy-nav-bar title="NumberKeyboard" left-arrow @click-left="goBack"></fy-nav-bar>
    <div class="content">
      <h2 class="title">基础用法</h2>
      <div class="btn-box">
        <fy-button type="primary" plain @touchstart.native.stop="onTouchstart('default')">弹出默认键盘</fy-button>
      </div>

      <h2 class="title">自定义用法</h2>
      <div class="btn-box">
        <fy-button type="primary" plain @touchstart.native.stop="onTouchstart('custom')">弹出自定义键盘</fy-button>
      </div>
    </div>

    <fy-number-keyboard
      :show="show1"
      :theme="theme"
      :title="title"
      close-button-text="完成"
      extra-key="."
      @blur="onBlur"
      @input="onInput"
      @delete="onDelete">
    </fy-number-keyboard>
  </div>
</template>

<script>
import {NumberKeyboard} from 'fy-elui'
export default {
  components: {
    [NumberKeyboard.name]: NumberKeyboard
  },
  data() {
    return {
      show1: false,
      theme: 'default',
      title: '默认键盘'
    }
  },

  methods: {
    goBack() {
      this.$router.go(-1)
    },

    onTouchstart(theme) {
      this.theme = theme
      this.title = theme === 'default' ? '默认键盘' : '自定义键盘'
      this.show1 = true
    },

    onBlur() {
      this.show1 = false
    },

    onInput(text) {
      this.$toast('input: ' + text)
    },

    onDelete() {
      this.$toast('delete')
    }
  }
}
</script>

<style lang="less" scoped>

</style>
