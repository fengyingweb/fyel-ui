import Icon from '../icon/index'
import FindParentMixin from './find-parent'

const CheckboxMixin = (parentName, prefix)=> ({
  mixins: [FindParentMixin],

  props: {
    name: null,
    value: null,
    disabled: Boolean,
    checkedColor: String,
    labelPosition: String,
    labelDisabled: Boolean,
    shape: {
      type: String,
      default: 'round'
    }
  },
  
  computed: {
    isDisabled() {
      return (this.parent && this.parent.disabled) || this.disabled
    },

    iconStyle() {
      let {checkedColor} = this
      if (checkedColor && this.checked && !this.isDisabled) {
        return {
          borderColor: checkedColor,
          backgroundColor: checkedColor
        }
      }
    }
  },

  created() {
    this.findParent(parentName)
  },

  render(h) {
    const {slots, checked} = this
    const CheckIcon = slots('icon', {checked}) || (
      <Icon name="success" style={this.iconStyle} />
    )

    const Label = slots() && (
      <span
        class={[
          `${prefix}__label`,
          this.labelPosition && `${prefix}__label--${this.labelPosition}`,
          this.isDisabled && `${prefix}__label--disabled`]}
        onClick={this.onClickLabel}>
        {slots()}
      </span>
    )

    return (
      <div
        class={prefix}
        onClick={(event)=> {
          this.$emit('click', event)
        }}>
        <div
          class={[
            `${prefix}__icon`,
            `${prefix}__icon--${this.shape}`,
            this.isDisabled && `${prefix}__icon--disabled`,
            checked && `${prefix}__icon--checked`
            ]}
          onClick={(event)=> {
            event.stopPropagation()
            this.onClickIcon()
            this.$emit('click', event)
          }}>
          {CheckIcon}
        </div>
        {Label}
      </div>
    )
  }
})

export default CheckboxMixin
