/*
 * @Author: kangxl
 * @Date: 2020-03-27 14:31:57
 * @LastEditors: kangxl
 * @LastEditTime: 2020-04-13 10:56:23
 * @Description: 加载中组件
 * 详细属性参照 https://github.com/ankurk91/vue-loading-overlay
 * 组件方式：
 * loading依赖于父元素显示，父元素必须是position: relative，否则继续向上找
 * <my-loading :active.sync="isLoading"
        :can-cancel="true"
        :on-cancel="onCancel"
        :is-full-page="fullPage"/>
   指令方式：
   Vue.$myLoading.show(options)
   this.$myLoading.show(options)
 */
import Component from './js/Component.vue'
import LoadingApi from './js/api'
import './css/index.css'
const Plugin = (Vue, props = {}, slots = {}) => {
  let api = LoadingApi(Vue, props, slots)
  Vue.component('my-loading', Component)
  Vue.prototype.$myLoading = api
  Vue.$myLoading = api
}

Component.install = Plugin

export default Component
