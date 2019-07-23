<template>
  <a
    :href="url"
    :class="['fy-sidebar-item', select && 'fy-sidebar-item--select', 'fy-hairline']"
    @click="onClick">
    <div class="fy-sidebar-item__text">
      {{title}}
      <fy-info :info="info" class="fy-sidebar-item__info" />
    </div>
  </a>
</template>

<script>
import Info from '../info/index'
export default {
  name: 'fy-sidebar-item',
  components: {
    [Info.name]: Info
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    info: [String, Number],
    url: String
  },
  computed: {
    select() {
      return this.$parent.items.indexOf(this) === +this.$parent.activeKey
    }
  },

  methods: {
    onClick() {
      let index = this.$parent.items.indexOf(this)
      this.$emit('click', index)
      this.$parent.$emit('change', index)
    }
  },
  beforeCreate() {
    this.$parent.items.push(this)
  },
  beforeDestory() {
    this.$parent.items = this.$parent.items.filter(item => item !== this)
  }
}
</script>

<style lang="less">
  @import './index.less';
</style>
