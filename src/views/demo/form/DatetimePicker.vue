<template>
  <div class="wrapper">
    <fy-nav-bar title="DatetimePicker" left-arrow @click-left="goBack"></fy-nav-bar>
    <div class="wrapper-main">
      <h2 class="title">基础用法{{currentDate}}</h2>
      <fy-datetime-picker
        v-model="currentDate"
        type="datetime"
        @confirm="onConfirm"
        @change="onChange">
      </fy-datetime-picker>

      <h2 class="title">选择日期(年月日){{currentDate2}}</h2>
      <fy-datetime-picker
        v-model="currentDate2"
        type="date"
        format="YYYY-MM-DD"
        @confirm="onConfirm"
        @change="onChange">
      </fy-datetime-picker>

      <h2 class="title">选择日期(年月){{currentDate3}}</h2>
      <fy-datetime-picker
        v-model="currentDate3"
        type="year-month"
        format="YYYY-MM"
        :formatter="formatter"
        @confirm="onConfirm"
        @change="onChange">
      </fy-datetime-picker>

      <h2 class="title">选择时间{{currentTime}}</h2>
      <fy-datetime-picker
        v-model="currentTime"
        type="time"
        @confirm="onConfirm"
        @change="onChange">
      </fy-datetime-picker>
    </div>
  </div>
</template>

<script>
import {DatetimePicker} from 'fy-elui'
import {dateTimeFormat} from '@/utils/date-time-format'
export default {
  components: {
    [DatetimePicker.name]: DatetimePicker
  },
  data() {
    return {
      currentDate: dateTimeFormat(new Date()),
      currentDate2: '2019-05-24',
      currentDate3: '2019-05',
      currentTime: '11:20'
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },

    onConfirm(val) {
      console.log(val)
    },

    onChange(picker, val) {
      // console.log(picker)
      console.log(val)
    },

    formatter(type, val) {
      if (type === 'year') {
        return `${val}年`
      } else if (type === 'month') {
        return `${val}月`
      }
      return val
    }
  }
}
</script>

<style lang="less" scoped>

</style>
