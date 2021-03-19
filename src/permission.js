import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import utils from '@/utils'
NProgress.configure({ showSpinner: false })// NProgress Configuration
function auth (to, from, next, user) {
  var codes = user && user.codes || []
  var authCode = to.meta.authCode
  if (authCode) {
    if (utils.hasPermission(authCode, codes)) { // 该权限码存在 就继续访问页面
      next()
    } else { // 没有权限跳到404或者没有权限的页面
      next({ path: '/401', query: { url: to.fullPath }, replace: true })
    }
  } else {
    next()
  }
}

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  if (to.meta.hidden) {
    next()
    return false
  }
  let user = store.state.user.userInfo || {}
  if (user && user.id) { // 已经获取用户信息
    auth(to, from, next, user)
  } else {
    store.dispatch('user/GetUserInfo').then(res => {
      auth(to, from, next, res.data || {})
    }).catch(() => {
      next({ path: '/login' })
    })
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
