import Layout from '@/views/layout'

export default {
  path: '/form',
  component: Layout,
  children: [{
    path: 'design',
    menuName: '表单设计器',
    icon: '',
    component: () => import('../pages/formDesign'),
    meta: {
      authCode: 'no'
    }
  }]
}
