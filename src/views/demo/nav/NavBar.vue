<template>
  <div class="wrapper">
    <fy-nav-bar
      title="NavBar"
      left-arrow
      @click-left="goBack">
    </fy-nav-bar>

    <div class="container">
      <fy-nav-bar 
        title="标题"
        left-arrow
        left-text="返回"
        right-text="按钮"
        @click-left="handleClickLeft"
        @click-right="handleClickRight">
      </fy-nav-bar>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },

  methods: {
    goBack() {
      this.$router.go(-1)
    },

    handleClickLeft(ev) {
      console.log(ev)
    },

    handleClickRight(ev) {
      console.log(ev)
    }
  }
}
</script>

<style lang="less" scoped>
  .container {
    padding: 16px 0;
    width: 100%;
  }
</style>

