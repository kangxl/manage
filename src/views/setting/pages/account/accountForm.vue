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
      <el-form-item
        label="账号"
        prop="account"
      >
        <el-input
          name="account"
          style="display:none;"
          type="password"
        />
        <span v-if="form&&form.id">{{ form.account }}</span>
        <el-input
          v-else
          v-model.trim="form.account"
          name="account"
          autocomplete="new-account"
        />
      </el-form-item>
      <el-row v-if="!form.id">
        <el-col :span="12">
          <el-form-item
            label="密码"
            prop="password"
          >
            <el-input
              name="password"
              style="display:none;"
              type="password"
            />
            <el-input
              v-model.trim="form.password"
              name="password"
              autocomplete="new-password"
              type="password"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="二次确认"
            prop="checkPass"
          >
            <el-input
              v-model.trim="form.checkPass"
              type="password"
              auto-complete="off"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item
        label="下属角色"
        prop="roleIds"
      >
        <el-checkbox-group v-model="form.roleIds">
          <el-checkbox
            v-for="r in roleList"
            :key="r.id"
            :label="r.id"
          >{{ r.name }}</el-checkbox>
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
import { addAccount, editAccount, getAccountById } from '../../api/accountApi'
import { getAllRole } from '../../api/roleApi'
import { validatePassword, PASSWORD_ERROR_MSG } from '@/utils/validate'

export default {
  name: 'AccountFormDialog',
  props: {
    formData: {
      default: () => { },
      type: Object
    }
  },
  data () {
    var validatePass1 = (rule, value, callback) => {
      value = value.trim()
      if (!value) {
        callback(new Error('请输入新密码'))
      } else if (!validatePassword(value)) {
        callback(new Error(PASSWORD_ERROR_MSG))
      } else {
        if (this.form.checkPass !== '') {
          this.$refs.form.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请再次新输入密码'))
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      isOpen: true,
      loading: false,
      form: { roleIds: [] },
      roleList: [],
      formRules: {
        roleIds: [{ type: 'array', required: true, trigger: 'change', message: '必须选择角色' }],
        account: [{ required: true, trigger: 'change', message: '请输入账号' }],
        password: [{ required: true, validator: validatePass1, trigger: 'change' }],
        checkPass: [{ required: true, validator: validatePass2, trigger: 'change' }]

      }
    }
  },
  computed: {
    getTitle () {
      if (!this.formData || !this.formData.id) {
        return '新增'
      } else {
        return '修改'
      }
    }
  },
  created () {
    this.getAllRole()
    if (this.formData.id) {
      this.getAccountDetail()
    }
  },
  methods: {
    getAccountDetail () {
      getAccountById(this.formData.id).then(res => {
        var data = res.data || {}
        data.roleIds = this.$utils.getListAttrs(data.roleList)
        this.form = res.data
      })
    },
    getAllRole () {
      getAllRole().then(res => {
        this.roleList = res.data || []
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
            roleIds: this.form.roleIds
          }
          let req
          if (this.form.id) {
            data.id = this.form.id
            req = editAccount(data.id, data)
          } else {
            data.account = this.form.account
            data.password = this.form.password
            req = addAccount(data)
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
