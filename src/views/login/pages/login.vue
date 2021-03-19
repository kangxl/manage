<template>
  <div class="limiter">
    <div class="container-login100">
      <div class="wrap-login100">
        <div class="login100-form-title">
          <span class="login100-form-title-1"> 采购管理系统 </span>
        </div>
        <el-form
          ref="loginForm"
          label-width="120"
          :model="loginForm"
          :rules="loginRules"
          style="margin: 0 auto;padding-top:20px;
    width: 400px;"
        >
          <el-form-item prop="account">
            <el-input
              name="account"
              style="display:none;"
              type="text"
            />
            <el-input
              v-model.trim="loginForm.account"
              autocomplete="off"
              name="account"
              placeholder="账号"
              type="text"
              @keyup.native.enter="login"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              name="password"
              style="display:none;"
              type="text"
            />
            <el-input
              v-model.trim="loginForm.password"
              autocomplete="new-password"
              name="password"
              placeholder="密码"
              type="password"
              @keyup.native.enter="login"
            />
          </el-form-item>
          <el-form-item style="text-align: center;">
            <el-button
              style="width:100%"
              type="primary"
              @click="login"
            >提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Login',
  data () {
    return {
      loading: false,
      isRemember: false,
      loginForm: {
        account: '',
        password: ''
      },
      loginRules: {
        account: [{ required: true, trigger: 'change', message: '请输入用户名' }],
        password: [{ required: true, trigger: 'change', message: '请输入密码' }]
      }
    }
  },
  methods: {
    login () {
      this.loading = true
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$store.dispatch('user/UserLogin', this.loginForm).then(res => {
            this.$router.replace({
              path: '/home'
            })
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
.limiter {
  width: 100%;
  margin: 0 auto;
}

.container-login100 {
  width: 100%;
  min-height: 100vh;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 15px;
  background: #ebeeef;
}
.wrap-login100 {
  width: 670px;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
}
.login100-form-title {
  background-image: url(/images/bg-01.jpg);
  width: 100%;
  position: relative;
  z-index: 1;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;

  padding: 70px 15px 74px 15px;
}

.login100-form-title-1 {
  font-family: Poppins-Bold;
  font-size: 30px;
  color: #fff;
  text-transform: uppercase;
  line-height: 1.2;
  text-align: center;
}

.login100-form-title::before {
  content: "";
  display: block;
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(54, 84, 99, 0.7);
}
</style>
