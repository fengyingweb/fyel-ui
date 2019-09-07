## QRcode 二维码

### 使用指南
``` javascript
import { QRcode } from 'fy-elui';

Vue.use(QRcode);
```

### 代码演示

支持类型为img, canvas, 默认为img
``` html
<fy-qrcode type="img" :value="url" :fg-color="fgColor"></fy-qrcode>
<fy-qrcode type="canvas" :value="url" :fg-color="fgColor"></fy-qrcode>
```

``` javascript
<script>
export default {
  data() {
    return {
      url: '', // 生成二维码的链接
      fgColor: '#000' // 二维码着色
    }
  }
}
</script>
```

### API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|------|------|
| type | 渲染类型，可以为img(适合需要在微信需要长按识别的场景)和canvas | `String` | `img` | 1.0.8 |
| value | 编码内容，如果为链接，请保证有http(s)协议名 | `String` | - | 1.0.8 |
| size | 尺寸大小 | `Number` | `160` | 1.0.8 |
| bg-color | 背景颜色 | `String` | `#ffffff` | 1.0.8 |
| fg-color | 二维码着色 | `String` | `#000000` | 1.0.8 |
