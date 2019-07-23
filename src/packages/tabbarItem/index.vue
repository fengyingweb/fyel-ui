<template>
  <div :class="['fy-tabbar-item', active && 'fy-tabbar-item--active']" :style="itemStyle" @click="onClick">
    <div :class="['fy-tabbar-item__icon', dot && 'fy-tabbar-item__icon--dot']">
      <slot name="icon" :active="active">
        <fy-icon :name="icon" v-if="icon"></fy-icon>
      </slot>
      <fy-info :info="info"></fy-info>
    </div>

    <div class="fy-tabbar-item__text">
      <slot :active="active"></slot>
    </div>
  </div>
</template>

<script>
import Icon from '../icon/index'
import Info from '../info/index'
import {routeProps, route} from '../utils/router'
export default {
  name: 'fy-tabbar-item',

  components: {
    [Icon.name]: Icon,
    [Info.name]: Info
  },

  props: {
    ...routeProps,
    icon: String,
    dot: Boolean,
    info: [String, Number]
  },

  data() {
    return {
      active: false
    }
  },

  computed: {
    itemStyle() {
      let {active} = this
      let style = active? {color: this.$parent.activeColor} : null
      return style
    }
  },

  beforeCreate() {
    this.$parent.items.push(this)
  },

  destroyed() {
    this.$parent.items.splice(this.$parent.items.indexOf(this), 1)
  },

  methods: {
    onClick(event) {
      this.$parent.onChange(this.$parent.items.indexOf(this))
      this.$emit('click', event)
      route(this.$router, this)
    }
  }
}
</script>

<style lang="less">
  @import './index.less';
</style>
