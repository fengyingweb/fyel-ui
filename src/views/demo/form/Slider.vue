<template>
  <div class="wrapper">
    <fy-nav-bar title="Slider" left-arrow @click-left="goBack"></fy-nav-bar>
    <div class="content">
      <h2 class="title">基础用法{{curVal}}</h2>
      <div class="box">
        <fy-slider v-model="curVal" @change="onChange"></fy-slider>
      </div>

      <h2 class="title">指定范围{{curVal2}}</h2>
      <div class="box">
        <fy-slider v-model="curVal2" @change="onChange" :min="10" :max="90"></fy-slider>
      </div>

      <h2 class="title">禁用{{curVal3}}</h2>
      <div class="box">
        <fy-slider v-model="curVal3" disabled></fy-slider>
      </div>

      <h2 class="title">自定义样式</h2>
      <div class="box">
        <fy-slider v-model="curVal4" @change="onChange" bar-height="4px" active-color="#f44"></fy-slider>
      </div>
    </div>
  </div>
</template>

<script>
import {Slider} from 'fy-elui'
export default {
  components: {
    [Slider.name]: Slider
  },
  data() {
    return {
      curVal: 20,
      curVal2: 10,
      curVal3: 30,
      curVal4: 50
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

</style>
