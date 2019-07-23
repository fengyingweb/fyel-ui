<template>
  <div class="wrapper">
    <fy-nav-bar title="Icon" left-arrow @click-left="goBack"></fy-nav-bar>
    <div class="content">
      <h2 class="title">Icons</h2>
      <div class="btn-box">
        <div class="icon-box">
          <fy-icon name="success" color="#409eff"></fy-icon>
          <span>success</span>
        </div>

        <div class="icon-box">
          <fy-icon name="plus" info="9+"></fy-icon>
          <span>plus</span>
        </div>

        <div class="icon-box">
          <fy-icon name="arrow"></fy-icon>
          <span>arrow</span>
        </div>

        <div class="icon-box">
          <fy-icon name="arrow-left"></fy-icon>
          <span>arrow-left</span>
        </div>
      </div>
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
    }
  }
}
</script>

<style lang="less" scoped>
  .icon-box {
    display: -webkit-flex;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 100px;
  }
</style>

