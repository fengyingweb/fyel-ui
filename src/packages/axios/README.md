## 发送 ajax 请求

> 插件依赖于 [axios](https://github.com/axios/axios)
> 详细Api文档请查看 [axios](https://github.com/axios/axios)

### 引入

`main.js` 入口文件中引入：

```javascript
import { Axios } from 'fy-elui'
Vue.use(Axios)
```

### 兼容性问题

需要注意的是`axios`是基于`Promise`的，因此如果你需要兼容低版本浏览器([caniuse](https://caniuse.com/#feat=promises))，需要引入`polyfill`。

`Polyfill` 推荐使用 [es6-promise](https://github.com/stefanpenner/es6-promise)

```javascript
require('es6-promise').polyfill()
```

### 全局使用

```javascript
Vue.axios.post('/api').then()
```

### 组件中使用

```javascript
export default {
  created () {
    this.$axios.post('/api').then(({data}) => {
      console.log(data)
    })
  }
}
```
