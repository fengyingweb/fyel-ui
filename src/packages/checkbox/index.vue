<script>
import CheckboxMixin from '../mixins/checkbox'
import SlotsMixin from '../mixins/slots'
export default {
  name: 'fy-checkbox',
  mixins: [SlotsMixin, CheckboxMixin('fy-checkbox-group', 'fy-checkbox')],
  computed: {
    checked: {
      get() {
        return this.parent ? this.parent.value.indexOf(this.name) !== -1 : this.value
      },

      set(val) {
        if (this.parent) {
          this.setParentValue(val)
        } else {
          this.$emit('input', val)
        }
      }
    }
  },

  watch: {
    value(val) {
      this.$emit('change', val)
    }
  },

  methods: {
    toggle() {
      this.checked = !this.checked
    },

    onClickIcon() {
      if (!this.isDisabled) {
        this.toggle()
      }
    },

    onClickLabel() {
      if (!this.isDisabled && !this.labelDisabled) {
        this.toggle()
      }
    },

    setParentValue(val) {
      let {parent} = this
      let value = parent.value.slice()
      if (val) {
        if (parent.max && value.length >= parent.max) {
          return;
        }

        if (value.indexOf(this.name) === -1) {
          value.push(this.name)
          parent.$emit('input', value)
        }
      } else {
        let index = value.indexOf(this.name)
        if (index !== -1) {
          value.splice(index, 1)
          parent.$emit('input', value)
        }
      }
    }
  }
}
</script>

<style lang="less">
  @import './index.less';
</style>
