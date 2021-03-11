<template>
  <el-drawer
    :append-to-body="true"
    direction="rtl"
    size="300px"
    style="z-index:6"
    title="系统设置"
    :visible.sync="isOpen"
    @close="$emit('update:isShowDrawer', false)"
  >
    <el-form
      label-position="right"
      label-width="80px"
    >

      <el-form-item label="菜单位置">
        <el-radio-group
          v-model="form.menuPosition"
          @change="propChange($event,'menuPosition')"
        >
          <el-radio label="top">顶部</el-radio>
          <el-radio label="left">左侧</el-radio>
          <el-radio label="right">右侧</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        v-if="form.menuPosition!='top'"
        label="是否只显示菜单图标"
      >
        <el-switch
          v-model="form.isCollapseMenu"
          @change="propChange($event,'isCollapseMenu')"
        />
      </el-form-item>
      <el-form-item
        v-if="form.menuPosition!='top'"
        label="顶部背景色"
      >
        <el-color-picker
          v-model="form.topBackground"
          @change="propChange($event,'topBackground')"
        />
      </el-form-item>
      <el-form-item
        v-if="form.menuPosition!='top'"
        label="顶部文字颜色"
      >
        <el-color-picker
          v-model="form.topColor"
          @change="propChange($event,'topColor')"
        />
      </el-form-item>
      <el-form-item label="菜单背景色">
        <el-color-picker
          v-model="form.menuBackground"
          @change="propChange($event,'menuBackground')"
        />
      </el-form-item>
      <el-form-item label="菜单文字颜色">
        <el-color-picker
          v-model="form.menuColor"
          @change="propChange($event,'menuColor')"
        />
      </el-form-item>
      <el-form-item label="菜单选中颜色">
        <el-color-picker
          v-model="form.menuActiveColor"
          @change="propChange($event,'menuActiveColor')"
        />
      </el-form-item>
    </el-form>
  </el-drawer>
</template>
<script>
export default {
  props: {
    isShowDrawer: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isOpen: this.isShowDrawer,
      form: {
        fixedHeader: true,
        isCollapseMenu: this.$store.getters.setting.isCollapseMenu,
        menuPosition: this.$store.getters.setting.menuPosition,
        menuBackground: this.$store.getters.setting.menuBackground,
        menuColor: this.$store.getters.setting.menuColor,
        topBackground: this.$store.getters.setting.topBackground,
        topColor: this.$store.getters.setting.topColor,
        menuActiveColor: this.$store.getters.setting.menuActiveColor
      }
    }
  },
  watch: {
    isShowDrawer (val, oldVal) {
      this.isOpen = val
    }
  },
  methods: {
    propChange (value, prop) {
      this.$store.dispatch('setting/update_settingProp', { value, prop })
    }
  }
}
</script>
