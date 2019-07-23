<template>
  <div class="wrapper">
    <fy-nav-bar title="Toast" left-arrow @click-left="goBack"></fy-nav-bar>
    <div class="content">
      <h2 class="title">文字提示</h2>
      <div class="btn-box">
        <fy-button plain @click="handleToast1">文字提示</fy-button>
        <fy-button type="danger" @click="handleClick">danger</fy-button>
      </div>

      <h2 class="title">加载提示</h2>
      <div class="btn-box">
        <fy-button plain @click="handleToast2">加载提示</fy-button>
      </div>

      <h2 class="title">成功/失败提示</h2>
      <div class="btn-box">
        <fy-button plain @click="handleToast3('success')">成功提示</fy-button>
        <fy-button plain @click="handleToast3('fail')">失败提示</fy-button>
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
    },

    handleClick() {
      console.log('danger')
    },

    handleToast1() {
      this.$toast('文字提示')
    },

    handleToast2() {
      this.$toast.loading({
        mask: false,
        message: '加载中...',
        loadingType: 'spinner',
        forbidClick: true,
        duration: 8000
      })
    },

    handleToast3(type) {
      this.$toast({
        type,
        message: type
      })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
