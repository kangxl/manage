/*
 * @Author: kangxl
 * @Date: 2019-09-09 15:01:00
 * @LastEditors: guan zhenhua
 * @LastEditTime: 2020-08-06 10:34:35
 * @Description: 所有路由来自各个模块
 * meta
 *    authCode 页面权限码
 *    hidden 该页面是否做拦截判断
 *    level* 当前页面的多极路由地址用于选中
 *    isCache 是否需要缓存
 */
import Vue from 'vue'
import Router from 'vue-router'

import loginRouter from '@/views/login/router'
import layoutRouter from '@/views/layout/router'
import componentsRouter from '@/views/components/router'
import roleSettingRouter from '@/views/roleSetting/router'
Vue.use(Router)

export const systemMenu = () => {
  var arr = [
    ...componentsRouter,
    roleSettingRouter
  ]
  if (process.env.VUE_APP_SYSTEM === 'aps') {
    // 系统配置
    let formDesignRouter = require('@/views/formDesign/router').default
    arr.push(formDesignRouter)
  }
  return arr
}
export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    ...loginRouter,
    ...layoutRouter,
    ...systemMenu()
  ]
})

