/*
 * @Author: kangxl
 * @Date: 2019-08-12 16:28:51
 * @LastEditors: kangxl
 * @LastEditTime: 2020-03-09 15:48:29
 * @Description: element table滚动加载
 */
import InfiniteScroll from './scroll'

const install = function (Vue) {
  Vue.directive('MyInfiniteScroll', InfiniteScroll)
}

if (window.Vue) {
  window.infiniteScroll = InfiniteScroll
  Vue.use(install); // eslint-disable-line
}

InfiniteScroll.install = install
export default InfiniteScroll
