<template>
  <div class="wrapper">
    <fy-nav-bar title="Uploader" left-arrow @click-left="goBack"></fy-nav-bar>
    <div class="content">
      <h2 class="title">基础用法</h2>
      <div class="box">
        <fy-uploader name="uploade" :after-read="onRead">
          <fy-icon name="photograph"/>
        </fy-uploader>
      </div>
    </div>
  </div>
</template>

<script>
import {Uploader} from 'fy-elui'
export default {
  components: {
    [Uploader.name]: Uploader
  },
  data() {
    return {}
  },

  methods: {
    goBack() {
      this.$router.go(-1)
    },

    onRead(files, detail) {
      console.log(files)
      console.log(detail)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
