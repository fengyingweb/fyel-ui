<template>
  <div class="wrapper">
    <fy-nav-bar title="Collapse" left-arrow @click-left="goBack"></fy-nav-bar>
    <div class="wrapper-main">
      <h2 class="title">基础用法</h2>
      <fy-collapse v-model="activeNames" @change="onChange">
        <fy-collapse-item title="标题1" name="1">
          <span>代码是写出来给人看的，附带能在机器上运行</span>
        </fy-collapse-item>

        <fy-collapse-item title="标题2" name="2">
          <span>代码是写出来给人看的，附带能在机器上运行</span>
        </fy-collapse-item>

        <fy-collapse-item title="标题3" name="3">
          <span>代码是写出来给人看的，附带能在机器上运行</span>
        </fy-collapse-item>

        <fy-collapse-item title="标题4" name="4" disabled>
          <span>代码是写出来给人看的，附带能在机器上运行</span>
        </fy-collapse-item>
      </fy-collapse>

      <h2 class="title">手风琴</h2>
      <fy-collapse v-model="activeName" @change="onChange" accordion>
        <fy-collapse-item title="标题1" name="1">
          <span>代码是写出来给人看的，附带能在机器上运行</span>
        </fy-collapse-item>

        <fy-collapse-item title="标题2" name="2">
          <span>代码是写出来给人看的，附带能在机器上运行</span>
        </fy-collapse-item>

        <fy-collapse-item title="标题3" name="3">
          <span>代码是写出来给人看的，附带能在机器上运行</span>
        </fy-collapse-item>

        <fy-collapse-item title="标题4" name="4">
          <span>代码是写出来给人看的，附带能在机器上运行</span>
        </fy-collapse-item>
      </fy-collapse>

      <h2 class="title">自定义标题</h2>
      <fy-collapse v-model="activeNames" @change="onChange">
        <fy-collapse-item name="1">
          <div slot="title">标题1<fy-icon name="question-o"/></div>
          <span>代码是写出来给人看的，附带能在机器上运行</span>
        </fy-collapse-item>

        <fy-collapse-item
          title="标题2"
          value="内容"
          icon="shop-o"
          name="2">
          <span>代码是写出来给人看的，附带能在机器上运行</span>
        </fy-collapse-item>
      </fy-collapse>
    </div>
  </div>
</template>

<script>
import {Collapse, CollapseItem} from 'fy-elui'
export default {
  components: {
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem
  },
  data() {
    return {
      activeNames: ['1'],
      activeName: '2'
    }
  },

  methods: {
    goBack() {
      this.$router.go(-1)
    },

    onChange(name) {
      console.log(name)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
