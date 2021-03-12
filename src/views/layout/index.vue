<template>
  <el-container>
    <top />
    <el-container style="height: calc(100vh - 60px);margin-top: 60px;">
      <el-aside
        v-if="menuPosition == 'left'"
        :width="(isCollapseMenu?65:width)+'px'"
      >

        <el-scrollbar class="my-scrollbar">
          <el-menu
            :active-text-color="menuActiveColor"
            :background-color="menuBackground"
            class="myMenu"
            :collapse="isCollapseMenu"
            default-active="2.1"
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
      </el-aside>
      <el-container class="app-main">
        <rezise-width
          v-if="menuPosition == 'left' && !isCollapseMenu"
          :max="800"
          :min="65"
          :width="width"
          @change="getWidth"
        />
        <el-main style="padding: 5px 10px;">
          <tags-view class="test13" />
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>
<script>
import TagsView from '@/components/tagsView'
import Top from './top'
import ReziseWidth from '@/components/ReziseWidth'
import { mapState } from 'vuex'
import MenuItem from './menu-item'
import { resources } from '@/router'
export default {
  name: 'Layout',
  components: {
    Top,
    TagsView,
    ReziseWidth,
    MenuItem
  },
  data () {
    console.log(1234, resources)
    return {
      openeds: ['2.1'],
      menu: resources.menus,
      width: 200
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
    getMenuList (list, parentPath, index) { // 通过路由获取菜单数据
      let arr = []
      for (let i = 0; i < list.length; i++) {
        let item = list[i]
        let data = {
          index: index + '-' + i,
          name: item.menuName,
          icon: item.icon,
          href: parentPath + ((item.path || '').indexOf('/') == 0 ? item.path : ('/' + item.path))
        }
        if (item.menuName) {
          arr.push(data)
        }
        if (item.children && item.children.length > 0) {
          if (item.menuName) {
            data.children = data.children || []
            data.children.push(...this.getMenuList(item.children, data.href, data.index))
          } else {
            arr.push(...this.getMenuList(item.children, data.href))
          }
        }
      }
      return arr
    },
    getWidth (value) {
      this.width = value
    },
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
.app-main {
  border: solid 1px #e6e6e6;
  background: #fff;
}
.myMenu,
.myMenu .el-menu {
  height: 100%;
  /* background-image: linear-gradient(#3782ad, #00ffb8); */
}
.my-scrollbar .el-scrollbar__wrap {
  overflow-y: auto;
}
</style>
