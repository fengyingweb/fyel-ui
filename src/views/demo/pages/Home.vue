<template>
  <div class="wrapper">
    <fy-nav-bar title="FY-ELUI" fixed></fy-nav-bar>
    <div class="wrapper-main">
      <fy-collapse v-model="activeName" accordion>
        <fy-collapse-item
          v-for="item in navLists"
          :key="item.name"
          :name="item.name"
          :title="item.title"
          class="collapse-item">
          <fy-cell 
            v-for="subItem in item.subLists"
            :key="subItem.id"
            :title="subItem.title"
            :to="subItem.path"
            is-link>
          </fy-cell>
        </fy-collapse-item>
      </fy-collapse>
    </div>
  </div>
</template>

<script>
import {Collapse, CollapseItem} from 'fy-elui'
export default {
  name: 'home',
  components: {
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem
  },
  data () {
    return {
      navLists: [
        {
          title: '基础组件', 
          name: 'base',
          subLists: [
            {id: '1', title: 'button', path: '/button'},
            {id: '2', title: 'icon', path: '/icon'},
            {id: '6', title: 'layout', path: '/layout'},
            {id: '7', title: 'popup', path: '/popup'}
          ]
        },

        {
          title: '表单组件', 
          name: 'form',
          subLists: [
            {id: '18', title: 'checkbox', path: '/checkbox'},
            {id: '19', title: 'field', path: '/field'},
            {id: '20', title: 'numberKeyboard', path: '/numberKeyboard'},
            {id: '21', title: 'passwordInput', path: '/passwordInput'},
            {id: '22', title: 'radio', path: '/radio'},
            {id: '23', title: 'rate', path: '/rate'},
            {id: '24', title: 'search', path: '/search'},
            {id: '25', title: 'slider', path: '/slider'},
            {id: '26', title: 'stepper', path: '/stepper'},
            {id: '27', title: 'switch', path: '/switch'},
            {id: '28', title: 'switchCell', path: '/switchCell'},
            {id: '29', title: 'uploader', path: '/uploader'},
            {id: '30', title: 'picker', path: '/picker'},
            {id: '31', title: 'dateTimePicker', path: '/dateTimePicker'}
          ]
        },

        {
          title: '反馈组件',
          name: 'feedback',
          subLists: [
            {id: '3', title: 'loading', path: '/loading'},
            {id: '8', title: 'actionsheet', path: '/actionsheet'},
            {id: '9', title: 'dialog', path: '/dialog'},
            {id: '10', title: 'toast', path: '/toast'},
            {id: '11', title: 'notify', path: '/notify'},
            {id: '12', title: 'pullRefresh', path: '/pullRefresh'},
            {id: '13', title: 'swipeCell', path: '/swipeCell'},
          ]
        },

        {
          title: '展示组件',
          name: 'show',
          subLists: [
            {id: '32', title: 'circle', path: '/circle'},
            {id: '33', title: 'collapse', path: '/collapse'},
            {id: '34', title: 'swipe', path: '/swipe'},
            {id: '35', title: 'noticeBar', path: '/noticeBar'},
            {id: '36', title: 'tag', path: '/tag'},
            {id: '40', title: 'steps', path: '/steps'}
          ]
        },
        
        {
          title: '导航组件',
          name: 'nav',
          subLists: [
            {id: '4', title: 'navBar', path: '/navBar'},
            {id: '5', title: 'tabbar', path: '/tabbar'},
            {id: '14', title: 'sidebar', path: '/sidebar'},
            {id: '15', title: 'tab', path: '/tab'},
            {id: '16', title: 'pagination', path: '/pagination'},
            {id: '17', title: 'treeSelect', path: '/treeSelect'},
            {id: '38', title: 'indexBar', path: '/indexBar'}
          ]
        },

        {
          title: '业务组件',
          name: 'service',
          subLists: [
            {id: '37', title: 'area', path: '/area'}
          ]
        },

        {
          title: '图表',
          name: 'charts',
          subLists: [
            {id: '39', title: 'charts', path: '/charts'}
          ]
        }
      ],
      activeName: ''
    }    
  },

  methods: {
    goToPage (name) {
      this.$router.push({name: name})
    }
  }
}
</script>

<style lang="less" scoped>
  .wrapper {
    display: -webkit-flex;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    &-main {
      padding-top: 46px;
      width: 100%;
    }
  }
</style>
