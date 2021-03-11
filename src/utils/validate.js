/*
 * @Author: kangxl
 * @Date: 2020-02-15 15:23:52
 * @LastEditors: kangxl
 * @LastEditTime: 2020-04-26 12:27:30
 * @Description: 正则表达式
 */
/**
 * @description: 合法uri
 * @param {text} 输入值
 * @return: boolean
 */
export function validateURL (text) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(text)
}
/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal (path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}
/**
 * @description: 小写字母
 * @param {text} 输入值
 * @return: boolean
 */
export function validateLowerCase (text) {
  const reg = /^[a-z]+$/
  return reg.test(text)
}
/**
 * @description: 大写字母
 * @param {text} 输入值
 * @return: boolean
 */
export function validateUpperCase (text) {
  const reg = /^[A-Z]+$/
  return reg.test(text)
}

/**
 * @description: 大小写字母
 * @param {text} 输入值
 * @return: boolean
 */
export function validateAlphabets (text) {
  const reg = /^[A-Za-z]+$/
  return reg.test(text)
}
/**
 * @description: 数字验证
 * @param {type} 类型 1：大于0的整数 2:大于等于0的整数 3:大于等于0的数字 4:大于0的数字
 * @param {value} 输入值
 * @return: boolean
 */
export function validateNumber (type, value) {
  if (type == 1) {
    // 大于0的整数
    return /^([1-9][0-9]*)$/.test(value)
  } else if (type == 2) {
    // 大于等于0的整数
    return /^([1-9]\d*|[0]{1,1})$/.test(value)
  } else if (type == 3) {
    // 大于等于0的数字
    return /^(\d|[1-9]\d+)(\.\d+)?$/.test(value)
  } else if (type == 4) {
    // 大于0的数字
    return /^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/.test(value)
  }
  return false
}
/**
 * @description: 邮箱验证
 * @param {text} 输入值
 * @return: boolean
 */
export function validateEmail (text) {
  // const re = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/
  // const re = /^(\w-*\.*)+@([0-9a-z]*\.*)+$/
  const re = /^[0-9A-Za-z][\.-_0-9A-Za-z]*@(([0-9A-Za-z]+\.){1,2})([A-Za-z]+)$/
  // const re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
  return re.test(text)
}
/**
 * @description: 手机号验证
 * @param {text} 输入值
 * @return: boolean
 */
export function validatePhone (text) {
  // /^1[3|4|5|7|8][0-9]\d{8}$/
  const reg = /^1[0-9]{10}$/
  return reg.test(text)
}
/**
 * @description: 特殊字符密码验证
 * @param {text} 输入值
 * @return: boolean
 */
export function validatePassword (text) {
  const reg = /^[0-9a-zA-Z\!\@\#\$\%\&\*\(\)\_\+\|\-\=\\:\'\"\,\<\.\>\/\?\*\+\`\~\·\~\！\@\#\￥\%\……\&\*\（\）\——\-\+\=\|\、\【\】\『\』\；\：\‘\’\”\“\，\《\。\》\、\？\[\]\{\}\^\\]{6,40}$/ // /^[0-9a-zA-Z!@#$%^&*()_?<>{}-]{6,40}$/
  return reg.test(text)
}
/**
 * 验证账号
 * @param {*} str
 */
export function validateAccount (str) {
  const reg = /^[-_a-zA-Z0-9]{3,20}$/
  return reg.test(str)
}
