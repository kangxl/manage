<template>
  <el-dialog
    title="菜单设置"
    :visible.sync="dialogFormVisible"
    @close="closeDialog"
  >
    <el-form
      :label-position="labelPosition"
      :model="form"
    >
      <el-form-item
        label="父级菜单"
      >
        {{ form.parentNode&&form.parentNode.name?form.parentNode.name:"无" }}
      </el-form-item>
      <el-form-item
        label="功能页面"
      >
        <el-select
          v-model="form.component"
          filterable
          placeholder="请选择页面资源"
        >
          <el-option
            v-for="item in options"
            :key="item.component"
            :label="item.name"
            :value="item.component"
            @click.native="changePageResource(item)"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="菜单名称"
      >
        <el-input
          v-model="form.name"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item
        label="菜单图标"
      >
        <el-tag
          v-for="(item,index) in iconList"
          :key="index"
          :effect="form.icon==item?'dark':'light'"
          style="margin-right: 5px;"
          @click.native="selectIcon(item)"
        ><i
          :class="item"
          style="font-size: 16px;"
        /></el-tag>
        <el-button
          size="mini"
          type="primary"
        >上传图片<i class="el-icon-upload el-icon--right" /></el-button>
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
      <el-button @click="closeDialog">取 消</el-button>
      <el-button
        type="primary"
        @click="submit"
      >确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: {
    formData: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      labelPosition: 'right',
      selectedIcon: '',
      iconList: ['el-icon-close-notification',
        'el-icon-bangzhu',
        'el-icon-time',
        'el-icon-odometer',
        'el-icon-crop',
        'el-icon-aim',
        'el-icon-switch-button',
        'el-icon-full-screen',
        'el-icon-copy-document',
        'el-icon-mic',
        'el-icon-stopwatch',
        'el-icon-medal-1',
        'el-icon-medal',
        'el-icon-trophy',
        'el-icon-trophy-1',
        'el-icon-first-aid-kit',
        'el-icon-discover',
        'el-icon-place',
        'el-icon-location',
        'el-icon-location-outline',
        'el-icon-location-information',
        'el-icon-add-location',
        'el-icon-delete-location',
        'el-icon-map-location',
        'el-icon-alarm-clock',
        'el-icon-timer',
        'el-icon-watch-1',
        'el-icon-watch',
        'el-icon-lock',
        'el-icon-unlock'],
      options: [
        { id: 1, name: '用户管理', icon: 'el-icon-s-custom', component: 'component-user', desc: '' },
        { id: 2, name: '角色管理', icon: 'el-icon-cpu', component: 'component-role', desc: '' }
      ],
      form: {
        parentNode: null,
        id: '',
        component: '',
        name: '',
        icon: '',
        desc: '',
        ...(this.formData || {})
      },
      dialogFormVisible: true
    }
  },
  created() {
  },
  methods: {
    closeDialog() {
      this.$emit('close')
    },
    changePageResource(data) {
      this.form.name = data.name
    },
    selectIcon(item) {
      this.$set(this.form, 'icon', item)
    },
    submit() {
      if (!this.form.id) {
        this.form.id = Math.random() + ''
        this.form.children = []
      }
      this.$emit('success', this.form)
      this.closeDialog()
    }
  }
}
</script>
<style scope>

</style>
