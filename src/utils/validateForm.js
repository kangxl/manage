/*
 * @Author: kangxl
 * @Date: 2019-08-12 16:28:54
 * @LastEditors: kangxl
 * @LastEditTime: 2020-03-10 16:42:12
 * @Description: 表单验证方法
 */
import { validatePhone, validateEmail, validateNumber, validatePassword, validateAccount } from './validate'
export const PASSWORD_ERROR_MSG = '密码只能输入6-40位的数字，字母，特殊字符，不包括空格'
export function phoneFormValidate(msg) {
  return (rule, value, callback) => {
    if (!value) {
      callback()
    } else if (!validatePhone(value)) {
      callback(new Error(msg || '请输入正确的11位手机号'))
    } else {
      callback()
    }
  }
}
// 验证输入项前后不能有空格
export function requiredSpaceFormValidate(msg) {
  return (rule, value, callback) => {
    if (!value) {
      callback()
    } else if (/[(^\s)|(\s*$)]/.test(value)) {
      callback(new Error(msg || '输入前后不能有空格'))
    } else {
      callback()
    }
  }
}
export function emailFormValidate(msg) {
  return (rule, value, callback) => {
    if (!value) {
      callback()
    } else if (!validateEmail(value)) {
      callback(new Error(msg || '请输入正确的邮箱'))
    } else {
      callback()
    }
  }
}
export function lengthRangeFormValidate(min, max) {
  return (rule, value, callback) => {
    let len = (value || '').length
    if (min && len < min) {
      callback(new Error('最小长度' + min + '位'))
      return false
    }
    if (len.length > max) {
      callback(new Error('最大长度' + min + '位'))
      return false
    }
    callback()
  }
}
export function maxLengthFormValidate(len, msg) {
  return (rule, value, callback) => {
    if (!value) {
      callback()
    } else if (value.length > len) {
      callback(new Error(msg || '最大长度10'))
    } else {
      callback()
    }
  }
}
export function minLengthFormValidate(len, msg) {
  return (rule, value, callback) => {
    if (!value) {
      callback()
    } else if (value.length < len) {
      callback(new Error(msg || '最小长度10'))
    } else {
      callback()
    }
  }
}
export function numberFormValidate(type, msg) {
  return (rule, value, callback) => {
    if (!value) {
      callback()
    } else if (!validateNumber(type, value)) {
      callback(new Error(msg || '请输入正确的数字'))
    } else {
      callback()
    }
  }
}
// 密码格式验证
export function passwordFormatFormValidate(msg) {
  return (rule, value, callback) => {
    if (!value) {
      callback()
    } else if (!validatePassword(value)) {
      callback(new Error(msg || PASSWORD_ERROR_MSG))
    } else {
      callback()
    }
  }
}
// 账号验证
export function accountFormValidate(msg) {
  return (rule, value, callback) => {
    if (!value) {
      callback()
    } else if (!validateAccount(value)) {
      callback(new Error(msg || '账号只能输入3-50位的字母、数字、下划线、减号'))
    } else {
      callback()
    }
  }
}
