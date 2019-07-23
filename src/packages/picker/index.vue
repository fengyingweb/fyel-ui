<template>
  <div class="fy-picker">
    <div
      class="fy-hairline--top-bottom fy-picker__toolbar"
      v-if="showToolbar || $slots.toolbar">
      <slot name="toolbar">
        <div class="fy-picker__cancel" @click="onCancel">{{cancelButtonText}}</div>
        <div v-if="title" class="fy-ellipsis fy-picker__title">{{title}}</div>
        <div class="fy-picker__confirm" @click="onConfirm">{{confirmButtonText}}</div>
      </slot>
    </div>
    <div class="fy-picker__loading" v-if="loading">
      <fy-loading />
    </div>
    <div
      class="fy-picker__columns"
      :style="columnsStyle"
      @touchmove="onTouchmove">
      <picker-column
        v-for="(item, index) in columnDatas"
        :key="index"
        :value-key="valueKey"
        :className="item.className"
        :item-height="itemHeight"
        :default-index="item.defaultIndex || defaultIndex"
        :visible-item-count="visibleItemCount"
        :initial-options="simple ? item : item.values"
        @change="onChange(index)">
      </picker-column>
      <div class="fy-hairline--top-bottom fy-picker__frame" :style="frameStyle"></div>
    </div>
  </div>
</template>

<script>
import Loading from '../loading/index'
import PickerColumn from './picker-column.vue'
import {deepClone} from '../utils/deep-clone'
import {pickerProps} from './share'
export default {
  name: 'fy-picker',
  components: {
    [Loading.name]: Loading,
    [PickerColumn.name]: PickerColumn
  },
  props: {
    ...pickerProps,
    columns: Array,
    defaultIndex: {
      type: Number,
      default: 0
    },
    valueKey: {
      type: String,
      default: 'text'
    }
  },

  data() {
    return {
      children: []
    }
  },

  computed: {
    simple() {
      return this.columns.length && !this.columns[0].values
    },

    frameStyle() {
      let {itemHeight} = this
      let style = {
        height: `${itemHeight}px`
      }
      return style
    },

    columnsStyle() {
      let {itemHeight, visibleItemCount} = this
      let style = {
        height: `${itemHeight * visibleItemCount}px`
      }
      return style
    },

    columnDatas() {
      return this.simple ? [this.columns] : this.columns
    }
  },
  
  watch: {
    columns() {
      this.setColumns();
    }
  },

  methods: {
    setColumns() {
      const columns = this.simple ? [{ values: this.columns }] : this.columns;
      columns.forEach((column, index) => {
        this.setColumnValues(index, deepClone(column.values));
      });
    },

    emit(event) {
      if (this.simple) {
        this.$emit(event, this.getColumnValue(0), this.getColumnIndex(0));
      } else {
        this.$emit(event, this.getValues(), this.getIndexes());
      }
    },
    onCancel() {
      this.emit('cancel')
    },

    onConfirm() {
      this.emit('confirm')
    },

    onTouchmove(event) {
      event.preventDefault()
    },

    onChange(index) {
      if (this.simple) {
        this.$emit('change', this, this.getColumnValue(0), this.getColumnIndex(0))
      } else {
        this.$emit('change', this, this.getValues(), index)
      }
    },
    
    getColumn(index) {
      return this.children[index]
    },
    
    // 获取对应列选中的值
    getColumnValue(index) {
      const column = this.getColumn(index)
      return column && column.getValue()
    },

    // 获取对应列选中项的索引
    getColumnIndex(index) {
      return (this.getColumn(index) || {}).currentIndex
    },

    // 获取对应列中所有选项
    getColumnValues(index) {
      return (this.children[index] || {}).options;
    },

    // 设置对应列中所有选项
    setColumnValues(index, options) {
      const column = this.children[index];
      if (column && JSON.stringify(column.options) !== JSON.stringify(options)) {
        column.options = options;
        column.setIndex(0);
      }
    },

    // 获取所有列选中的值
    getValues() {
      return this.children.map(child => child.getValue())
    },

    // 设置所有列选中的值
    setValues(values) {
      values.forEach((value, index)=> {
        this.setColumnValue(index, value)
      })
    },

    // 设置对应列选中的值
    setColumnValue(index, value) {
      const column = this.getColumn(index)
      column && column.setValue(value)
    },

    // 获取所有列选中值对应的索引
    getIndexes() {
      return this.children.map(child => child.currentIndex)
    },

    // 设置所有列选中值对应的索引
    setIndexes(indexes) {
      indexes.forEach((optionIndex, columnIndex)=> {
        this.setColumnIndex(columnIndex, optionIndex)
      })
    },

    // 设置对应列选中项的索引
    setColumnIndex(columnIndex, optionIndex) {
      const column = this.getColumn(columnIndex)
      column && column.setIndex(optionIndex)
    }
  }
}
</script>

<style lang="less">
  @import './index.less';
</style>
