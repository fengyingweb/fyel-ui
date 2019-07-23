<template>
  <div class="wrapper">
    <fy-nav-bar title="Notify" left-arrow @click-left="goBack"></fy-nav-bar>
    <div class="content">
      <h2 class="title">基础用法</h2>
      <div class="btn-box">
        <fy-button type="danger" plain @click="openNotify1">显示消息通知</fy-button>
      </div>

      <h2 class="title">自定义配置</h2>
      <div class="btn-box">
        <fy-button type="primary" plain @click="openNotify2">显示自定义消息通知</fy-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: '通知内容'
    }
  },

  methods: {
    goBack() {
      this.$router.go(-1)
    },

    openNotify1() {
      this.$notify({
        duration: 5000,
        message: this.message
      })
    },

    openNotify2() {
      this.$notify({
        duration: 4000,
        message: this.message,
        background: '#1989fa'
      })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
