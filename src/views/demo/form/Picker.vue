<template>
  <div class="wrapper">
    <fy-nav-bar title="Picker" left-arrow @click-left="goBack"></fy-nav-bar>
    <div class="wrapper-main">
      <h2 class="title">基础用法{{currentVal}}</h2>
      <fy-picker :columns="columns1" @change="onChange"></fy-picker>

      <h2 class="title">默认选中</h2>
      <fy-picker :columns="columns1" :default-index="2"></fy-picker>

      <h2 class="title">显示顶部标题栏</h2>
      <fy-picker
        :columns="columns1"
        show-toolbar
        title="标题"
        @cancel="onCancel"
        @confirm="onConfirm">
      </fy-picker>

      <h2 class="title">禁用选项</h2>
      <fy-picker
        :columns="columns2"
        value-key="key">
      </fy-picker>

      <h2 class="title">多级联动</h2>
      <fy-picker
        :columns="columns3"
        @change="onChange3">
      </fy-picker>
    </div>
  </div>
</template>

<script>
import {Picker} from 'fy-elui'
const citys = {
  '浙江': ['杭州', '宁波', '温州', '嘉兴', '湖州'],
  '福建': ['福州', '厦门', '莆田', '三明', '泉州']
}
export default {
  components: {
    [Picker.name]: Picker
  },
  data() {
    return {
      columns1: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
      currentVal: {
        value: '',
        index: 0
      },
      columns2: [
        {key: '杭州', disabled: true},
        {key: '宁波'},
        {key: '温州'},
        {key: '嘉兴'},
        {key: '湖州'}
      ],
      columns3: [
        {
          values: Object.keys(citys),
          className: 'column1'
        },
        {
          values: citys['浙江'],
          className: 'column2',
          defaultIndex: 2
        }
      ]
    }
  },

  methods: {
    goBack() {
      this.$router.go(-1)
    },

    onChange(picker, value, index) {
      console.log(picker)
      console.log(value)
      console.log(index)
      this.currentVal.value = value
      this.currentVal.index = index
    },

    onCancel(value, index) {
      console.log(value)
      console.log(index)
    },

    onConfirm(value, index) {
      console.log(value)
      console.log(index)
    },

    onChange3(picker, values, index) {
      console.log(values)
      picker.setColumnValues(1, citys[values[0]])
    }
  }
}
</script>

<style lang="less" scoped>

</style>
