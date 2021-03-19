import Mock from 'mockjs'
import loginApi from './login'
import result from '@/utils/result'

// 登录相关
Mock.mock(/\/login/, 'post', loginApi.userLogin)
Mock.mock(/\/logout/, 'post', result.success())

export default Mock
