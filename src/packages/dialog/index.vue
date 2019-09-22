<template>
  <transition name="fy-dialog-bounce">
    <div :class="['fy-dialog', className]" v-if="value && shouldRender">
      <div :class="titleClass" v-if="title">{{title}}</div>
      <div class="fy-dialog__content" v-if="$slots.default || message">
        <slot>
          <div :class="messageClass" v-html="message"></div>
        </slot>
      </div>
      <div
        :class="[
          'fy-hairline--top',
          'fy-dialog__footer',
          hasButtons && 'fy-dialog__footer--buttons']">
          <fy-button
            v-if="showCancelButton"
            class="fy-dialog__cancel"
            size="large"
            :loading="loading.cancel"
            :text="cancelButtonText"
            @click="handleAction('cancel')">
          </fy-button>

          <fy-button
            v-if="showConfirmButton"
            :class="['fy-dialog__confirm', hasButtons && 'fy-hairline--left']"
            size="large"
            :loading="loading.confirm"
            :text="confirmButtonText"
            @click="handleAction('confirm')">
          </fy-button>
      </div>
    </div>
  </transition>
</template>

<script>
import PopupMixin from '../mixins/popup/index';
import Button from '../button/index';
export default {
  name: 'fy-dialog',
  components: {
    [Button.name]: Button
  },
  mixins: [PopupMixin],
  props: {
    title: String,
    message: String,
    className: String,
    callback: Function,
    beforeClose: Function,
    messageAlign: String,
    confirmButtonText: {
      type: String,
      default: '确认'
    },
    cancelButtonText: {
      type: String,
      default: '取消'
    },
    showCancelButton: Boolean,
    showConfirmButton: {
      type: Boolean,
      default: true
    },
    overlay: {
      type: Boolean,
      default: true
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      loading: {
        confirm: false,
        cancel: false
      }
    }
  },

  computed: {
    titleClass() {
      let {message, $slots} = this
      let classes = [
        'fy-dialog__header',
        {'fy-dialog__header--isolated': !message && !$slots.default}
      ]
      return classes
    },

    messageClass() {
      let {title, messageAlign} = this
      let classes = [
        'fy-dialog__message',
        title && 'fy-dialog__message--has-title',
        messageAlign && `fy-dialog__message--${messageAlign}`
      ]
      return classes
    },

    hasButtons() {
      return this.showCancelButton && this.showConfirmButton
    }
  },

  methods: {
    onClickOverlay() {
      this.handleAction('overlay');
    },

    handleAction(action) {
      this.$emit(action);

      if (this.beforeClose) {
        this.loading[action] = true;
        this.beforeClose(action, state => {
          if (state !== false) {
            this.onClose(action);
          }
          this.loading[action] = false;
        });
      } else {
        this.onClose(action);
      }
    },

    onClose(action) {
      this.close();

      if (this.callback) {
        this.callback(action);
      }
    }
  }
}
</script>

<style lang="less">
  @import './index.less';
</style>
