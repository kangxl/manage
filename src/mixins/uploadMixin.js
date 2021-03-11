/*
 * @Author: kangxl
 * @Date: 2019-08-30 13:02:54
 * @LastEditors: Faye
 * @LastEditTime: 2020-03-20 16:30:39
 * @Description: 七牛文件上传处理
 */
import { getQiniuToken } from '@/views/layout/api'
import settings from '@/config/settings'
import utils from '@/utils'
// import * as qiniu from 'qiniu-js'
var mixin = {
  data() {
    return {
      upload_data: {
        key: '', // 图片名字处理
        token: '' // 七牛云token
      },
      upload_domain: settings.qiniu_uploadAdress, // 七牛云的上传地址
      upload_qiniuAddr: settings.qiniu_imageAdress, // 七牛云的图片外链地址
      upload_maxNum: 0,
      upload_fileList: [],
      upload_successCallBack: null,
      upload_fileType: '',
      upload_fileSize: 0,
      upload_fileCount: 0
    }
  },
  created() {
    this.upload_getQiniuToken()
  },
  methods: {
    upload_init(config) {
      this.upload_maxNum = config.upload_maxNum || 1
      this.upload_fileType = config.type || 'image'
      this.upload_fileSize = config.fileSize || 1024 * 1024
      this.upload_successCallBack = config.successCallBack
    },
    upload_handleExceed(_files, _fileList) {
      this.$message.warning(
        `当前限制最多选择 ${this.upload_maxNum} 张图片！`
      )
    },
    upload_beforeUpload(file) {
      const isPNG = file.type === 'image/png'
      const isJPEG = file.type === 'image/jpeg'
      const isJPG = file.type === 'image/jpg'

      // const isOgg = file.type === 'video/x-ms-wmv'
      const isMp4 = file.type === 'video/mp4'
      // const isAvi = file.type === 'video/avi'
      const isLimitSize = file.size < this.upload_fileSize

      if (this.upload_fileType === 'image') { // 图片
        if (!isPNG && !isJPG && !isJPEG) {
          this.$message.error('上传图片只能是 jpg/png/jpeg 格式!')
          return false
        }
      } else { // 视频
        if (!isMp4) {
          this.$message.error('上传视频只能是mp4格式!')
          return false
        }
      }
      if (!isLimitSize) {
        this.$notify.error(`上传文件大小不能超过 ${parseInt(this.upload_fileSize / 1024)}KB!`)
        return false
      }
      this.upload_data.key = `upload_${this.upload_fileType}_${new Date().getTime()}_${utils.getUUID()}`
      if (file.name.length > 40) {
        this.$notify.error(`${file.name}上传文件名过长不能超过40!`)
        return false
      }
    },
    upload_uploadSuccess(response, _file, fileList) {
      this.upload_clearHasUploadFile(fileList)
      // var imgLink = qiniu.watermark({
      //   mode: 2, // 文字水印
      //   text: 'KKF', // 水印文字，mode = 2 时 **必需**
      //   dissolve: 50, // 透明度，取值范围1-100，非必需，下同
      //   gravity: 'SouthWest', // 水印位置，同上
      //   fontsize: 500, // 字体大小，单位: 缇
      //   font: '黑体', // 水印文字字体
      //   dx: 100, // 横轴边距，单位:像素(px)
      //   dy: 100, // 纵轴边距，单位:像素(px)
      //   fill: '#FFFFFF' // 水印文字颜色，RGB格式，可以是颜色名称
      // }, response.key, this.upload_domain)
      // console.log(imgLink)
      this.upload_successCallBack({
        url: this.upload_qiniuAddr + response.key
      })
    },
    upload_clearHasUploadFile(fileList) {
      this.upload_fileCount++
      if (fileList.length <= this.upload_fileCount) {
        this.upload_fileCount = 0
        this.upload_fileList = []
      }
    },
    upload_qiniuFile(params) {
      // const file = params.file
      // this.upload_data.key = `upload_${this.upload_fileType}_${new Date().getTime()}_${file.name}`
      // var observable = qiniu.upload(file, this.upload_data.key, this.upload_data.token)
      // observable.subscribe((res) => { // 上传进度
      //   console.log('上传进度', res)
      // }, () => { // 上传异常
      //   this.upload_uploadError(file)
      // }, (res) => { // 上传完成
      //   console.log('上传完成', res)
      //   this.upload_uploadSuccess(res)
      // })
    },
    upload_uploadError(_err, file, fileList) {
      this.upload_clearHasUploadFile(fileList)
      this.$notify.error({
        title: '提示',
        message: `${file.name}上传出错，请重试！`
      })
    },
    // 请求后台拿七牛云token
    upload_getQiniuToken() {
      getQiniuToken().then(res => {
        this.upload_data.token = res.data && res.data.token
      })
    }
  }
}
export default mixin

