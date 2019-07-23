## Steps 步骤条

### 使用指南
``` javascript
import { Step, Steps } from 'fy-elui';

Vue.use(Step).use(Steps);
```

### 代码演示

#### 基础用法

```html
<fy-steps :active="active">
  <fy-step>买家下单</fy-step>
  <fy-step>商家接单</fy-step>
  <fy-step>买家提货</fy-step>
  <fy-step>交易完成</fy-step>
</fy-steps>
```

```javascript
export default {
  data() {
    return {
      active: 1
    };
  }
}
```

#### 自定义样式

可以通过`active-icon`和`active-color`属性设置激活状态下的图标和颜色

```html
<fy-steps
  :active="active"
  active-icon="success"
  active-color="#38f"
>
  <fy-step>买家下单</fy-step>
  <fy-step>商家接单</fy-step>
  <fy-step>买家提货</fy-step>
  <fy-step>交易完成</fy-step>
</fy-steps>
```

#### 竖向步骤条

可以通过设置`direction`属性来改变步骤条的显示方向

```html
<fy-steps direction="vertical" :active="0">
  <fy-step>
    <h3>【城市】物流状态1</h3>
    <p>2016-07-12 12:40</p>
  </fy-step>
  <fy-step>
    <h3>【城市】物流状态2</h3>
    <p>2016-07-11 10:00</p>
  </fy-step>
  <fy-step>
    <h3>快件已发货</h3>
    <p>2016-07-10 09:30</p>
  </fy-step>
</fy-steps>
```

### Steps API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|------|------|
| active | 当前步骤 | `Number` | 0 | - |
| title | 顶部描述栏标题 | `String` | - | - |
| description | 顶部描述栏文字 | `String` | - | - |
| icon | 顶部描述栏图标 | `String` | - | - |
| icon-class | 顶部描述栏图标额外类名 | `String` | - | - |
| direction | 显示方向，可选值为 `vertical` | `String` | `horizontal` | - |
| active-icon | 激活状态底部图标，可选值见 Icon 组件 | `String` | `checked` | 1.6.9 |
| active-color | 激活状态颜色 | `String` | `#07c160` | - |

### Steps Slot

| 名称 | 说明 |
|------|------|
| icon | 自定义icon区域 |
| message-extra | 状态栏添加额外的元素 |
