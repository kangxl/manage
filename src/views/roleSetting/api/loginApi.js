/*
 * @Author: guanzhenhua
 * @Date: 2020-05-21 09:32:23
 * @LastEditors: guanzhenhua
 * @LastEditTime: 2020-06-22 10:42:22
 * @Description:
 */
import request from '@/utils/request'

export function userLogin(data) { // 用户登录
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}
