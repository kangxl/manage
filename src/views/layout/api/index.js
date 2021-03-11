/*
 * @Author: guanzhenhua
 * @Date: 2020-05-21 09:32:23
 * @LastEditors: guanzhenhua
 * @LastEditTime: 2020-07-21 08:56:16
 * @Description:
 */
import request from '@/utils/request'
export function getUserInfo () {
  return request({
    url: '/user/info',
    method: 'get'
  })
}
export function updateUserPassword (data) {
  return request({
    url: '/user/changePassword',
    method: 'put',
    data
  })
}
export function getQiniuToken () { // 获得七牛上传token
  return request({
    url: '/qiniu/token',
    method: 'get'
  })
}
export function getSystemResource (params) { // 获取各个系统资权限
  return request({
    url: '/getCurrentModuleRes',
    method: 'get',
    params
  })
}
export function getLoginLogList (params) { // 获取系统登录日志
  return request({
    url: '/getLoginLogList',
    method: 'get',
    params
  })
}
export function getSysData (params) { // 获取系统信息
  return request({
    url: '/getSysData',
    method: 'get',
    params
  })
}
export const uploadFileUrl = 'common/file/upload'
