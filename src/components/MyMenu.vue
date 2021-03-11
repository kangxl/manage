<!--
 * @Author: kangxl
 * @Date: 2019-08-12 16:28:50
 * @LastEditors: kangxl
 * @LastEditTime: 2020-03-09 15:33:22
 * @Description: 菜单组件
 -->
<template>
  <ul :class="ulClass">
    <template v-for=" (item,index) in menus">
      <li
        :key="index"
        v-permission="item.authCode"
        style="cursor: pointer;"
        :class="[liClass,{ active: checkStatus(item) }]"
        @click="tabChange(item)"
      >
        <a>
          <i
            v-if="item.icon"
            :class="['fa',item.icon]"
          />
          <span v-if="isNeedSpan">{{ item.name }}</span>
          <template v-else>{{ item.name }}</template>
          <span
            v-if="item.badge"
            class="badge"
          > {{ item.badge }}</span>
        </a>
      </li>
    </template>
  </ul>
</template>
<script>
import utils from '@/utils'
export default {
  name: 'MyMenu',
  props: {
    isNeedSpan: {
      type: Boolean,
      default: true
    },
    liClass: {
      type: String,
      default: ''
    },
    ulClass: {
      type: String,
      default: ''
    },
    level: {
      type: String,
      default: 'level1'
    },
    menus: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    /**
     * 判断是否有该系统权限
     */
    checkIsHasSystem (key) {
      var user = this.$store.state.userInfo || {}
      return utils.hasPermission(user.codes || [], key)
    },
    checkStatus (item) {
      if (this.$route.path === item.path) {
        return true
      } else {
        return item.path === this.$route.meta[this.level]
      }
    },
    tabChange (menu) {
      var path = ''
      if (menu.children && menu.children.length > 0) {
        for (var i = 0; i < menu.children.length; i++) {
          if (this.checkIsHasSystem(menu.children[i].authCode)) {
            path = menu.children[i].path
            break
          }
        }
      } else {
        path = menu.path
      }
      if (path) {
        this.$router.push(path)
        this.$emit('menuClick')
      }
    }
  }
}
</script>
