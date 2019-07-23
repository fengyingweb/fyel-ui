## Radio 单选框

### 使用指南
``` javascript
import { RadioGroup, Radio } from 'fy-elui';

Vue.use(RadioGroup);
Vue.use(Radio);
```

### 代码演示

#### 基础用法

通过`v-model`绑定值当前选中项的 name

```html
<fy-radio-group v-model="radio">
  <fy-radio name="1">单选框 1</fy-radio>
  <fy-radio name="2">单选框 2</fy-radio>
</fy-radio-group>
```

```javascript
export default {
  data() {
    return {
      radio: '1'
    }
  }
};
```

#### 禁用状态

通过`disabled`属性禁止选项切换，在`fy-radio`上设置`disabled`可以禁用单个选项

```html
<fy-radio-group v-model="radio" disabled>
  <fy-radio name="1">单选框 1</fy-radio>
  <fy-radio name="2">单选框 2</fy-radio>
</fy-radio-group>
```

#### 自定义颜色

```html
<fy-radio checked-color="#07c160">复选框</fy-radio>
```

#### 自定义图标

通过 icon 插槽自定义图标，可以通过 `slot-scope` 判断是否为选中状态

```html
<fy-radio v-model="checked">
  自定义图标
  <img
    slot="icon"
    slot-scope="props"
    :src="props.checked ? icon.active : icon.normal"
  >
</fy-radio>
```

```js
export default {
  data() {
    checked: true,
    icon: {
      normal: '//img.yzcdn.cn/icon-normal.png',
      active: '//img.yzcdn.cn/icon-active.png'
    }
  }
}
```

#### 与 Cell 组件一起使用

此时你需要再引入`Cell`和`CellGroup`组件。

```html
<fy-radio-group v-model="radio">
  <fy-cell-group>
    <fy-cell title="单选框 1" clickable @click="radio = '1'">
      <fy-radio name="1" />
    </fy-cell>
    <fy-cell title="单选框 2" clickable @click="radio = '2'">
      <fy-radio name="2" />
    </fy-cell>
  </fy-cell-group>
</fy-radio-group>
```

### Radio API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|------|------|
| name | 标识符 | 任意类型 | - | - |
| shape | 形状，可选值为 `square` | `String` | `round` | - |
| disabled | 是否为禁用状态 | `Boolean` | `false` | - |
| label-disabled | 是否禁用文本内容点击 | `Boolean` | `false` | - |
| label-position | 文本位置，可选值为 `left` | `String` | `right` | - |
| checked-color | 选中状态颜色 | `String` | `#1989fa` | - |

### RadioGroup API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|------|------|
| v-model | 当前选中项的标识符 | 任意类型 | - | - |
| disabled | 是否禁用所有单选框 | `Boolean` | `false` | - |

### Radio Event

| 事件名称 | 说明 | 回调参数 |
|------|------|------|
| click | 点击单选框时触发 | event: Event |

### RadioGroup Event

| 事件名称 | 说明 | 回调参数 |
|------|------|------|
| change | 当绑定值变化时触发的事件 | 当前选中项的 name |

### Radio 插槽

| 名称 | 说明 | slot-scope |
|------|------|------|
| - | 自定义文本 | - |
| icon | 自定义图标 | checked: 是否为选中状态 |
