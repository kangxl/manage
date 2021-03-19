import Vue from 'vue'
import axios from 'axios'
import { Message } from 'element-ui'
// import store from '@/store'
import qs from 'qs'
import storage from './storage'
import settings from '@/config/settings'
import { objectToFormData } from './objectToFormdata'
// import router from '@/router'
export const host = settings.server_address

const service = axios.create({
  baseURL: host, // api的base_url
  validateStatus: (status) => {
    return status == 200 || status == 401 || status == 403
  }
  // timeout: 5000 // request timeout
})

// const errorFlg = false// 会话过期异常
// request interceptor
service.interceptors.request.use(config => {
  config.headers['Authorization'] = storage.local.get('token') || ''
  return config
}, error => {
  Promise.reject(error)
})
/**
 * 返回结果处理
 * @param {*} option request的属性参照axios
 * @param {*} config
 *               @config-param {*} noShowMsg 有异常时是否需要消息提示
 *               @config-param {*} isShowLoading 是否需要请求加载过程loading
 */
var errMsg = (msg) => {
  Message({
    showClose: true,
    message: msg || '服务异常',
    type: 'error',
    duration: 5 * 1000
  })
}
export default function (option, config = {}) {
  var loading
  if (config.isShowLoading) {
    loading = Vue.$myLoading.show({
      color: '#28a745',
      canCancel: false
    })
  }
  if (config.isUpload) {
    option.data = objectToFormData(option.data)
    // option.headers = { 'Content-Type': 'multipart/form-data' }
  }
  return service(option).then(response => {
    const res = response.data
    console.info('请求参数和返回结果', option, response)
    if (response.status == 401) {
      console.info(response.status)
      errMsg('你的账号已在其他设备登陆')
      location.href = settings.componentAddress
    }
    res.header = response.headers // 设置返回的header信息
    if (loading) {
      loading.hide()
    }
    if (response.status == 200) {
      if (!res.code) { // 正常返回数据
        return res
      } else {
        return Promise.reject(response)
      }
    } else {
      return Promise.reject(response)
    }
  }).catch((err, a, b) => {
    console.error('异常：', err, a, b, err.response)
    if (loading) {
      loading.hide()
    }
    if (!config.noShowMsg) {
      if (err.status == 401) {
        errMsg('用户没有登录！')
        location.href = settings.componentAddress
        return false
      } else if (err.status == 403) {
        errMsg('用户没有权限！')
        return false
      } else if (err.status == 200) {
        errMsg(err.data.msg)
      } else if (err.response.status == 500 && err.response.data.code == '10000') {
        errMsg(err.response.data.msg)
      } else {
        errMsg('服务或者网络异常')
      }
    }
    return Promise.reject(err)
  })
}
/**
 * 通过相对路径创建绝对路径
 * @param {*} url 相对路径
 * @param {*} params 参数
 */
export function createUrl (url, params) {
  var paramStr = ''
  if (params) {
    paramStr = '?' + qs.stringify(params)
  }
  return settings.baseUrl + url + paramStr
}
export function uploadFile (data, url) {
  return new Promise((resolve, reject) => {
    axios.post(url ? (host + url) : settings.uploadAddress, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: storage.local.get('token') || ''
      }
    }).then(res => {
      if (!res.success) {
        resolve(res.data)
      } else {
        errMsg(res.msg)
        reject()
      }
    }).catch(e => {
      errMsg()
      reject()
    })
  })
}
export function downloadFile ({ id, fileId, url, params }) {
  let address = ''
  if (url) {
    address = (/^https?:\/\//i.test(url) ? url : (host + url)) + '?' + qs.stringify(params)
  } else {
    address = settings.downloadAdress + (fileId || id)
  }
  window.open(address)
}
export function downloadFile2 ({ url, params, fileName }) {
  service({
    url: (/^https?:\/\//i.test(url) ? url : (host + url)),
    method: 'get',
    params,
    headers: { 'filename': 'utf-8' },
    responseType: 'blob'
  }).then((res, a, b) => {
    var file = res.data
    let blob = new Blob([file], { type: file.type })
    const contentDisposition = res.headers['content-disposition']
    if (contentDisposition) {
      fileName = window.decodeURI(res.headers['content-disposition'].split('=')[1])
    }
    if (!fileName) {
      errMsg('文件名获取失败！')
      return false
    }
    let downloadElement = document.createElement('a')
    let href = window.URL.createObjectURL(blob) // 创建下载的链接
    downloadElement.href = href
    downloadElement.download = fileName // 下载后文件名
    document.body.appendChild(downloadElement)
    downloadElement.click() // 点击下载
    document.body.removeChild(downloadElement) // 下载完成移除元素
    window.URL.revokeObjectURL(href) // 释放blob对象
  }).catch(function (error) {
    console.error(error)
  })
}
