export default {
  /**
   * 复制数组
   * @param {string} gKey 组key
   */
  clone (gKey) {
    if (this[gKey]) {
      return JSON.parse(JSON.stringify(this[gKey].list))
    } else {
      return []
    }
  },
  /**
   * 获取单项数据字典
   * @param {string} gKey 组key
   * @param {string} key 单项的key
   */
  getOne (gKey, key) {
    // let arr = [],
    let list = this[gKey] && this[gKey].list || []
    for (let i = 0; i < list.length; i++) {
      let obj = list[i]
      if (obj.code == key) {
        return {
          ...obj
        }
      }
    }
    return {}
  },
  getMoreName (gKey, codes) {
    let arr = []
    if (gKey && codes) {
      var keys = Array.isArray(codes) ? codes : codes.split(',')
      let list = this[gKey] && this[gKey].list || []
      for (let i = 0; i < list.length; i++) {
        let obj = list[i]
        if (keys.indexOf(obj.code)) {
          arr.push(obj.name)
        }
      }
    }
    return arr
  },
  /**
   * 忽略某些项的数据
   * @param {string} gKey 组key
   * @param {[string]} key 多项的key数组
   */
  ignore (gKey, keyArr = []) {
    return this.find(gKey, keyArr, false)
  },
  /**
   * 包含某些项的数据
   * @param {string} gKey 组key
   * @param {[string]} key 多项的key数组
   * @param {Boolean} flg 用于ignore方法
   */
  find (gKey, keyArr = [], flg = true) {
    keyArr = keyArr.map((v) => v + '')
    let arr = [],
      list = this[gKey] && this[gKey].list
    if (list) {
      for (let i = 0; i < list.length; i++) {
        let obj = list[i]
        if (keyArr.includes(obj.code + '') == flg) {
          arr.push({
            ...obj
          })
        }
      }
    }
    return arr
  },
  getCodes (gKey) {
    let arr = [], list = this[gKey] && this[gKey].list || []
    list.forEach(e => {
      arr.push(e.code)
    })
    return arr
  },
  1: {
    list: [
      { code: 'm-1', name: '价格模式' },
      { code: 'm-2', name: '质量模式' }
    ],
    desc: '竞价模式'
  }
}
