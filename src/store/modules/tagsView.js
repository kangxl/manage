/*
 * @Author: kangxl
 * @Date: 2020-10-30 13:35:39
 * @LastEditors: kangxl
 * @LastEditTime: 2020-11-11 16:21:53
 * @Description:
 */
import router, { resources } from '@/router'
const state = {
  cachedViews: [],
  visitedViews: []
}

const mutations = {
  ADD_VISITED_VIEW: (state, view) => {
    const index = state.cachedViews.indexOf(view.name)
    if (!view.meta.noCache && view.name && index < 0) {
      state.cachedViews.push(view.name)
    }
    if (state.visitedViews.some(v => v.fullPath === view.fullPath)) {
      return
    }
    state.visitedViews.push(
      Object.assign({}, view, {
        title: view.meta.title
      })
    )
  },
  DEL_VISITED_VIEW: (state, { view, to }) => {
    var activePath = router.app.$route.fullPath, len = state.visitedViews.length
    for (const [i, v] of state.visitedViews.entries()) {
      if (v.fullPath === view.fullPath) { // 匹配到当前缓存中的路由
        if (!to && activePath == view.fullPath) { // 如果关闭的时当前路由标签
          let path = ''
          if (len == 1) { // 只有一个标签时关闭后返回首页
            path = '/home'
          } else {
            if (len == i + 1) { // 当期那标签是最后一个,加载前一个页面路由
              path = state.visitedViews[i - 1].fullPath
            } else { // 当期那标签不是最后一个,加载后一个页面路由
              path = state.visitedViews[i + 1].fullPath
            }
          }
          router.push({ path })
        }
        state.visitedViews.splice(i, 1)
        break
      }
    }
    const index = state.cachedViews.indexOf(view.name)
    if (index > -1) {
      state.cachedViews.splice(index, 1)
    }
    // router.push({ path: '/home' })
  },
  DEL_OTHERS_VISITED_VIEWS: (state, view) => {
    state.visitedViews = [{ ...view, title: view.meta.title }]
    router.push({ path: view.fullPath })
    if (!view.meta.noCache && view.name) {
      state.cachedViews = [view.name]
    }
  },
  DEL_ALL_VISITED_VIEWS: state => {
    state.visitedViews = []
    state.cachedViews = []
    router.push({ path: '/home' })
  },
  DEL_LEFT_VISITED_VIEWS: (state, view) => {
    for (let i in state.visitedViews) {
      if (state.visitedViews[i].fullPath === view.fullPath) {
        state.visitedViews = state.visitedViews.slice(i)
        break
      }
    }
    let arr = [], flg = false, activePath = router.app.$route.fullPath
    for (let item of state.visitedViews) { // 获取没有关闭的缓存页面
      if (!item.meta.noCache && item.name) {
        arr.push(view.name)
      }
      if (activePath == view.fullPath) { // 激活的标签是否还存在
        flg = true
      }
    }
    if (!flg) { // 不存在加载右侧最后一个
      router.push({ path: state.visitedViews[0].fullPath })
    }
    state.cachedViews = arr
  },
  DEL_RIGHT_VISITED_VIEWS: (state, view) => {
    for (let i in state.visitedViews) {
      if (state.visitedViews[i].fullPath === view.fullPath) {
        state.visitedViews = state.visitedViews.slice(0, parseInt(i) + 1)
        break
      }
    }
    let arr = [], flg = false, activePath = router.app.$route.fullPath
    for (let item of state.visitedViews) { // 获取没有关闭的缓存页面
      if (!item.meta.noCache && item.name) {
        arr.push(view.name)
      }
      if (activePath == view.fullPath) { // 激活的标签是否还存在
        flg = true
      }
    }
    if (!flg) { // 不存在加载左侧最后一个
      router.push({ path: state.visitedViews[state.visitedViews.length - 1].fullPath })
    }
    state.cachedViews = arr
  },
  DEL_CACHED_VIEW: (state, view) => {
    const index = state.cachedViews.indexOf(view.name)
    if (index > -1) {
      state.cachedViews.splice(index, 1)
    }
  },
  UPDATE_VISITED_VIEW: (state, view) => {
    for (let v of state.visitedViews) {
      if (v.fullPath === view.fullPath) {
        v = Object.assign(v, view)
        break
      }
    }
  },
  UPDATE_TAG_TITLE: (state, text) => {
    let activePath = router.app.$route.fullPath
    for (let v of state.visitedViews) {
      if (v.fullPath === activePath) {
        v.title = text
        break
      }
    }
  }
}

const actions = {
  addVisitedView ({ commit }, view) {
    commit('ADD_VISITED_VIEW', view)
  },
  delVisitedView ({ commit, state }, view) {
    return new Promise(resolve => {
      commit('DEL_VISITED_VIEW', { view })
      resolve([...state.visitedViews])
    })
  },
  delOthersVisitedViews ({ commit, state }, view) {
    return new Promise(resolve => {
      commit('DEL_OTHERS_VISITED_VIEWS', view)
      resolve([...state.visitedViews])
    })
  },
  delLeftVisitedViews ({ commit, state }, view) {
    return new Promise(resolve => {
      commit('DEL_LEFT_VISITED_VIEWS', view)
      resolve([...state.visitedViews])
    })
  },
  delRightVisitedViews ({ commit, state }, view) {
    return new Promise(resolve => {
      commit('DEL_RIGHT_VISITED_VIEWS', view)
      resolve([...state.visitedViews])
    })
  },
  delAllViews ({ commit, state }, view) {
    commit('DEL_ALL_VISITED_VIEWS', view)
  },
  delCachedView ({ commit, state }, view) {
    commit('DEL_CACHED_VIEW', view)
  },
  updateVisitedView ({ commit }, view) {
    commit('UPDATE_VISITED_VIEW', view)
  },
  closePage ({ commit }, { view, to }) {
    if (!to) { // 非跳转关闭当前页
      commit('DEL_VISITED_VIEW', { view })
    } else {
      commit('DEL_VISITED_VIEW', { view, to }) // 关闭当前页
      commit('DEL_CACHED_VIEW', view) // 清除当前缓存
      commit('DEL_CACHED_VIEW', to) // 清空指定页面缓存
      let path = resources.routerObj[to.name].href
      if (path) {
        router.replace({
          path: '/reload' + path
        })
      } else {
        console.error('路由name为' + to.name + '不能找到路由')
      }
    }
  },
  updateTagTitle ({ commit }, view) {
    commit('UPDATE_TAG_TITLE', view)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
