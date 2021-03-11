/*
 * @Descripttion:
 * @version:
 * @Author: jiang feng
 * @Date: 2020-03-19 09:30:53
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-03-19 09:59:21
 */
import Mock from 'mockjs'
// import loginApi from './login'
import result from '@/utils/result'

// 登录相关
Mock.mock(/\/login/, 'post', result.userLogin)
Mock.mock(/\/logout/, 'post', result.logout)

export default Mock
