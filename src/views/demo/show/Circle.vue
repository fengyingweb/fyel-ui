<template>
  <div class="wrapper">
    <fy-nav-bar title="Circle" left-arrow @click-left="goBack"></fy-nav-bar>
    <div class="content">
      <h2 class="title">基础用法</h2>
      <div class="btn-box">
        <fy-circle
          v-model="currentValue"
          :text="text"
          size="120px"
          :rate="rate"
          :speed="100">
        </fy-circle>

        <fy-circle
          v-model="currentValue"
          :text="text"
          size="120px"
          :rate="rate"
          :speed="100"
          color="#07c160"
          layer-color="#ebedf0"
          fill="#fff"
          :clockwise="false">
        </fy-circle>
      </div>
      <div class="btn-box">
        <fy-button type="primary" @click="add">增加</fy-button>
        <fy-button type="danger" @click="minus">减少</fy-button>
      </div>
    </div>
  </div>
</template>

<script>
import {Circle} from 'fy-elui'
export default {
  components: {
    [Circle.name]: Circle
  },
  data() {
    return {
      currentValue: 0,
      rate: 30
    }
  },
  computed: {
    text() {
      return this.currentValue.toFixed(0) + '%'
    }
  },

  methods: {
    goBack() {
      this.$router.go(-1)
    },

    add() {
      if (this.rate < 100) {
        this.rate += 5
      }
    },

    minus() {
      if (this.rate > 0) {
        this.rate -= 5
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .circle-wrapper {
    display: -webkit-flex;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .btn-box {
    padding-top: 20px;
  }
</style>
