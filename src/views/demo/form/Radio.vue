<template>
  <div class="wrapper">
    <fy-nav-bar title="Radio" left-arrow @click-left="goBack"></fy-nav-bar>
    <div class="content">
      <h2 class="title">基础用法{{value1}}</h2>
      <div class="box">
        <fy-radio-group v-model="value1" @change="onChange">
          <fy-radio name="a">单选框a</fy-radio>
          <fy-radio name="b">单选框b</fy-radio>
        </fy-radio-group>
      </div>

      <h2 class="title">禁用</h2>
      <div class="box">
        <fy-radio-group v-model="value1" @change="onChange">
          <fy-radio name="a" disabled>单选框a</fy-radio>
          <fy-radio name="b" disabled>单选框b</fy-radio>
        </fy-radio-group>
      </div>
    </div>
  </div>
</template>

<script>
import {RadioGroup, Radio} from 'fy-elui'
export default {
  components: {
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio
  },
  data() {
    return {
      value1: 'a'
    }
  },

  methods: {
    goBack() {
      this.$router.go(-1)
    },

    onChange(val) {
      console.log(val)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
