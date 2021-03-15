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
      <slot name="btns">
        <el-button
          v-if="cancelBtnText"
          @click="closeDialog"
        >{{ cancelBtnText }}</el-button>
        <el-button
          v-if="submitBtnText"
          :loading="loading"
          type="primary"
          @click="submitForm()"
        >{{ submitBtnText }}</el-button>
      </slot>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: 'MyDialog',
  props: {
    cancelBtnText: {
      default: '取消',
      type: String
    },
    submitBtnText: {
      default: '确定',
      type: String
    },
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
    closeDialog () {
      this.$emit('close')
    },
    submitForm () {
      this.$emit('submit')
    }
  }
}
</script>
