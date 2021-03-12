<!--
 * @Author: kangxl
 * @Date: 2021-01-26 15:13:42
 * @LastEditors: kangxl
 * @LastEditTime: 2021-01-26 15:40:28
 * @Description:
 -->
<template>
  <el-dialog
    :append-to-body="true"
    :visible.sync="isOpen"
    title="账户详情"
    width="80%"
    @close="closeDialog"
  >
    <el-form
      ref="form"
      :model="form"
      label-width="80px"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item label="账号">
            {{ form.account }}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="创建时间">
            {{ $date.formatDate(form.createTime) }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="更新人">
            {{ form.updaterName }}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="更新时间">
            {{ $date.formatDate(form.updateTime) }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="下属角色">
        {{ $utils.getListAttrs(form.roleList,'name').join(',') }}
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
import { getAccountById } from '../../api/accountApi'
export default {
  name: 'AccountDetailDialog',
  props: {
    formData: {
      default: () => { },
      type: Object
    }
  },
  data () {
    return {
      isOpen: true,
      loading: false,
      form: {}
    }
  },
  created () {
    this.getAccountDetail()
  },
  methods: {
    getAccountDetail () {
      getAccountById(this.formData.id).then(res => {
        var data = res.data || {}
        this.form = data
      })
    },
    /**
     * 关闭角色添加修改窗口
     */
    closeDialog () {
      this.$emit('close')
    }
  }
}
</script>
