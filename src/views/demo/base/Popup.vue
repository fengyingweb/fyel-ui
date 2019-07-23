<template>
  <div class="wrapper">
    <fy-nav-bar title="Popup" left-arrow @click-left="goBack"></fy-nav-bar>
    <div class="content">
      <h2 class="title">Popup用法</h2>
      <div class="btn-box">
        <fy-button type="primary" plain @click="openPopup('top')">顶部弹出</fy-button>
        <fy-button type="primary" plain @click="openPopup('bottom')">底部弹出</fy-button>
        <fy-button type="primary" plain @click="openPopup('left')">左边弹出</fy-button>
        <fy-button type="primary" plain @click="openPopup('right')">右边弹出</fy-button>
      </div>
    </div>
    <fy-popup v-model="showPop1" :position="position">
      <div class="pop-content" :style="popContentStyle">
        <span>内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</span>
      </div>
    </fy-popup>
  </div>
</template>

<script>
import {Popup} from 'fy-elui'
export default {
  components: {
    [Popup.name]: Popup
  },
  data() {
    return {
      showPop1: false,
      position: 'bottom'
    }
  },

  computed: {
    popContentStyle() {
      let {position} = this
      let height = document.documentElement.clientHeight || window.innerHeight
      let style = {
        width: (position === 'top' || position === 'bottom') ? '100%' : '240px',
        height: (position === 'top' || position === 'bottom') ? '300px' :  `${height}px`
      }
      return style
    }
  },

  methods: {
    goBack() {
      this.$router.go(-1)
    },
    openPopup(pos) {
      this.showPop1 = true
      this.position = pos
    }
  }
}
</script>

<style lang="less" scoped>
  .pop-content {
    height: 300px;
  }
</style>
