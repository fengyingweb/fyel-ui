<template>
  <div class="wrapper">
    <fy-nav-bar
      title="TabBar"
      left-arrow
      @click-left="goBack">
    </fy-nav-bar>
    
    <div class="container">
      <fy-tabbar v-model="active1" @change="handleChange" active-color="#07c160" :fixed="false">
        <fy-tabbar-item icon="home-o">标签1</fy-tabbar-item>
        <fy-tabbar-item icon="search" dot>标签2</fy-tabbar-item>
        <fy-tabbar-item icon="friends-o" info="5">标签3</fy-tabbar-item>
        <fy-tabbar-item icon="setting-o" info="20">标签4</fy-tabbar-item>
      </fy-tabbar>
    </div>
    <fy-tabbar v-model="active" @change="handleChange">
      <fy-tabbar-item icon="home-o">标签1</fy-tabbar-item>
      <fy-tabbar-item icon="search" dot>标签2</fy-tabbar-item>
      <fy-tabbar-item icon="friends-o" info="5">标签3</fy-tabbar-item>
      <fy-tabbar-item icon="setting-o" info="20">标签4</fy-tabbar-item>
    </fy-tabbar>
  </div>
</template>

<script>
import {Tabbar, TabbarItem} from 'fy-elui'
export default {
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },
  data() {
    return {
      active: 0,
      active1: 2
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },

    handleChange(index) {
      console.log(index)
    }
  }
}
</script>

<style lang="less">
  .container {
    padding: 16px 0;
    width: 100%;
  }
</style>
