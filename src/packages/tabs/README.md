## Tab 标签页

### 使用指南
``` javascript
import { Tab, Tabs } from 'fy-elui';

Vue.use(Tab).use(Tabs);
```

### 代码演示

#### 基础用法

默认情况下启用第一个标签，可以通过`v-model`绑定当前激活的标签索引

```html
<fy-tabs v-model="active">
  <fy-tab-item title="标签 1">内容 1</fy-tab-item>
  <fy-tab-item title="标签 2">内容 2</fy-tab-item>
  <fy-tab-item title="标签 3">内容 3</fy-tab-item>
  <fy-tab-item title="标签 4">内容 4</fy-tab-item>
</fy-tabs>
```

```js
export default {
  data() {
    return {
      active: 2
    };
  }
}
```

#### 横向滚动

多于 4 个标签时，Tab 可以横向滚动

```html
<fy-tabs>
  <fy-tab-item v-for="index in 8" :title="'标签 ' + index">
    内容 {{ index }}
  </fy-tab-item>
</fy-tabs>
```

#### 禁用标签

设置`disabled`属性即可禁用标签。如果需要监听禁用标签的点击事件，可以在`fy-tabs`上监听`disabled`事件

```html
<fy-tabs @disabled="onClickDisabled">
  <fy-tab-item title="标签 1">内容 1</fy-tab-item>
  <fy-tab-item title="标签 2" disabled>内容 2</fy-tab-item>
  <fy-tab-item title="标签 3">内容 3</fy-tab-item>
</fy-tabs>
```

```javascript
export default {
  methods: {
    onClickDisabled(index, title) {
      this.$toast(title + '已被禁用');
    }
  }
};
```

#### 样式风格

`Tab`支持两种样式风格：`line`和`card`，默认为`line`样式，可以通过`type`属性修改样式风格

```html
<fy-tabs type="card">
  <fy-tab-item title="标签 1">内容 1</fy-tab-item>
  <fy-tab-item title="标签 2">内容 2</fy-tab-item>
  <fy-tab-item title="标签 3">内容 3</fy-tab-item>
</fy-tabs>
```

#### 点击事件

可以在`fy-tabs`上绑定`click`事件，事件传参为标签对应的索引和标题

```html
<fy-tabs @click="onClick">
  <fy-tab-item title="标签 1">内容 1</fy-tab-item>
  <fy-tab-item title="标签 2">内容 2</fy-tab-item>
</fy-tabs>
```

```javascript
export default {
  methods: {
    onClick(index, title) {
      this.$toast(title);
    }
  }
};
```

#### 粘性布局

通过`sticky`属性可以开启粘性布局，粘性布局下，当 Tab 滚动到顶部时会自动吸顶

```html
<fy-tabs v-model="active" sticky>
  <fy-tab-item v-for="index in 4" :title="'选项 ' + index">
    内容 {{ index }}
  </fy-tab-item>
</fy-tabs>
```

#### 自定义标签

通过 title 插槽可以自定义标签内容

```html
<fy-tabs v-model="active">
  <fy-tab-item v-for="index in 2">
    <div slot="title">
      <fy-icon name="more-o" />选项
    </div>
    内容 {{ index }}
  </fy-tab-item>
</fy-tabs>
```

#### 切换动画

通过`animated`属性可以开启切换标签内容时的转场动画

```html
<fy-tabs v-model="active" animated>
  <fy-tab-item v-for="index in 4" :title="'选项 ' + index">
    内容 {{ index }}
  </fy-tab-item>
</fy-tabs>
```

#### 滑动切换

通过`swipeable`属性可以开启滑动切换标签页

```html
<fy-tabs v-model="active" swipeable>
  <fy-tab-item v-for="index in 4" :title="'选项 ' + index">
    内容 {{ index }}
  </fy-tab-item>
</fy-tabs>
```

### Tabs API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|------|------|
| v-model | 当前标签的索引 | `String` `Number` | `0` | - |
| type | 样式类型，可选值为`card` | `String` | `line` | - |
| duration | 动画时间，单位秒 | `Number` | `0.3` | - |
| background | 标签栏背景色 | `String` | `white` | - |
| line-width | 底部条宽度，单位 px | `Number` | - | - |
| line-height | 底部条高度，单位 px | `Number` | 3 | - |
| color | 标签主题色 | `String` | `#f44` | 1.2.0 |
| title-active-color | 标题选中态颜色 | `String` | - | - |
| title-inactive-color | 标题默认态颜色 | `String` | - | - |
| swipeable | 是否开启手势滑动切换 | `Boolean` | `false` | - |
| sticky | 是否使用粘性定位布局 | `Boolean` | `false` | - |
| offset-top | 粘性定位布局下与顶部的最小距离，单位 px | `Number` | `0` | - |
| swipe-threshold | 滚动阈值，标签数量超过多少个可滚动 | `Number` | `4` | - |
| animated | 是否开启切换标签内容时的转场动画 | `Boolean` | `false` | - |
| ellipsis | 是否省略过长的标题文字 | `Boolean` | `true` | - |
| lazy-render | 是否开启标签页内容延迟渲染 | `Boolean` | `true` | - |

### TabItem API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|------|------|
| title | 标题 | `String` | - | - |
| disabled | 是否禁用标签 | `Boolean` | `false` | - |

### Tabs Slot

| 名称 | 说明 |
|------|------|
| nav-left | 标题左侧内容 |
| nav-right | 标题右侧内容 |

### TabItem Slot

| 名称 | 说明 |
|------|------|
| default | 标签页内容 |
| title | 自定义标签 |

### Tabs Event

| 事件名 | 说明 | 参数 |
|------|------|------|
| click | 点击标签时触发 | index：标签索引，title：标题 |
| change | 当前激活的标签改变时触发 | index：标签索引，title：标题 |
| disabled | 点击被禁用的标签时触发 | index：标签索引，title：标题 |
| scroll | 滚动时触发，仅在 sticky 模式下生效 | { scrollTop: 距离顶部位置, isFixed: 是否吸顶 } |
