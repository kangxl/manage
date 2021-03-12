/*
 * @Author: kangxl
 * @Date: 2020-10-29 14:51:43
 * @LastEditors: kangxl
 * @LastEditTime: 2020-10-29 14:52:17
 * @Description:
 */
export default {
  namespaced: true,
  state: {
    isCollapseMenu: false,
    menuPosition: 'left',
    menuBackground: '#FFFFFF',
    menuColor: '#303133',
    menuActiveColor: '##E81849',
    topBackground: '#FFFFFF',
    topColor: '#000000'
  },
  mutations: {
    UPDATE_SETTING_PROP: (state, data) => {
      state[data.prop] = data.value
    }
  },
  actions: {
    update_settingProp ({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        commit('UPDATE_SETTING_PROP', data)
      })
    }
  }
}
