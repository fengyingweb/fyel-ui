<template>
  <div class="wrapper">
    <fy-nav-bar title="Stepper" left-arrow @click-left="goBack"></fy-nav-bar>
    <div class="content">
      <h2 class="title">基础用法{{value1}}</h2>
      <div class="box">
        <fy-stepper v-model="value1" @change="onChange"></fy-stepper>
      </div>

      <h2 class="title">禁用</h2>
      <div class="box">
        <fy-stepper v-model="value2" disabled></fy-stepper>
      </div>

      <h2 class="title">高级用法{{value3}}</h2>
      <div class="box">
        <fy-stepper v-model="value3" :step="5" :max="100" @change="onChange"></fy-stepper>
      </div>
    </div>
  </div>
</template>

<script>
import {Stepper} from 'fy-elui'
export default {
  components: {
    [Stepper.name]: Stepper
  },
  data() {
    return {
      value1: '',
      value2: 50,
      value3: 5
    }
  },

  methods: {
    goBack() {
      this.$router.go(-1)
    },

    onChange(val) {
      console.log(val)
    }
  }
}
</script>

<style lang="less" scoped>
  .content {
    background: #fff;
  }
</style>
