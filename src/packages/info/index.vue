<script>
import {isDef} from '../utils/index'
export default {
  name: 'fy-info',
  props: {
    info: [String, Number]
  },

  render(h) {
    let {info} = this
    if (!isDef(info)) {
      return;
    }
    
    return (
      <div class="fy-info">{info}</div>
    )
  }
}
</script>

<style lang="less">
  @import './index.less';
</style>

