<template>
  <div class="wrapper">
    <fy-nav-bar title="Swipe轮播" left-arrow @click-left="goBack"></fy-nav-bar>
    <div class="wrapper-main">
      <h2 class="title">基础用法</h2>
      <div class="swipe-wrapper">
        <fy-swipe :autoplay="3000" :initial-swipe="initialSwipe" :height="height" indicator-color="#fff">
          <fy-swipe-item v-for="(val, i) in 4" :key="i">
            <div class="swipe-item-inner">
              <span>{{val}}</span>
            </div>
          </fy-swipe-item>
        </fy-swipe>
      </div>
    </div>
  </div>
</template>

<script>
import {Swipe, SwipeItem} from 'fy-elui'
export default {
  components: {
    [Swipe.name]:Swipe,
    [SwipeItem.name]: SwipeItem
  },
  data() {
    return {
      initialSwipe: 0,
      height: 200
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },

    onChange(index) {
      console.log(index)
    }
  }
}
</script>

<style lang="less" scoped>
  .swipe-item-inner {
    display: -webkit-flex;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: #66c6f2;
    font-size: 24px;
    color: #fff;
  }
</style>
