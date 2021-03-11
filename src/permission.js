/*
 * @Author: kangxl
 * @Date: 2019-08-12 16:28:52
 * @LastEditors: guan zhenhua
 * @LastEditTime: 2020-07-29 10:52:23
 * @Description: 路由守卫
 */
import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import utils from '@/utils'
NProgress.configure({ showSpinner: false })// NProgress Configuration
function auth (to, next, user) {
  var codes = user && user.codes || []
  var authCode = to.meta.authCode
  if (authCode) {
    if (utils.hasPermission(codes, authCode)) { // 该权限码存在 就继续访问页面
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
  next()
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
