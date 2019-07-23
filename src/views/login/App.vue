<template>
  <div id="app">
    <div class="wrapper">
      <h3 class="title3">{{title}}</h3>
      <a href="./demo.html">首页</a>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: '登录'
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/styles/mixin.scss';
  $width: 375px;
  #app {
    @include flex($justify: flex-start);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width: $width;
    height: 100%;
    margin: 0 auto;
  }

  .wrapper {
    @include flex();
    width: 100%;
    height: 100%;
  }

  .title3 {
    margin-bottom: 32px;
    line-height: 50px;
    font-size: 36px;
    color: #363636;
  }

  a {
    text-decoration: underline;
    color: #2c3e50;
  }
</style>
