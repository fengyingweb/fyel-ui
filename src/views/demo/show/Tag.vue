<template>
  <div class="wrapper">
    <fy-nav-bar title="Tag" left-arrow @click-left="goBack"></fy-nav-bar>
    <div class="content">
      <h2 class="title">基础用法</h2>
      <div class="btn-box">
        <fy-tag>标签一</fy-tag>
        <fy-tag type="primary">标签二</fy-tag>
        <fy-tag type="danger">标签三</fy-tag>
        <fy-tag type="success">标签四</fy-tag>
      </div>

      <h2 class="title">空心</h2>
      <div class="btn-box">
        <fy-tag plain>标签一</fy-tag>
        <fy-tag plain type="primary">标签二</fy-tag>
        <fy-tag plain type="danger">标签三</fy-tag>
        <fy-tag plain type="success">标签四</fy-tag>
      </div>

      <h2 class="title">圆角</h2>
      <div class="btn-box">
        <fy-tag round>标签一</fy-tag>
        <fy-tag round type="primary">标签二</fy-tag>
        <fy-tag round type="danger">标签三</fy-tag>
        <fy-tag round type="success">标签四</fy-tag>
      </div>

      <h2 class="title">标记样式</h2>
      <div class="btn-box">
        <fy-tag mark>标签一</fy-tag>
        <fy-tag mark type="primary">标签二</fy-tag>
        <fy-tag mark type="danger">标签三</fy-tag>
        <fy-tag mark type="success">标签四</fy-tag>
      </div>

      <h2 class="title">标签大小</h2>
      <div class="btn-box">
        <fy-tag  type="primary">标签二</fy-tag>
        <fy-tag size="medium"  type="danger">标签三</fy-tag>
        <fy-tag size="large"  type="success">标签四</fy-tag>
      </div>
    </div>
  </div>
</template>

<script>
import {Tag} from 'fy-elui'
export default {
  components: {
    [Tag.name]: Tag
  },
  data() {
    return {
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

</style>
