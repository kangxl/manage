/*
 * @Author: kangxl
 * @Date: 2020-03-06 16:16:35
 * @LastEditors: guan zhenhua
 * @LastEditTime: 2020-08-05 08:42:51
 * @Description: 公用转换方法
 */
export default {
  /**
   * 获取url后参数
   * @param {*} url
   */
  getRequestParams (url) {
    const search = url.split('?')[1]
    if (!search) {
      return {}
    }
    return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
  },
  /**
   * 转base64
   * @param {*} byte
   */
  byteToBase64 (byte) {
    if (byte) {
      return 'data:image/png;base64,' + byte
    } else {
      return ''
    }
  },
  /**
   * 金额格式转换
   * @param {number} value 数值
   * @param {int} digit 小数位数
   */
  formatMoney (value, digit = 2) {
    return '¥' + Number(value).toFixed(digit)
  },
  /**
   * 手机号格式化
   * @param {String} phone
   */
  formatPhone (phone) {
    phone = phone.toString()
    return phone.substr(0, 3) + '****' + phone.substr(7, 11)
  },
  /**
   * 产生任意长度随机字母数字组合
   * @param min
   * @param max
   * @returns {string}
   */
  randomWord (min, max) {
    let str = '',
      range = min,
      $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678',
      len = $chars.length - 1
    // 随机产生
    if (max) {
      range = Math.round(Math.random() * (max - min)) + min
    }
    for (let i = 0; i < range; i++) {
      str += $chars.charAt(Math.floor(Math.random() * len))
    }
    return str
  },
  /**
   * 生成随机颜色值
   */
  getRandomColor () {
    const rgb = []
    for (let i = 0; i < 3; ++i) {
      let color = Math.floor(Math.random() * 256).toString(16)
      color = color.length === 1 ? '0' + color : color
      rgb.push(color)
    }
    return '#' + rgb.join('')
  },
  /**
   * 验证身份证号
   * @param el 号码输入input
   * @returns {boolean}
   */
  checkCardNo (value) {
    let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
    return reg.test(value)
  },
  /**
   * 生成UUID
   * @returns {string}
   */
  getUUID () {
    let d = new Date().getTime()
    let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      let r = (d + Math.random() * 16) % 16 | 0
      d = Math.floor(d / 16)
      return (c === 'x' ? r : (r & 0x7 | 0x8)).toString(16)
    })
    return uuid
  },

  /**
   * 删除左边的空格
   * @param str
   * @returns {string | * | void}
   */
  ltrim (str) {
    return str.replace(/(^\s*)/g, '')
  },

  /**
   * 删除右边的空格
   * @param str
   * @returns {string | * | void}
   */
  rtrim (str) {
    return str.replace(/(\s*$)/g, '')
  },

  /**
   * 对象数组转二维数组
   * @param objArr
   */
  obj2Arr (objArr) {
    objArr.length > 0 && objArr.map(item => {
      return Object.values(item)
    })
  },

  /**
   * 找出对象数组中某属性的最大值
   * @param array
   * @param item
   * @returns val
   */
  maxItemInObjArr (array, item) {
    let max = Math.max.apply(Math, array.map(function (obj) {
      if (item) {
        return obj[item]
      } else {
        return obj
      }
    }))
    return max
  },
  /**
   * 首字母大写
   * @param str
   * @returns {string}
   */
  fistLetterUpper (str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  },

  /**
   * 过滤非法字符串
   */
  illegalFilter (str) {
    let regEn = /[`~!@#$%^&*()_+<>?:'{},./;'[\]]/im
    let regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im

    if (regEn.test(str) || regCn.test(str)) return false
    return true
  },
  /**
   * 4位一空格（格式化银行卡）
   * @param {String} val
   */
  formatBank (val) {
    if (val) {
      return val.toString().replace(/\s/g, '').replace(/(.{4})/g, '$1 ')
    }
  },

  /**
   * 千分位格式化
   * @param {数字} val
   */
  formatThousands (val) {
    var tag = (val || 0).toString().split('.')
    tag[0] = tag[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    return tag.join('.')
    // return  Number(val).toLocaleString('en-US');
  },
  /**
   * 获得list的某个属性
   * @param {*} list 数据源
   * @param {*} key 属性key
   */
  getListAttrs (list, key) {
    if (Array.isArray(list)) {
      var str = ''
      for (const item of list) {
        str += '/' + item[key]
      }
      if (str.length > 0) {
        str = str.substring(1)
      }
      return str
    }
    return ''
  },
  getObjectByAttr (value, list, attr) {
    for (const item of list) {
      if (item[attr] === value) {
        return item
      }
    }
    return {}
  },
  /**
 * 通过某个值查找list中对应某一条的某个属性值
 * @param {*} value 数值
 * @param {*} list 数据源
 * @param {*} key value对应的key
 * @param {*} attr 返回的某个属性的key
 */
  getAttrByKey (value, list, key = 'value', attr = 'name') {
    if (Array.isArray(value)) {
      var str = ''
      for (const item of list) {
        if (value.indexOf(item[key]) > -1) {
          str += '/' + item[attr]
        }
      }
      return str.substring(1)
    } else {
      for (const item of list) {
        if (item[key] == value) {
          return item[attr]
        }
      }
    }
  },
  getChildPage (item, list) {
    var child = item.children || []
    for (var i = 0; i < child.length; i++) {
      if (child[i].path) {
        if (this.hasPermission(list, child[i].authCode)) {
          return child[i].path
        }
      } else {
        if (child[i].children && child[i].children.length > 0) {
          return this.getChildPage(child[i], list)
        }
      }
    }
  },
  hasPermission (resource, authCode) {
    // return true
    if (authCode == 'no') {
      return true
    } else {
      if ((resource || []).indexOf(authCode) > -1) {
        return true
      } else {
        return false
      }
    }
  },
  getByteLen (val) {
    let len = 0
    for (let i = 0; i < val.length; i++) {
      if (val[i].match(/[^\x00-\xff]/ig) != null) {
        len += 1
      } else { len += 0.5 }
    }
    return Math.floor(len)
  },
  /**
   * 浏览器判断
   * 用法示例——多套页面判断是否显示移动端：
   *   let ua = parseUA();
   *   if (!ua.mobile) {
   *       location.href = './pc.html';
   *   }
   */
  parseUA () {
    let u = navigator.userAgent
    let u2 = navigator.userAgent.toLowerCase()
    return { // 移动终端浏览器版本信息
      trident: u.indexOf('Trident') > -1,
      // IE内核
      presto: u.indexOf('Presto') > -1,
      // opera内核
      webKit: u.indexOf('AppleWebKit') > -1,
      // 苹果、谷歌内核
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') > -1,
      // 火狐内核
      mobile: !!u.match(/AppleWebKit.*Mobile.*/),
      // 是否为移动终端
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
      // ios终端
      android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
      // android终端或uc浏览器
      iPhone: u.indexOf('iPhone') > -1,
      // 是否为iPhone或者QQHD浏览器
      iPad: u.indexOf('iPad') > -1,
      // 是否iPad
      webApp: u.indexOf('Safari') === -1,
      // 是否web应该程序，没有头部与底部
      iosv: u.substr(u.indexOf('iPhone OS') + 9, 3),
      weixin: u2.match(/MicroMessenger/i) === 'micromessenger',
      ali: u.indexOf('AliApp') > -1
    }
  }
}

