<script>
import SlotsMixin from '../mixins/slots'
export default {
  name: 'fy-checkbox-group',
  mixins: [SlotsMixin],
  props: {
    value: Array,
    max: Number,
    disabled: Boolean
  },
  watch: {
    value(val) {
      this.$emit('change', val)
    }
  },

  render(h) {
    return (
      <div class="fy-checkbox-group">{this.slots()}</div>
    )
  }
}
</script>