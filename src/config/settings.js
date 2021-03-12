var host = '' // 开发
var componentHost = ''
if (process.env.NODE_ENV !== 'development') {
  host = process.env.VUE_APP_HOST
  componentHost = process.env.VUE_APP_COMPONENT_HOST
}

module.exports = {
  title: '管理后台',
  server_address: host,
  socketHost: '',
  systemCode: '',
  componentAddress: componentHost, // 公用组件库地址
  uploadAddress: host + 'oss-api/oss/file/uploadv2',
  downloadAdress: host + 'oss-api/oss/file/download?fileId='
}
