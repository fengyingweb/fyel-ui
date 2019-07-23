<template>
  <div class="wrapper">
    <fy-nav-bar title="Pagination" left-arrow @click-left="goBack"></fy-nav-bar>
    <div class="content">
      <h2 class="title">基础用法</h2>
      <fy-pagination
        v-model="currentPage"
        :total-items="50"
        :items-per-page="5"
        @change="handlePageChange">
      </fy-pagination>

      <h2 class="title">简单模式</h2>
      <fy-pagination
        v-model="curPage"
        :page-count="20"
        mode="simple"
        @change="handlePageChange">
      </fy-pagination>
    </div>
  </div>
</template>

<script>
import {Pagination} from 'fy-elui'
export default {
  components: {
    [Pagination.name]: Pagination
  },
  data() {
    return {
      currentPage: 1,
      curPage: 3
    }
  },

  methods: {
    goBack() {
      this.$router.go(-1)
    },

    handlePageChange(number) {
      console.log(number)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
