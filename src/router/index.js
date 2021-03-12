/*
 * 配置参数说明
 * 注意事项：
 * 1.页面级别的组件name必须和对应的路由name一样
 * 2.
 * meta
 *      title: tag标签名称
 *      menuName: 菜单名称
 *      activeMenu: 当前路由激活某个菜单的name
 *      icon:菜单图标
 *      noTag:是否属于标签页面
 *      noCache:当前页面是否需要缓存
 *      hidden 该页面是否做拦截判断
 *      authCode 页面权限码
 */
import Vue from 'vue'
import Router from 'vue-router'

import loginRouter from '@/views/login/router'
import layoutRouter from '@/views/layout/router'
import formDesignRouter from '@/views/formDesign/router'
import roleSettingRouter from '@/views/roleSetting/router'
import settingRouter from '@/views/setting/router'
Vue.use(Router)
let routerObj = {}
function getMenuList (list, p) {
  let arr = []
  for (var i = 0; i < list.length; i++) {
    let item = list[i]
    item.meta = item.meta || {}
    let data = {
      index: (p.index || '') + '-' + i, // 菜单id用于选中展开
      name: item.meta.menuName || '', // 菜单名称
      icon: item.meta.icon || '', // 菜单图标
      href: item.href ? item.href : (p.href ? (p.href + '/') : item.path) // 点击菜单的跳转地址
    }
    if (item.meta.activeMenu) { // 有非菜单子页面，index要设置菜单的index
      let p = routerObj[item.meta.activeMenu]
      if (p) {
        item.meta.index = p.index
      } else {
        console.error(item, `activeMenu:${item.meta.activeMenu}定义或顺序异常请检查`)
      }
    } else {
      item.meta.index = data.index
    }
    if (item.children && item.children.length > 0) {
      if (data.name) { // menuName有值的才属于菜单数据
        arr.push(data)
        data.children = getMenuList(item.children, data)
      } else {
        data = getMenuList(item.children, data)[0] || {}
        if (data.name) { // 菜单数据
          arr.push(data)
        }
      }
    } else {
      data.href = p.href + '/' + item.path
      if (process.env.NODE_ENV === 'development') { // 开发校验
        typeof item.component == 'function' && item.component().then(res => { // 组件名称是否和路由定义的匹配
          let c = res.default
          if (c.name && c.name !== item.name) {
            console.error(`组件名称错误请修改,
                  位置: +${c.__file} 
                  名称匹配：${c.name}==${item.name}`)
          }
        })
        if (routerObj[item.name]) { // route的name不能重复定义
          console.error(`router名称重复请修改,
                位置: +${routerObj[item.name]} 
                名称匹配：${item}`)
          return false
        }
      }
      if (item.name) { // 创建name对应路由对象数据
        routerObj[item.name] = data
      }

      if (data.name) { // 菜单数据
        arr.push(data)
      }
    }
  }
  return arr
}
const systemMenu = () => {
  var routers = [
    formDesignRouter,
    roleSettingRouter,
    settingRouter
  ]
  let menus = getMenuList(routers, {})
  return { routers, menus, routerObj }
}
export const resources = systemMenu()
export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    ...loginRouter,
    ...layoutRouter,
    ...resources.routers
  ]
})

