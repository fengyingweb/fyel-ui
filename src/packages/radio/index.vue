<script>
import CheckboxMixin from '../mixins/checkbox'
import SlotsMixin from '../mixins/slots'
export default {
  name: 'fy-radio',
  mixins: [SlotsMixin, CheckboxMixin('fy-radio-group', 'fy-radio')],
  computed: {
    currentValue: {
      get() {
        return this.parent ? this.parent.value : this.value
      },

      set(val) {
        (this.parent || this).$emit('input', val)
      }
    },

    checked() {
      return this.currentValue === this.name
    }
  },

  methods: {
    onClickIcon() {
      if (!this.isDisabled) {
        this.currentValue = this.name
      }
    },

    onClickLabel() {
      if (!this.isDisabled && !this.labelDisabled) {
        this.currentValue = this.name
      }
    }
  }
}
</script>

<style lang="less">
  @import './index.less';
</style>
