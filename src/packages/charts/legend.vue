<script>
import { camelAttrs } from './util'

export default {
  name: 'fy-legend',
  props: {
    options: {
      type: Object,
      default () {
        return {}
      }
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  created () {
    this.$parent.setLegend({
      ...this.options,
      disabled: this.disabled,
      ...camelAttrs(this.$attrs)
    })
  },
  render () {}
}
</script>
