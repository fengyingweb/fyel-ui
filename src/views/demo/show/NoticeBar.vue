<template>
  <div class="wrapper">
    <fy-nav-bar title="NoticeBar" left-arrow @click-left="goBack"></fy-nav-bar>
    <div class="wrapper-main">
      <h2 class="title">基础用法</h2>
      <div class="box">
        <fy-notice-bar :text="text" left-icon="volume-o"></fy-notice-bar>
      </div>

      <h2 class="title">多行</h2>
      <div class="box">
        <fy-notice-bar :text="text" left-icon="volume-o" wrapable :scrollable="false"></fy-notice-bar>
      </div>

      <h2 class="title">可关闭</h2>
      <div class="box">
        <fy-notice-bar 
          mode="closeable"
          :text="text"
          left-icon="volume-o"
          @close="onClose">
        </fy-notice-bar>
      </div>
    </div>
  </div>
</template>

<script>
import {NoticeBar} from 'fy-elui'
export default {
  components: {
    [NoticeBar.name]: NoticeBar
  },

  data() {
    return {
      text: '足协杯战线连续第2年上演广州德比战，上赛季半决赛上恒大以两回合5-3的总比分淘汰富力。'
    }
  },

  methods: {
    goBack() {
      this.$router.go(-1)
    },

    onClose() {
      this.$toast('close notive bar')
    }
  }
}
</script>

<style lang="less" scoped>

</style>
