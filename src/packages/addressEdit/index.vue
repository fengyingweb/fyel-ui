<template>
  <div class="fy-address-edit">
    <fy-field
      v-model="data.name"
      clearable
      label="姓名"
      placeholder="请输入姓名"
      :error="errorInfo.name"
      @focus="onFocus('name')"></fy-field>
    
    <fy-field
      v-model="data.tel"
      clearable
      label="电话"
      type="tel"
      placeholder="请输入手机号"
      :error="errorInfo.tel"
      @focus="onFocus('tel')"></fy-field>

      <fy-field
      v-if="showArea"
      :value="areaText"
      label="地区"
      placeholder="选择省/市/区"
      readonly
      @click="showAreaPopup = true"></fy-field>

      <address-detail
        v-if="showDetail"
        :focused="detailFocused"
        :value="data.addressDetail"
        :error="errorInfo.addressDetail"
        :detail-rows="this.detailRows"
        :search-result="this.searchResult"
        :show-search-result="this.showSearchResult"
        @focus="onFocus('addressDetail')"
        @blur="onDetailBlur"
        @input="onChangeDetail"
        @select-search="onSelectSearch"></address-detail>

      <fy-field
        v-if="showPostal && !hideBottomFields"
        v-model="data.postalCode"
        clearable
        type="tel"
        maxlength="6"
        label="邮政编码"
        placeholder="邮政编码"
        :error="errorInfo.postalCode"
        @focus="onFocus('postalCode')"></fy-field>
      
      <slot></slot>

      <fy-switch-cell
        v-if="showSetDefault && !hideBottomFields"
        v-model="data.isDefault"
        title="设为默认收货地址"
        @change="onChangeDefault"></fy-switch-cell>
      
      <div v-if="!hideBottomFields" class="fy-address-edit__buttons">
        <fy-button
          block
          :loading="isSaving"
          :text="saveButtonText"
          @click="onSave">
        </fy-button>

        <fy-button
          v-if="showDelete"
          block
          type="danger"
          :loading="isDeleting"
          :text="deleteButtonText"
          @click="onDelete">
        </fy-button>
      </div>

      <fy-popup
        v-model="showAreaPopup"
        position="bottom"
        :lazy-render="false"
        getContainer="body">
        <fy-area
          ref="area"
          :loading="!areaListLoaded"
          :value="data.areaCode"
          :area-list="areaList"
          @confirm="onAreaConfirm"
          @cancel="showAreaPopup = false"
        />
      </fy-popup>
  </div>
</template>

<script>
import {isObject} from '../utils/index'
import {isMobile} from '../utils/validate'
import Area from '../area/index'
import Field from '../field/index'
import Popup from '../popup/index'
import Toast from '../toast/index'
import Button from '../button/index'
import Dialog from '../dialog/index'
import SwitchCell from '../switchCell/index'
import AddressDetail from './detail.vue'

const defaultData = {
  name: '',
  tel: '',
  country: '',
  province: '',
  city: '',
  county: '',
  areaCode: '',
  postalCode: '',
  addressDetail: '',
  isDefault: false
}
export default {
  name: 'fy-address-edit',
  components: {
    [Area.name]: Area,
    [Field.name]: Field,
    [Popup.name]: Popup,
    [Button.name]: Button,
    [SwitchCell.name]: SwitchCell,
    [AddressDetail.name]: AddressDetail
  },
  props: {
    areaList: Object,
    isSaving: Boolean,
    isDeleting: Boolean,
    validator: Function,
    showDelete: Boolean,
    showPostal: Boolean,
    searchResult: Array,
    showSetDefault: Boolean,
    showSearchResult: Boolean,
    saveButtonText: {
      type: String,
      default: '保存'
    },
    deleteButtonText: {
      type: String,
      default: '删除'
    },
    showArea: {
      type: Boolean,
      default: true
    },
    showDetail: {
      type: Boolean,
      default: true
    },
    detailRows: {
      type: Number,
      default: 1
    },
    addressInfo: {
      type: Object,
      default: () => ({ ...defaultData })
    },
    telValidator: {
      type: Function,
      default: isMobile
    }
  },
  data() {
    return {
      data: {},
      showAreaPopup: false,
      detailFocused: false,
      errorInfo: {
        tel: false,
        name: false,
        postalCode: false,
        addressDetail: false
      }
    }
  },
  computed: {
    areaListLoaded() {
      return isObject(this.areaList) && Object.keys(this.areaList).length
    },

    areaText() {
      const { country, province, city, county, areaCode } = this.data
      if (areaCode) {
        const arr = [country, province, city, county]
        if (province && province === city) {
          arr.splice(1, 1)
        }
        return arr.filter(text => text).join('/')
      }
      return ''
    },

    hideBottomFields() {
      return this.searchResult.length && this.detailFocused
    }
  },
  watch: {
    addressInfo: {
      handler(val) {
        this.data = {
          ...defaultData,
          ...val
        };

        this.setAreaCode(val.areaCode);
      },
      deep: true,
      immediate: true
    },

    areaList() {
      this.setAreaCode(this.data.areaCode);
    }
  },
  methods: {
    setAreaCode(areaCode) {
      this.data.areaCode = areaCode || '';

      if (areaCode) {
        this.$nextTick(this.assignAreaValues);
      }
    },

    assignAreaValues() {
      const { area } = this.$refs;
      if (area) {
        const detail = area.getArea();
        detail.areaCode = detail.code;
        delete detail.code;
        Object.assign(this.data, detail);
      }
    },

    onFocus(key) {
      this.errorInfo[key] = false;
      this.detailFocused = key === 'addressDetail';
      this.$emit('focus', key);
    },

    onChangeDetail(val) {
      this.data.addressDetail = val;
      this.$emit('change-detail', val);
    },

    onAreaConfirm(values) {
      this.showAreaPopup = false;
      this.assignAreaValues();
      this.$emit('change-area', values);
    },

    onSave() {
      const items = ['name', 'tel', 'areaCode', 'addressDetail'];

      if (this.showPostal) {
        items.push('postalCode');
      }

      const isValid = items.every(item => {
        const msg = this.getErrorMessage(item);
        if (msg) {
          this.errorInfo[item] = true;
          Toast(msg);
        }
        return !msg;
      });

      if (isValid && !this.isSaving) {
        this.$emit('save', this.data);
      }
    },

    getErrorMessage(key) {
      const value = String(this.data[key] || '').trim();

      if (this.validator) {
        const message = this.validator(key, value);
        if (message) {
          return message;
        }
      }

      switch (key) {
        case 'name':
          return value ? '' : '姓名不能为空';
        case 'tel':
          return this.telValidator(value) ? '' : '手机号格式错误';
        case 'areaCode':
          return value ? '' : '地区不能为空';
        case 'addressDetail':
          return value ? '' : '详细地址不能为空';
        case 'postalCode':
          return value && !/^\d{6}$/.test(value) ? '邮政编码不能为空': '';
      }
    },

    onDelete() {
      Dialog.confirm({
        title: '确定要删除么'
      })
        .then(() => {
          this.$emit('delete', this.data);
        })
        .catch(() => {
          this.$emit('cancel-delete', this.data);
        });
    },

    // get values of area component
    getArea() {
      return this.$refs.area ? this.$refs.area.getValues() : [];
    },

    setAddressDetail(value) {
      this.data.addressDetail = value;
    },

    onDetailBlur() {
      // await for click search event
      setTimeout(() => {
        this.detailFocused = false;
      });
    },

    onSelectSearch(event) {
      this.$emit('select-search', event)
    },

    onChangeDefault(event) {
      this.$emit('change-default', event)
    }
  }
}
</script>

<style lang="less">
  @import './index.less';
</style>
