<template>
  <div class="wrapper">
    <fy-nav-bar title="Badge" left-arrow @click-left="goBack"></fy-nav-bar>
    <div class="content">
      <h2 class="title">基础用法</h2>
      <div class="badge-wrapper">
        <fy-sidebar :active-key="activeKey" @change="onChange">
          <fy-sidebar-item title="标签名称1"></fy-sidebar-item>
          <fy-sidebar-item title="标签名称2" info="8"></fy-sidebar-item>
          <fy-sidebar-item title="标签名称3" info="99"></fy-sidebar-item>
          <fy-sidebar-item title="标签名称4" info="99+"></fy-sidebar-item>
        </fy-sidebar>
      </div>
    </div>
  </div>
</template>

<script>
import {Sidebar, SidebarItem} from 'fy-elui'
export default {
  components: {
    [Sidebar.name]: Sidebar,
    [SidebarItem.name]: SidebarItem
  },
  data() {
    return {
      activeKey: 0
    }
  },

  methods: {
    goBack() {
      this.$router.go(-1)
    },
    onChange(index) {
      console.log(index)
      this.activeKey = index
    }
  }
}
</script>

<style lang="less" scoped>
</style>
