<template>
  <div class="task-content">
    <ul class=" nav-menu">
      <li class="active"> <span class="hr-rank"> 修改密码</span></li>
    </ul>
    <div class="block-wrap passwordWrap">
      <div class="user-infor">
        <el-form
          ref="updatePasswordForm"
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
          <el-form-item>
            <el-button
              class="save"
              type="primary"
              @click="submit"
            >保存</el-button>
          </el-form-item>
        </el-form>

      </div>

    </div>

  </div>
</template>
<script>
import storage from '@/utils/storage'
import { updateUserPassword } from '../layout/api'
export default {
  name: 'UpdatePassword',
  data () {
    var validatePass0 = (rule, value, callback) => {
      value = value.trim()
      if (!value) {
        callback(new Error('请输入旧密码'))
      } else if (!this.$validate.validatePassword(value)) {
        callback(new Error(this.$validateForm.PASSWORD_ERROR_MSG))
      } else {
        callback()
      }
    }
    var validatePass1 = (rule, value, callback) => {
      value = value.trim()
      if (!value) {
        callback(new Error('请输入新密码'))
      } else if (!this.$validate.validatePassword(value)) {
        callback(new Error(this.$validateForm.PASSWORD_ERROR_MSG))
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
    submit () {
      this.loading = true
      this.$refs.updatePasswordForm.validate(valid => {
        if (valid) {
          var data = {
            oldPassword: this.updatePasswordForm.oldPassword,
            newPassword: this.updatePasswordForm.newPassword
          }
          updateUserPassword(data).then(rep => {
            var token = rep.data && rep.data.token || ''
            storage.local.set('token', token)
            this.$message({
              message: '密码修改成功！',
              type: 'success'
            })
            this.loading = false
            this.$emit('closeUpdatePasswordDialog')
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
<style scoped>
.passwordWrap .user-infor {
  width: 600px;
}
</style>
