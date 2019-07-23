<template>
  <div class="wrapper">
    <fy-nav-bar title="IndexBar索引栏" left-arrow @click-left="goBack"></fy-nav-bar>
    <div class="wrapper-main">
      <h2>基础用法</h2>
      <div class="index-bar-wrapper">
        <fy-index-bar @select="onSelect" :z-index="9999">
          <div v-for="item in lists" :key="item">
            <fy-index-anchor :index="item"></fy-index-anchor>
            <fy-cell title="文本"></fy-cell>
            <fy-cell title="文本"></fy-cell>
            <fy-cell title="文本"></fy-cell>
            <fy-cell title="文本"></fy-cell>
          </div>
        </fy-index-bar>
      </div>
    </div>
  </div>
</template>

<script>
import {IndexBar, IndexAnchor} from 'fy-elui'
const indexList = ()=> {
  const list = [];
  const charCodeOfA = 'A'.charCodeAt(0);

  for (let i = 0; i < 26; i++) {
    list.push(String.fromCharCode(charCodeOfA + i));
  }

  return list;
}
export default {
  components: {
    [IndexBar.name]: IndexBar,
    [IndexAnchor.name]: IndexAnchor
  },
  data() {
    return {
      lists: indexList()
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },

    onSelect(index) {
      console.log(index)
    }
  }
}
</script>

<style lang="less" scoped>
  .index-bar-wrapper {
    height: 580px;
    overflow-y: auto;
  }
</style>
