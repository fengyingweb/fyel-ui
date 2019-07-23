<template>
  <ul :class="['fy-pagination', simple && 'fy-pagination--simple']">
    <li
      :class="[
        'fy-pagination__item',
        value === 1 && 'fy-pagination__item--disabled',
        'fy-pagination__prev',
        'fy-hairline']"
        @click="onSelect(value - 1)">
      {{prevText}}
    </li>
    <li
      v-for="page in pages"
      :key="page.number"
      :class="[
        'fy-pagination__item',
        page.active && 'fy-pagination__item--active',
        'fy-pagination__page',
        'fy-hairline']"
        @click="onSelect(page.number)">
      {{page.text}}
    </li>
    <li v-if="simple" class="fy-pagination__page-desc">
      <slot name="pageDesc">{{`${value}/${count}`}}</slot>
    </li>
    <li
      :class="[
        'fy-pagination__item',
        value === count && 'fy-pagination__item--disabled',
        'fy-pagination__next',
        'fy-hairline']"
        @click="onSelect(value + 1)">
      {{nextText}}
    </li>
  </ul>
</template>

<script>
const makePage = (number, text, active) => ({number, text, active})
export default {
  name: 'fy-pagination',
  props: {
    value: Number,
    prevText: {
      type: String,
      default: '上一页'
    },
    nextText: {
      type: String,
      default: '下一页'
    },
    pageCount: Number,
    totalItems: Number,
    forceEllipses: Boolean,
    mode: {
      type: String,
      default: 'multi' // 可选值simple, multi
    },
    itemsPerPage: {
      type: Number,
      default: 10
    },
    showPageSize: {
      type: Number,
      default: 5
    }
  },

  computed: {
    count() {
      let count = this.pageCount || Math.ceil(this.totalItems / this.itemsPerPage)
      return Math.max(1, count)
    },

    pages() {
      let pages = []
      let pageCount = this.count

      if (this.mode !== 'multi') {
        return pages
      }

      let startPage = 1
      let endPage = pageCount
      let isMaxSized = this.showPageSize !== undefined && this.showPageSize < pageCount

      if (isMaxSized) {
        startPage = Math.max((this.value - Math.floor(this.showPageSize / 2)), 1)
        endPage = startPage + this.showPageSize - 1
      }

      if (endPage > pageCount) {
        endPage = pageCount
        startPage = endPage - this.showPageSize + 1
      }

      for(let number = startPage; number <= endPage; number++) {
        let page = makePage(number, number, number === this.value)
        pages.push(page)
      }

      if (isMaxSized && this.showPageSize > 0 && this.forceEllipses) {
        if (startPage > 1) {
          let previousPageSet = makePage(startPage - 1, '...', false)
          pages.unshift(previousPageSet)
        }

        if (endPage < pageCount) {
          let nextPageSet = makePage(endPage + 1, '...', false)
          pages.push(nextPageSet)
        }
      }

      return pages
    },

    simple() {
      return this.mode !== 'multi'
    }
  },

  watch: {
    value: {
      handler(page) {
        this.select(page || this.value)
      },
      immediate: true
    }
  },

  methods: {
    select(page) {
      page = Math.min(this.count, Math.max(1, page))
      if (this.value !== page) {
        this.$emit('input', page)
        this.$emit('change', page)
      }
    },

    onSelect(value) {
      this.select(value)
    }
  }
}
</script>

<style lang="less">
  @import './index.less';
</style>
