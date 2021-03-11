<template>
  <div @click="openUpload">
    <el-upload
      class="avatar-uploader"
      :action="action"
      :multiple="multiple"
      :drag="drag"
      :disabled="disabled"
      :show-file-list="showFileList"
      :list-type="listType"
      :file-list="files"
      :limit="limit"
      :headers="headers"
      :data="upload_data"
      :name="name"
      :with-credentials="withCredentials"
      :accept="accept"
      :auto-upload="autoUpload"
      :on-success="handleSuccess"
      :before-remove="handleBeforeRemove"
      :on-remove="handleRemove"
      :on-preview="handlePreview"
      :on-error="handleError"
      :on-progress="handleProgress"
      :http-request="uploadSectionFile"
      :on-change="handleChange"
      :on-exceed="handleExceed"
      :before-upload="handleBeforeUpload"
    >
      <slot>
        <el-button
          v-if="fileType=='file'"
          type="primary"
          class="btn btn-outline redbutton"
        ><i class="fa fa-upload">{{ btnText }}</i></el-button>
        <i
          v-if="fileType=='logo' && files.length == 0"
          class="el-icon-plus avatar-uploader-icon"
        />
        <i
          v-if="fileType =='picture'"
          class="el-icon-plus avatar-uploader-icon"
        />
        <div v-if="fileType=='logo' && files.length > 0">
          <img
            class="el-upload-list__item-thumbnail avatar"
            :src="files[files.length-1].url"
          >
          <span class="el-upload-list__item-actions avatar-uploader-operate">
            <span
              class="el-upload-list__item-preview"
              @click.stop.prevent="previewAvatar"
            >
              <i class="el-icon-zoom-in" />
            </span>
            <span
              class="el-upload-list__item-preview"
              @click.stop.prevent="deleteAvatar "
            >
              <i class="el-icon-delete" />
            </span>
          </span>
        </div>
      </slot>
      <div
        v-if="tip"
        slot="tip"
        class="el-upload__tip"
      >{{ tip }}</div>
    </el-upload>
    <el-dialog
      :append-to-body="true"
      :visible.sync="dialogVisible"
    >
      <img
        width="100%"
        :src="previewImg.url"
        alt=""
      >
    </el-dialog>
  </div>
</template>
<script>
import { getQiniuToken } from '@/views/layout/api'
import axios from 'axios'
import settings from '@/config/settings'
export default {
  props: {
    isClearFiles: {
      default: false,
      type: Boolean
    },
    btnText: {
      default: '点击上传',
      type: String
    },
    fileType: { // logo file picture video
      default: 'picture',
      type: String
    },
    tip: {
      default: '只能上传jpg/png文件，且不超过2MB',
      type: String
    },
    action: {
      default: '',
      type: String
    },
    autoUpload: {
      default: true,
      type: Boolean
    },
    withCredentials: {
      default: false,
      type: Boolean
    },
    multiple: {
      default: false,
      type: Boolean
    },
    drag: {
      default: false,
      type: Boolean
    },
    disabled: {
      default: false,
      type: Boolean
    },
    listType: {
      default: 'picture-card',
      type: String
    },
    showFileList: {
      default: false,
      type: Boolean
    },
    fileList: {
      default: () => [],
      type: Array
    },
    limit: {
      default: 12,
      type: Number
    },
    headers: {
      default: () => { },
      type: Object
    },
    data: {
      default: () => { },
      type: Object
    },
    name: {
      default: 'file',
      type: String
    },
    accept: {
      default: '',
      type: String
    },
    onSuccess: {
      default: null,
      type: Function
    },
    beforeRemove: {
      default: null,
      type: Function
    },
    onRremove: {
      default: null,
      type: Function
    },
    onPreview: {
      default: null,
      type: Function
    },
    onError: {
      default: null,
      type: Function
    },
    onProgress: {
      default: null,
      type: Function
    },
    onChange: {
      default: null,
      type: Function
    },
    onExceed: {
      default: null,
      type: Function
    },
    beforeUpload: {
      default: null,
      type: Function
    }
  },
  data () {
    return {
      files: this.fileList || [],
      prefixUrl: settings.qiniu_imageAdress,
      previewImg: {},
      dialogVisible: false,
      upload_data: {
        key: '', // 图片名字处理
        token: '' // 七牛云token
      }
    }
  },
  created () {
    this.getQiniuToken()
  },
  methods: {
    openUpload () {
      if (this.isClearFiles) {
        this.files = []
      }
    },
    previewAvatar () {
      this.previewImg = this.files[0]
      this.dialogVisible = true
    },
    handlePreview (file) {
      this.previewImg = file
      this.dialogVisible = true
    },
    deleteAvatar () {
      this.$confirm('是否要删除该图片?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.files = []
        this.$emit('input', '')
      }).catch(() => {})
    },
    handleRemove (file, fileList) {
      if (this.fileType === 'logo') {
        this.$emit('input', '')
      } else {
        this.$emit('input', this.files.map(function (item) {
          return item.url
        }))
      }
      this.filterErrorFile(file.id)
      // console.log('handleRemove', file, fileList)
    },
    handleBeforeRemove (file, fileList) {
      // console.log('handleBeforeRemove', file, fileList)
    },
    handleBeforeUpload (file) {
      if (this.fileType !== 'file') {
        const isJPG = file.type === 'image/jpeg'
        const isPNG = file.type === 'image/png'
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isJPG && !isPNG) {
          this.$message.error('上传图片只能是 JPG / PNG格式!')
        }
        this.upload_data.key = `${new Date().getTime()}-${this.$utils.getUUID()}`
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!')
        }
        return (isJPG || isPNG) && isLt2M
      }
    },
    handleSuccess (response, file, fileList) {
      // console.log('handleSuccess', response, file, fileList)
      // this.formatFileData(response)
    },
    filterErrorFile (id) {
      // console.log('filterErrorFile', this.files)
      this.files = this.files.filter(function (item) {
        return item.id && item.id != id
      })
    },
    handleError (e, file, fileList) {
      console.log('handleError', e, file, fileList)
      this.$message({
        message: file.name + '上传失败！',
        type: 'error'
      })
      this.filterErrorFile()
    },
    handleProgress (event, file, fileList) {
      // console.log('handleProgress', file, fileList)
    },
    handleChange (file, fileList) {
      // console.log('handleChange', file, fileList)
    },
    handleExceed (file, fileList) {
      this.$message({
        message: '最多上传' + this.limit + '个文件',
        type: 'warning'
      })
      // console.log('handleExceed', file, fileList)
    },
    uploadSectionFile (param) { // 自定义文件上传
      var file = param.file
      // FormData 对象
      var form = new FormData()
      // 文件对象
      form.append('key', this.upload_data.key)
      form.append('token', this.upload_data.token)
      form.append('file', file)
      const axiosInstance = axios.create({ withCredentials: false })
      axiosInstance.post(settings.qiniu_uploadAdress, form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      }).then(res => {
        var data = res.data || {}
        if (data.key) {
          this.formatFileData(data)
        } else {
          this.filterErrorFile()
        }
      }).catch(() => {
        console.log('qiniu-error')
        this.filterErrorFile()
      })
    },
    formatFileData (data) {
      let urls
      let file = {
        id: data.key,
        name: '',
        url: this.prefixUrl + data.key
      }
      console.log(data)
      if (this.fileType === 'logo') {
        this.files = [file]
        urls = file.url
      } else {
        this.files.push(file)
        urls = this.files.map(function (item) {
          return item.url
        })
      }
      this.$emit('input', urls)
    },
    getQiniuToken () {
      getQiniuToken().then(res => {
        this.upload_data.token = res.data && res.data.token
      })
    }
  }
}
</script>
<style >
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-operate {
  font-size: 28px;
  color: #8c939d;
  width: 146px;
  height: 146px;
  line-height: 146px;
  text-align: center;
  position: relative;
  top: -150px;
}
.avatar {
  width: 146px;
  height: 146px;
  display: block;
}
</style>
