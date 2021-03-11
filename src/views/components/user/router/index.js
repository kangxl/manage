import Layout from '@/views/layout'
var userRouter = {
  path: '/user',
  menuName: '用户管理',
  icon: '',
  component: Layout,
  children: [{
    menuName: '用户列表',
    icon: '',
    path: '',
    component: () => import('../pages/user'),
    meta: {
      authCode: 'no'
    }
  }]
}

export default userRouter
