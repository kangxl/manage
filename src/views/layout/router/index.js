/*
 * @Author: guanzhenhua
 * @Date: 2020-05-21 09:32:23
 * @LastEditors: guanzhenhua
 * @LastEditTime: 2020-07-21 09:37:56
 * @Description:
 */
import Layout from '@/views/layout'
import ErrorPage401 from '../401'
import ErrorPage404 from '../404'
var homeRouter = [
  {
    path: '/401',
    name: 'errorPage401',
    component: ErrorPage401,
    meta: {
      hidden: true
    }
  }, {
    path: '/404',
    name: 'errorPage404',
    component: ErrorPage404,
    meta: {
      hidden: true
    }
  }, {
    path: '/home',
    name: 'home',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('../home'),
        meta: {
          hidden: true
        }
      }
    ]
  },
  {
    path: '/reload',
    component: Layout,
    children: [
      {
        name: 'Reload',
        path: '/reload/:path(.*)',
        component: () => import('../reload'),
        meta: {
          noCache: true,
          noTag: true
        }
      }
    ]
  },
  {
    path: '*', component: ErrorPage404,
    meta: {
      hidden: true
    }
  }
]

export default homeRouter
