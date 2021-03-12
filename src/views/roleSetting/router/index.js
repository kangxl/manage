/*
 * @Author: guanzhenhua
 * @Date: 2020-05-21 09:32:23
 * @LastEditors: guanzhenhua
 * @LastEditTime: 2020-07-21 09:37:56
 * @Description:
 */
import Layout from '@/views/layout'

export default {
  path: '/role',
  component: Layout,
  meta: {
    title: '角色管理',
    menuName: '角色管理',
    icon: '',
    authCode: ''
  },
  children: [{
    name: 'RoleList1',
    path: 'list',
    component: () => import('../pages/roleList'),
    meta: {
      title: '角色列表',
      menuName: '角色列表',
      icon: '',
      authCode: ''
    }
  },
  {
    path: 'setting',
    name: 'RoleSetting',
    component: () => import('../pages/roleSetting'),
    meta: {
      title: '角色设置',
      menuName: '角色设置',
      icon: '',
      authCode: ''
    }
  }]
}
