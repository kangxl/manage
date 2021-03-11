<template>
  <el-dialog
    title="表单预览"
    :visible.sync="dialogFormVisible"
  >
    <el-form :model="form">
      <el-form-item
        label="角色名称"
      >
        <el-input
          v-model="form.name"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item
        label="是否禁用"
      >
        <el-switch
          v-model="form.isEnable"
        />
      </el-form-item>
      <el-form-item
        label="备注"
      >
        <el-input
          v-model="form.desc"
          placeholder="请输入内容"
          :rows="2"
          type="textarea"
        />
      </el-form-item>
    </el-form>
    <div
      slot="footer"
      class="dialog-footer"
    >
      <el-button>取 消</el-button>
      <el-button
        type="primary"
        @click="closeDialog"
      >确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  data () {
    return {
      form: {},
      dialogFormVisible: true
    }
  },
  methods: {
    closeDialog() {
      this.$emit('close')
    }
  }
}
</script>
<style scope>

</style>
