<template>
  <div class="wrapper">
    <fy-nav-bar title="PullRefresh" left-arrow @click-left="goBack"></fy-nav-bar>
    <div class="content">
      <fy-pull-refresh v-model="isRefresh" @refresh="onRefresh" loading-type="spinner">
        <div class="refresh-content">
          <h2 class="title">基础用法</h2>
          <p>刷新次数{{count}}</p>
        </div>
      </fy-pull-refresh>
    </div>
  </div>
</template>

<script>
import {PullRefresh} from 'fy-elui'
export default {
  components: {
    [PullRefresh.name]: PullRefresh
  },
  data() {
    return {
      count: 0,
      isRefresh: false
    }
  },

  methods: {
    goBack() {
      this.$router.go(-1)
    },

    onRefresh() {
      this.timer = setTimeout(()=> {
        this.$toast('刷新成功')
        this.isRefresh = false
        this.count++
      }, 500)
    }
  },

  destroyed() {
    clearTimeout(this.timer)
  }
}
</script>

<style lang="less" scoped>
  .content {
    background: #fff;
  }
  .refresh-content {
    height: 800px;
  }
</style>
