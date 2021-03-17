<!--
 * @Descripttion:
 * @version:
 * @Author: jiang feng
 * @Date: 2020-04-15 09:36:33
 * @LastEditors: jiang feng
 * @LastEditTime: 2020-07-14 08:59:25
 -->
<template>
  <div>
    <el-col
      :span="11"
      style="width:80px"
    >
      <el-input
        v-model.number="numberRangeForm.numberStart"
        size="mini"
        @input="valueChange"
      />
    </el-col>
    <el-col
      :span="2"
      style="text-align: center;"
    >-</el-col>
    <el-col
      :span="11"
      style="width:80px"
    >
      <el-input
        v-model.number="numberRangeForm.numberEnd"
        size="mini"
        @input="valueChange"
      />
    </el-col>
  </div>
</template>
<script>
export default {
  name: 'NumberRange',
  props: {
    value: Array
  },
  data () {
    return {
      numberRangeForm: { numberStart: '', numberEnd: '' }
    }
  },
  watch: {
    value (value) {
      value = value instanceof Array ? value : []
      this.numberRangeForm = { numberStart: value[0] || '', numberEnd: value[1] || '' }
    }
  },
  methods: {
    valueChange ($event) {
      var data = [this.numberRangeForm.numberStart, this.numberRangeForm.numberEnd]
      // if (this.numberRangeForm.numberStart > this.numberRangeForm.numberEnd) {
      //   data = data.reverse()
      // }
      this.$emit('input', data)
    }
  }
}
</script>
