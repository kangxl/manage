/*
 * @Author: kangxl
 * @Date: 2020-12-02 10:12:07
 * @LastEditors: kangxl
 * @LastEditTime: 2020-12-05 13:39:54
 * @Description:
 */
import result from '@/utils/result'
import Mock from 'mockjs'

export default {
  getAccountList: config => { // 账户列表
    return result.page(Mock.mock({
      'list|10': [{
        'id': '@id()',
        'account': '@word(5,10)',
        'roleIds': [3, 4, 5, 6],
        'createTime': '@date',
        updaterName: '@cname',
        updateTime: '@date'
      }]
    }).list)
  },
  getAccountDetail: config => { // 账户列表
    return result.success(Mock.mock({
      'id': '@id()',
      'account': '@word(5,10)',
      'roleList': [{ id: 3, name: '@cword(3,6)' }, { id: 4, name: '@cword(3,6)' }, { id: 5, name: '@cword(3,6)' }],
      'createTime': '@date',
      updaterName: '@cname',
      updateTime: '@date'
    }))
  },
  getNoConnAccountList: config => { // 没有关联账户列表
    return result.success(Mock.mock({
      'list|10': [{
        'id': '@id()',
        'account': '@word(5,10)'
      }]
    }).list)
  }
}
