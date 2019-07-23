<template>
  <fy-cell
    class="fy-switch-cell"
    :center="true"
    :border="border"
    :title="title">
    <fy-switch
      v-model="checked"
      :loading="loading"
      :disabled="disabled"
      :active-color="activeColor"
      :inactive-color="inactiveColor"
      :size="size"
      @change="onChange">
    </fy-switch>
  </fy-cell>
</template>

<script>
import Cell from '../cell/index'
import Switch from '../switch/index'
import {switchProps} from '../switch/share'
export default {
  name: 'fy-switch-cell',
  components: {
    [Cell.name]: Cell,
    [Switch.name]: Switch
  },
  props: {
    ...switchProps,
    title: String,
    border: Boolean,
    size: {
      type: String,
      default: '24px'
    }
  },
  data() {
    return {
      checked: this.value
    }
  },
  watch: {
    value(nVal) {
      if (nVal !== this.checked) {
        this.checked = nVal
      }
    },

    checked(nVal) {
      this.$emit('input', nVal)
      this.$emit('change', nVal)
    }
  },
  methods: {
    onChange(val) {
      this.checked = val
    }
  },
  created() {
    this.checked = this.value
  }
}
</script>

<style lang="less">
  @import './index.less';
</style>
