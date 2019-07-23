<script>
import FindParentMixin from '../mixins/find-parent'
import SlotsMixin from '../mixins/slots'
export default {
  name: 'fy-tab-item',
  mixins: [FindParentMixin, SlotsMixin],
  props: {
    title: String,
    disabled: Boolean
  },
  data() {
    return {
      inited: false
    }
  },

  computed: {
    index() {
      return this.parent.tabs.indexOf(this)
    },

    selected() {
      return this.index === this.parent.curActive
    },

    shouldRender() {
      return this.inited || !this.parent.lazyRender
    }
  },

  watch: {
    'parent.curActive'() {
      this.inited = this.inited || this.selected
    },

    title() {
      this.parent.setLine()
    }
  },

  created() {
    this.findParent('fy-tabs')
  },

  mounted() {
    const {tabs} = this.parent
    // const index = this.parent.slots().indexOf(this.$vnode)
    // tabs.splice(index === -1 ? tabs.length : index, 0, this)
    if (tabs.indexOf(this) === -1) {
      tabs.push(this)
    }

    if (this.slots('title')) {
      this.parent.renderTitle(this.$refs.title, this.index)
    }
  },

  beforeDestroy() {
    this.parent.tabs = this.parent.tabs.filter(item => item !== this)
  },

  render(h) {
    const { slots } = this

    return (
      <div vShow={this.selected || this.parent.animated} class="fy-tab__pane">
        {this.shouldRender ? slots() : h()}
        {slots('title') && <div ref="title">{slots('title')}</div>}
      </div>
    );
  }
}
</script>

<style lang="less">

</style>
