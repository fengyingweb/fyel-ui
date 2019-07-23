<template>
  <div class="wrapper">
    <fy-nav-bar title="Loading" left-arrow @click-left="goBack"></fy-nav-bar>
    <div class="content">
      <h2 class="title">Circular</h2>
      <div class="btn-box">
        <fy-loading></fy-loading>
        <fy-loading color="white"></fy-loading>
      </div>

      <h2 class="title">Spinner</h2>
      <div class="btn-box">
        <fy-loading type="spinner"></fy-loading>
        <fy-loading type="spinner" color="white"></fy-loading>
      </div>
    </div>
  </div>
</template>

<script>
import {Loading} from 'fy-elui'
export default {
  components: {
    [Loading.name]: Loading
  },
  data() {
    return {}
  },

  methods: {
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>
  .btn-box .fy-loading--white {
    padding: 10px;
    border-radius: 3px;
    background-color: rgba(0, 0, 0, 0.5);
  }
</style>

