import Mock from 'mockjs'
import result from '@/utils/result'

Mock.mock(/\/user\/info/, 'get', result.success(Mock.mock({
  id: '123',
  username: '张三',
  nickName: '张三的昵称',
  codes: '@range(1,20)',
  sysTime: new Date(Mock.mock('@date("yyyy-MM-dd")')).getTime(),
  roleName: '@cword(3,8)'
})))
export default Mock
