/*
 * @Author: kangxl
 * @Date: 2019-08-12 16:28:50
 * @LastEditors: kangxl
 * @LastEditTime: 2020-03-11 11:22:56
 * @Description: 权限验证
 */

import store from '@/store'
import utils from '@/utils'
export function verification (code) {
  const resources = store.state.userInfo && store.state.userInfo.codes || []
  if (utils.hasPermission(code, resources)) {
    return true
  } else {
    return false
  }
}
export default {
  inserted (el, binding, vnode) {
    const { value } = binding
    if (!verification(value + '')) {
      el.parentNode && el.parentNode.removeChild(el)
    }
  }
}
