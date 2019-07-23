<template>
  <i
    :class="keyClass"
    @touchstart="onFocus"
    @touchmove="onBlur"
    @touchend="onBlur"
    @touchcancel="onBlur"
    >{{text}}</i>
</template>

<script>
export default {
  name: 'fy-key',
  props: {
    type: Array,
    text: [String, Number]
  },

  data() {
    return {
      active: false
    }
  },

  computed: {
    keyClass() {
      let types = []
      if (this.type.length) {
        types = this.type.slice(0)
      }
      this.active && types.push('active')
      types = types.map(type=> {
        type = `fy-key--${type}`
        return type
      })
      let classes = [
        'fy-hairline',
        'fy-key'
      ].concat(types)
      return classes
    }
  },

  methods: {
    onFocus() {
      this.active = true
      this.$emit('press', this.text)
    },

    onBlur(event) {
      event.preventDefault()
      event.stopPropagation()
      this.active = false
    }
  }
}
</script>
