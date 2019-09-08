<template>
  <div class="wrapper">
    <fy-nav-bar title="Tag" left-arrow @click-left="goBack"></fy-nav-bar>
    <div class="content scroller-content">
      <h2 class="title">默认横向滑动</h2>
      <fy-scroller @jump="jump">
        <div
          slot="list"
          class="hor-list-item"
          v-for="(item, ind) in listData"
          :key="ind">
          <div class="hor-list-item-info">
            <h4 class="hor-list-item-title">防水升级版 蓝 迷你小音</h4>
            <p class="hor-list-item-time">2019-09-08</p>
          </div>
        </div>
        <div slot="more" class="jump-more">
          <span>查看更多</span>
        </div>
      </fy-scroller>

      <h2 class="title">纵向滚动, 支持下拉刷新和上拉加载更多</h2>
      <div class="ver-panel">
        <fy-scroller
          :is-un-more="isUnMore"
          :is-loading="isLoading"
          type="vertical"
          @loadMore="loadMoreVert"
          @pulldown="pulldown">
          <div slot="list" class="ver-list">
            <div
              class="ver-list-item"
              v-for="(item, ind) in listData"
              :key="ind">
              <div class="ver-list-item-info">
                <h4 class="ver-list-item-title">防水升级版 蓝牙音箱 低音炮 IPX7设计 户外便携音响 迷你小音</h4>
                <p class="ver-list-item-time">2019-09-08</p>
              </div>
            </div>
          </div>
        </fy-scroller>
      </div>
    </div>
  </div>
</template>

<script>
import {Scroller} from 'fy-elui'
export default {
  components: {
    [Scroller.name]: Scroller
  },
  data() {
    return {
      listData: new Array(20),
      isUnMore: false,
      isLoading: false
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },

    jump() {
      console.log('查看更多');
    },

    loadMoreVert() {
      console.log('loadmore上拉加载');
      this.isLoading = true;
      this.timer = setTimeout(()=> {
        this.isUnMore = true;
        this.isLoading = false;
      }, 5000)
    },

    pulldown() {
      console.log('下拉刷新')
      this.isLoading = true;
      this.timer = setTimeout(()=> {
        this.isUnMore = true;
        this.isLoading = false;
      }, 5000)
    }
  },
  beforeDestory() {
    clearTimeout(this.timer);
  }
}
</script>

<style lang="less" scoped>
  .scroller-content {
    padding-left: 0;
    padding-right: 0;
  }
  .hor-list-item {
    margin-left: 12px;
    padding: 10px;
    width: 180px;
    height: 80px;
    background: #fff;
    &-title {
      padding-bottom: 10px;
      font-weight: 600;
      font-size: 14px;
      color: #333;
    }
    &-time {
      font-size: 14px;
      color: #666;
    }
  }

  .jump-more {
    display: flex;
    align-items: center;
    height: 80px;
    width: 20px;
    padding: 0 5px;
    text-align: center;
    font-size: 12px;
    color: #f56;
    span {
      display: inline-block;
    }
  }
  
  .ver-panel {
    height: 360px;
    background: #e1e1e1;
  }
  .ver-list {
    padding: 16px;
    &-item {
      margin-bottom: 12px;
      padding: 10px;
      background: #fff;
      border-radius: 4px;
      &-title {
        padding-bottom: 10px;
        line-height: 20px;
        font-weight: 600;
        font-size: 14px;
        color: #333;
      }
      &-time {
        font-size: 14px;
        color: #666;
      }
    }
  }
</style>
