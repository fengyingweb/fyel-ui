<template>
  <div class="wrapper">
    <fy-nav-bar title="SwitchCell" left-arrow @click-left="goBack"></fy-nav-bar>
    <div class="wrapper-main">
      <fy-cell-group :title="`基础用法${checked1}`">
        <fy-switch-cell title="标题" v-model="checked1" inactive-color="#e5e5e5"></fy-switch-cell>
      </fy-cell-group>

      <fy-cell-group title="禁用状态">
        <fy-switch-cell title="标题" v-model="checked2" disabled></fy-switch-cell>
      </fy-cell-group>

      <fy-cell-group title="加载状态">
        <fy-switch-cell title="标题" v-model="checked2" loading></fy-switch-cell>
      </fy-cell-group>

      <fy-cell-group title="自定义颜色">
        <fy-switch-cell title="标题" v-model="checked3" active-color="#07c160" inactive-color="#f44"></fy-switch-cell>
      </fy-cell-group>
    </div>
  </div>
</template>

<script>
import {SwitchCell} from 'fy-elui'
export default {
  components: {
    [SwitchCell.name]: SwitchCell
  },
  data() {
    return {
      checked1: true,
      checked2: true,
      checked3: true
    }
  },

  methods: {
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
