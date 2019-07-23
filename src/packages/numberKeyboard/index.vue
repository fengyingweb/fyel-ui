<template>
  <transition :name="transition ? 'fy-slide-up' : ''">
    <div
      v-if="show"
      :class="['fy-number-keyboard', `fy-number-keyboard--${theme}`]"
      :style="{zIndex: zIndex}"
      @touchstart="onTouchstart"
      @animationend="onAnimationend"
      @webkitanimationend="onAnimationend">
      <div
        v-if="title || showTitleClose || $slots['title-left']"
        class="fy-number-keyboard__title fy-hairline--top">
        <slot name="title-left">
          <span>{{title}}</span>
        </slot>
        <span v-if="showTitleClose" class="fy-number-keyboard__close" @click="onClose">{{closeButtonText}}</span>
      </div>
      <div class="fy-number-keyboard__body">
        <fy-key
          v-for="key in keys"
          :key="key.text"
          :type="key.type ? key.type : []"
          :text="key.text"
          @press="onPress">
        </fy-key>
      </div>
      <div v-if="theme === 'custom'" class="fy-number-keyboard__sidebar">
        <fy-key :text="deleteButtonText" :type="delKeyType" @press="onPress"></fy-key>
        <fy-key :text="closeButtonText" :type="closeKeyType" @press="onPress"></fy-key>
      </div>
    </div>
  </transition>
</template>

<script>
import {stop} from '../utils/event'
import Key from './key.vue'
const CLOSE_KEY_TYPE = ['blue', 'big']
const DELETE_KEY_TYPE = ['delete', 'big', 'gray']
export default {
  name: 'fy-number-keyboard',
  components: {
    [Key.name]: Key
  },
  props: {
    show: Boolean,
    title: String,
    closeButtonText: String,
    deleteButtonText: {
      type: String,
      default: '删除'
    },
    theme: {
      type: String,
      default: 'default'
    },
    extraKey: {
      type: String,
      default: ''
    },
    zIndex: {
      type: Number,
      default: 100
    },
    transition: {
      type: Boolean,
      default: true
    },
    showDeleteKey: {
      type: Boolean,
      default: true
    },
    hideOnClickOutside: {
      type: Boolean,
      default: true
    },
    safeAreaInsetBottom: {
      type: Boolean,
      default: false
    }
  },
  
  data() {
    return {
      closeKeyType: CLOSE_KEY_TYPE,
      delKeyType: DELETE_KEY_TYPE
    }
  },

  watch: {
    show() {
      if (!this.transition) {
        this.$emit(this.show ? 'show' : 'hide')
      }
    }
  },

  computed: {
    keys() {
      let keys = []
      for(let i = 1; i <= 9; i++) {
        keys.push({text: i})
      }

      switch(this.theme) {
        case 'default':
          keys.push(
            {text: this.extraKey, type: ['gray']},
            {text: 0},
            {text: this.deleteButtonText, type: ['gray', 'delete']}
          )
          break;
        case 'custom':
          keys.push(
            {text: 0, type: ['middle']},
            {text: this.extraKey}
          )
          break;
      }
      return keys
    },

    showTitleClose() {
      let {theme, closeButtonText} = this
      return closeButtonText && theme === 'default'
    }
  },

  methods: {
    onPress(text) {
      if (text === '') {
        return;
      }

      if (text === this.deleteButtonText) {
        this.$emit('delete')
      } else if (text === this.closeButtonText) {
        this.onClose()
      } else {
        this.$emit('input', text)
      }
    },

    onTouchstart(event) {
      stop(event)
    },

    onAnimationend() {
      this.$emit(this.show ? 'show' : 'hide')
    },

    onClose() {
      this.$emit('close')
      this.onBlur()
    },

    onBlur() {
      this.$emit('blur')
    },

    handlers(action) {
      if (this.$isServer) {
        return;
      }

      if (action !== this.handlerStatus && this.hideOnClickOutside) {
        this.handlerStatus = action
        document.body[(action ? 'add' : 'remove') + 'EventListener']('touchstart', this.onBlur)
      }
    }
  },

  mounted() {
    this.handlers(true)
  },

  destroyed() {
    this.handlers(false)
  },

  activated() {
    this.handlers(true)
  },

  deactivated() {
    this.handlers(false)
  }
}
</script>

<style lang="less">
  @import './index.less';
</style>
