/*
 * @Author: fwp
 * @Date: 2020-04-03 14:50:57
 * @LastEditors: kangxl
 * @LastEditTime: 2020-12-04 14:59:42
 * @Description:
 */
import result from '@/utils/result'

export default {
  getDepartmentTree: config => {
    return result.success(
      [
        {
          id: '2', parentId: null, name: '企业大脑', children: [
            { id: '210', parentId: 2, name: '仓库' },
            { id: '211', parentId: 2, name: '物料' },
            { id: '212', parentId: 2, name: '用户' },
            { id: '213', parentId: 2, name: '设置' }
          ]
        },
        {
          id: '3', parentId: null, name: 'aps', children: []
        }
      ])
  },
  addDepartment: config => {
    return result.success(Math.random() + '')
  }

}
