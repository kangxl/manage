<template v-slot="header">
  <el-popover
    v-model="isShowPopover"
    style="cursor: pointer;"
    trigger="click"
    width="width"
    @hide="hidePover"
    @show="showPover"
  >
    <span slot="reference">
      <el-tooltip
        :content="getTips"
        :disabled="isShowPopover|| !inputValue || inputValue.length==0"
      >
        <span :style="{ color : inputValue&&inputValue.length>0?'#d80025':''}">
          {{ name }}
          <i class="el-icon-caret-bottom" />
        </span>
      </el-tooltip>
      <a class="fa fa-caret-square-o-down" />
    </span>
    <el-row style="padding-bottom:10px">
      <el-input
        v-if="type == 'input'"
        v-model="inputValue"
        clearable
        size="mini"
      />
      <number-range
        v-if="type == 'numberRange'"
        v-model="inputValue"
      />
      <el-select
        v-if="type == 'select'"
        v-model="inputValue"
        clearable
        placeholder="请选择"
        size="mini"
      >
        <el-option
          v-for="(item,index) in list"
          :key="index"
          :label="item[selectLabel]"
          :value="item[selectValueName]"
        />
      </el-select>
      <el-select
        v-if="type == 'search'"
        v-model="inputValue"
        clearable
        filterable
        :loading="loading"
        placeholder="请输入关键词"
        remote
        reserve-keyword
      >
        <el-option
          v-for="(item,index) in list"
          :key="index"
          :label="item[selectLabel]"
          :value="item[selectValueName]"
        />
      </el-select>
      <el-date-picker
        v-if="type == 'date'"
        v-model="inputValue"
        :end-placeholder="checkRangeDate?'结束日期':''"
        :placeholder="checkRangeDate?'':'选择日期时间'"
        :range-separator="checkRangeDate?'至':''"
        :start-placeholder="checkRangeDate?'开始日期':''"
        :type="dateType"
        value-format="timestamp"
      />
    </el-row>
    <el-row>
      <el-button
        size="mini"
        type="primary"
        @click="searchData"
      >确定</el-button>
      <el-button
        size="mini"
        @click="clearInput"
      >重置</el-button>
      <el-button
        size="mini"
        @click="resetAll"
      >全部重置</el-button>
    </el-row>
  </el-popover>
</template>
<script>
/**
 *   <my-input-search-popover
          v-model="pageConfig.conditions.xx"
          name="状态"
          type="input"
        />
 * name 表格要显示的表头文字 必填
 * width popover的宽度 非必填
 * type 输入框的类型 默认input，还有select date search 非必填
 * type=select/search时:
 *              list:数据源
 *              selectLabel：要显示的属性
 *              selectValueName 要提交哪个属性
 * type='date'时
 *              dateType : year/month/date/dates/ week/ datetime/datetimerange/daterange
 * queryFunc 获取数据方法
 *
 */
import NumberRange from '@/components/MyNumberRange'
export default {
  name: 'MyInputSearchPopover',
  components: { NumberRange },
  props: {
    name: { // 表头文字
      type: String,
      default: ''
    },
    width: { // popover的宽度
      type: Number,
      default: 250
    },
    list: { // type=select 的下拉数据
      type: Array,
      default: () => []
    },
    selectValueName: { // 下拉数据的值对应的key
      type: String,
      default: 'id'
    },
    selectLabel: { // 下拉要显示的文字
      type: String,
      default: 'text'
    },
    type: { // 搜索框类型
      type: String,
      default: 'input'
    },
    dateType: { // 日期格式year/month/date/dates/ week/ datetime/datetimerange/daterange
      type: String,
      default: 'date'
    },
    value: [String, Object, Array, Number, Boolean]
  },
  data () {
    return {
      loading: false,
      isShowPopover: false,
      inputValue: this.value,
      isClearAll: false,
      isClickBtn: false,
      oldValue: this.value
    }
  },
  computed: {
    checkRangeDate () {
      if (this.dateType.indexOf('range') > -1) {
        return true
      } else {
        return false
      }
    },
    getTips () {
      if (this.type === 'input') {
        return this.inputValue
      } else if (this.type === 'numberRange') {
        return this.inputValue.length > 0 ? (this.inputValue[0] + '-' + this.inputValue[1]) : ''
      } else if (this.type === 'date') {
        var typeObj = {
          year: 'yyyy',
          month: 'yyyy年MM月',
          date: 'yyyy/MM/dd',
          dates: 'yyyy/MM/dd',
          week: 'yyyy年WW周',
          datetime: 'yyyy/MM/dd hh:mm:ss',
          datetimerange: 'yyyy/MM/dd hh:mm:ss',
          daterange: 'yyyy/MM/dd'
        }
        if (this.dateType.indexOf('range') > -1) {
          if (this.inputValue.length === 2) {
            return this.$date.formatDate(this.inputValue[0], typeObj[this.dateType]) + '-' + this.$date.formatDate(this.inputValue[1], typeObj[this.dateType])
          } else {
            return ''
          }
        } else {
          if (this.dateType === 'dates') {
            var str = ''
            if (this.inputValue) {
              this.inputValue.forEach((k, v) => {
                str += this.$date.formatDate(k, 'yyyy/MM/dd') + ','
              })
            }
            return str
          } else {
            return this.$date.formatDate(this.inputValue, typeObj[this.dateType])
          }
        }
      } else if (this.type === 'select') {
        return this.$utils.getAttrByKey(this.inputValue, this.list, this.selectValueName, this.selectLabel)
      } else if (this.type === 'search') {
        return this.inputValue && this.inputValue[this.selectLabel] || ''
      }
      return ''
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
    showPover () {
    },
    /**
     * popover 关闭后事件响应
     */
    hidePover () {
      let value = this.type === 'select' ? this.$utils.getObjectByAttr(this.inputValue, this.list, this.selectValueName) : this.inputValue
      if (this.isClickBtn || this.oldValue != value) {
        this.$emit('input', value)
        this.$emit('change', {
          isClearAll: this.isClearAll,
          type: this.type,
          dateType: this.dateType,
          value
        })
        this.oldValue = value
        this.isClearAll = false
      } else {
        // 数值没法发生变化或者不是直接点击查询
      }
      this.isClickBtn = false
    },
    /**
     * 清空重置数据框
     */
    clearInput () {
      this.isClickBtn = true
      this.inputValue = ''
      // if (this.type == 'numberRange') {
      //   this.inputValue = []
      // }
      this.isShowPopover = false
    },
    resetAll () {
      this.clearInput()
      this.isClearAll = true
    },
    /**
     * 搜索提交数据
     */
    searchData () {
      this.isClickBtn = true
      this.isShowPopover = false
    }
  }
}
</script>
