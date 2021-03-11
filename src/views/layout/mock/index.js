/*
 * @Author: kangxl
 * @Date: 2019-09-03 09:54:44
 * @LastEditors: guan zhenhua
 * @LastEditTime: 2020-08-03 14:58:29
 * @Description: layout相关接口数据模拟
 */
import Mock from 'mockjs'
import result from '@/utils/result'

// 登录相关
Mock.mock(/\/token\/getToken/, 'get', result.success({
  token: '7_tnkep8Quzq8rVWrujlF4Gj77N1ibJXNwIPiEgu:PFCZjWN_7CSm2Vkj6JEDoHKiflI=:eyJzY29wZSI6InpkdGVzdCIsImRlYWRsaW5lIjoxNTY3NjU3ODU1fQ=='
}))
Mock.mock(/\/user\/login/, 'post', result.success({
  token: '7_tnkep8Quzq8rVWrujlF4Gj77N1ibJXNwIPiEgu:=:eyJzY29wZSI6InpkdGVzdCIsImRlYWRsaW5lIjoxNTY3NTE0Mjc2fQ=='
}))
Mock.mock(/\/user\/update/, 'post', result.success())
Mock.mock(/\/user\/update/, 'get', result.success())
Mock.mock(/\/user\/info/, 'get', result.success(Mock.mock({
  id: '123',
  username: '张三',
  nickName: '张三的昵称',
  codes: '@range(1,20)',
  sysTime: new Date(Mock.mock('@date("yyyy-MM-dd")')).getTime(),
  roleName: '@cword(3,8)'
})))
Mock.mock(/getCurrentModuleRes/, 'get', result.success([]))
Mock.mock(/common\/file\/upload/, 'post', result.success(Mock.mock({
  id: '@id',
  url: './test/cover3.jpg'
})))
Mock.mock(/\/getLoginLogList/, 'get', result.success(Mock.mock({
  'total': '@integer(100,500)',
  'list|25': [{
    'id': '@id',
    'time': new Date(Mock.mock('@datetime("yyyy-MM-dd HH:mm")')).getTime(),
    'ip': '@ip',
    'region': '@city()',
    'browser': '@cword(3,8)'
  }]
})))
Mock.mock(/\/getSysData/, 'get', result.success(Mock.mock({
  'total': '@integer(100,500)',
  'list|25': [{
    'id': '@id',
    'system': '@cword(3,8)',
    'web': '@url()'
  }]
})))

export default Mock
