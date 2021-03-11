import request from '@/utils/request'
export function userLogin (data) { // 用户登录
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}
