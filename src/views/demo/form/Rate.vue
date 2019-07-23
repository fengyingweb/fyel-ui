<template>
  <div class="wrapper">
    <fy-nav-bar title="Rate评分" left-arrow @click-left="goBack"></fy-nav-bar>
    <div class="content">
      <h2 class="title">基础用法</h2>
      <fy-rate v-model="score1" @change="onChange"></fy-rate>

      <h2 class="title">自定义图标</h2>
      <fy-rate
        v-model="score2"
        icon="like"
        void-icon="like-o"
        @change="onChange">
      </fy-rate>

      <h2 class="title">自定义样式</h2>
      <fy-rate
        v-model="score3"
        :size="25"
        color="#f44"
        icon="like"
        void-icon="like-o"
        @change="onChange">
      </fy-rate>

      <h2 class="title">半星</h2>
      <fy-rate v-model="score4" :size="30" :allow-half="true" @change="onChange"></fy-rate>

      <h2 class="title">禁用</h2>
      <fy-rate v-model="score5" :size="30" :count="6" :allow-half="true" disabled></fy-rate>
    </div>
  </div>
</template>

<script>
import {Rate} from 'fy-elui'
export default {
  components: {
    [Rate.name]: Rate
  },

  data() {
    return {
      score1: 3,
      score2: 3,
      score3: 3,
      score4: 2.5,
      score5: 3.5
    }
  },

  methods: {
    goBack() {
      this.$router.go(-1)
    },

    onChange(score) {
      console.log(score)
    }
  }
}
</script>

<style lang="less" scoped>
  .content {
    background: #fff;
  }
</style>
