<template>
  <div class="wrapper">
    <fy-nav-bar title="Tag" left-arrow @click-left="goBack"></fy-nav-bar>
    <div class="content">
      <h2 class="title">默认类型为img</h2>
      <div class="qrcode-wrapper">
        <fy-qrcode type="img" :value="url" :fg-color="fgColor"></fy-qrcode>
      </div>

      <h2 class="title">类型为canvas</h2>
      <div class="qrcode-wrapper">
        <fy-qrcode type="canvas" :value="url" :fg-color="fgColor"></fy-qrcode>
      </div>
    </div>
  </div>
</template>

<script>
import {QRcode} from 'fy-elui'
export default {
  components: {
    [QRcode.name]: QRcode
  },
  data() {
    return {
      url: `${location.origin}/demo.html#/home`,
      fgColor: '#000'
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
  .qrcode-wrapper {
    padding: 15px 0;
    text-align: center;
  }
</style>
