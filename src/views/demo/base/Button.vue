<template>
  <div class="wrapper">
    <fy-nav-bar title="Button" left-arrow @click-left="goBack"></fy-nav-bar>
    <div class="content">
      <h2 class="title">按钮类型</h2>
      <div class="btn-box">
        <fy-button>默认按钮</fy-button>
        <fy-button type="primary" @click="handleClick" @touchstart="handleTouchstart">主要按钮</fy-button>
        <fy-button type="info">信息按钮</fy-button>
        <fy-button type="danger">危险按钮</fy-button>
        <fy-button type="warning">警告按钮</fy-button>
      </div>

      <h2 class="title">朴素按钮</h2>
      <div class="btn-box">
        <fy-button type="primary" plain>主要按钮</fy-button>
        <fy-button type="info" plain>信息按钮</fy-button>
        <fy-button type="danger" plain>危险按钮</fy-button>
      </div>

      <h2 class="title">细边框</h2>
      <div class="btn-box">
        <fy-button type="primary" plain hairline>主要按钮</fy-button>
        <fy-button type="info" plain hairline>信息按钮</fy-button>
        <fy-button type="danger" plain hairline>危险按钮</fy-button>
      </div>

      <h2 class="title">禁用</h2>
      <div class="btn-box">
        <fy-button type="primary" disabled>主要按钮</fy-button>
        <fy-button type="info" disabled>信息按钮</fy-button>
        <fy-button type="danger" disabled>危险按钮</fy-button>
      </div>

      <h2 class="title">加载状态</h2>
      <div class="btn-box">
        <fy-button type="primary" loading></fy-button>
        <fy-button type="danger" loading loading-text="加载中..."></fy-button>
      </div>

      <h2 class="title">按钮形状</h2>
      <div class="btn-box">
        <fy-button type="primary" square>方形按钮</fy-button>
        <fy-button type="danger" round>圆形按钮</fy-button>
      </div>

      <h2 class="title">块形按钮</h2>
      <div class="btn-box">
        <fy-button type="primary" block>按钮1</fy-button>
        <fy-button type="danger" block>按钮2</fy-button>
      </div>

      <h2 class="title">按钮尺寸</h2>
      <div class="btn-box">
        <fy-button type="primary" size="large">大按钮</fy-button>
        <fy-button type="info">正常按钮</fy-button>
        <fy-button type="danger" size="small">小按钮</fy-button>
        <fy-button type="warning" size="mini">迷你按钮</fy-button>
      </div>

      <h2 class="title">跳转链接</h2>
      <div class="btn-box">
        <fy-button type="primary" :to="{name: 'about'}">主要按钮</fy-button>
        <fy-button type="info" url="https://youzan.github.io/vant/#/zh-CN/button">信息按钮</fy-button>
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

    handleTouchstart(ev) {
      console.log(ev)
    },

    handleClick(ev) {
      console.log(ev)
    }
  }
}
</script>

<style lang="less" scoped>

</style>

