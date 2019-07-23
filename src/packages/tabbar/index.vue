<template>
  <div :class="tabbarClass" :style="tabbarStyle">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'fy-tabbar',
  props: {
    value: Number,
    activeColor: {
      type: String,
      default: '#1989fa'
    },
    fixed: {
      type: Boolean,
      default: true
    },
    zIndex: {
      type: Number,
      default: 2000
    }
  },

  data() {
    return {
      items: []
    }
  },

  computed: {
    tabbarStyle() {
      let {zIndex} = this
      let style = {
        zIndex
      }
      return style
    },

    tabbarClass() {
      let {fixed} = this
      let classes = [
        'fy-hairline--top-bottom',
        'fy-tabbar',
        fixed && 'fy-tabbar--fixed'
      ]
      return classes
    }
  },
  
  watch: {
    items() {
      this.setActiveItem()
    },

    value() {
      this.setActiveItem()
    }
  },
  
  methods: {
    setActiveItem() {
      this.items.forEach((item, index)=> {
        item.active = index === this.value
      })
    },

    onChange(active) {
      if (active !== this.value) {
        this.$emit('input', active)
        this.$emit('change', active)
      }
    }
  }
}
</script>

<style lang="less">
  @import './index.less';
</style>
