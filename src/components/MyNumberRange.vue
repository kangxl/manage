<!--
 * @Author: kangxl
 * @Date: 2019-08-12 16:28:50
 * @LastEditors: kangxl
 * @LastEditTime: 2020-03-09 16:06:03
 * @Description: 数字范围
 -->
<template>
  <div>
    <el-form
      ref="numberRangeForm"
      :model="numberRangeForm"
      :rules="rules"
    >
      <el-col :span="11">
        <el-form-item prop="numberStart">
          <el-input
            v-model.number="numberRangeForm.numberStart"
            size="mini"
            @blur="blurStart"
          />
        </el-form-item>
      </el-col>
      <el-col
        :span="2"
        style="text-align: center line-height: 38px"
      >-</el-col>
      <el-col :span="11">
        <el-form-item prop="numberEnd">
          <el-input
            v-model.number="numberRangeForm.numberEnd"
            size="mini"
            @blur="blurEnd"
          />
        </el-form-item>
      </el-col>
    </el-form>
  </div>
</template>
<script>
import { validateNumber } from '@/utils/validate'
export default {
  name: 'NumberRange',
  props: {
    isClear: {
      default: false,
      type: Boolean
    }
  },
  data () {
    var validateLower = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入容量初始值'))
      } else if (!validateNumber(2, value)) {
        callback(new Error('请输入大于等于0的整数'))
      } else if (this.numberRangeForm.numberEnd && this.numberRangeForm.numberEnd <= this.numberRangeForm.numberStart) {
        callback(new Error('结束值要大于初始值'))
      } else {
        callback()
      }
    }
    var validateUpper = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入容量结束值'))
      } else if (!validateNumber(1, value)) {
        callback(new Error('请输入大于0的整数'))
      } else if (this.numberRangeForm.numberStart && this.numberRangeForm.numberEnd <= this.numberRangeForm.numberStart) {
        callback(new Error('结束值要大于初始值'))
      } else {
        callback()
      }
    }
    return {
      numberRangeForm: { numberStart: '', numberEnd: '' },
      inputValue: [],
      rules: {
        numberStart: [
          { trigger: 'blur', validator: validateLower }
        ],
        numberEnd: [
          { trigger: 'blur', validator: validateUpper }
        ]
      }
    }
  },
  computed: {
  },
  methods: {
    blurStart () {
      this.inputValue[0] = this.numberRangeForm.numberStart
      this.$emit('numberValue', this.inputValue)
    },
    blurEnd () {
      this.inputValue[1] = this.numberRangeForm.numberEnd
      this.$emit('numberValue', this.inputValue)
    }
  }
}
</script>
