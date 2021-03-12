import drag from './drag'
// 拖动弹出框
const install = function (Vue) {
  Vue.directive('drag-dialog', drag)
}

if (window.Vue) {
  window['drag-dialog'] = drag
  Vue.use(install); // eslint-disable-line
}

drag.install = install
export default drag
