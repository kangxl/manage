import Clipboard from './clipboard'
// 剪贴板
const install = function(Vue) {
  Vue.directive('Clipboard', Clipboard)
}

if (window.Vue) {
  window.clipboard = Clipboard
  Vue.use(install); // eslint-disable-line
}

Clipboard.install = install
export default Clipboard
