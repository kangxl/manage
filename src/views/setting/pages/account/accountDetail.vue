<!--
 * @Author: kangxl
 * @Date: 2021-01-26 15:13:42
 * @LastEditors: kangxl
 * @LastEditTime: 2021-01-26 15:40:28
 * @Description:
 -->
<template>
  <div style="height:100%">
    <el-page-header
      content="详情页面"
      style="    padding: 10px 0px !important;
    background-color: #f9fafc !important;
    border-bottom: 1px solid #eaedf1 !important;"
      @back="goBack"
    />
    <my-detail
      :data="data"
      :field-list="fieldList"
    >
      <template v-slot:3>
        {{ new Date() | date }}
      </template>
      <my-detail />
    </my-detail>
  </div>
</template>
<script>
import Mock from 'mockjs'
export default {
  data () {
    Mock.mock('@increment(' + (-Mock.mock('@increment')) + ')')
    return {
      fieldList: Mock.mock({
        'list|30': [{
          prop: '@increment',
          label: '@cword(3,8):',
          'width|1': ['49%']
        }]
      }).list,
      data: Mock.mock({
        'list|30': ['@cword(10,100)']
      }).list
    }
  },
  created () {
    this.getAccountDetail()
  },
  methods: {
    getAccountDetail () {

    },
    /**
     * 关闭角色添加修改窗口
     */
    goBack () {
      this.$emit('close')
    }
  }
}
</script>
