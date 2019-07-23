## Loading 加载

### 使用指南
``` javascript
import { Loading } from 'fy-elui';

Vue.use(Loading);
```

### 代码演示

#### Circular

```html
<fy-loading />
<fy-loading color="white" />
```

#### Spinner

```html
<fy-loading type="spinner" />
<fy-loading type="spinner" color="white" />
```

### API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|------|------|
| color | 颜色 | `String` | `#c9c9c9` | - |
| type | 类型，可选值为 `spinner` | `String` | `circular` | - |
| size | 大小 | `String` | `30px` | - |
