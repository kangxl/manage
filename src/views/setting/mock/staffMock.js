/*
 * @Author: kangxl
 * @Date: 2020-12-02 10:12:07
 * @LastEditors: kangxl
 * @LastEditTime: 2020-12-05 14:51:34
 * @Description:
 */
import result from '@/utils/result'
import Mock from 'mockjs'

export default {
  getStaffList: config => { // 角色列表
    return result.page(Mock.mock({
      'list|10': [{
        id: '@id', // 员工id
        name: '@cname', // 姓名
        jobNo: '@increment', // 工号
        'accountList|3': [
          {
            id: '@id', // 账户ID
            account: '@word(3,10)' // 账号
          }
        ], // 登录账号
        deptId: '2', // 部门id
        deptName: '@word(3,8)', // 部门
        'isApproval|1': [0, 1], // 审批主管
        'status|1': [0, 1], // 状态
        positionId: '@id', // 职位id
        position: '@word(3,8)', // 职位
        createTime: '@datetime', // 创建时间
        updaterName: '@cname', // 更新者
        updateTime: '@datetime'

      }]
    }).list)
  },
  getStaffById: config => { // 角色列表
    return result.success(Mock.mock({
      id: '@id', // 员工id
      name: '@cname', // 姓名
      jobNo: '@increment', // 工号
      'accountList|3': [
        {
          id: '@id', // 账户ID
          account: '@word(3,10)' // 账号
        }
      ], // 登录账号
      deptId: '3', // 部门id
      deptName: '@word(3,8)', // 部门
      'isApproval|1': [0, 1], // 审批主管
      'status|1': [0, 1], // 状态
      positionId: '@id', // 职位id
      position: '@word(3,8)', // 职位
      createTime: '@datetime', // 创建时间
      updaterName: '@cname', // 更新者
      updateTime: '@datetime'
    }))
  }
}
