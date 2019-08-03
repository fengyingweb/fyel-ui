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
import {
  getQueryString,
  stringifyQuery,
  isEmpty,
  inBrowser,
  uniq
} from '@/utils/tools'

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
    },

    test() {
      let params = {
        id: 12345678,
        pageNo: 1,
        pageSize: 10,
        pages: ['home', 'page', 'about']
      }
      console.log(stringifyQuery(params));
      console.log(getQueryString(stringifyQuery(params)));

      let query = window.location.href;
      query = query.slice(query.indexOf('?'));
      console.log(query);
      console.log(getQueryString(query));

      console.log(isEmpty({}));
      console.log(isEmpty([]));
      console.log(isEmpty(''));
      console.log(isEmpty(null));
      console.log(isEmpty(0));
      console.log(isEmpty('1'));

      console.log(inBrowser);
      let arr1 = [1, 2, 4, 6, 6, 2, 8, 2, 1];
      console.time('test1')
      console.log(uniq(arr1));
      console.timeEnd('test1')

      let arr2 = [
        {x: 1, y: 2},
        {x: 3, y: 4},
        {x: 5, y: 6},
        {x: 1, y: 2},
        {x: 3, y: 7}
      ];
      console.log(uniq(arr2, 'x'));
      
      console.time('time2')
      console.log(this.dup1(arr1));
      console.timeEnd('time2')

      console.time('time3')
      console.log(this.dup2(arr1));
      console.timeEnd('time3');
 
      console.time('time4')
      console.log(this.dup3(arr1));
      console.timeEnd('time4')

      console.log(this.dup4(arr1));

      console.time('time5')
      console.log(this.sortArr1(arr1));
      console.timeEnd('time5')
      
      let arr3 = [90, 43, 100, 2, 3, 5, 69, 35, 8, 2, 3, 10];
      console.time('time6')
      console.log(this.sortArr2(arr3));
      console.timeEnd('time6');
    },

    dup1(arr) {
      let result = [];
      let length = arr.length;
      let isRepeat;
      for( let index = 0; index < length; index++) {
        isRepeat = false;
        for(let j = 0; j < result.length; j++) {
          if (arr[index] === result[j]) {
            isRepeat = true;
            break;
          }
        }

        if (!isRepeat) {
          result.push(arr[index]);
        }
      }
      return result;
    },

    dup2(arr) {
      let result = [];
      let {length} = arr;
      let isRepeat;
      for( let i = 0; i < length; i++) {
        isRepeat = false;
        for (let j = i + 1; j < length; j++) {
          if (arr[i] === arr[j]) {
            isRepeat = true;
            break;
          }
        }

        if (!isRepeat) {
          result.push(arr[i]);
        }
      }

      return result;
    },

    dup3(arr) {
      let result = [];
      let {length} = arr;
      for (let i = 0; i < length; i++) {
        if (arr.indexOf(arr[i]) === i) {
          result.push(arr[i]);
        }
      }
      return result;
    },

    dup4(arr) {
      let result = [];
      arr.forEach(item=> {
        if (!result.includes(item)) {
          result.push(item);
        }
      });
      return result;
    },

    // 冒泡排序
    sortArr1(arr) {
      let value = arr[0];
      let {length} = arr;
      for (let i = 0; i < length; i++) {
        for (let j = i + 1; j < length; j++) {
          if (arr[i] > arr[j]) {
            value = arr[i];
            arr[i] = arr[j];
            arr[j] = value;
          }
        }
      }
      return arr;
    },

    // 快速排序 去中间值和数组的值比较后, 小于中间值得放左边, 大于中间值的放右边, 在合并反复执行
    sortArr2(arr) {
      if (arr.length <=1 ) return arr;
      let middleIndex = Math.ceil(arr.length / 2);
      let mCur = arr.splice(middleIndex, 1)[0];
      let left = [];
      let right = [];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] < mCur) {
          left.push(arr[i]);
        } else {
          right.push(arr[i]);
        }
      }
      return this.sortArr2(left).concat(mCur, this.sortArr2(right));
    }
  },

  mounted() {
    this.test();
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
