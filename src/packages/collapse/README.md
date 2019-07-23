## Collapse 折叠面板

### 使用指南
``` javascript
import { Collapse, CollapseItem } from 'fy-elui';

Vue.use(Collapse).use(CollapseItem);
```

### 代码演示

#### 基础用法
通过`v-model`控制展开的面板列表，`activeNames`为数组格式

```html
<fy-collapse v-model="activeNames">
  <fy-collapse-item title="有赞微商城" name="1">
    提供多样店铺模板，快速搭建网上商城
  </fy-collapse-item>
  <fy-collapse-item title="有赞零售" name="2">
    网店吸粉获客、会员分层营销、一机多种收款，告别经营低效和客户流失
  </fy-collapse-item>
  <fy-collapse-item title="有赞美业" name="3" disabled>
    线上拓客，随时预约，贴心顺手的开单收银
  </fy-collapse-item>
</fy-collapse>
```

``` javascript
export default {
  data() {
    return {
      activeNames: ['1']
    };
  }
};
```

#### 手风琴
通过`accordion`可以设置为手风琴模式，最多展开一个面板，此时`activeName`为字符串格式

```html
<fy-collapse v-model="activeName" accordion>
  <fy-collapse-item title="有赞微商城" name="1">
    提供多样店铺模板，快速搭建网上商城
  </fy-collapse-item>
  <fy-collapse-item title="有赞零售" name="2">
    网店吸粉获客、会员分层营销、一机多种收款，告别经营低效和客户流失
  </fy-collapse-item>
  <fy-collapse-item title="有赞美业" name="3">
    线上拓客，随时预约，贴心顺手的开单收银
  </fy-collapse-item>
</fy-collapse>
```

``` javascript
export default {
  data() {
    return {
      activeName: '1'
    };
  }
};
```

#### 自定义标题内容

```html
<fy-collapse v-model="activeNames">
  <fy-collapse-item name="1">
    <div slot="title">有赞微商城<fy-icon name="question-o" /></div>
    提供多样店铺模板，快速搭建网上商城
  </fy-collapse-item>
  <fy-collapse-item
    title="有赞零售"
    name="2"
    icon="shop-o"
  >
    网店吸粉获客、会员分层营销、一机多种收款，告别经营低效和客户流失
  </fy-collapse-item>
</fy-collapse>
```



### Collapse API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|------|------|
| v-model | 当前展开面板的 name | `Array | String | Number` | - | - |
| accordion | 是否开启手风琴模式 | `Boolean` | `false` | - |
| border | 是否显示外边框 | `Boolean` | `true` | - |

### Collapse Event

| 事件名 | 说明 | 参数 |
|------|------|------|
| change | 切换面板时触发 | activeNames: `string | array` |

### CollapseItem API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|------|------|------|
| name | 唯一标识符，默认为索引值 | `String | Number` | `index` | - |
| icon | 标题栏左侧图标名称或图片链接，可选值见 Icon 组件 | `String` | - | - |
| size | 标题栏大小，可选值为 `large` | `String` | - | - |
| title | 标题栏左侧内容 | `String | Number` | - | - |
| value | 标题栏右侧内容 | `String | Number` | - | - |
| label | 标题栏描述信息 | `String | Number`  | - | - |
| border | 是否显示内边框 | `Boolean` | `true` | - |
| is-link | 是否展示标题栏右侧箭头并开启点击反馈 | `Boolean` | `true` | - |
| disabled | 是否禁用面板 | `Boolean` | `false` | - |
| title-class | 左侧标题额外类名 | `String` | - | - |
| value-class | 右侧内容额外类名 | `String` | - | - |
| label-class | 描述信息额外类名 | `String` | - | - |

### CollapseItem Slot

| 名称 | 说明 |
|------|------|
| - | 面板内容 |
| value | 自定义显示内容 |
| icon | 自定义`icon` |
| title | 自定义`title` |
| right-icon | 自定义右侧按钮，默认是`arrow` |
