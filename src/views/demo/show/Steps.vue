<template>
  <div class="wrapper">
    <fy-nav-bar title="Steps步骤条" left-arrow @click-left="goBack"></fy-nav-bar>
    <div class="wrapper-main">
      <h2 class="title">基础用法</h2>
      <fy-steps :active="active1">
        <fy-step>买家下单</fy-step>
        <fy-step>商家接单</fy-step>
        <fy-step>买家提货</fy-step>
        <fy-step>交易完成</fy-step>
      </fy-steps>
      <div class="btn-box">
        <fy-button plain @click="next">下一步</fy-button>
      </div>

      <h2 class="title">竖向步骤条</h2>
      <fy-steps direction="vertical" :active="0">
        <fy-step>
          <h3>【城市】物流状态1</h3>
          <p>2016-07-12 12:40</p>
        </fy-step>
        <fy-step>
          <h3>【城市】物流状态2</h3>
          <p>2016-07-11 10:00</p>
        </fy-step>
        <fy-step>
          <h3>快件已发货</h3>
          <p>2016-07-10 09:30</p>
        </fy-step>
      </fy-steps>
    </div>
  </div>
</template>

<script>
import {Steps, Step} from 'fy-elui'
export default {
  components:{
    [Steps.name]: Steps,
    [Step.name]: Step
  },

  data() {
    return {
      active1: 1
    }
  },

  methods: {
    goBack() {
      this.$router.go(-1)
    },

    next() {
      this.active1++
      if (this.active1 > 3) {
        this.active1 = 0
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>

