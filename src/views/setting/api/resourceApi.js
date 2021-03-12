/*
 * @Author: ztt
 * @Date: 2020-04-03 14:40:18
 * @LastEditors: kangxl
 * @LastEditTime: 2020-12-10 10:01:44
 * @Description:
 */
import request from '@/utils/request'
var prefix = '/user-web-api'

export function getResourceTreeList (params) { // 获取资源树
  return request({
    url: prefix + '/user/resource/tree',
    method: 'get',
    params
  })
}
// 查看资源
export function getResourceById (data) {
  return request({
    url: prefix + '/test/1.2',
    method: 'get'
  })
}
// 提交资源
export function addResource (data) {
  return request({
    url: prefix + '/test/1.3',
    method: 'post',
    data
  })
}
// 删除资源
export function deleteResource (data) {
  return request({
    url: prefix + '/test/1/4',
    method: 'delete'
  })
}
// 修改资源
export function updateResource (data) {
  return request({
    url: prefix + '/test/1.5',
    method: 'put',
    data
  })
}

