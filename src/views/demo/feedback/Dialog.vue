<template>
  <div class="wrapper">
    <fy-nav-bar title="Dialog" left-arrow @click-left="goBack"></fy-nav-bar>
    <div class="content">
      <h2 class="title">提示弹窗</h2>
      <div class="btn-box">
        <fy-button type="primary" plain @click="handleOpenAlert">提示弹窗</fy-button>
      </div>

      <h2 class="title">确认弹窗</h2>
      <div class="btn-box">
        <fy-button type="primary" plain @click="handleOpenConfirm">确认弹窗</fy-button>
      </div>

      <h2 class="title">组件调用</h2>
      <div class="btn-box">
        <fy-button type="danger" plain @click="handleOpenConfirm2">组件调用</fy-button>
      </div>
    </div>
    <fy-dialog v-model="show" :title="title" :show-cancel-button="true" @cancel="handleCancel" @confirm="handleConfirm">
      <div class="dialog-content">
        <span>{{message}}</span>
      </div>
    </fy-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '标题',
      message: '代码是写出来给人看的，附带能在机器上运行',
      show: false
    }
  },

  methods: {
    goBack() {
      this.$router.go(-1)
    },

    handleOpenAlert() {
      this.$dialog.alert({
        title: this.title,
        message: this.message
      })
    },

    handleOpenConfirm() {
      this.$dialog.confirm({
        title: this.title,
        message: this.message
      }).then(res=> {
        console.log(res)
      }).catch(err=> {
        console.log(err)
      })
    },

    handleOpenConfirm2() {
      this.show = true
    },

    handleCancel(val) {
      console.log(val)
    },

    handleConfirm(val) {
      console.log(val)
    }
  }
}
</script>

<style lang="less" scoped>
  .dialog-content {
    padding: 25px;
    max-height: 60vh;
    line-height: 1.5;
    font-size: 14px;
    text-align: center;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
</style>
