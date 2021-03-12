/*
 * @Author: kangxl
 * @Date: 2020-12-02 10:12:07
 * @LastEditors: kangxl
 * @LastEditTime: 2020-12-10 19:09:15
 * @Description:
 */
import request from '@/utils/request'
var prefix = '/user-web-api'
// 账户列表
export function getAccountList (params) {
  return request({
    url: prefix + '/user/account/page',
    method: 'get',
    params
  })
}
// 添加账户
export function addAccount (data) {
  return request({
    url: prefix + '/user/account',
    method: 'post',
    data
  })
}
// 编辑账户
export function editAccount (id, data) {
  return request({
    url: prefix + '/user/account/' + id,
    method: 'put',
    data
  })
}
// 删除账户
export function deleteAccount (data) {
  return request({
    url: prefix + '/user/account/' + data.id,
    method: 'delete'
  })
}
// 重置密码
export function updateAccountPassword (data) {
  return request({
    url: prefix + '/user/account/' + data.id,
    method: 'put',
    data
  })
}
// 查询没有关联的账户列表
export function getNoConnAccountList () {
  return request({
    url: prefix + '/user/account/unCheckList',
    method: 'get'
  })
}
// 查询账户详情
export function getAccountById (id) {
  return request({
    url: prefix + '/user/account/' + id,
    method: 'get'
  })
}
