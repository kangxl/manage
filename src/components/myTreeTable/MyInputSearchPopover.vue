<template v-slot="header">
  <el-popover
    v-model="isShowPopover"
    width="width"
    trigger="click"
    style="cursor: pointer;"
    @hide="hidePover"
  >
    <span slot="reference">
      <el-tooltip
        :disabled="isShowPopover|| !inputValue"
        :content="getTips"
      >
        <span :style="{ color : inputValue?'#d80025':''}">{{ name }}</span>
      </el-tooltip>
      <a class="fa fa-caret-square-o-down" />
    </span>
    <el-row style="padding-bottom:10px">
      <el-input
        v-if="type == 'input'"
        v-model="inputValue"
        size="mini"
      />
      <number-range
        v-if="type == 'numberRange'"
        v-model="inputValue"
        @numberValue="numberValue"
      />
      <el-select
        v-if="type == 'select'"
        v-model="inputValue"
        clearable
        placeholder="请选择"
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
        :loading="loading"
        filterable
        remote
        reserve-keyword
        placeholder="请输入关键词"
        @input.native="remoteMethod($event)"
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
        :type="dateType"
        :range-separator="checkRangeDate?'至':''"
        :start-placeholder="checkRangeDate?'开始日期':''"
        :end-placeholder="checkRangeDate?'结束日期':''"
        :placeholder="checkRangeDate?'':'选择日期时间'"
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
        v-if="isAllReset"
        size="mini"
        @click="resetAll"
      >全部重置</el-button>
    </el-row>
  </el-popover>
</template>
<script>
/**
 * name 表格要显示的表头文字 必填
 * isAllReset 是否需要全部重置按阿
 * width popover的宽度 非必填
 * prop valueCallback返回的属性，用于多个搜索调试回调函数统一处理 非必填
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
import { formatDate } from '@/utils/date'
import NumberRange from '@/components/MyNumberRange'
import { attrToName, getObjectByAttr } from '@/utils'
export default {
  name: 'MyInputSearchPopover',
  components: { NumberRange },
  props: {
    name: { // 表头文字
      type: String,
      default: ''
    },
    isAllReset: { // 是否是需要全部重置按钮
      type: Boolean,
      default: false
    },
    width: { // popover的宽度
      type: Number,
      default: 400
    },
    prop: { // 数据要反映到那个属性上
      type: String,
      default: ''
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
    queryFunc: { // 搜索数据方法
      type: Function,
      default: null
    }
  },
  data () {
    return {
      loading: false,
      isShowPopover: false,
      inputValue: '',
      isAll: false
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
        return this.inputValue[0] + '-' + this.inputValue[1]
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
            return formatDate(this.inputValue[0], typeObj[this.dateType]) + '-' + formatDate(this.inputValue[1], typeObj[this.dateType])
          } else {
            return ''
          }
        } else {
          if (this.dateType === 'dates') {
            var str = ''
            if (this.inputValue) {
              this.inputValue.forEach((k, v) => {
                str += formatDate(k, 'yyyy/MM/dd') + ','
              })
            }
            return str
          } else {
            return formatDate(this.inputValue, typeObj[this.dateType])
          }
        }
      } else if (this.type === 'select') {
        return attrToName(this.inputValue, this.list, this.selectValueName, this.selectLabel)
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
    numberValue (data) {
      this.inputValue = JSON.parse(JSON.stringify(data))
    },
    /**
     * popover 关闭后事件响应
     */
    hidePover () {
      this.$emit('valueCallback', {
        type: this.isAll ? '1' : '0',
        prop: this.prop,
        value: this.type === 'select' ? getObjectByAttr(this.inputValue, this.list, this.selectValueName) : this.inputValue
      })
      this.isAll = false
    },
    /**
     * 清空重置数据框
     */
    clearInput () {
      this.inputValue = ''
      this.isShowPopover = false
    },
    resetAll () {
      this.inputValue = ''
      this.isAll = true
      this.isShowPopover = false
    },
    /**
     * 搜索提交数据
     */
    searchData () {
      this.isShowPopover = false
    },
    remoteMethod (e) {
      var query = (e.target && e.target.value) || (e.srcElement && e.srcElement.value) || ''
      if (query) {
        this.loading = true
        this.queryFunc(query).then(rep => {
          this.list = rep.data || []
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      }
    }
  }
}
</script>
