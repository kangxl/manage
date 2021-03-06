import 'normalize.css/normalize.css'
import './styles/element-variables.scss'
import './styles/overwrite.css'
import './iconfont/iconfont.css' // 来源于阿里iconfont
import './icons' // icon

import Vue from 'vue'
import filters from './utils/filters'
import router from './router'
import ElementUI from 'element-ui'
import Axios from 'axios'
import store from './store'
import './permission' // 页面权限控制
import storage from './utils/storage'
import date from './utils/date'
import utils from './utils/index'
import myEvent from './utils/myEvent'
import * as validateForm from './utils/validateForm'
import * as validate from './utils/validate'
import App from './App'
import permission, { authPermission } from './directive/permission'
import myLoading from '@/components/myLoading'
import myImagePreview from '@/components/myImagePreview'
import MyDialog from '@/components/MyDialog'
import VueEditor from 'vue2-editor'
import dragDialog from './directive/el-dragDialog'
import MyTable from '@/components/myTable/MyTable'
import MyDetail from '@/components/MyDetail'
import MyInputSearchPopover from '@/components/myTable/MyInputSearchPopover'
Vue.config.errorHandler = function (err, vm, info) {
  console.error('error', err, vm, info)
}
Vue.component('my-detail', MyDetail)
Vue.component('my-table', MyTable)
Vue.component('my-input-search-popover', MyInputSearchPopover)
Vue.component('my-dialog', MyDialog)
Vue.use(dragDialog)
Vue.use(VueEditor)
Vue.use(permission)
Vue.use(myLoading)
Vue.prototype.$myImage = myImagePreview(Vue)
// if (process.env.VUE_APP_SYSTEM === 'aps') {
//   // 系统配置
// }
if (process.env.NODE_ENV === 'development') { // 开发环境时使用mock模拟数据
  require('./views/login/mock')
  require('./views/setting/mock')
  require('./views/layout/mock')
}
Vue.use(ElementUI, {
  size: storage.cookie.get('size') || 'medium'
})
Axios.defaults.withCredentials = true

Object.keys(filters).map(key => {
  Vue.filter(key, filters[key])
})
window.Vue = Vue
Vue.config.productionTip = false
Vue.prototype.$http = Axios
Vue.prototype.$myEvent = myEvent
Vue.prototype.$utils = utils
Vue.prototype.$date = date
Vue.prototype.$validate = validate
Vue.prototype.$validateForm = validateForm
Vue.prototype.vue_authPermission = authPermission
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
