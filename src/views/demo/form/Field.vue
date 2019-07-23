<template>
  <div class="wrapper">
    <fy-nav-bar title="Field" left-arrow @click-left="goBack"></fy-nav-bar>
    <div class="wrapper-main">
      <fy-cell-group :title="`基础用法${value1}`">
        <fy-field v-model="value1" placeholder="请输入用户名"></fy-field>
      </fy-cell-group>

      <fy-cell-group title="自定义类型">
        <fy-field
          v-model="userName1"
          label="用户名"
          right-icon="question-o"
          required
          clearable
          placeholder="请输入用户名..."
          @click-right-icon="$toast('question')">
        </fy-field>

        <fy-field
          v-model="password1"
          type="password"
          label="密码"
          required
          placeholder="请输入密码...">
        </fy-field>
      </fy-cell-group>
    </div>
  </div>
</template>

<script>
import {Field} from 'fy-elui'
export default {
  components: {
    [Field.name]: Field
  },
  data() {
    return {
      value1: '',
      userName1: '',
      password1: ''
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
