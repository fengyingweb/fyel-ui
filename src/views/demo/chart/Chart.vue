<template>
  <div class="wrapper">
    <fy-nav-bar title="Chart" left-arrow @click-left="goBack"></fy-nav-bar>
    <div class="wrapper-main">
      <h2 class="title">基本折线图</h2>
      <fy-chart :data="data1" prevent-default>
        <fy-scale x :tick-count="3" />
        <fy-tooltip :show-item-marker="true" show-x-value />
        <fy-line />
      </fy-chart>
      <h2 class="title">折线图:平滑曲线</h2>
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
      <h2 class="title">动态数据：实时折线</h2>
      <fy-chart :data="data3" ref="demo1">
        <fy-scale x type="timeCat" :tick-count="3" mask="hh:mm:ss" />
        <fy-scale y :min="8" :tick-count="5" />
        <fy-tooltip :show-item-marker="false" show-x-value />
        <fy-guide type="html" :options="guide1" />
        <fy-guide type="html" :options="guide2" />
        <fy-line />
      </fy-chart>
      <h2 class="title">折线图：渐变</h2>
      <fy-chart :data="data4">
        <fy-scale x :tick-count="5" :max="2020" />
        <fy-line shape="smooth" :colors="gradient"/>
        <fy-guide type="tag" :options="tag" />
        <fy-chart-area shape="smooth" :colors="gradient"/>
      </fy-chart>
      <h2 class="title">折线图:对比</h2>
      <fy-chart :data="data5">
        <fy-line series-field="type" />
      </fy-chart>
      <h2 class="title">层叠面积图</h2>
      <fy-chart :data="data6">
        <fy-scale x field="date" type="timeCat" mask="MM-DD" />
        <fy-scale y field="value" :tick-count="4" :max="300" />
        <fy-tooltip show-crosshairs show-value-in-legend />

        <fy-chart-area series-field="city" shape="smooth" adjust="stack" />
        <fy-line series-field="city" shape="smooth" adjust="stack" />
      </fy-chart>
      <h2 class="title">层叠柱状图</h2>
      <fy-chart ref="demo2" :data="data7">
        <fy-scale x field="月份" />
        <fy-scale y field="月均降雨量" />
        <fy-bar series-field="name" adjust="stack" />
        <fy-tooltip show-value-in-legend />
      </fy-chart>
      
      <div class="btn-box">
        <fy-button type="primary" plain @click.native="$refs.demo2.rerender()">rerender</fy-button>
      </div>
      <h2 class="title">分组柱状图</h2>
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
      <h2 class="title">百分比柱状图</h2>
      <fy-chart ref="demo4" :data="data9">
        <fy-scale x field="year" />
        <fy-scale y field="percent" :min="0" :max="0.5" :formatter="formatter" />
        <fy-bar series-field="country" adjust="stack" />
        <fy-tooltip show-value-in-legend />
      </fy-chart>

      <div class="btn-box">
        <fy-button type="primary" plain @click.native="$refs.demo4.rerender()">rerender</fy-button>
      </div>
      <h2 class="title">基础柱状图</h2>
      <fy-chart
        ref="demo5"
        :data="data10">
        <fy-bar />
        <fy-tooltip :show-item-marker="false" />
      </fy-chart>

      <div class="btn-box">
        <fy-button type="danger" plain @click.native="$refs.demo5.rerender()">rerender</fy-button>
      </div>
      <h2 class="title">
        带负值面积图
      </h2>
      <fy-chart
        :data="data11">
        <fy-scale x :tick-count="0" />
        <fy-scale y :nice="false" :min="-100" :max="100" />
        <fy-tooltip />
        <fy-chart-area />
        <fy-line />
      </fy-chart>
      <h2 class="title">环图: 资产配置</h2>
      <fy-chart
        :data="data12"
        :padding="[20, 'auto']">
        <fy-tooltip disabled />
        <fy-scale y :options="yOptions" />
        <fy-pie :radius="0.85" :inner-radius="0.7" series-field="name" :colors="['#FE5D4D','#3BA4FF','#737DDE']" />
        <fy-legend :options="legendOptions" />
        <fy-guide type="html" :options="htmlOptions" />
      </fy-chart>
      <h2 class="title">饼图</h2>
      <fy-chart :data="data13">
      <fy-scale y :options="yOptions2" />
      <fy-tooltip disabled />
      <fy-pie :radius="0.85" series-field="name" />
      <fy-legend :options="legendOptions2" />
      </fy-chart>
      <h2 class="title">区域图（存在空值）</h2>
      <fy-chart :data="data14">
        <fy-tooltip show-crosshairs />
        <fy-chart-area series-field="type" shape="smooth"/>
        <fy-legend disabled />
        <fy-line series-field="type" shape="smooth"/>
      </fy-chart>
      <h2 class="title">自定义渲染逻辑</h2>
      <fy-chart
        prevent-render
        @on-render="renderChart">
      </fy-chart>
    </div>
  </div>
</template>

<script>
import {Chart, Line, ChartArea, Bar, Pie, Point, Scale, Axis, Guide, Tooltip, Legend} from 'fy-elui'
import data5 from './line_color.json'
import data14 from './area_empty.json'
const data3 = []

// 添加数据，模拟数据，可以指定当前时间的偏移的秒
function getRecord (offset) {
  offset = offset || 0
  return {
    time: new Date().getTime() + offset * 1000,
    value: Math.random() + 10
  }
}

data3.push(getRecord(-2))
data3.push(getRecord(-1))
data3.push(getRecord())

const data12 = [
  { name: '股票类', percent: 83.59, a: '1' },
  { name: '债券类', percent: 2.17, a: '1' },
  { name: '现金类', percent: 14.24, a: '1' }
]

const map = {}
data12.map(obj => {
  map[obj.name] = obj.percent + '%'
});

const map2 = {
  '芳华': '40%',
  '妖猫传': '20%',
  '机器之血': '18%',
  '心理罪': '15%',
  '寻梦环游记': '5%',
  '其他': '2%'
}
export default {
  name: 'Chart',
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
  },

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
        { date: '2017-06-15', value: 245 },
        { date: '2017-06-16', value: 139 },
        { date: '2017-06-17', value: 115 },
        { date: '2017-06-18', value: 111 },
        { date: '2017-06-19', value: 309 },
        { date: '2017-06-20', value: 206 },
        { date: '2017-06-21', value: 137 },
        { date: '2017-06-22', value: 128 },
        { date: '2017-06-23', value: 85 },
        { date: '2017-06-24', value: 94 },
        { date: '2017-06-25', value: 71 },
        { date: '2017-06-26', value: 106 },
        { date: '2017-06-27', value: 84 },
        { date: '2017-06-28', value: 93 },
        { date: '2017-06-29', value: 85 },
        { date: '2017-06-30', value: 73 },
        { date: '2017-07-01', value: 83 },
        { date: '2017-07-02', value: 125 },
        { date: '2017-07-03', value: 107 },
        { date: '2017-07-04', value: 82 },
        { date: '2017-07-05', value: 44 },
        { date: '2017-07-06', value: 72 },
        { date: '2017-07-07', value: 106 },
        { date: '2017-07-08', value: 107 },
        { date: '2017-07-09', value: 66 },
        { date: '2017-07-10', value: 91 },
        { date: '2017-07-11', value: 92 },
        { date: '2017-07-12', value: 113 },
        { date: '2017-07-13', value: 107 },
        { date: '2017-07-14', value: 131 },
        { date: '2017-07-15', value: 111 },
        { date: '2017-07-16', value: 64 },
        { date: '2017-07-17', value: 69 },
        { date: '2017-07-18', value: 88 },
        { date: '2017-07-19', value: 77 },
        { date: '2017-07-20', value: 83 },
        { date: '2017-07-21', value: 111 },
        { date: '2017-07-22', value: 57 },
        { date: '2017-07-23', value: 55 },
        { date: '2017-07-24', value: 60 }
      ],

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
      ],
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
      },
      data3: data3,
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
      },
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
      data5: data5,
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
        { value: 72.5, city: 'Austin', date: '2011-10-24' },
        { value: 57.9, city: 'New York', date: '2011-10-25' },
        { value: 56.1, city: 'Alaska', date: '2011-10-25' },
        { value: 72.7, city: 'Austin', date: '2011-10-25' },
        { value: 54.6, city: 'New York', date: '2011-10-26' },
        { value: 54.6, city: 'Alaska', date: '2011-10-26' },
        { value: 73.4, city: 'Austin', date: '2011-10-26' },
        { value: 54.4, city: 'New York', date: '2011-10-27' },
        { value: 56.1, city: 'Alaska', date: '2011-10-27' },
        { value: 70.7, city: 'Austin', date: '2011-10-27' },
        { value: 42.5, city: 'New York', date: '2011-10-28' },
        { value: 58.1, city: 'Alaska', date: '2011-10-28' },
        { value: 56.8, city: 'Austin', date: '2011-10-28' },
        { value: 40.9, city: 'New York', date: '2011-10-29' },
        { value: 57.5, city: 'Alaska', date: '2011-10-29' },
        { value: 51, city: 'Austin', date: '2011-10-29' },
        { value: 38.6, city: 'New York', date: '2011-10-30' },
        { value: 57.7, city: 'Alaska', date: '2011-10-30' },
        { value: 54.9, city: 'Austin', date: '2011-10-30' },
        { value: 44.2, city: 'New York', date: '2011-10-31' },
        { value: 55.1, city: 'Alaska', date: '2011-10-31' },
        { value: 58.8, city: 'Austin', date: '2011-10-31' },
        { value: 49.6, city: 'New York', date: '2011-11-01' },
        { value: 57.9, city: 'Alaska', date: '2011-11-01' },
        { value: 62.6, city: 'Austin', date: '2011-11-01' },
        { value: 47.2, city: 'New York', date: '2011-11-02' },
        { value: 64.6, city: 'Alaska', date: '2011-11-02' },
        { value: 71, city: 'Austin', date: '2011-11-02' }
      ],
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
      ],
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
      ],
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
      ],
      data10: [
        { year: '1951 年', sales: 38 },
        { year: '1952 年', sales: 52 },
        { year: '1956 年', sales: 61 },
        { year: '1957 年', sales: 145 },
        { year: '1958 年', sales: 48 },
        { year: '1959 年', sales: 38 },
        { year: '1960 年', sales: 38 },
        { year: '1962 年', sales: 38 }
      ],
      tooltip: {
        showItemMarker: false,
        onShow (ev) {
          const { items } = ev
          items[0].name = items[0].title
        }
      },
      data11: [
        { month: 'Jan.', value: 6.06 },
        { month: 'Feb.', value: 82.2 },
        { month: 'Mar.', value: -22.11 },
        { month: 'Apr.', value: 21.53 },
        { month: 'May.', value: -21.74 },
        { month: 'Jun.', value: 73.61 },
        { month: 'Jul.', value: 53.75 },
        { month: 'Aug.', value: 60.32 }
      ],
      data12: data12,
      map: map,
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
      },
      map2: map2,
      legendOptions2: {
        position: 'right',
        itemFormatter (val) {
          return val + '  ' + map[val]
        }
      },
      yOptions2: {
        formatter (val) {
          return val * 100 + '%'
        }
      },
      data13: [
        { name: '芳华', percent: 0.4, a: '1' },
        { name: '妖猫传', percent: 0.2, a: '1' },
        { name: '机器之血', percent: 0.18, a: '1' },
        { name: '心理罪', percent: 0.15, a: '1' },
        { name: '寻梦环游记', percent: 0.05, a: '1' },
        { name: '其他', percent: 0.02, a: '1' }
      ],
      data14: data14
    }
  },

  methods: {
    goBack() {
      this.$router.go(-1)
    },

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
  },

  mounted () {
    this.timer = setInterval(() => {
      data3.push(getRecord())
    }, 2000)
  },
  beforeDestroy () {
    clearInterval(this.timer)
  }
}
</script>

<style lang="less" scoped>
  .btn-box {
    margin-top: 20px;
    justify-content: center;
  }
</style>
