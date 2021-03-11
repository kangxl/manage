<!--
 * @Autor: guan zhenhua
 * @Date: 2020-07-21 17:37:47
 * @LastEditors: guan zhenhua
 * @LastEditTime: 2020-08-11 09:49:42
 * @Description:
-->
<template>
  <tinymce-editor
    v-model="myValue"
    :init="init"
  />
</template>
<script>
import 'tinymce/tinymce.min'
import 'tinymce/themes/silver/theme.min.js'
import 'tinymce/skins/ui/oxide/skin.min.css'
// import 'tinymce/plugins/lists'
// import 'tinymce/plugins/image'
// import 'tinymce/plugins/table'
// // import 'tinymce/plugins/textcolor'
// import 'tinymce/plugins/wordcount'
import 'tinymce/plugins/preview'
import 'tinymce/plugins/hr'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/contextmenu'
import 'tinymce/plugins/wordcount'
import 'tinymce/plugins/colorpicker'
import 'tinymce/plugins/textcolor'
import 'tinymce/plugins/fullscreen'

import tinymceEditor from '@tinymce/tinymce-vue'
export default {
  name: 'Tinymce',
  components: { tinymceEditor },
  props: {
    // 传入一个value，使组件支持v-model绑定
    value: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      init: {
        language: 'zh_CN',
        language_url: '/config/zh_CN.js',
        block_formats: 'Paragraph=p;Heading 1=h1;Heading 2=h2;Heading 3=h3;Heading 4=h4;Heading 5=h5;Heading 6=h6;',
        height: 300,
        plugins: ['lists textcolor wordcount contextmenu hr,fullscreen'],
        toolbar: ['fontsizeselect bold italic underline strikethrough alignleft aligncenter alignright outdent indent undo redo ',
          'formatselect hr bullist numlist forecolor backcolor preview fullscreen'],
        branding: false,
        menubar: false
      },
      myValue: this.value
    }
  },
  computed: {
    containerWidth() {
      const width = this.width
      if (/^[\d]+(\.[\d]+)?$/.test(width)) { // matches `100`, `'100'`
        return `${width}px`
      }
      return width
    }
  },
  watch: {
    value(newValue) {
      this.myValue = newValue
    },
    myValue(newValue) {
      this.$emit('input', newValue)
    }
  }
}
</script>
<style >
.tox-silver-sink{
    z-index: 3000;
}
</style>
