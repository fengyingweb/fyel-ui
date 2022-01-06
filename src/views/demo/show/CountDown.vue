<template>
  <div class="wrapper">
    <fy-nav-bar title="CountDown" left-arrow @click-left="goBack"></fy-nav-bar>
    <div class="content scroller-content">
      <h2 class="title">基础用法</h2>
      <fy-count-down :time="time"></fy-count-down>

      <h2 class="title">自定义格式</h2>
      <fy-count-down :time="time" format="DD 天 HH 时 mm 分 ss 秒" />

      <h2 class="title">自定义样式</h2>
      <fy-count-down :time="time" @change="changeTime" @finish="finished">
        <template #default="timeData">
          <span class="block">{{ timeData.days }}</span>
          <span class="colon">天</span>
          <span class="block">{{ timeData.hours }}</span>
          <span class="colon">:</span>
          <span class="block">{{ timeData.minutes }}</span>
          <span class="colon">:</span>
          <span class="block">{{ timeData.seconds }}</span>
        </template>
      </fy-count-down>
    </div>
  </div>
</template>

<script>
import {CountDown} from 'fy-elui'
export default {
  components: {
    [CountDown.name]: CountDown
  },
  data() {
    return {
      time: 36 * 60 * 60 * 1000
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    changeTime(value) {
      console.log(value);
    },
    finished() {
      console.log('倒计时已结束')
    }
  }
}
</script>

<style lang="less" scoped>
  .colon {
    display: inline-block;
    margin: 0 4px;
    color: #ee0a24;
  }
  .block {
    display: inline-block;
    width: 22px;
    color: #fff;
    font-size: 12px;
    text-align: center;
    background-color: #ee0a24;
  }
</style>
