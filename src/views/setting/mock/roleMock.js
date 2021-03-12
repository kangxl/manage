/*
 * @Author: kangxl
 * @Date: 2020-12-02 19:00:06
 * @LastEditors: kangxl
 * @LastEditTime: 2020-12-05 13:31:37
 * @Description:
 */
import result from '@/utils/result'
import Mock from 'mockjs'

export default {
  getRoleList: config => { // 角色列表
    return result.page(Mock.mock({
      'list|10': [{
        'id': '@id()',
        'name': '@cword(5,10)',
        'remark': '@cword(5,10)',
        resourceIds: ['3'],
        'updateTime': '@date',
        'updaterName': '@cname()'
      }]
    }).list)
  },
  getRoleDetail: config => { // 角色详情
    return result.success(Mock.mock({
      'id': '@id()',
      'name': '@cword(5,10)',
      'remark': '@cword(5,10)',
      resourceList: [{ id: '3', name: '@cword(3,6)' }, { id: '210', name: '@cword(3,6)' }],
      'updateTime': '@date',
      'updaterName': '@cname()'
    }))
  },
  getAllRoleList: config => { // 所有角色列表
    return result.success(Mock.mock({
      'list|10': [{
        'id|+1': 1,
        'name': '@cword(5,10)'
      }]
    }).list)
  }
}
