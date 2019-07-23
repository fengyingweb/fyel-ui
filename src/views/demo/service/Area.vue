<template>
  <div class="wrapper">
    <fy-nav-bar title="Area" left-arrow @click-left="goBack"></fy-nav-bar>
    <div class="wrapper-main">
      <h2 class="title">基础用法</h2>
      <fy-area :area-list="areaList" @confirm="onConfirm"></fy-area>

      <h2 class="title">选中省/市/区</h2>
      <fy-area :area-list="areaList" :value="value" @change="onChange"></fy-area>
    </div>
  </div>
</template>

<script>
import {Area, ChinaAddressData} from 'fy-elui'
export default {
  name: 'Area',

  components: {
    [Area.name]: Area
  },

  data() {
    return {
      areaList: ChinaAddressData,
      value: '440606'
    }
  },

  methods: {
    goBack() {
      this.$router.go(-1)
    },

    // 确认选择
    onConfirm(values, indexes) {
      console.log(values)
      console.log(indexes)
    },

    // 选择值改变时
    onChange(picker, values, index) {
      console.log(values)
      console.log(index)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
