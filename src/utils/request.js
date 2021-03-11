/*
 * @Author: kangxl
 * @Date: 2020-03-10 16:56:26
 * @LastEditors: guan zhenhua
 * @LastEditTime: 2020-08-03 09:06:56
 * @Description: 请求
 */
import Vue from 'vue'
import axios from 'axios'
import { Message } from 'element-ui'
// import store from '@/store'
import qs from 'qs'
import storage from './storage'
// create an axios instance
import settings from '@/config/settings'
import { objectToFormData } from './objectToFormdata'

export const host = settings.server_address

const service = axios.create({
  baseURL: host // api的base_url
  // timeout: 5000 // request timeout
})

// const errorFlg = false// 会话过期异常
// request interceptor
service.interceptors.request.use(config => {
  // if (config.isForm) { // 如果是form提交，设置isForm=true
  //   config.data = qs.stringify(config.data)
  //   config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  // }
  config.headers['Authorization'] = storage.local.get('token') || ''
  return config
}, error => {
  // Do something with request error
  Promise.reject(error)
})
var showErrMsg = (msg) => {
  Message({
    showClose: true,
    message: msg || '服务或者网络异常',
    type: 'error',
    duration: 5 * 1000
  })
}
/**
 * 返回结果处理
 * @param {*} option request的属性参照axios
 * @param {*} config
 *               @config-param {*} noShowMsg 有异常时是否需要消息提示
 *               @config-param {*} isShowLoading 是否需要请求加载过程loading
 */
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
    res.header = response.headers // 设置返回的header信息
    if (loading) {
      loading.hide()
    }
    if (res.success === 1) { // 正常返回数据
      return res
    } else {
      if (!config.noShowMsg) { // 返回异常提示
        showErrMsg(res.errMsg || '服务异常')
      }
      return Promise.reject({ isHandle: true })
    }
  }).catch((e) => {
    if (loading) {
      loading.hide()
    }
    // 请求异常处理
    if (!config.noShowMsg && e && !e.isHandle) {
      showErrMsg()
    }
    return Promise.reject({})
  })
}
/**
 * 系统英文名称，也是用于各个系统请求路径的prefix
 */
export const system = {
  pet: 'pet',
  mall: 'mall',
  store: 'store',
  order: 'order',
  operation: 'operation',
  sysManage: 'user',
  userManage: 'userManage',
  promotion: 'promotion',
  content: 'content',
  finance: 'finance',
  authManage: 'authManage',
  setManage: 'setManage',
  socialContact: 'socialContact'
}
/**
 * 主地址
 */
export const baseUrl = settings.baseUrl
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
/**
 * 下载文件
 * @param {*} url 地址相对路径
 * @param {*} params 参数
 */
export function windowDownloadFile (url, params) {
  var address = host + url
  if (params) {
    address += '?' + qs.stringify(params)
  }
  window.open(address)
}
export function downloadFile (url, params) {
  service({
    url,
    method: 'get',
    params,
    headers: { 'filename': 'utf-8' },
    responseType: 'blob'
  }).then((res, a, b) => {
    const errMsg = res.headers['errormsg']
    if (errMsg) {
      showErrMsg(window.decodeURI(errMsg))
      return false
    }
    var file = res.data
    let blob = new Blob([file], { type: file.type })
    const contentDisposition = res.headers['content-disposition']
    let fileName = '下载.xlsx'
    if (contentDisposition) {
      fileName = window.decodeURI(res.headers['content-disposition'].split('=')[1])
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
    console.log(error)
  })
}
