/*
 * @Author: kangxl
 * @Date: 2020-12-09 11:11:20
 * @LastEditors: kangxl
 * @LastEditTime: 2020-12-18 16:56:14
 * @Description:
 */
import storage from '@/utils/storage'
import { getUserInfo } from '@/views/layout/api'
import settings from '@/config/settings'
const user = {
  namespaced: true,
  state: {
    userInfo: {}, // 存放用户信息数据
    token: '',
    status: false
  },
  mutations: {
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USERINFO: (state, data) => {
      state.userInfo = data
    }
  },
  actions: {

    // 获取用户信息
    GetUserInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        getUserInfo().then(response => {
          const data = response.data || {}
          commit('SET_USERINFO', data)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 手动退出 不经过后台
    FedLogOut ({ commit }) {
      return new Promise(resolve => {
        commit('SET_USERINFO', {})
        storage.local.remove('token')
        storage.session.removeAll()
        location.href = settings.componentAddress
        resolve()
      })
    }
  }
}
export default user
