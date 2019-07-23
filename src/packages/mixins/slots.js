const SlotsMixin = {
  methods: {
    slots(name = 'default', props) {
      const {$slots, $scopedSlots} = this
      if ($scopedSlots[name]) {
        return $scopedSlots[name](props)
      }
      return $slots[name]
    }
  }
}

export default SlotsMixin
