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
  menuName: '角色管理',
  icon: '',
  children: [{
    path: 'list',
    menuName: '角色列表',
    icon: '',
    component: () => import('../pages/roleList'),
    meta: {
      authCode: 'no'
    }
  },
  {
    path: 'setting',
    menuName: '角色设置',
    icon: '',
    component: () => import('../pages/roleSetting'),
    meta: {
      authCode: 'no'
    }
  }]
}
