/*
 * @Author: ztt
 * @Date: 2020-04-03 14:40:18
 * @LastEditors: kangxl
 * @LastEditTime: 2020-12-12 16:06:51
 * @Description:
 */
import request from '@/utils/request'
var prefix = '/user-web-api'

export function getDepartmentTreeList () { // 获取部门树
  return request({
    url: prefix + '/user/dept/tree',
    method: 'get'
  })
}
// 提交部门
export function addDepartment (data) {
  return request({
    url: prefix + '/user/dept',
    method: 'post',
    data
  })
}
export function deleteDepartment (id) {
  return request({
    url: prefix + '/user/dept/' + id,
    method: 'delete'
  })
}
// 修改部门
export function updateDepartment (data) {
  return request({
    url: prefix + '/user/dept/' + data.id,
    method: 'put',
    data
  })
}
export function updateDropPosition (data) {
  return request({
    url: prefix + '/user/dept/' + data.id,
    method: 'put',
    data
  })
}
