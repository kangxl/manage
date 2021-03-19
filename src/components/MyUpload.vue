<template>
  <div style="display: inline-block;">
    <el-upload
      :action="action"
      class="avatar-uploader"
      :class="{'my-upload-no-show': files.length>=limit}"
      :disabled="disabled"
      :drag="drag"
      :data="data"
      :file-list="files"
      :headers="headers"
      :accept="accept"
      :limit="limit"
      :auto-upload="autoUpload"
      :list-type="listType"
      :multiple="multiple"
      :name="name"
      :before-remove="handleBeforeRemove"
      :on-success="handleSuccess"
      :http-request="uploadSectionFile"
      :show-file-list="showFileList"
      :on-remove="handleRemove"
      :on-preview="handlePreview"
      :on-error="handleError"
      :on-progress="handleProgress"
      :on-change="handleChange"
      :on-exceed="handleExceed"
      :with-credentials="withCredentials"
      :before-upload="handleBeforeUpload"
    >
      <el-button
        v-if="fileType=='file'"
        size="mini"
        type="primary"
      >
        <i
          class="fa fa-upload"
          style="color:#FFF"
        >{{ btnText }}</i>
      </el-button>
      <i
        v-if="fileType=='logo' && files.length == 0"
        class="el-icon-plus avatar-uploader-icon"
      />
      <i
        v-if="fileType =='picture'"
        class="el-icon-plus avatar-uploader-icon"
      />
      <div
        v-if="fileType=='logo' && files.length > 0"
        class="my-uploader-operate"
      >
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
      <div
        v-if="tip"
        slot="tip"
        class="el-upload__tip"
      >{{ tip }}</div>
    </el-upload>
    <template v-if="fileType=='file'">

      <!-- <span style="max-width: 60px; white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
          {{ f.name || f.fileName }}
        </span> -->
      <span
        v-for="(f,index) in files"
        :key="index"
        class="myFileTag"
      >
        <el-link
          class="my-file-link"
          :href="f.url"
          :style="{width:fileTagWidth+'px'}"
          target="_blank"
          :title="f.name || f.fileName"
          type="primary"
        >{{ f.name || f.fileName }} </el-link>
        <i
          v-if="isShowFileClose"
          class="el-icon-close"
          @click="deleteFile(index)"
        />
      </span>

    </template>
    <el-dialog
      :append-to-body="true"
      title="图片预览"
      :visible.sync="dialogVisible"
    >
      <img
        alt=""
        :src="previewImg.url"
        style="min-height:100px"
        width="100%"
      >
    </el-dialog>
  </div>
</template>
<script>
import { uploadFile } from '@/utils/request'
import storage from '@/utils/storage'
export default {
  props: {
    btnText: {
      default: '点击上传',
      type: String
    },
    fileType: { // logo file picture
      default: 'picture',
      type: String
    },
    tip: {
      default: '',
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
    limit: {
      default: 12,
      type: Number
    },
    headers: {
      default: () => {
        return {
          Authorization: storage.local.get('token') || ''
        }
      },
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
    },
    value: {
      default: () => [],
      type: Array
    },
    fileFormat: {
      default: () => [],
      type: Array
    },
    isShowFileClose: {
      default: true,
      type: Boolean
    },
    fileTagWidth: {
      default: 100,
      type: Number
    },
    newUrl: { // 上传新的url
      default: '',
      type: String
    },
    isPreview: { // 是否需要预览
      default: false,
      type: Boolean
    }
  },
  data () {
    return {
      files: this.setUrls(this.value || []),
      previewImg: {},
      dialogVisible: false
    }
  },
  watch: {
    value (files) {
      this.files = this.setUrls(files || [])
    }
  },
  methods: {
    setUrls (list) {
      let arr = []
      for (let i = 0; i < list.length; i++) {
        let file = list[i]
        if (file.id) {
          file.url = (this.isPreview ? this.$settings.previewAddress : this.$settings.downloadAdress) + file.id
          arr.push(file)
        }
      }
      return arr
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
      this.files = []
      this.$emit('input', [])
    },
    deleteFile (index) {
      this.files.splice(index, 1)
      this.$emit('input', this.files)
    },
    handleRemove (file, fileList) {
      if (this.fileType === 'logo') {
        this.files = []
        this.$emit('input', [])
      } else {
        this.files = fileList
        this.$emit('input', this.files)
      }
      this.filterErrorFile(file.id)
    },
    handleBeforeRemove (file, fileList) {
      // console.log('handleBeforeRemove', file, fileList)
    },
    handleBeforeUpload (file) {
      const isLt10M = file.size / 1024 / 1024 < 10
      if (this.fileType !== 'file') {
        const isJPG = file.type === 'image/jpeg'
        const isPNG = file.type === 'image/png'
        if (!isJPG && !isPNG) {
          setTimeout(() => {
            this.$message.error('上传图片只能是 JPG / PNG格式!')
          }, 0)
          return false
        }
        if (!isLt10M) {
          setTimeout(() => {
            this.$message.error('上传图片大小不能超过 10MB!')
          }, 0)
          return false
        }
      } else {
        if (this.fileFormat.length > 0) {
          let format = this.fileFormat.join('|')
          if (!new RegExp('\\.(' + format + ')$', 'i').test(file.name)) {
            setTimeout(() => {
              this.$message.error('文件格式只支持' + format)
            }, 0)
            return false
          }
        }
        if (!isLt10M) {
          setTimeout(() => {
            this.$message.error('上传文件大小不能超过 10MB!')
          }, 0)
          return false
        }
      }
      return true
    },
    handleSuccess (response, file, fileList) {
      // console.log('handleSuccess', response, file, fileList)
    },
    filterErrorFile (id) {
      // console.log('filterErrorFile', this.files)
      this.files = this.files.filter(function (item) {
        return item.id && item.id != id
      })
    },
    handleError (e, file, fileList) {
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
      var fileObj = param.file
      // FormData 对象
      var form = new FormData()
      // 文件对象
      form.append('file', fileObj)
      uploadFile(form, this.newUrl ? (this.$settings.uploadAddress + this.newUrl) : this.uploadAddress).then(res => {
        if (res.code == 0) {
          this.formatFileData(res.data)
        }
      }).catch((e) => {
        console.error(e)
        this.filterErrorFile()
      })
    },
    formatFileData (data) {
      // let ids
      let file = {
        id: data.fileId,
        name: data.fileOldname,
        fileName: data.fileOldname,
        url: (this.isPreview ? this.$settings.previewAddress : this.$settings.downloadAdress) + data.fileId // + '&token=' + storage.local.get('token')
      }
      this.$emit('one', file)
      if (this.fileType === 'logo') {
        this.files = [file]
        // ids = file.id
      } else {
        this.files.push(file)
        // ids = this.files.map(function (item) {
        //   return item.id
        // })
      }
      this.$emit('input', this.files)
    }
    // formatFileData (fileList) {
    //   var files = [], ids = []
    //   for (let i = 0; i < fileList.length; i++) {
    //     var item = fileList[i]
    //     if (item.raw) {
    //       console.log('ok:', {
    //         name: item.name
    //       }, item)
    //       if (item.response && item.response.data && item.response.code == 0) {
    //         var res = item.response.data
    //         files.push({
    //           id: res.fileId,
    //           name: res.fileOldname,
    //           url: res.url
    //         })
    //         ids.push(res.fileId)
    //       } else {
    //         this.$message({
    //           message: item.name + '上传失败2！',
    //           type: 'error'
    //         })
    //       }
    //     } else {
    //       files.push(item)
    //     }
    //   }

    //   this.files = files
    //   if (this.fileType === 'logo') {
    //     this.$emit('input', ids[0] || null)
    //   } else {
    //     this.$emit('input', ids)
    //   }
    // }
  }
}
</script>
<style >
.avatar-uploader {
  display: inline-block;
}
.avatar-uploader .el-upload {
  /* border: 1px dashed #d9d9d9; */
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
.my-uploader-operate .avatar-uploader-operate {
  display: none;
}
.my-uploader-operate:hover .avatar-uploader-operate {
  background-color: rgba(48, 48, 48, 0.69);
  display: inline-block;
}
.my-uploader-operate i {
  color: #fff !important;
}
.myFileTag i {
  color: #fff;
  background-color: #409eff;
  border-radius: 50%;
  text-align: center;
  position: relative;
  cursor: pointer;
  font-size: 12px;
  height: 16px;
  width: 16px;
  line-height: 16px;
  vertical-align: middle;
  right: 5px;
}
.avatar-uploader .el-upload-list .el-upload-list__item-actions i {
  color: #ffffff !important;
  font-size: 28px !important;
}
.my-upload-no-show .el-upload {
  display: none;
}
.avatar-uploader .is-ready {
  display: none;
}
</style>
