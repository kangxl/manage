/*
 * @Author: kangxl
 * @Date: 2019-08-12 16:28:51
 * @LastEditors: kangxl
 * @LastEditTime: 2020-03-09 14:38:39
 * @Description: 过滤器
 */
import utils from '../utils'
import date from '../utils/date'

export default {
  getAttr: utils.getAttrByKey,
  date: date.formatDate,
  getListAttrs: utils.getListAttrs
}
