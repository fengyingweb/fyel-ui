<script>
import SlotsMixin from '../mixins/slots'
export default {
  name: 'fy-radio-group',
  mixins: [SlotsMixin],
  props: {
    value: null,
    disabled: Boolean
  },
  watch: {
    value(val) {
      this.$emit('change', val)
    }
  },

  render(h) {
    return (
      <div class="fy-radio-group">{this.slots()}</div>
    )
  }
}
</script>
