<template>
  <div class="wrapper">
    <fy-nav-bar title="Actionsheet" left-arrow @click-left="goBack"></fy-nav-bar>
    <div class="content">
      <h2 class="title">基础用法</h2>
      <div class="btn-box">
        <fy-button type="primary" plain @click="openActionsheet">弹窗actionsheet</fy-button>
      </div>
    </div>
    <fy-actionsheet
      v-model="showAction"
      :actions="actions"
      cancel-text="取消"
      @select="handleSelect">
    </fy-actionsheet>
  </div>
</template>

<script>
import {Actionsheet} from 'fy-elui'
export default {
  components: {
    [Actionsheet.name]: Actionsheet
  },
  data() {
    return {
      showAction: false,
      actions: [
        {
          name: '选项'
        },
        {
          name: '选项',
          subname: '描述信息'
        },
        {
          loading: true
        },
        {
          name: '禁用选项',
          disabled: true
        }
      ]
    }
  },

  methods: {
    goBack() {
      this.$router.go(-1)
    },

    openActionsheet() {
      this.showAction = true
    },

    handleSelect(item, index) {
      console.log(item, index)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
