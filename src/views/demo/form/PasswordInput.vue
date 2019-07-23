<template>
  <div class="wrapper">
    <fy-nav-bar title="PasswordInput" left-arrow @click-left="goBack"></fy-nav-bar>
    <div class="content">
      <h2 class="title">基础用法</h2>
      <fy-password-input 
        :value="value"
        info="密码为6位数字"
        @focus="show = true">
      </fy-password-input>

      <h2 class="title">明文显示</h2>
      <fy-password-input 
        :value="value"
        :mask="false"
        info="密码为6位数字"
        @focus="show = true">
      </fy-password-input>
    </div>

    <fy-number-keyboard
      :show="show"
      theme="custom"
      close-button-text="完成"
      extra-key="."
      @blur="show = false"
      @input="onInput"
      @delete="onDelete">
    </fy-number-keyboard>
  </div>
</template>

<script>
import {PasswordInput, NumberKeyboard} from 'fy-elui'
export default {
  components: {
    [PasswordInput.name]: PasswordInput,
    [NumberKeyboard.name]: NumberKeyboard
  },
  data() {
    return {
      show: false,
      value: ''
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },

    onInput(key) {
      this.value = (this.value + key).substr(0, 6)
      console.log(this.value)
    },

    onDelete() {
      this.value = this.value.slice(0, this.value.length - 1)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
