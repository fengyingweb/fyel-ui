<template>
  <div class="wrapper">
    <fy-nav-bar title="Tab" left-arrow @click-left="goBack"></fy-nav-bar>
    <div class="wrapper-main">
      <h2 class="title">基础用法</h2>
      <fy-tabs v-model="active1" @click="onClickTab" @change="onChangeTab">
        <fy-tab-item title="标签1"><span>内容1</span></fy-tab-item>
        <fy-tab-item title="标签2"><span>内容2</span></fy-tab-item>
        <fy-tab-item title="标签3"><span>内容3</span></fy-tab-item>
        <fy-tab-item title="标签4"><span>内容4</span></fy-tab-item>
      </fy-tabs>

      <h2 class="title">横向滚动</h2>
      <fy-tabs v-model="active2">
        <fy-tab-item v-for="i in 8" :key="i" :title="'标签' + i">
          <span>内容{{i}}</span>
        </fy-tab-item>
      </fy-tabs>

      <h2 class="title">禁用</h2>
      <fy-tabs v-model="active3" @disabled="handleDisabled">
        <fy-tab-item v-for="i in 8" :key="i" :title="'标签' + i" :disabled="i === 2 || i === 4">
          <span>内容{{i}}</span>
        </fy-tab-item>
      </fy-tabs>

      <h2 class="title">卡片类型</h2>
      <fy-tabs v-model="active4" type="card">
        <fy-tab-item v-for="i in 3" :key="i" :title="'标签' + i">
          <span>内容{{i}}</span>
        </fy-tab-item>
      </fy-tabs>

      <h2 class="title">切换动画和滑动切换</h2>
      <fy-tabs v-model="active5" animated swipeable>
        <fy-tab-item v-for="i in 6" :key="i" :title="'标签' + i">
          <span>内容{{i}}</span>
        </fy-tab-item>
      </fy-tabs>
    </div>
  </div>
</template>

<script>
import {Tabs, TabItem} from 'fy-elui'
export default {
  components: {
    [Tabs.name]: Tabs,
    [TabItem.name]: TabItem
  },
  data() {
    return {
      active1: 0,
      active2: 2,
      active3: 0,
      active4: 1,
      active5: 2
    }
  },

  methods: {
    goBack() {
      this.$router.go(-1)
    },

    onClickTab(index, title) {},

    onChangeTab(index, title) {
      console.log(index, title)
    },

    handleDisabled(index, title) {
      this.$toast(`${title}被禁用了`)
    }
  }
}
</script>

<style lang="less" scoped>
  .title{
    padding-left: 16px;
  }
</style>
