/*
 * @Author: kangxl
 * @Date: 2019-08-12 16:28:54
 * @LastEditors: kangxl
 * @LastEditTime: 2020-03-09 15:18:31
 * @Description: 数据存储
 */
import Cookies from 'js-cookie'

const prefix = ''

export default {
  cookie: {
    get(key) { // 获取
      if (key) { // 单个
        return Cookies.get(prefix + key)
      } else { // 所有
        return Cookies.get()
      }
    },
    getJSON(key) { // 获取JSON
      return Cookies.getJSON(prefix + key)
    },
    set(key, value, path) { // 设置
      if (path !== undefined) {
        Cookies.set(prefix + key, value)
      } else {
        Cookies.set(prefix + key, value, { path })
      }
    },
    remove(key, path) { // 删除
      // 如果值设置了路径，需要在delete时指定路径
      if (path !== undefined) {
        Cookies.remove(prefix + key)
      } else {
        Cookies.remove(prefix + key, { path })
      }
    }
  },
  local: {
    remove(key) { // 清空数据
      localStorage.removeItem(prefix + key)
    },
    removeAll() { // 清空所有数据
      localStorage.clear()
    },
    set(key, value) { // 存储单个属性
      localStorage[prefix + key] = value
    },
    get(key, defaultValue) { // 读取单个属性
      return localStorage[prefix + key] || defaultValue
    },
    setJson(key, value) { // 存储对象，以JSON格式存储
      localStorage[prefix + key] = JSON.stringify(value)
    },
    getJson(key) { // 读取对象
      return JSON.parse(localStorage[prefix + key] || '{}')
    }
  },
  session: {
    remove(key) { // 清空数据
      sessionStorage.removeItem(prefix + key)
    },
    removeAll() { // 清空所有数据
      sessionStorage.clear()
    },
    set(key, value) { // 存储单个属性
      sessionStorage[prefix + key] = value
    },
    get(key, defaultValue) { // 读取单个属性
      return sessionStorage[prefix + key] || defaultValue
    },
    setJson(key, value) { // 存储对象，以JSON格式存储
      sessionStorage[prefix + key] = JSON.stringify(value)
    },
    getJson(key) { // 读取对象
      return JSON.parse(sessionStorage[prefix + key] || '{}')
    }
  }
}
