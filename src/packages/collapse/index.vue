<template>
  <div
    :class="['fy-collapse', border && 'fy-hairline--top-bottom']">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'fy-collapse',
  props: {
    accordion: Boolean,
    value: [String, Number, Array],
    border: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      items: []
    }
  },
  methods: {
    switch(name, expanded) {
      if (!this.accordion) {
        name = expanded
          ? this.value.concat(name)
          : this.value.filter(activeName => activeName !== name);
      }
      this.$emit('change', name);
      this.$emit('input', name);
    }
  }
}
</script>
