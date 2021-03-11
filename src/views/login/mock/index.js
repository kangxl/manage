import Mock from 'mockjs'
import result from '@/utils/result'

// 登录相关
Mock.mock(/\/login/, 'post', result.userLogin)
Mock.mock(/\/logout/, 'post', result.logout)

export default Mock
