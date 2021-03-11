<template>
  <el-scrollbar class="my-scrollbar">
    <el-menu
      class="myMenu"
      :collapse="isCollapse"
    >
      <menu-item
        v-for="(route,index) in menu"
        :key="index"
        :item="route"
      />
    </el-menu>
  </el-scrollbar>

</template>
<script>
import MenuItem from './menu-item'
import { mapState } from 'vuex'
export default {
  name: 'Left',
  components: {
    MenuItem
  },
  data () {
    return {
      menu: [
        { index: '1', name: '导航1.1', icon: '', href: '' },
        {
          index: '1.1', name: '导航1', icon: '', href: '', children: [
            { index: '1.1.1', name: '导航1.1', icon: '', href: '' }
          ]
        },
        {
          index: '2', name: '导航2', icon: '', href: '', children: [
            { index: '2.1', name: '导航1.1', icon: '', href: '' }
          ]
        },
        {
          index: '3', name: '导航3', icon: '', href: '', children: [
            { index: '3.1', name: '导航1.1', icon: '', href: '' }
          ]
        }
      ]
    }
  },
  computed: {
    ...mapState({
      isCollapse: state => state.setting.isCollapseMenu
    })
  },
  created () {

  },
  methods: {

  }
}
</script>
<style >
.myMenu,
.myMenu .el-menu {
  height: 100%;
  /* background-image: linear-gradient(#3782ad, #00ffb8); */
}
.my-scrollbar .el-scrollbar__wrap {
  overflow: hidden;
}
</style>
