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
