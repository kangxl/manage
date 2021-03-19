import utils from './index'
import date from './date'
import dic from '@/config/dic'
export default {
  date: date.formatDate,
  attr: utils.getAttrByKey,
  dic: dic.getName
}
