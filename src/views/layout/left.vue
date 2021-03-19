<template>
  <el-scrollbar class="my-scrollbar">
    <el-menu
      :active-text-color="menuActiveColor"
      :background-color="menuBackground"
      class="myMenu"
      :collapse="isCollapseMenu"
      :default-active="$route.meta.index"
      :default-openeds="openeds"
      :text-color="menuColor"
    >
      <menu-item
        v-for="(route,index) in menu"
        :key="index"
        :item="route"
      />
    </el-menu>
    <div
      class="menu-shrink"
      @click="leftToggle"
    >
      <i :class="{'el-icon-caret-left':!isCollapseMenu,'el-icon-caret-right':isCollapseMenu}" />
    </div>
  </el-scrollbar>
</template>
<script>
import MenuItem from './menu-item'
import { resources } from '@/router'
import { mapState } from 'vuex'
export default {
  name: 'Left',
  components: {
    MenuItem
  },
  data () {
    return {
      openeds: [this.$route.meta.index],
      menu: resources.menus
    }
  },
  computed: {
    ...mapState({
      isCollapseMenu: state => state.setting.isCollapseMenu,
      menuPosition: state => state.setting.menuPosition,
      menuBackground: state => state.setting.menuBackground,
      topColor: state => state.setting.topColor,
      topBackground: state => state.setting.topBackground,
      menuColor: state => state.setting.menuColor,
      menuActiveColor: state => state.setting.menuActiveColor
    })
  },
  created () {

  },
  methods: {
    leftToggle () {
      this.$store.dispatch('setting/update_settingProp', { value: !this.$store.getters.setting.isCollapseMenu, prop: 'isCollapseMenu' })
    }
  }
}
</script>
<style lang="scss" >
.menu-shrink {
  top: 0px;
  bottom: 0px;
  right: 0px;
  position: absolute;
  margin: auto;
  width: 10px;
  height: 150px;
  background: #d5d1d1;
  z-index: 100;
  i {
    line-height: 150px;
    color: #000;
    font-size: 10px;
  }
}
.myMenu {
  height: 100%;
  .el-menu {
    height: 100%;
  }
  .el-menu-item.is-active,
  .el-submenu.is-active:not(.is-opened) {
    background: #f5f5f7 !important;
    border-left: 3px solid red;
    box-sizing: border-box;
  }
}
.my-scrollbar .el-scrollbar__wrap {
  overflow-y: auto;
}
</style>
