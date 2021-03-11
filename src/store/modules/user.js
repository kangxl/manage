
import storage from '@/utils/storage'
import { getUserInfo } from '@/views/layout/api'
import { userLogin } from '@/views/login/api/loginApi'
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
    UserLogin({ commit }, data) {
      return new Promise((resolve, reject) => {
        userLogin(data).then(response => {
          var authToken = response.data && response.data.token || ''
          commit('SET_USERINFO', {})
          storage.local.set('token', authToken)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetUserInfo({ commit }) {
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
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_USER', {})
        storage.cookie.remove('Authorization')
        resolve()
      })
    }
  }
}
export default user
