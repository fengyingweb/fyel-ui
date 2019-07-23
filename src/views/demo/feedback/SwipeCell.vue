<template>
  <div class="wrapper">
    <fy-nav-bar title="SwipeCell" left-arrow @click-left="goBack"></fy-nav-bar>
    <div class="main">
      <h2 class="title">基础用法</h2>
      <fy-swipe-cell :left-width="65" :right-width="65" @click="handleClick">
        <span slot="left">选择</span>
        <fy-cell-group>
          <fy-cell title="单元格" value="内容"></fy-cell>
        </fy-cell-group>
        <span slot="right">删除</span>
      </fy-swipe-cell>

      <h2 class="title">异步关闭</h2>
      <fy-swipe-cell :left-width="65" :right-width="65" :on-close="onClose">
        <span slot="left">选择</span>
        <fy-cell-group>
          <fy-cell title="单元格" value="内容"></fy-cell>
        </fy-cell-group>
        <span slot="right">删除</span>
      </fy-swipe-cell>
    </div>
  </div>
</template>

<script>
import {SwipeCell} from 'fy-elui'
export default {
  components: {
    [SwipeCell.name]: SwipeCell
  },
  data() {
    return {}
  },

  methods: {
    goBack() {
      this.$router.go(-1)
    },

    handleClick(pos) {
      console.log(pos)
    },

    onClose(pos, instance) {
      switch(pos) {
        case 'left':
        case 'cell':
        case 'outside':
          instance.close()
          break;
        case 'right':
          this.$dialog.confirm({
            message: '确定删除'
          }).then(res => {
            instance.close()
          })
          break;
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .main {
    width: 100%;
  }
</style>
