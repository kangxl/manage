import Layout from '@/views/layout'

export default {
  path: '/form',
  component: Layout,
  children: [{
    name: 'FormDesign',
    path: 'design',
    component: () => import('../pages/formDesign'),
    meta: {
      title: '表单设计器',
      menuName: '表单设计器',
      icon: '',
      authCode: ''
    }
  }]
}
