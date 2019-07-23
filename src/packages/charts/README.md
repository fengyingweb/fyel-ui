## Chart

Chart 基于[F2@蚂蚁金服(MIT license)](https://antv.alipay.com/zh-cn/f2/3.x/)封装的图表组件。

F2 是专为移动端定制的一套开箱即用的可视化解决方案，具有精简、高性能、易扩展的特性，适用于对性能、大小、扩展性要求严苛的场景。

组件部分属性可能未列出，可以直接参考 [F2文档](https://antv.alipay.com/zh-cn/f2/3.x/api/index.html)

### 使用指南
``` javascript
import {Chart, Line, ChartArea, Bar, Pie, Point, Scale, Axis, Guide, Tooltip, Legend} from 'fy-elui'
export default {
  components: {
    [Chart.name]: Chart,
    [Line.name]: Line,
    [ChartArea.name]: ChartArea,
    [Bar.name]: Bar,
    [Pie.name]: Pie,
    [Point.name]: Point,
    [Scale.name]: Scale,
    [Axis.name]: Axis,
    [Guide.name]: Guide,
    [Tooltip.name]: Tooltip,
    [Legend.name]: Legend
  }
}
```
### tips:
全局设置分辨率(devicePixelRatio)

``` js
  // 入口文件处设置
  Vue.prototype.$devicePixelRatio = 2
```
  自定义渲染行为

  在面对复杂的渲染逻辑时，直接使用组件无法满足。此时可以这样处理：

``` html
  <fy-chart
    prevent-render
    @on-render="renderVChart"></fy-chart>
```

``` js
  methods: {
    renderVChart ({ chart }) {
      // do what you want
    }
  }
```
    -
      q: 修改子组件配置不会自动刷新
      a: |
        是的，考虑到移动端更多是展示而不是操作，暂时不支持自动刷新。
    -
      q: 为什么我自己封装时会报错
      a: |

        要先了解 Vue 组件的生命周期，在 canvas 元素未 mounted 前 F2 无法正确渲染。

        ``` js
        mounted () {
          this.$nextTick(( => {
            // do what you want with F2
          })
        }
        ```

### 基本折线图

```html
<fy-chart :data="data1" prevent-default>
  <fy-scale x :tick-count="3" />
  <fy-tooltip :show-item-marker="true" show-x-value />
  <fy-line />
</fy-chart>
```

```javascript
export default {
  data() {
    return {
      data1: [
        { date: '2017-06-05', value: 116 },
        { date: '2017-06-06', value: 129 },
        { date: '2017-06-07', value: 135 },
        { date: '2017-06-08', value: 86 },
        { date: '2017-06-09', value: 73 },
        { date: '2017-06-10', value: 85 },
        { date: '2017-06-11', value: 73 },
        { date: '2017-06-12', value: 68 },
        { date: '2017-06-13', value: 92 },
        { date: '2017-06-14', value: 130 },
        { date: '2017-06-15', value: 245 }
      ]
    }
  }
}
```

### 折线图:平滑曲线

```html
<fy-chart :data="data2">
  <fy-scale x type="timeCat" mask="MM/DD" :tick-count="3" />
  <fy-scale y :min="0" alias="日均温度" :tick-count="5" />
  <fy-point
    :style="{
      stroke: '#fff',
      lineWidth: 1
    }"
    shape="smooth" />
  <fy-line shape="smooth" />
</fy-chart>
```

```javascript
export default {
  data() {
    return {
      data2: [
        { time: '2016-08-08 00:00:00', tem: 10 },
        { time: '2016-08-08 00:10:00', tem: 22 },
        { time: '2016-08-08 00:30:00', tem: 20 },
        { time: '2016-08-09 00:35:00', tem: 26 },
        { time: '2016-08-09 01:00:00', tem: 20 },
        { time: '2016-08-09 01:20:00', tem: 26 },
        { time: '2016-08-10 01:40:00', tem: 28 },
        { time: '2016-08-10 02:00:00', tem: 20 },
        { time: '2016-08-10 02:20:00', tem: 18 }
      ]
    }
  }
}
```
### 动态数据：实时折线

```html
<fy-chart :data="data3" ref="demo1">
  <fy-scale x type="timeCat" :tick-count="3" mask="hh:mm:ss" />
  <fy-scale y :min="8" :tick-count="5" />
  <fy-tooltip :show-item-marker="false" show-x-value />
  <fy-guide type="html" :options="guide1" />
  <fy-guide type="html" :options="guide2" />
  <fy-line />
</fy-chart>
```

```javascript
export default {
  data() {
    return {
      guide1: {
        position (xScale, yScales) {
          const xValues = xScale.values
          const yValues = yScales[0].values
          const xMax = xValues[xValues.length - 1]
          const yMax = yValues[yValues.length - 1]
          return [ xMax, yMax ]
        },
        html: '<div style="border-radius: 100%;border: none;width: 12px;height: 12px;background-color: rgb(24, 144, 255);transition: top 0.35s cubic-bezier(0.23, 1, 0.32, 1);"></div>'
      },
      guide2: {
        position (xScale, yScales) {
          const xValues = xScale.values
          const yValues = yScales[0].values
          const xMax = xValues[xValues.length - 1]
          const yMax = yValues[yValues.length - 1]
          return [ xMax, yMax ]
        },
        html: '<div style="border-radius: 100%;border: none;width: 20px;height: 20px;background-color: rgba(24, 144, 255, 0.5);transition: top 0.35s cubic-bezier(0.23, 1, 0.32, 1);"></div>'
      }
    }
  }
}
```
### 折线图：渐变

```html
<fy-chart :data="data4">
  <fy-scale x :tick-count="5" :max="2020" />
  <fy-line shape="smooth" :colors="gradient"/>
  <fy-guide type="tag" :options="tag" />
  <fy-chart-area shape="smooth" :colors="gradient"/>
</fy-chart>
```

```javascript
export default {
  data() {
    return {
      data4: [
        { year: 2000, age: 27.2 },
        { year: 2001, age: 27.5 },
        { year: 2002, age: 27.8 },
        { year: 2003, age: 28 },
        { year: 2004, age: 28.2 },
        { year: 2005, age: 28.4 },
        { year: 2006, age: 28.8 },
        { year: 2007, age: 28.8 },
        { year: 2008, age: 28.8 },
        { year: 2009, age: 28.8 },
        { year: 2010, age: 28.9 },
        { year: 2011, age: 29 },
        { year: 2012, age: 29.3 },
        { year: 2013, age: 29.4 },
        { year: 2014, age: 29.5 },
        { year: 2015, age: 29.7 },
        { year: 2016, age: 30 },
        { year: 2017, age: 30.12 }
      ],
      gradient: [
        [0, '#F2C587'],
        [0.5, '#ED7973'],
        [1, '#8659AF']
      ],
      tag: {
        position: [ 2017, 30.12 ],
        content: '30.12',
        direct: 'tl',
        offsetY: -5,
        background: {
          fill: '#8659AF'
        },
        pointStyle: {
          fill: '#8659AF'
        }
      }
    }
  }
}
```

### 折线图:对比

```html
<fy-chart :data="data5">
  <fy-line series-field="type" />
</fy-chart>
```

```javascript
export default {
  data() {
    return {}
  }
}
```

### 层叠面积图

```html
<fy-chart :data="data6">
  <fy-scale x field="date" type="timeCat" mask="MM-DD" />
  <fy-scale y field="value" :tick-count="4" :max="300" />
  <fy-tooltip show-crosshairs show-value-in-legend />

  <fy-chart-area series-field="city" shape="smooth" adjust="stack" />
  <fy-line series-field="city" shape="smooth" adjust="stack" />
</fy-chart>
```

```javascript
export default {
  data() {
    return {
      data6: [
        { value: 63.4, city: 'New York', date: '2011-10-01' },
        { value: 62.7, city: 'Alaska', date: '2011-10-01' },
        { value: 72.2, city: 'Austin', date: '2011-10-01' },
        { value: 58, city: 'New York', date: '2011-10-02' },
        { value: 59.9, city: 'Alaska', date: '2011-10-02' },
        { value: 67.7, city: 'Austin', date: '2011-10-02' },
        { value: 53.3, city: 'New York', date: '2011-10-03' },
        { value: 59.1, city: 'Alaska', date: '2011-10-03' },
        { value: 69.4, city: 'Austin', date: '2011-10-03' },
        { value: 55.7, city: 'New York', date: '2011-10-04' },
        { value: 58.8, city: 'Alaska', date: '2011-10-04' },
        { value: 68, city: 'Austin', date: '2011-10-04' },
        { value: 64.2, city: 'New York', date: '2011-10-05' },
        { value: 58.7, city: 'Alaska', date: '2011-10-05' },
        { value: 72.4, city: 'Austin', date: '2011-10-05' },
        { value: 58.8, city: 'New York', date: '2011-10-06' },
        { value: 57, city: 'Alaska', date: '2011-10-06' },
        { value: 77, city: 'Austin', date: '2011-10-06' },
        { value: 57.9, city: 'New York', date: '2011-10-07' },
        { value: 56.7, city: 'Alaska', date: '2011-10-07' },
        { value: 82.3, city: 'Austin', date: '2011-10-07' },
        { value: 61.8, city: 'New York', date: '2011-10-08' },
        { value: 56.8, city: 'Alaska', date: '2011-10-08' },
        { value: 78.9, city: 'Austin', date: '2011-10-08' },
        { value: 69.3, city: 'New York', date: '2011-10-09' },
        { value: 56.7, city: 'Alaska', date: '2011-10-09' },
        { value: 68.8, city: 'Austin', date: '2011-10-09' },
        { value: 71.2, city: 'New York', date: '2011-10-10' },
        { value: 60.1, city: 'Alaska', date: '2011-10-10' },
        { value: 68.7, city: 'Austin', date: '2011-10-10' },
        { value: 68.7, city: 'New York', date: '2011-10-11' },
        { value: 61.1, city: 'Alaska', date: '2011-10-11' },
        { value: 70.3, city: 'Austin', date: '2011-10-11' },
        { value: 61.8, city: 'New York', date: '2011-10-12' },
        { value: 61.5, city: 'Alaska', date: '2011-10-12' },
        { value: 75.3, city: 'Austin', date: '2011-10-12' },
        { value: 63, city: 'New York', date: '2011-10-13' },
        { value: 64.3, city: 'Alaska', date: '2011-10-13' },
        { value: 76.6, city: 'Austin', date: '2011-10-13' },
        { value: 66.9, city: 'New York', date: '2011-10-14' },
        { value: 67.1, city: 'Alaska', date: '2011-10-14' },
        { value: 66.6, city: 'Austin', date: '2011-10-14' },
        { value: 61.7, city: 'New York', date: '2011-10-15' },
        { value: 64.6, city: 'Alaska', date: '2011-10-15' },
        { value: 68, city: 'Austin', date: '2011-10-15' },
        { value: 61.8, city: 'New York', date: '2011-10-16' },
        { value: 61.6, city: 'Alaska', date: '2011-10-16' },
        { value: 70.6, city: 'Austin', date: '2011-10-16' },
        { value: 62.8, city: 'New York', date: '2011-10-17' },
        { value: 61.1, city: 'Alaska', date: '2011-10-17' },
        { value: 71.1, city: 'Austin', date: '2011-10-17' },
        { value: 60.8, city: 'New York', date: '2011-10-18' },
        { value: 59.2, city: 'Alaska', date: '2011-10-18' },
        { value: 70, city: 'Austin', date: '2011-10-18' },
        { value: 62.1, city: 'New York', date: '2011-10-19' },
        { value: 58.9, city: 'Alaska', date: '2011-10-19' },
        { value: 61.6, city: 'Austin', date: '2011-10-19' },
        { value: 65.1, city: 'New York', date: '2011-10-20' },
        { value: 57.2, city: 'Alaska', date: '2011-10-20' },
        { value: 57.4, city: 'Austin', date: '2011-10-20' },
        { value: 55.6, city: 'New York', date: '2011-10-21' },
        { value: 56.4, city: 'Alaska', date: '2011-10-21' },
        { value: 64.3, city: 'Austin', date: '2011-10-21' },
        { value: 54.4, city: 'New York', date: '2011-10-22' },
        { value: 60.7, city: 'Alaska', date: '2011-10-22' },
        { value: 72.4, city: 'Austin', date: '2011-10-22' },
        { value: 54.4, city: 'New York', date: '2011-10-23' },
        { value: 65.1, city: 'Alaska', date: '2011-10-23' },
        { value: 72.4, city: 'Austin', date: '2011-10-23' },
        { value: 54.8, city: 'New York', date: '2011-10-24' },
        { value: 60.9, city: 'Alaska', date: '2011-10-24' },
        { value: 72.5, city: 'Austin', date: '2011-10-24' }
      ]
    }
  }
}
```

### 层叠柱状图

```html
<fy-chart ref="demo2" :data="data7">
  <fy-scale x field="月份" />
  <fy-scale y field="月均降雨量" />
  <fy-bar series-field="name" adjust="stack" />
  <fy-tooltip show-value-in-legend />
</fy-chart>
      
<div class="btn-box">
  <fy-button type="primary" plain @click.native="$refs.demo2.rerender()">rerender</fy-button>
</div>
```

```javascript
export default {
  data() {
    return {
      data7: [
        { name: 'London', 月份: 'Jan.', 月均降雨量: 18.9 },
        { name: 'London', 月份: 'Feb.', 月均降雨量: 28.8 },
        { name: 'London', 月份: 'Mar.', 月均降雨量: 39.3 },
        { name: 'London', 月份: 'Apr.', 月均降雨量: 81.4 },
        { name: 'London', 月份: 'May.', 月均降雨量: 47 },
        { name: 'London', 月份: 'Jun.', 月均降雨量: 20.3 },
        { name: 'London', 月份: 'Jul.', 月均降雨量: 24 },
        { name: 'London', 月份: 'Aug.', 月均降雨量: 35.6 },
        { name: 'Berlin', 月份: 'Jan.', 月均降雨量: 12.4 },
        { name: 'Berlin', 月份: 'Feb.', 月均降雨量: 23.2 },
        { name: 'Berlin', 月份: 'Mar.', 月均降雨量: 34.5 },
        { name: 'Berlin', 月份: 'Apr.', 月均降雨量: 99.7 },
        { name: 'Berlin', 月份: 'May.', 月均降雨量: 52.6 },
        { name: 'Berlin', 月份: 'Jun.', 月均降雨量: 35.5 },
        { name: 'Berlin', 月份: 'Jul.', 月均降雨量: 37.4 },
        { name: 'Berlin', 月份: 'Aug.', 月均降雨量: 42.4 }
      ]
    }
  }
}
```

### 分组柱状图

```html
<fy-chart
  ref="demo3"
  :data="data8">
  <fy-scale x field="月份" />
  <fy-scale y field="月均降雨量" />
  <fy-bar series-field="name" :adjust="{
    type: 'dodge',
    marginRatio: 0.05 // 设置分组间柱子的间距
  }" />
  <fy-tooltip show-value-in-legend />
</fy-chart>

<div class="btn-box">
  <fy-button type="danger" plain @click.native="$refs.demo3.rerender()">rerender</fy-button>
</div>
```

```javascript
export default {
  data() {
    return {
      data8: [
        { name: 'London', 月份: 'Jan.', 月均降雨量: 18.9 },
        { name: 'London', 月份: 'Feb.', 月均降雨量: 28.8 },
        { name: 'London', 月份: 'Mar.', 月均降雨量: 39.3 },
        { name: 'London', 月份: 'Apr.', 月均降雨量: 81.4 },
        { name: 'London', 月份: 'May.', 月均降雨量: 47 },
        { name: 'London', 月份: 'Jun.', 月均降雨量: 20.3 },
        { name: 'London', 月份: 'Jul.', 月均降雨量: 24 },
        { name: 'London', 月份: 'Aug.', 月均降雨量: 35.6 },
        { name: 'Berlin', 月份: 'Jan.', 月均降雨量: 12.4 },
        { name: 'Berlin', 月份: 'Feb.', 月均降雨量: 23.2 },
        { name: 'Berlin', 月份: 'Mar.', 月均降雨量: 34.5 },
        { name: 'Berlin', 月份: 'Apr.', 月均降雨量: 99.7 },
        { name: 'Berlin', 月份: 'May.', 月均降雨量: 52.6 },
        { name: 'Berlin', 月份: 'Jun.', 月均降雨量: 35.5 },
        { name: 'Berlin', 月份: 'Jul.', 月均降雨量: 37.4 },
        { name: 'Berlin', 月份: 'Aug.', 月均降雨量: 42.4 }
      ]
    }
  }
}
```

### 百分比柱状图

```html
<fy-chart ref="demo4" :data="data9">
  <fy-scale x field="year" />
  <fy-scale y field="percent" :min="0" :max="0.5" :formatter="formatter" />
  <fy-bar series-field="country" adjust="stack" />
  <fy-tooltip show-value-in-legend />
</fy-chart>

<div class="btn-box">
  <fy-button type="primary" plain @click.native="$refs.demo4.rerender()">rerender</fy-button>
</div>
```

```javascript
export default {
  data() {
    return {
      formatter: function (val) {
        return (val * 100).toFixed(0) + '%'
      },
      data9: [
        { country: 'Europe', year: '1750', value: 163, percent: 0.24511278195488723 },
        { country: 'Asia', year: '1750', value: 502, percent: 0.7548872180451128 },
        { country: 'Europe', year: '1800', value: 203, percent: 0.24224343675417662 },
        { country: 'Asia', year: '1800', value: 635, percent: 0.7577565632458234 },
        { country: 'Europe', year: '1850', value: 276, percent: 0.2543778801843318 },
        { country: 'Asia', year: '1850', value: 809, percent: 0.7456221198156682 },
        { country: 'Europe', year: '1900', value: 408, percent: 0.3011070110701107 },
        { country: 'Asia', year: '1900', value: 947, percent: 0.6988929889298893 },
        { country: 'Europe', year: '1950', value: 547, percent: 0.2806567470497691 },
        { country: 'Asia', year: '1950', value: 1402, percent: 0.7193432529502309 },
        { country: 'Europe', year: '1999', value: 729, percent: 0.16708686683474674 },
        { country: 'Asia', year: '1999', value: 3634, percent: 0.8329131331652533 },
        { country: 'Europe', year: '2050', value: 628, percent: 0.10651289009497965 },
        { country: 'Asia', year: '2050', value: 5268, percent: 0.8934871099050203 },
        { country: 'Europe', year: '2100', value: 828, percent: 0.10227272727272728 },
        { country: 'Asia', year: '2100', value: 7268, percent: 0.8977272727272727 }
      ]
    }
  }
}
```

### 基础柱状图

```html
<fy-chart
  ref="demo5"
  :data="data10">
  <fy-bar />
  <fy-tooltip :show-item-marker="false" />
</fy-chart>

<div class="btn-box">
  <fy-button type="danger" plain @click.native="$refs.demo5.rerender()">rerender</fy-button>
</div>
```

```javascript
export default {
  data() {
    return {
      data10: [
        { year: '1951 年', sales: 38 },
        { year: '1952 年', sales: 52 },
        { year: '1956 年', sales: 61 },
        { year: '1957 年', sales: 145 },
        { year: '1958 年', sales: 48 },
        { year: '1959 年', sales: 38 },
        { year: '1960 年', sales: 38 },
        { year: '1962 年', sales: 38 }
      ]
    }
  }
}
```

### 带负值面积图

```html
<fy-chart
  :data="data11">
  <fy-scale x :tick-count="0" />
  <fy-scale y :nice="false" :min="-100" :max="100" />
  <fy-tooltip />
  <fy-chart-area />
  <fy-line />
</fy-chart>
```

```javascript
export default {
  data() {
    return {
      data11: [
        { month: 'Jan.', value: 6.06 },
        { month: 'Feb.', value: 82.2 },
        { month: 'Mar.', value: -22.11 },
        { month: 'Apr.', value: 21.53 },
        { month: 'May.', value: -21.74 },
        { month: 'Jun.', value: 73.61 },
        { month: 'Jul.', value: 53.75 },
        { month: 'Aug.', value: 60.32 }
      ]
    }
  }
}
```

### 环图: 资产配置

```html
<fy-chart
  :data="data12"
  :padding="[20, 'auto']">
  <fy-tooltip disabled />
  <fy-scale y :options="yOptions" />
  <fy-pie :radius="0.85" :inner-radius="0.7" series-field="name" :colors="['#FE5D4D','#3BA4FF','#737DDE'" />
  <fy-legend :options="legendOptions" />
  <fy-guide type="html" :options="htmlOptions" />
</fy-chart>
```

```javascript
export default {
  data() {
    return {
      htmlOptions: {
        position: [ '50%', '45%' ],
        html: `
          <div style="width: 250px;height: 40px;text-align: center;">
            <div style="font-size: 16px">总资产</div>
            <div style="font-size: 24px">133.08 亿</div>
          </div>`
      },
      legendOptions: {
        position: 'right',
        itemFormatter (val) {
          return val + '  ' + map[val]
        }
      },
      yOptions: {
        formatter (val) {
          return val * 100 + '%'
        }
      }
    }
  }
}
```

### 区域图（存在空值）

```html
<fy-chart :data="data14">
  <fy-tooltip show-crosshairs />
  <fy-chart-area series-field="type" shape="smooth"/>
  <fy-legend disabled />
  <fy-line series-field="type" shape="smooth"/>
</fy-chart>
```

```javascript
export default {
  data() {
    return {}
  }
}
```

### 自定义渲染逻辑

```html
<fy-chart
  prevent-render
  @on-render="renderChart">
</fy-chart>
```

```javascript
export default {
  data() {
    return {}
  },

  methods: {
    renderChart ({ chart }) {
      const data = [ { x: '1', y: 85 } ]
      chart.source(data, {
        y: {
          max: 100,
          min: 0
        }
      })
      chart.axis(false)
      chart.tooltip(false)
      chart.coord('polar', {
        transposed: true,
        innerRadius: 0.8,
        radius: 0.85
      })
      chart.guide().arc({
        start: [ 0, 0 ],
        end: [ 1, 99.98 ],
        top: false,
        style: {
          lineWidth: 20,
          stroke: '#ccc'
        }
      })
      chart.guide().text({
        position: [ '50%', '50%' ],
        content: '85%',
        style: {
          fontSize: 24,
          fill: '#1890FF'
        }
      })
      chart.interval()
        .position('x*y')
        .size(20)
        .animate({
          appear: {
            duration: 1200,
            easing: 'cubicIn'
          }
        })
      chart.render()
    }
  }
}
```

### Chart Api

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|------|------|
| prevent-render | 是否自定义渲染逻辑 | `Boolean` | false | - |
| prevent-default | 是否阻止默认行为 | `Boolean` | false | - |

### Chart event

| 事件名 | 说明 | 参数 |
|------|------|------|
| on-render | 渲染前触发，一般用于配合 `prevent-render` 自定义渲染逻辑 | `({ chart })` |

### Chart methods

| 方法名 | 说明 | 参数 |
|------|------|------|
| rerender | 清除并重新渲染 | - |
| repaint | 重新渲染 | - |
| destroy | 销毁图表，canvas dom 元素不会销毁 | - |

### Line Api
折线图，完整属性文档写参照 [F2 Geometry](https://antv.alipay.com/zh-cn/f2/3.x/api/geometry.html)

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|------|------|
| shape | 线条形状，可选值 `line`(默认), `smooth`(平滑线), `dash`(虚线) | `String` | - | - |
| series-field | 用于绘制多组线条时的分组字段名。该属性相当于 F2 里的 `color`，出于理解和设置方便使用 `series-field` | `String`| - | - |
| colors | 线条颜色，可以为单个颜色或者颜色列表。不指定时使用默认颜色 | `String,Array`| - | - |


### ChartArea Api

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|------|------|
| series-field | 用于绘制多组线条时的分组字段名。该属性相当于 F2 里的 `color`，出于理解和设置方便使用 `series-field` | `String` | - | - |
| colors | 线条颜色，可以为单个颜色或者颜色列表。不指定时使用默认颜色 | `String,Array` | - |

### Bar Api
柱状图，使用垂直的柱子显示类别之间的数值比较。

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|------|------|
| colors | 线条颜色，可以为单个颜色或者颜色列表。不指定时使用默认颜色。 | `String,Array` | - | - |

### Pie Api

### Point Api
点，用于点图的构建。Point 为 `Geometry` 的一部分，和其他图表组件一致，支持 shape, color, series-field 等。完整属性文档写参照 [F2 Geometry](https://antv.alipay.com/zh-cn/f2/3.x/api/geometry.html)。

### Scale Api
度量 Scale，是数据空间到图形空间的转换桥梁，负责原始数据到 [0, 1] 区间数值的相互转换工作。针对不同的数据类型对应不同类型的度量。详细文档 [F2 Scale](https://antv.alipay.com/zh-cn/f2/3.x/api/scale.html)。

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|------|------|
| field | [组件属性]指定 `坐标轴` 字段。对于简单数据，VChart 可以判断使用哪个字段，但是如果顺序不确定或者多字段的数据，最好手动指定 | `string` | - | - |
| x | [组件属性]是否为 `x轴` 配置 | `Boolean`| - | - |
| y | [组件属性]是否为 `y轴` 配置 | `Boolean` | - | - |
| type | 指定不同的度量类型，支持的 type 为 `identity`、`linear`、`cat`、`timeCat` | `String` | - | - |
| formatter | 回调函数，用于格式化坐标轴刻度点的文本显示，会影响数据在坐标轴 axis、图例 legend、提示信息 tooltip 上的显示 | `Function` | - | - |
| range | 输出数据的范围，默认[0, 1]，格式为 [min, max]，min 和 max 均为 0 至 1 范围的数据 | `Array` | [0, 1] | - |
| alias | 该数据字段的显示别名，一般用于将字段的英文名称转换成中文名(tooltip 中显示) | `String` | - | - |
| tick-count | 坐标轴上刻度点的个数，设为 0 时表示全部显示 | `Number` | 5 | - |
| ticks | 用于指定坐标轴上刻度点的文本信息，当用户设置了 ticks 就会按照 ticks 的个数和文本来显示。如 `[ 0, 50, 100, 150, 200, 300, 500 ]` | `Array` | - | - |

### Axis Api
坐标轴配置。[详细文档](https://antv.alipay.com/zh-cn/f2/3.x/api/axis.html)。

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|------|------|
| disabled | 禁用当前坐标轴 | `Boolean` | - | - |
| x | [组件属性]是否为 `x轴` 配置 | `Boolean` | - | - |
| y | [组件属性]是否为 `y轴` 配置 | `Boolean` | - | - |

### Guide Api
辅助元素，完整属性文档写参照 [F2 Guide](https://antv.alipay.com/zh-cn/f2/3.x/api/guide.html)

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|------|------|
| type | 辅助元素类型，可以为 `line`, `text`, `tag`, `rect`, `html`, `arc` | `String` | - | - |
| options | 辅助元素属性对象。你也可以在 template 里将属性分开写，不需要使用该 prop，同时使用时属性会被合并 | `Object` | - | - |

### Tooltip Api
该组件非必须，渲染折线图时会默认使用配置 `showCrosshairs: true`
完整属性文档写参照 [F2 Tooltip](https://antv.alipay.com/zh-cn/f2/3.x/api/tooltip.html)

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|------|------|
| disabled | [快捷属性，非 F2 原有属性]是否禁用 tooltip, 相当于调用`chart.tooltip(false)` | `Boolean` | false | - |
| show-x-value | [快捷属性，非 F2 原有属性]用于单折线的情况，设定是否将 x 轴值显示在 tooltip 里，默认是 `xLabel:yValue` 的形式(value:23)，启用将变成 `xValue:yValue` 的形式(2017-01-01:23)，建议在 `tickCount` 无法完全显示时启用。该设置会覆盖原有 `onShow` 设置 | `Boolean` | false | - |
| show-value-in-legend | [快捷属性，非 F2 原有属性]是否禁用默认 tooltip 而是显示在 legend 里。适用于有分组(series-field)情况 | `Boolean` | false | - |

### Legend Api
图例。[F2 Legend](https://antv.alipay.com/zh-cn/f2/3.x/api/legend.html)。

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|------|------|
| disabled | [快捷属性，非 F2 原有属性]是否禁用 legend, 相当于调用`chart.legend(false)` | `Boolean` | false | - |

