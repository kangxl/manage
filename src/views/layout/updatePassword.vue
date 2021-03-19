<template>
  <el-dialog
    :append-to-body="true"
    title="密码修改"
    :visible.sync="isOpen"
    width="600px"
    @close="closeDialog"
  >
    <el-form
      ref="updatePasswordForm"
      class="demo-ruleForm"
      label-width="120px"
      :model="updatePasswordForm"
      :rules="passwordRules"
    >
      <el-form-item
        label="旧密码"
        prop="oldPassword"
      >
        <el-input
          v-model.trim="updatePasswordForm.oldPassword"
          auto-complete="off"
          type="password"
        />
      </el-form-item>
      <el-form-item
        label="新密码"
        prop="newPassword"
      >
        <el-input
          v-model.trim="updatePasswordForm.newPassword"
          auto-complete="off"
          type="password"
        />
      </el-form-item>
      <el-form-item
        label="确认密码"
        prop="checkPass"
      >
        <el-input
          v-model.trim="updatePasswordForm.checkPass"
          auto-complete="off"
          type="password"
        />
      </el-form-item>

    </el-form>
    <div
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click.native.prevent="closeDialog">取消</el-button>
      <el-button
        :loading="loading"
        type="primary"
        @click.native.prevent="ok"
      >确定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { updateUserPassword } from '../layout/api'
export default {

  name: 'UpdatePassword',
  data () {
    var validatePass0 = (rule, value, callback) => {
      value = value.trim()
      if (!value) {
        callback(new Error('请输入旧密码'))
      } else if (!this.$validate.password_reg.test(value)) {
        callback(new Error(this.$validate.password_reg_msg))
      } else {
        callback()
      }
    }
    var validatePass1 = (rule, value, callback) => {
      value = value.trim()
      if (!value) {
        callback(new Error('请输入新密码'))
      } else if (!this.$validate.password_reg.test(value)) {
        callback(new Error(this.$validate.password_reg_msg))
      } else {
        if (this.updatePasswordForm.checkPass !== '') {
          this.$refs.updatePasswordForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请再次新输入密码'))
      } else if (value !== this.updatePasswordForm.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      isOpen: true,
      loading: false,
      updatePasswordForm: {
        oldPassword: '',
        newPassword: '',
        checkPass: ''
      },
      passwordRules: {
        oldPassword: [{ required: true, validator: validatePass0, trigger: 'change' }],
        newPassword: [{ required: true, validator: validatePass1, trigger: 'change' }],
        checkPass: [{ required: true, validator: validatePass2, trigger: 'change' }]

      }
    }
  },
  methods: {
    closeDialog () {
      this.$emit('close')
    },
    ok () {
      this.loading = true
      this.$refs.updatePasswordForm.validate(valid => {
        if (valid) {
          var data = {
            oldPassword: this.updatePasswordForm.oldPassword,
            password: this.updatePasswordForm.newPassword
          }
          updateUserPassword(data).then(rep => {
            this.$message({
              message: '密码修改成功！',
              type: 'success'
            })
            this.loading = false
            this.$emit('close')
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
