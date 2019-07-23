<template>
  <div class="wrapper">
    <fy-nav-bar :title="title" left-arrow @click-left="goBack"></fy-nav-bar>
    <div class="layout-content">
      <h2 class="title">基础用法</h2>
      <fy-row>
        <fy-col class="col" span="8"><div>span8</div></fy-col>
        <fy-col class="col" span="8"><div>span8</div></fy-col>
        <fy-col class="col" span="8"><div>span8</div></fy-col>
      </fy-row>

      <h2 class="title">带有间距</h2>
      <fy-row gutter="16">
        <fy-col class="col" span="8"><div>span8</div></fy-col>
        <fy-col class="col" span="8"><div>span8</div></fy-col>
        <fy-col class="col" span="8"><div>span8</div></fy-col>
      </fy-row>

      <h2 class="title">flex布局</h2>
      <fy-row type="flex">
        <fy-col class="col" span="6"><div>span6</div></fy-col>
        <fy-col class="col" span="6"><div>span6</div></fy-col>
        <fy-col class="col" span="6"><div>span6</div></fy-col>
      </fy-row>
      
      <h2 class="title">justify: center</h2>
      <fy-row type="flex" justify="center">
        <fy-col class="col" span="6"><div>span6</div></fy-col>
        <fy-col class="col" span="6"><div>span6</div></fy-col>
        <fy-col class="col" span="6"><div>span6</div></fy-col>
      </fy-row>
      
      <h2 class="title">justify: end</h2>
      <fy-row type="flex" justify="end">
        <fy-col class="col" span="6"><div>span6</div></fy-col>
        <fy-col class="col" span="6"><div>span6</div></fy-col>
        <fy-col class="col" span="6"><div>span6</div></fy-col>
      </fy-row>
 
      <h2 class="title">justify: space-between</h2>
      <fy-row type="flex" justify="space-between">
        <fy-col class="col" span="6"><div>span6</div></fy-col>
        <fy-col class="col" span="6"><div>span6</div></fy-col>
        <fy-col class="col" span="6"><div>span6</div></fy-col>
      </fy-row>
      
      <h2 class="title">justify: space-around</h2>
      <fy-row type="flex" justify="space-around">
        <fy-col class="col" span="6"><div>span6</div></fy-col>
        <fy-col class="col" span="6"><div>span6</div></fy-col>
        <fy-col class="col" span="6"><div>span6</div></fy-col>
      </fy-row>

      <h2 class="title">offset偏移</h2>
      <fy-row>
        <fy-col class="col" span="6"><div>span6</div></fy-col>
        <fy-col class="col" span="8" offset="6"><div>span8 offset6</div></fy-col>
      </fy-row>
    </div>
  </div>
</template>

<script>
import {Row, Col} from 'fy-elui'
export default {
  components: {
    [Row.name]: Row,
    [Col.name]: Col
  },
  data() {
    return {
      title: 'Layout'
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
  .layout-content {
    width: 100%;
  }
   
   .col {
     line-height: 40px;
     text-align: center;
     font-size: 18px;
     color: #fff;
     &:nth-child(odd) {
       div {
         background: #267aff;
       }
     }
     &:nth-child(even) {
       div {
         background: #f56c6c;
       }
     }
   }
</style>
