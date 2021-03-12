/*
 * @Author: guanzhenhua
 * @Date: 2020-04-03 08:51:54
 * @LastEditors: kangxl
 * @LastEditTime: 2020-12-10 14:50:19
 * @Description:dec mock
 */
import Mock from 'mockjs'
import result from '@/utils/result'

import staffApi from './staffMock'
import resourceMock from './resourcesMock'
import roleMock from './roleMock'
import accountMock from './accountMock'
import departmentMock from './departmentMock'

// 获取部门列表
Mock.mock(/\/test\/5.1/, 'get', departmentMock.getDepartmentTree)
// 添加部门
Mock.mock(/\/test\/5.2/, 'post', departmentMock.addDepartment)
// 删除部门
Mock.mock(/\/test\/5.3/, 'delete', result.success())
// 编辑部门
Mock.mock(/\/test\/5.4/, 'put', result.success())
// 移动部门
Mock.mock(/\/test\/5.5/, 'put', result.success())

// 获取员工列表
Mock.mock(/\/test\/4.1/, 'get', staffApi.getStaffList)
// 添加员工
Mock.mock(/\/test\/4.2/, 'post', result.success())
// 修改员工
Mock.mock(/\/test\/4.3/, 'put', result.success())
// 删除员工
Mock.mock(/\/test\/4.4/, 'delete', result.success())
// 员工详情
Mock.mock(/\/test\/4.5/, 'get', staffApi.getStaffById)

// 获取角色列表
Mock.mock(/\/user\/role\/page/, 'get', roleMock.getRoleList)
// 添加角色
Mock.mock(/\/user\/role/, 'post', result.success())
// 修改角色
Mock.mock(/\/user\/role/, 'put', result.success())
// 删除角色
Mock.mock(/\/user\/role/, 'delete', result.success())
// 查询所有角色列表
Mock.mock(/\/user\/role\/list/, 'get', roleMock.getAllRoleList)
// 查询所有角色列表
Mock.mock(/\/user\/role\/*/, 'get', roleMock.getRoleDetail)

// 账号列表
Mock.mock(/\/test\/3.1/, 'get', accountMock.getAccountList)
// 添加账号
Mock.mock(/\/test\/3.2/, 'post', result.success())
// 修改角色
Mock.mock(/\/test\/3.3/, 'put', result.success())
// 删除账号
Mock.mock(/\/test\/3.4/, 'delete', result.success())
// 重置密码
Mock.mock(/\/test\/3.5/, 'put', result.success())
// 查询没有关联的账户
Mock.mock(/\/test\/3.6/, 'get', accountMock.getNoConnAccountList)
Mock.mock(/\/test\/3.7/, 'get', accountMock.getAccountDetail)

// 获取资源列表
Mock.mock(/\/user\/resource\/tree/, 'get', resourceMock.getResourceTree)
// 查看在资源
Mock.mock(/\/test\/1.2/, 'get', resourceMock.getResourceById)
// 添加资源
Mock.mock(/\/test\/1.3/, 'post', resourceMock.addResource)
// 删除资源
Mock.mock(/\/test\/1.4/, 'delete', result.success())
// 编辑资源
Mock.mock(/\/test\/1.5/, 'put', result.success())
export default Mock
