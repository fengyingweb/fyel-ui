<template>
  <div class="wrapper">
    <fy-nav-bar title="TreeSelect" left-arrow @click-left="goBack"></fy-nav-bar>
    <div class="wrapper-main">
      <h2 class="title">基础用法</h2>
      <div class="tree-wrapper">
        <fy-tree-select
          :items="items"
          :main-active-index="curActiveIndex"
          :active-id="activeId"
          @nav-click="onNavClick"
          @item-click="onItemClick">
        </fy-tree-select>
      </div>
    </div>
  </div>
</template>

<script>
import {TreeSelect} from 'fy-elui'
export default {
  components: {
    [TreeSelect.name]: TreeSelect
  },
  data() {
    return {
      items: [
        {
          text: '所有城市',
          children: [
            {
              text: '杭州',
              id: '1'
            },
            {
              text: '温州',
              id: '2',
              disabled: true
            },
            {
              text: '宁波',
              id: '3'
            },
            {
              text: '义乌',
              id: '4'
            },
            {
              text: '南京',
              id: '5'
            },
            {
              text: '苏州',
              id: '6'
            },
            {
              text: '福州',
              id: '7'
            },
            {
              text: '厦门',
              id: '8'
            }
          ]
        },
        {
          text: '浙江',
          children: [
            {
              text: '杭州',
              id: '1'
            },
            {
              text: '温州',
              id: '2',
              disabled: true
            },
            {
              text: '宁波',
              id: '3'
            },
            {
              text: '义乌',
              id: '4'
            }
          ]
        },
        {
          text: '江苏',
          children: [
            {
              text: '南京',
              id: '5'
            },
            {
              text: '苏州',
              id: '6'
            }
          ]
        },
        {
          text: '福建',
          children: [
            {
              text: '福州',
              id: '7'
            },
            {
              text: '厦门',
              id: '8'
            }
          ],
          disabled: true
        }
      ],
      activeId: '1',
      curActiveIndex: 0
    }
  },

  methods: {
    goBack() {
      this.$router.go(-1)
    },

    onNavClick(index) {
      this.curActiveIndex = index
    },

    onItemClick(item) {
      console.log(item)
      this.activeId = item.id
    }
  }
}
</script>

<style lang="less" scoped>
  .title {
    padding-left: 16px;
  }
  .tree-wrapper {
    width: 100%;
  }
</style>
