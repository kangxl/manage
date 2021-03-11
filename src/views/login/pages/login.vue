<template>
  <div>
    <div class="login-bg" />
    <section class="loginContainer corner-6  animation-pullDown">
      <header>
        <h2>
          <img
            src="@/images/pic-boy.jpg"
            style="height: 28px;position: relative;top:-2px;"
          > {{ title }}
        </h2>
      </header>
      <el-form
        ref="loginForm"
        class="demo-ruleForm"
        :model="loginForm"
        :rules="loginRules"
      >
        <el-form-item prop="username">
          <el-input
            v-model.trim="loginForm.username"
            autocomplete="off"
            class="inpu-list"
            placeholder="用户名"
            prefix-icon="fa fa-user-o"
            type="text"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model.trim="loginForm.password"
            autocomplete="off"
            class="inpu-list"
            placeholder="密码"
            prefix-icon="fa fa-key"
            type="password"
          />
        </el-form-item>
        <el-form-item>
          <my-button
            class="btn btn-primary"
            :loading="loading"
            @click.native.prevent="login"
          >登录
            <a class="fa fa-arrow-circle-right" />
          </my-button>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>
<script>
import MyButton from '@/components/MyButton'
import settings from '@/config/settings'
import storage from '@/utils/storage'
export default {
  name: 'Login',
  components: { MyButton },
  data () {
    return {
      title: settings.title,
      loading: false,
      isRemember: false,
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'change', message: '请输入用户名' }],
        password: [{ required: true, trigger: 'change', message: '请输入密码' }]
      }
    }
  },
  mounted () {
    var loginInfo = storage.local.getJson('loginInfo') || {}
    if (loginInfo.username && loginInfo.password) {
      this.loginForm.username = loginInfo.username
      this.loginForm.password = loginInfo.password
      this.isRemember = true
    }
  },
  methods: {
    login () {
      this.loading = true
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$store.dispatch('userLogin', this.loginForm).then((result) => {
            console.log(result)
            if (this.isRemember) {
              storage.local.setJson('loginInfo', this.loginForm)
            } else {
              storage.local.remove('loginInfo')
            }
            this.$router.replace({ path: '/home' })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          this.loading = false
        }
      })
    }
    // enterMethod(e) {
    //   const key = e.keyCode || e.which || e.charCode
    //   if (key === 13) {
    //     this.login()
    //   }
    // }
  }
}
</script>
<style scope>
.loginContainer .el-form-item {
  margin-bottom: 0px !important;
  margin-top: 30px !important;
}
.demo-ruleForm {
  margin-top: -80px;
}
.inpu-list:after {
  top: 33px;
}
.loginContainer input[type="text"],
.loginContainer input[type="password"] {
  margin-top: 0px;
}
.loginContainer .btn {
  margin-top: 0px;
}
</style>
