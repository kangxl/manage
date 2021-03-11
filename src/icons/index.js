/*
 * @Author: kangxl
 * @Date: 2020-03-11 15:35:59
 * @LastEditors: kangxl
 * @LastEditTime: 2020-03-11 16:11:36
 * @Description: svg图标化
 */
import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component

// register globally
Vue.component('svg-icon', SvgIcon)

const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
