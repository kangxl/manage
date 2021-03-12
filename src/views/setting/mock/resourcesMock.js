/*
 * @Author: fwp
 * @Date: 2020-04-03 14:50:57
 * @LastEditors: kangxl
 * @LastEditTime: 2020-12-02 18:04:23
 * @Description:
 */
import result from '@/utils/result'
import Mock from 'mockjs'
import dic from '@/config/dic'

export default {
  getResourceTree: config => {
    return result.success(
      [
        {
          id: '2', type: 'system', parentId: null, code: '11', name: '企业大脑', children: [
            { id: '210', type: 'menu', parentId: 2, code: '111', name: '仓库' },
            { id: '211', type: 'menu', parentId: 2, code: '112', name: '物料' },
            { id: '212', type: 'menu', parentId: 2, code: '113', name: '用户' },
            { id: '213', type: 'menu', parentId: 2, code: '114', name: '设置' }
          ]
        },
        {
          id: '3', type: 'system', parentId: null, code: '2', name: 'aps', children: []
        }
      ])
  },
  getResourceById: config => { // 查看资源
    return result.success(Mock.mock({
      id: '@id()',
      parentId: '@id()',
      'name': '@cword(2,3)',
      'code': Mock.mock('@string("number", 2)'),
      'type': 'system',
      'remark': '@cword(10)',
      'requestList|3-5': [
        { 'method|1': dic.getCodes(100), url: 'xx/123' }
      ]
    }))
  },
  addResource: config => {
    return result.success(Math.random() + '')
  }

}
