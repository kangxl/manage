import dayjs from 'dayjs'

export default {

  /**
	 * 日期格式化
	 * @param {timestamp} value 默认'YYYY-MM-DD HH:mm:ss'
	 */
  formatDate (value, format = 'YYYY-MM-DD HH:mm:ss') {
    if (value) {
      return dayjs(value).format(format)
    } else {
      return ''
    }
  },
  /**
	 * 返回dayjs实例
	 * @param {*} value 非必填，默认当前时间
	 */
  dayjs (value) {
    return dayjs(value || '')
  },
  /**
	 * 最近时间格式化
	 * @param {*} time 时间
	 * @param {*} days 天数限制，大于限制显示实际日期
	 * @param {*} format 格式
	 */
  formatRecentTime (time, days, format = 'YYYY-MM-DD HH:mm:ss') {
    if (time) {
      const d = new Date(time).getTime()
      const now = Date.now()
      const diff = (now - d) / 1000

      if (diff < 60) { // 1分钟内
        return '刚刚'
      } else if (diff < 3600) { // 1个小时以内
        return Math.floor(diff / 60) + '分钟前'
      } else if (diff < 3600 * 24) { // // 1天以内
        return Math.floor(diff / 3600) + '小时前'
      } else { // 1天以外
        if (!days || Math.floor(diff / (3600 * 24)) < days) {
          return Math.floor(diff / (3600 * 24)) + '天前'
        }
      }
      return this.formatDate(time, format)
    } else {
      return ''
    }
  }
}
