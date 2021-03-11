/*
 * @Author: kangxl
 * @Date: 2019-08-12 16:28:54
 * @LastEditors: kangxl
 * @LastEditTime: 2020-03-09 14:17:56
 * @Description: 请求返回数据模板
 */

var result = {

  success: (data) => {
    return {
      'code': 0,
      data,
      'message': '',
      'success': 1
    }
  },
  page: (data, total) => {
    return {
      code: '',
      data: {
        list: data || [],
        total: total || 300
      },
      message: '',
      success: 1
    }
  },
  error: (msg, code) => {
    return {
      code,
      'data': null,
      'message': msg,
      'success': 0
    }
  },
  loadMore: (data) => {
    return {
      'code': 0,
      'data': data || [],
      'message': '',
      'success': 1
    }
  }
}
export default result
