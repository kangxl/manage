<template>
  <el-dialog
    :append-to-body="true"
    :visible.sync="isOpen"
    :title="getTitle"
    width="50%"
    @close="closeDialog"
  >
    <el-form
      ref="form"
      :model="form"
      :rules="formRules"
      label-width="80px"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="姓名"
            prop="name"
          >
            <el-input v-model.trim="form.name" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="工号"
            prop="jobNo"
          >
            <el-input v-model.trim="form.jobNo" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="部门"
            prop="deptId"
          >
            <el-cascader
              v-model="form.deptId"
              style="width:100%"
              :options="departmentTree"
              :props="{ checkStrictly: true,emitPath:false,label:'name',value:'id'}"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="审批主管"
            prop="isApproval"
          >
            <el-checkbox
              v-model="form.isApproval"
              :true-label="1"
              :false-label="0"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item
        label="登录账号"
        prop="accountIds"
      >
        <el-checkbox-group v-model="form.accountIds">
          <el-checkbox
            v-for="r in accountList"
            :key="r.id"
            :label="r.id"
          >{{ r.account }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <div
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="closeDialog">取消</el-button>
      <el-button
        :loading="loading"
        type="primary"
        @click="submitForm()"
      >提交</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { addStaff, editStaff, getStaffById } from '../../api/staffApi'
import { getNoConnAccountList } from '../../api/accountApi'
import { getDepartmentTreeList } from '../../api/departmentApi'
export default {
  name: 'StaffFormDialog',
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
      form: { accountIds: [] },
      departmentTree: [],
      accountList: [],
      formRules: {
        accountIds: [{ type: 'array', required: true, trigger: 'change', message: '必须选择账号' }],
        name: [{ required: true, trigger: 'change', message: '请输入姓名' }],
        jobNo: [{ required: true, trigger: 'change', message: '请输入工号' }],
        deptId: [{ required: true, trigger: 'change', message: '请选择部门' }]
      }
    }
  },
  computed: {
    getTitle () {
      if (!this.formData || !this.formData.id) {
        return '新增员工'
      } else {
        return '修改员工'
      }
    }
  },
  created () {
    if (this.formData.id) {
      this.getAccountDetail()
    } else {
      this.$set(this.form, 'deptId', this.formData.deptId)
    }
    this.getDepartmentTreeList()
    this.getNoConnAccountList()
  },
  methods: {
    setEmptyArrayToNull (list) {
      for (var i = 0; i < list.length; i++) {
        if (list[i].children && list[i].children.length == 0) {
          list[i].children = null
        } else {
          this.setEmptyArrayToNull(list[i].children)
        }
      }
    },
    getAccountDetail () {
      getStaffById(this.formData.id).then(res => {
        var data = res.data || {}
        data.accountIds = this.$utils.getListAttrs(data.accountList)
        this.accountList = this.accountList.concat(data.accountList || [])
        this.form = res.data
      })
    },
    getDepartmentTreeList () {
      getDepartmentTreeList().then(res => {
        let list = res && res.data || []
        this.setEmptyArrayToNull(list)
        console.log(12345, list, res)
        this.departmentTree = list
      })
    },
    getNoConnAccountList () {
      getNoConnAccountList().then(res => {
        this.accountList = this.accountList.concat(res.data || [])
      })
    },
    /**
     * 关闭角色添加修改窗口
     */
    closeDialog () {
      this.$emit('close')
    },
    /**
     * 提交角色添加修改数据
     */
    submitForm () {
      this.loading = true
      this.$refs.form.validate(valid => {
        if (valid) {
          var data = {
            name: this.form.name,
            jobNo: this.form.jobNo,
            deptId: this.form.deptId,
            accountIds: this.form.accountIds,
            isApproval: this.form.isApproval || 0
          }
          let req
          if (this.form.id) {
            data.id = this.form.id
            req = editStaff(this.form.id, data)
          } else {
            req = addStaff(data)
          }
          req.then((rep) => {
            this.$emit('close', true)
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          this.loading = false
        }
      })
    }
  }
}
</script>
