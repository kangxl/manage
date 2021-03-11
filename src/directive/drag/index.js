import drag from './drag'
// 拖动弹出框
const install = function(Vue) {
  Vue.directive('drag', drag)
}

if (window.Vue) {
  window['drag'] = drag
  Vue.use(install); // eslint-disable-line
}

drag.install = install
export default drag
