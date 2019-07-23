<template>
  <div :class="['fy-collapse-item', index && 'fy-hairline--top']">
    <fy-cell
      :icon="icon"
      :size="size"
      :title="title"
      :value="value"
      :label="label"
      :border="border"
      :is-link="isLink"
      :title-class="titleClass"
      :value-class="valueClass"
      :label-class="labelClass"
      :class="['fy-collapse-item__title',
        disabled && 'fy-collapse-item__title--disabled',
        expanded && 'fy-collapse-item__title--expanded']"
      @click="onClick">
      <span slot="icon" v-if="$slots.icon">
        <slot name="icon"></slot>
      </span>
      <div slot="title" v-if="$slots.title">
        <slot name="title"></slot>
      </div>
      <div v-if="$slots.value">
        <slot name="value"></slot>
      </div>
    </fy-cell>
    <div
      class="fy-collapse-item__wrapper"
      v-show="show"
      ref="wrapper"
      @transitionend="onTransitionend">
      <div class="fy-collapse-item__content" ref="content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { isDef } from '../utils/index'
import { raf } from '../utils/raf'
import Cell from '../cell/index'
import FindParentMixin from '../mixins/find-parent'
export default {
  name: 'fy-collapse-item',
  components: {
    [Cell.name]: Cell
  },
  mixins: [FindParentMixin],
  props: {
    icon: String,
    size: String,
    titleClass: String,
    valueClass: String,
    labelClass: String,
    title: [String, Number],
    value: [String, Number],
    label: [String, Number],
    name: [String, Number],
    disabled: Boolean,
    border: {
      type: Boolean,
      default: true
    },
    isLink: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      // inited: null,
      show: null
    };
  },
  computed: {
    items() {
      return this.parent.items
    },

    index() {
      return this.items.indexOf(this)
    },

    currentName() {
      return isDef(this.name) ? this.name : this.index
    },

    expanded() {
      if (!this.parent) {
        return null;
      }
      
      const {value} = this.parent
      return this.parent.accordion
        ? value === this.currentName
        : value.some(name => name === this.currentName);
    }
  },
  watch: {
    expanded(expanded, prev) {
      if (prev === null) {
        return;
      }

      if (expanded) {
        this.show = true;
        // this.inited = true;
      }

      raf(() => {
        const { content, wrapper } = this.$refs;
        if (!content || !wrapper) {
          return;
        }

        const { clientHeight } = content;
        if (clientHeight) {
          const contentHeight = `${clientHeight}px`;
          wrapper.style.height = expanded ? 0 : contentHeight;
          raf(() => {
            wrapper.style.height = expanded ? contentHeight : 0;
          });
        } else {
          this.onTransitionEnd();
        }
      });
    }
  },
  methods: {
    onClick() {
      if (this.disabled) return;
      const {parent} = this
      const name = parent.accordion && this.currentName === parent.value
        ? ''
        : this.currentName
      const expanded = !this.expanded
      this.parent.switch(name, expanded)
    },

    onTransitionend() {
      if (!this.expanded) {
        this.show = false
      } else {
        this.$refs.wrapper.style.height = null
      }
    }
  },
  created() {
    this.findParent('fy-collapse')
    this.parent.items.push(this)
    this.show = this.expanded
    // this.inited = this.expanded
  },

  destroyed() {
    this.parent.items.splice(this.index, 1)
  }
}
</script>

<style lang="less">
  @import './index.less';
</style>
