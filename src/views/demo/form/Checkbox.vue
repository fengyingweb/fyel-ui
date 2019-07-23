<template>
  <div class="wrapper">
    <fy-nav-bar title="Checkbox" left-arrow @click-left="goBack"></fy-nav-bar>
    <div class="content">
      <h2 class="title">基础用法</h2>
      <div class="box">
        <fy-checkbox v-model="checked1">复选框</fy-checkbox>
      </div>

      <h2 class="title">禁用状态</h2>
      <div class="box">
        <fy-checkbox v-model="checked2" disabled>复选框1</fy-checkbox>
        <fy-checkbox v-model="checked3" disabled>复选框3</fy-checkbox>
      </div>

      <h2 class="title">自定义颜色</h2>
      <div class="box">
        <fy-checkbox v-model="checked4" checked-color="#07c160">复选框</fy-checkbox>
      </div>

      <h2 class="title">复选框组{{values}}</h2>
      <div class="box">
        <fy-checkbox-group v-model="values">
          <fy-checkbox v-for="val in ['a', 'b', 'c', 'd']" :key="val" :name="val">复选框{{val}}</fy-checkbox>
        </fy-checkbox-group>
      </div>
    </div>
  </div>
</template>

<script>
import {CheckboxGroup, Checkbox} from 'fy-elui'
export default {
  components: {
    [CheckboxGroup.name]: CheckboxGroup,
    [Checkbox.name]: Checkbox
  },
  data() {
    return {
      checked1: true,
      checked2: false,
      checked3: true,
      checked4: true,
      values: ['a', 'b']
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
