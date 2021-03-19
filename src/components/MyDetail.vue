<template>
  <el-form
    class="myForm myDetail"
    :inline="true"
    :label-position="labelPosition"
    :label-width="labelWidth+'px'"
  >
    <el-form-item
      v-for="(item,index) in fieldList"
      :key="index"
      :class="{itemHeight:item.toLong}"
      :label="item.label"
      :style="{width:item.width||'auto'}"
    >
      <slot
        :name="item.prop"
        style="width: calc(100% - 80px);"
      >
        {{ data[item.prop] }}
      </slot>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  name: 'MyDetail',
  props: {
    labelWidth: {
      type: Number,
      default: 100
    },
    fieldList: Array,
    data: [Object, Array]
  },
  data () {
    return {
      labelPosition: 'right'
    }
  },
  created () {
    let domId = 'content-width-' + this.labelWidth
    if (!document.getElementById(domId)) {
      var style = document.createElement('style')
      style.type = 'text/css'
      style.id = domId
      style.appendChild(document.createTextNode('.myDetail .el-form-item__content{width: calc(100% - ' + this.labelWidth + 'px);}'))
      var head = document.getElementsByTagName('head')[0]
      head.appendChild(style)
    }
  }
}
</script>
<style lang="scss">
.myDetail {
  .el-form-item__label {
    color: #444;
    font-weight: 600;
  }
  .el-form-item__content {
    word-break: break-all;
    color: #999;
    line-height: 20px;
    font-size: 14px;
  }
}
</style>
