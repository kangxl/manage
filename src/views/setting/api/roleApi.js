/*
 * @Author: fwp
 * @Date: 2020-04-03 14:40:18
 * @LastEditors: kangxl
 * @LastEditTime: 2020-12-10 19:05:53
 * @Description:
 */
import request from '@/utils/request'
var prefix = '/user-web-api'
// 角色列表
export function getRoleList (params) {
  return request({
    url: prefix + '/user/role/page',
    method: 'get',
    params
  })
}
// 添加角色
export function addRole (data) {
  return request({
    url: prefix + '/user/role',
    method: 'post',
    data
  })
}
// 编辑角色
export function editRole (id, data) {
  return request({
    url: prefix + '/user/role/' + id,
    method: 'put',
    data
  })
}
// 删除角色
export function deleteRole (data) {
  return request({
    url: prefix + '/user/role/' + data.id,
    method: 'delete'
  })
}
// 查询所有角色列表
export function getAllRole () {
  return request({
    url: prefix + '/user/role/list',
    method: 'get'
  })
}
// 查询角色详情
export function getRoleById (id) {
  return request({
    url: prefix + '/user/role/' + id,
    method: 'get'
  })
}

