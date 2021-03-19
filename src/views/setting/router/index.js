/*
 * @Author: kangxl
 * @Date: 2019-09-04 09:42:15
 * @LastEditors: kangxl
 * @LastEditTime: 2020-12-10 19:24:52
 * @Description: occ路由
 */
import Layout from '@/views/layout'
var usertRouter = {
  path: '/setting',
  component: Layout,
  meta: {
    menuName: '系统设置',
    icon: '',
    authCode: ''
  },
  children: [
    {
      path: 'staff',
      name: 'StaffList',
      component: () => import('../pages/staff/staff'),
      meta: {
        title: '员工管理',
        menuName: '员工管理',
        icon: '',
        authCode: ''
      }
    },
    {
      path: 'account',
      name: 'AccountList',
      component: () => import('../pages/account/account'),
      meta: {
        title: '账号管理',
        menuName: '账号管理',
        icon: '',
        authCode: ''
      }
    },
    {
      path: 'account/detail',
      name: 'AccountDetail',
      component: () => import('../pages/account/accountDetail'),
      meta: {
        title: '账号详情',
        authCode: '',
        activeMenu: 'AccountList'
      }
    },
    {
      path: 'role',
      name: 'RoleList',
      component: () => import('../pages/role/role'),
      meta: {
        title: '角色',
        menuName: '角色',
        icon: '',
        authCode: ''
      }
    }
  ]
}

export default usertRouter

