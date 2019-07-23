<template>
  <div class="wrapper">
    <fy-nav-bar title="Switch" left-arrow @click-left="goBack"></fy-nav-bar>
    <div class="content">
      <h2 class="title">基础用法{{checked1}}</h2>
      <div class="box">
        <fy-switch v-model="checked1" @change="onChange"></fy-switch>
      </div>

      <h2 class="title">禁用</h2>
      <div class="box">
        <fy-switch v-model="checked2" disabled></fy-switch>
      </div>

      <h2 class="title">加载</h2>
      <div class="box">
        <fy-switch v-model="checked2" loading></fy-switch>
      </div>

      <h2 class="title">自定义大小</h2>
      <div class="box">
        <fy-switch v-model="checked3" @change="onChange" size="24px"></fy-switch>
      </div>

      <h2 class="title">自定颜色</h2>
      <div class="box">
        <fy-switch v-model="checked4" @change="onChange" active-color="#07c160" inactive-color="#f44"></fy-switch>
      </div>
    </div>
  </div>
</template>

<script>
import {Switch} from 'fy-elui'
export default {
  components: {
    [Switch.name]: Switch
  },
  data() {
    return {
      checked1: false,
      checked2: true,
      checked3: true,
      checked4: true
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

<style lang="less">

</style>
