<!--
 * @Author: kangxl
 * @Date: 2020-02-27 14:38:29
 * @LastEditors: kangxl
 * @LastEditTime: 2020-03-10 16:33:55
 * @Description: 搜索组件
 * 支持input，select，checkbox，datePicker
   其他待扩充或者可以自定义
 -->
<template>
  <div class="search-title corner-6">
    <el-form :inline="true">
      <slot name="front" />
      <el-form-item
        v-for="(item,index) in searchComponents"
        :key="index"
      >
        <el-input
          v-if="item.type=='input'"
          v-model.trim="conditions[item.prop]"
          :placeholder="item.placeholder"
        />
        <el-select
          v-else-if="item.type=='select'"
          v-model="conditions[item.prop]"
          clearable
          :placeholder="item.placeholder||'请选择'"
        >
          <el-option
            v-for="(op,i) in item.list"
            :key="i"
            :label="op[item.selectLabel||'name']"
            :value="op[item.selectValue||'value']"
          />
        </el-select>
        <el-checkbox
          v-else-if="item.type=='checkbox'"
          v-model="conditions[item.prop]"
        >{{ item.lable }}</el-checkbox>
        <el-date-picker
          v-else-if="item.type=='datePicker'"
          v-model="conditions[item.prop]"
          type="date"
          :placeholder="item.placeholder||'选择日期'"
        />
      </el-form-item>
      <slot name="back" />
      <el-form-item>
        <el-button
          type="primary"
          @click.stop.prevent="searchData"
        >查询</el-button>
      </el-form-item>
      <slot name="btns" />
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'MyTableSearch',
  props: {
    conditions: {
      type: Object,
      default: () => { }
    },
    searchComponents: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    searchData () {
      this.$emit('search')
    }
  }
}
</script>
