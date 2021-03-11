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
