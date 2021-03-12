/*
 * @Author: fwp
 * @Date: 2020-04-03 14:40:18
 * @LastEditors: kangxl
 * @LastEditTime: 2020-12-10 18:58:09
 * @Description:
 */
import request from '@/utils/request'
var prefix = '/user-web-api'
// 员工列表
export function getStaffList (params) {
  return request({
    url: prefix + '/user/emp/page',
    method: 'get',
    params
  })
}
// 添加员工
export function addStaff (data) {
  return request({
    url: prefix + '/user/emp',
    method: 'post',
    data
  })
}
// 编辑员工
export function editStaff (id, data) {
  return request({
    url: prefix + '/user/emp/' + id,
    method: 'put',
    data
  })
}
// 删除员工
export function deleteStaff (data) {
  return request({
    url: prefix + '/user/emp/' + data.id,
    method: 'delete'
  })
}
export function getStaffById (id) {
  return request({
    url: prefix + '/user/emp/' + id,
    method: 'get'
  })
}
