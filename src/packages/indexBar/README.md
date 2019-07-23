## IndexBar 索引栏

### 引入

``` javascript
import { IndexBar, IndexAnchor } from 'fy-elui';

Vue.use(IndexBar).use(IndexAnchor);
```

### 代码演示

#### 基础用法

点击索引栏时，会自动跳转到对应的IndexAnchor锚点位置

```html
<fy-index-bar>
  <fy-index-anchor index="A" />
  <fy-cell title="文本" />
  <fy-cell title="文本" />
  <fy-cell title="文本" />

  <fy-index-anchor index="B" />
  <fy-cell title="文本" />
  <fy-cell title="文本" />
  <fy-cell title="文本" />

  ...
</fy-index-bar>
```

#### 自定义索引列表

可以通过index-list属性自定义展示的索引字符列表，

```html
<fy-index-bar :index-list="indexList">
  <fy-index-anchor index="1">标题1</fy-index-anchor>
  <fy-cell title="文本" />
  <fy-cell title="文本" />
  <fy-cell title="文本" />

  <fy-index-anchor index="2">标题2</fy-index-anchor>
  <fy-cell title="文本" />
  <fy-cell title="文本" />
  <fy-cell title="文本" />

  ...
</fy-index-bar>
```

```javascript
export default {
  data() {
    return {
      indexList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    }
  }
}
```

### API

#### IndexBar Props

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|------|------|
| index-list | 索引字符列表 | `Array` | A-Z | - |
| z-index | z-index层级 | `Number` | 1 | - |
| sticky | 是否开启锚点自动吸顶 | `Boolean` | true | - |
| highlight-color | 索引字符高亮颜色 | `String` | #07c160 | - |

#### IndexAnchor Props

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|------|------|
| index-list | 索引字符 | `String/Number` | - | - |

#### IndexBar Events

| 事件名 | 说明 | 回调参数 |
|------|------|------|
| select | 选中字符时触发 | index: 索引字符 |

#### IndexAnchor Slots

| 名称 | 说明 |
| ------ | ------|
| default | 锚点位置显示内容，默认为索引字符 |
