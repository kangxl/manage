/*
 * @Author: guanzhenhua
 * @Date: 2020-05-20 10:12:43
 * @LastEditors: guan zhenhua
 * @LastEditTime: 2020-08-13 10:12:04
 * @Description:
 */

// var host = 'http://192.168.225.15:9004/' // 映射
// var host = 'http://192.168.225.15:9005/' // 测试
// var host = 'http://localhost:3000/' // 正式环境
// var host = 'http://192.168.223.46:8800'
var host = 'http://192.168.221.245:8800/pet-web' // 冯松阳
// var host = 'http://192.168.223.29:1120/' // 高凯龙
// var host = 'http://192.168.223.46:8800/pet-web'
module.exports = {
  title: '玲珑宠物平台',
  server_address: host,
  socketHost: 'ws://192.168.221.245:8800/imserver/',
  qiniu_uploadAdress: 'https://up-z2.qiniup.com/', // 七牛云的上传地址-dev
  // qiniu_uploadAdress: 'https://up-z2.qiniup.com/', // 七牛云的上传地址-test
  // qiniu_uploadAdress: 'https://up.qiniup.com/', // 七牛云的上传地址-product

  // qiniu_imageAdress: 'http://qcb4zsvg1.bkt.clouddn.com/' // 七牛云的图片外链地址-dev
  // qiniu_imageAdress: 'http://qcb45j2un.bkt.clouddn.com/' // 七牛云的图片外链地址-test
  // qiniu_imageAdress: 'http://qcb3o6d2s.bkt.clouddn.com/' // 七牛云的图片外链地址-product

  qiniu_imageAdress: 'http://qiniu-dev.sevenspace.com.cn/' // 七牛云的图片外链地址-dev
  // qiniu_imageAdress: 'http://qiniu-test.sevenspace.com.cn/' // 七牛云的图片外链地址-test
  // qiniu_imageAdress: 'http://llssapp.sevenspace.com.cn/' // 七牛云的图片外链地址-product
}
