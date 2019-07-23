<template>
  <div class="wrapper">
    <fy-nav-bar title="Search" left-arrow @click-left="goBack"></fy-nav-bar>
    <div class="wrapper-main">
      <h2 class="title">基础用法</h2>
      <fy-search v-model="keyword1" placeholder="请输入搜索关键词" @search="onSearch"></fy-search>

      <h2 class="title">显示取消按钮</h2>
      <fy-search
        v-model="keyword2"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch"
        @cancel="onCancel">
      </fy-search>

      <h2 class="title">高级用法</h2>
      <fy-search
        v-model="keyword3"
        label="地址"
        placeholder="请输入搜索关键词"
        @search="onSearch">
        <div slot="action" @click="onSearch(keyword3)">搜索</div>
      </fy-search>
    </div>
  </div>
</template>

<script>
import {Search} from 'fy-elui'
export default {
  components: {
    [Search.name]: Search
  },
  data() {
    return {
      keyword1: '',
      keyword2: '',
      keyword3: ''
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },

    onSearch(value) {
      console.log(value)
      this.$toast(value)
    },

    onCancel() {
      this.$toast('cancel')
    }
  }
}
</script>

<style lang="less" scoped>

</style>
