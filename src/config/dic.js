/*
 * @Author: guanzhenhua
 * @Date: 2020-05-21 09:32:21
 * @LastEditors: guan zhenhua
 * @LastEditTime: 2020-08-07 13:50:20
 * @Description:数据字典
 */

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
    console.error('没有找到组' + gKey + '下的key:' + key + '的数据')
    return {}
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
      { code: 90, name: '否' },
      { code: 91, name: '是' }
    ],
    desc: '评价是否删除'
  },
  2: {
    list: [
      { code: 80, name: '是' },
      { code: 81, name: '否' }
    ],
    desc: '评价是否可见'
  },
  3: {
    list: [
      { code: 70, name: '微信' },
      { code: 71, name: '支付宝' }
    ],
    desc: '支付方式'
  },
  4: {
    list: [
      { code: 80, name: 'APP' },
      { code: 81, name: 'WEB' }
    ],
    desc: '支付来源'
  },
  5: {
    list: [
      { code: 10, name: '待付款' },
      { code: 15, name: '待发货' },
      { code: 20, name: '已发货' },
      { code: 22, name: '待退款' },
      { code: 23, name: '退款失败' },
      { code: 24, name: '已退款' },
      { code: 25, name: '已完成' },
      { code: 27, name: '待评价' },
      { code: 30, name: '已关闭' }
    ],
    desc: '订单状态'
  },
  6: {
    list: [
      { code: 60, name: '店铺' },
      { code: 61, name: '商城' }
    ],
    desc: '订单类型'
  },
  7: {
    list: [
      { code: 90, name: '否' },
      { code: 91, name: '是' }
    ],
    desc: '订单图片是否删除'
  },
  8: {
    list: [
      { code: 0, name: '评价图' },
      { code: 1, name: '评价回复图' },
      { code: 2, name: '退款凭证图' }
    ],
    desc: '订单图片类型'
  },
  9: {
    list: [
      { code: 90, name: '否' },
      { code: 91, name: '是' }
    ],
    desc: '原因是否删除'
  },
  10: {
    list: [
      { code: 80, name: '否' },
      { code: 81, name: '是' }
    ],
    desc: '原因是否可用'
  },
  11: {
    list: [
      { code: 90, name: '否' },
      { code: 91, name: '是' }
    ],
    desc: '退款是否删除'
  },
  13: {
    list: [
      { code: 20, name: '待处理' },
      { code: 25, name: '卖家同意' },
      { code: 30, name: '卖家拒绝' },
      { code: 35, name: '平台同意' },
      { code: 40, name: '平台拒绝' },
      { code: 45, name: '已关闭' }
    ],
    desc: '退款状态'
  },
  100: {
    list: [
      { code: 90, name: '否' },
      { code: 91, name: '是' }
    ],
    desc: '品牌是否删除'
  },
  101: {
    list: [
      { code: 90, name: '否' },
      { code: 91, name: '是' }
    ],
    desc: '优惠券是否删除'
  },
  102: {
    list: [
      { code: 80, name: '否' },
      { code: 81, name: '是' }
    ],
    desc: '优惠券是否认证'
  },
  103: {
    list: [
      { code: 10, name: '不可用' },
      { code: 11, name: '可用' }
    ],
    desc: '优惠券可用状态'
  },
  104: {
    list: [
      { code: 0, name: '注册赠券' },
      { code: 1, name: '购物赠券' },
      { code: 2, name: '全场赠券' },
      { code: 3, name: '会员赠券' }
    ],
    desc: '优惠券类型'
  },
  105: {
    list: [
      { code: 0, name: '未使用' },
      { code: 1, name: '已使用' },
      { code: 2, name: '已过期' },
      { code: 3, name: '已作废' }
    ],
    desc: '优惠券状态'
  },
  106: {
    list: [
      { code: 160, name: '空运' },
      { code: 161, name: '汽运' },
      { code: 162, name: '自提' }
    ],
    desc: '配送方式'
  },
  107: {
    list: [
      { code: 140, name: '否' },
      { code: 141, name: '是' }
    ],
    desc: '是否担保购买'
  },
  108: {
    list: [
      { code: 90, name: '否' },
      { code: 91, name: '是' }
    ],
    desc: '产品是否删除'
  },
  109: {
    list: [
      { code: 0, name: '否' },
      { code: 1, name: '是' }
    ],
    desc: '是否上架'
  },
  110: {
    list: [
      { code: 20, name: '否' },
      { code: 21, name: '是' }
    ],
    desc: '是否推荐'
  },
  111: {
    list: [
      { code: 30, name: '否' },
      { code: 31, name: '是' }
    ],
    desc: '是否售罄'
  },
  112: {
    list: [
      { code: 150, name: '否' },
      { code: 151, name: '是' }
    ],
    desc: '是否理由退货'
  },
  113: {
    list: [
      { code: 10, name: '未审核' },
      { code: 11, name: '不通过' },
      { code: 12, name: '通过' }
    ],
    desc: '宠物审核状态'
  },
  114: {
    list: [
      { code: 130, name: '宠物级' },
      { code: 131, name: '血统级' }
    ],
    desc: '宠物级别'
  },
  115: {
    list: [
      { code: 0, name: '0~5000' },
      { code: 1, name: '5000~8000' },
      { code: 2, name: '8000~15000' },
      { code: 3, name: '15000~9999999' }
    ],
    desc: '高端查询条件'
  },
  116: {
    list: [
      { code: 0, name: '0~2500' },
      { code: 1, name: '2500~5000' },
      { code: 2, name: '5000~8000' },
      { code: 3, name: '8000~9999999' }
    ],
    desc: '其他查询条件'
  },
  117: {
    list: [
      { code: 110, name: '母' },
      { code: 111, name: '公' }
    ],
    desc: '宠物性别'
  },
  118: {
    list: [
      { code: 101, name: '个人' },
      { code: 102, name: '商家' }
    ],
    desc: '产品来源'
  },
  119: {
    list: [
      { code: 120, name: '否' },
      { code: 121, name: '是' }
    ],
    desc: '是否绝育'
  },
  120: {
    list: [
      { code: 90, name: '否' },
      { code: 91, name: '是' }
    ],
    desc: '产品图片是否删除'
  },
  121: {
    list: [
      { code: 0, name: '宠物' },
      { code: 1, name: '商品' },
      { code: 2, name: '宠物父亲' },
      { code: 3, name: '宠物母亲' },
      { code: 4, name: '宠物视频' },
      { code: 5, name: '宠物种类图标' },
      { code: 6, name: '商品滚动图' },
      { code: 7, name: '商品详情图' },
      { code: 8, name: '高端馆图片' },
      { code: 9, name: '精品馆图片' }
    ],
    desc: '产品图片类型'
  },
  122: {
    list: [
      { code: 90, name: '否' },
      { code: 91, name: '是' }
    ],
    desc: '品种是否删除'
  },
  123: {
    list: [
      { code: 80, name: '否' },
      { code: 81, name: '是' }
    ],
    desc: '品种是否可见'
  },
  124: {
    list: [
      { code: 170, name: '是' },
      { code: 171, name: '否' }
    ],
    desc: '是否包邮'
  },
  125: {
    list: [
      { code: 180, name: '克' },
      { code: 181, name: '千克' }
    ],
    desc: '重量单位'
  },
  126: {
    list: [
      { code: 20, name: '全场通用' },
      { code: 21, name: '指定商品' },
      { code: 22, name: '指定分类' },
      { code: 23, name: '店铺通用' }
    ],
    desc: '优惠券使用类型'
  },
  127: {
    list: [
      { code: 30, name: '主动领取' },
      { code: 31, name: '系统赠送' }
    ],
    desc: '优惠券获取方式'
  },
  200: {
    list: [
      { code: 90, name: '否' },
      { code: 91, name: '是' }
    ],
    desc: '协议是否删除'
  },
  201: {
    list: [
      { code: 1, name: '交易必读' },
      { code: 2, name: '责任声明' },
      { code: 3, name: '商家规范' },
      { code: 4, name: '商家入驻' },
      { code: 5, name: '保证金电子合同' },
      { code: 6, name: '购宠协议' },
      { code: 7, name: '用户帮助' },
      { code: 8, name: '售宠协议' },
      { code: 9, name: '隐私政策' },
      { code: 10, name: '提现规则' },
      { code: 11, name: '用户协议' },
      { code: 12, name: '关于我们' },
      { code: 13, name: '客服热线' },
      { code: 14, name: '优惠券规则' },
      { code: 15, name: '客服邮箱' }
    ],
    desc: '协议类型'
  },
  202: {
    list: [
      { code: 90, name: '否' },
      { code: 91, name: '是' }
    ],
    desc: '城市是否删除'
  },
  203: {
    list: [
      { code: 0, name: '一级' },
      { code: 1, name: '二级' },
      { code: 2, name: '三级' },
      { code: 3, name: '四级' },
      { code: 4, name: '五级' }
    ],
    desc: '城市等级'
  },
  204: {
    list: [
      { code: 0, name: '首页' },
      { code: 1, name: '狗狗' },
      { code: 2, name: '猫猫' }
    ],
    desc: '推荐位置'
  },
  205: {
    list: [
      { code: 20, name: '无认证' },
      { code: 21, name: '个人认证' },
      { code: 22, name: '商家认证' },
      { code: 23, name: '平台认证' }
    ],
    desc: '店铺等级'
  },
  207: {
    list: [
      { code: 10, name: '待审核' },
      { code: 11, name: '待缴保证金' },
      { code: 12, name: '未通过' },
      { code: 13, name: '已缴保证金' }
    ],
    desc: '店铺认证审核状态'
  },
  208: {
    list: [
      { code: 0, name: '不可用' },
      { code: 1, name: '可用' }
    ],
    desc: '店铺是否可用'
  },
  209: {
    list: [
      { code: 90, name: '否' },
      { code: 91, name: '是' }
    ],
    desc: '店铺图片是否删除'
  },
  210: {
    list: [
      { code: 0, name: '门店' },
      { code: 1, name: '营业执照' },
      { code: 2, name: 'banner图' },
      { code: 3, name: '店铺头像' },
      { code: 4, name: '犬舍环境和荣誉证书' },
      { code: 5, name: '犬舍图片' },
      { code: 6, name: '手持身份证照' }
    ],
    desc: '店铺图片类型'
  },
  211: {
    list: [
      { code: 21, name: '个人认证' },
      { code: 22, name: '商家认证' },
      { code: 23, name: '平台认证' }
    ],
    desc: '认证等级'
  },
  300: {
    list: [
      { code: 80, name: '否' },
      { code: 81, name: '是' }
    ],
    desc: '是否默认地址'
  },
  301: {
    list: [
      { code: 90, name: '否' },
      { code: 91, name: '是' }
    ],
    desc: '地址是否删除'
  },
  302: {
    list: [
      { code: 60, name: '微信' },
      { code: 61, name: '支付宝' }
    ],
    desc: '余额支付方式'
  },
  303: {
    list: [
      { code: 10, name: '充值' },
      { code: 11, name: '发布' },
      { code: 12, name: '推广' },
      { code: 13, name: '提现' },
      { code: 14, name: '商城订单' },
      { code: 15, name: '保证金' },
      { code: 16, name: '宠物订单' },
      { code: 17, name: '商城退单' },
      { code: 18, name: '宠物退单' },
      { code: 19, name: '宠物订单抽成' },
      { code: 20, name: '退单补偿' }
    ],
    desc: '余额数据来源'
  },
  304: {
    list: [
      { code: 0, name: '不可提现' },
      { code: 1, name: '可提现' }
    ],
    desc: '余额是否可以提现'
  },
  305: {
    list: [
      { code: 0, name: '新手欢迎奖励' },
      { code: 1, name: '首次购物成功' },
      { code: 2, name: '每次完成评价' },
      { code: 3, name: '分享APP奖励' },
      { code: 4, name: '管理员修改' },
      { code: 5, name: '订单抵扣' }
    ],
    desc: '玲珑币来源'
  },
  306: {
    list: [
      { code: 90, name: '否' },
      { code: 91, name: '是' }
    ],
    desc: '标签是否删除'
  },
  307: {
    list: [
      { code: 20, name: '可用' },
      { code: 21, name: '不可用' }
    ],
    desc: '标签是否可用'
  },
  308: {
    list: [
      { code: 0, name: '物品' },
      { code: 1, name: '宠物' }
    ],
    desc: '标签类型'
  },
  309: {
    list: [
      { code: 20, name: '微信' },
      { code: 21, name: '支付宝' }
    ],
    desc: '提现方式'
  },
  310: {
    list: [
      { code: 0, name: '待处理' },
      { code: 1, name: '已同意' },
      { code: 2, name: '已拒绝' },
      { code: 3, name: '提现失败' },
      { code: 4, name: '提现成功' }
    ],
    desc: '提现状态'
  },
  311: {
    list: [
      { code: 20, name: '帮助' },
      { code: 21, name: '店铺' }
    ],
    desc: '图片链接类型'
  },
  312: {
    list: [
      { code: 0, name: '诱导私下交易' },
      { code: 1, name: '虚报价格' },
      { code: 2, name: '盗用图片视频' },
      { code: 3, name: '其他' }
    ],
    desc: '举报类型'
  },
  313: {
    list: [
      { code: 10, name: '未处理' },
      { code: 11, name: '已处理' }
    ],
    desc: '举报状态'
  },
  314: {
    list: [
      { code: 20, name: '有效举报' },
      { code: 21, name: '无效举报' },
      { code: 22, name: '恶意举报' }
    ],
    desc: '举报处理结果'
  },
  315: {
    list: [
      { code: 20, name: '是' },
      { code: 21, name: '否' }
    ],
    desc: '卖家资金账户状态'
  },
  316: {
    list: [
      { code: 21, name: '个人认证' },
      { code: 22, name: '商家认证' },
      { code: 23, name: '平台认证' }
    ],
    desc: '保证金的认证等级'
  },
  317: {
    list: [
      { code: 10, name: '女' },
      { code: 11, name: '男' }
    ],
    desc: '用户性别'
  },
  318: {
    list: [
      { code: 0, name: '启用' },
      { code: 1, name: '禁用' }
    ],
    desc: '用户账号状态'
  },
  319: {
    list: [
      { code: 0, name: '启用' },
      { code: 1, name: '禁用' }
    ],
    desc: '角色状态'
  },
  320: {
    list: [
      { code: 0, name: '0~100' },
      { code: 1, name: '100~200' },
      { code: 2, name: '200~500' },
      { code: 3, name: '500~1000' },
      { code: 4, name: '1000~999999' }
    ],
    desc: '收入金额查询范围'
  },
  321: {
    list: [
      { code: 30, name: '未支付' },
      { code: 31, name: '已支付' },
      { code: 32, name: '支付失败' }
    ],
    desc: '支付状态'
  }
}
