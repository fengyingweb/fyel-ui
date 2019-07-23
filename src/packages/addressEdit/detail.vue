<template>
  <fy-cell class="fy-address-edit-detail">
    <fy-field
      autosize
      ref="field"
      :rows="detailRows"
      :clearable="!android"
      type="textarea"
      maxlength="200"
      value="value"
      error="error"
      label="详细地址"
      placeholder="街道门牌、楼层房间号等信息"
      @focus="onFocus"
      @blur="onBlur"
      @input="onInput">
      <div
        slot="right-icon"
        class="fy-address-edit-detail__finish"
        v-if="isFinish"
        @click="onFinish">
        完成
      </div>
    </fy-field>
    <div v-if="isSearchResult">
      <fy-cell
        v-for="result in searchResult"
        :key="result.name + result.address"
        :title="result.name"
        :label="result.address"
        :icon="location-o"
        clickable
        @click="onSelect(result)">
      </fy-cell>
    </div>
  </fy-cell>
</template>

<script>
import { isAndroid } from '../utils/index'
import Cell from '../cell/index'
import Field from '../field/index'

export default {
  name: 'address-detail',
  components: {
    [Cell.name]: Cell,
    [Field.name]: Field
  },
  props: {
    value: String,
    error: Boolean,
    focused: Boolean,
    detailRows: Number,
    searchResult: Array,
    showSearchResult: Boolean
  },
  data() {
    return {
      android: isAndroid()
    }
  },
  computed: {
    isFinish() {
      return this.value && this.focused && this.android
    },

    isSearchResult() {
      return this.focused && this.searchResult && this.showSearchResult
    }
  },
  methods: {
    onSelect(express) {
      this.$emit('select-search', express);
      this.$emit(
        'input',
        `${express.address || ''} ${express.name || ''}`.trim()
      );
    },

    onFinish() {
      this.$refs.field.blur();
    },

    onFocus() {
      this.$emit('focus')
    },

    onBlur() {
      this.$emit('blur')
    },

    onInput(val) {
      this.$emit('input', val)
    }
  }
}
</script>
