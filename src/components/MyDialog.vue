<template>
  <el-dialog
    v-drag-dialog
    :title="title"
    :visible.sync="isOpen"
    :width="width"
    @close="closeDialog"
  >
    <slot />
    <div
      v-if="isShowBtns"
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="closeDialog">取消</el-button>
      <el-button
        :loading="loading"
        type="primary"
        @click="submitForm()"
      >确定</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: 'MyDialog',
  props: {
    isShowBtns: {
      default: true,
      type: Boolean
    },
    loading: {
      default: false,
      type: Boolean
    },
    title: {
      default: '',
      type: String
    },
    width: {
      default: '80%',
      type: String
    }
  },
  data () {
    return {
      isOpen: true
    }
  },
  methods: {
    /**
     * 关闭角色添加修改窗口
     */
    closeDialog () {
      this.$emit('close')
    },
    /**
     * 提交角色添加修改数据
     */
    submitForm () {
      this.$emit('submit')
    }
  }
}
</script>
