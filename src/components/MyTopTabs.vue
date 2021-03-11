<!--
 * @Author: guanzhenhua
 * @Date: 2020-05-21 09:32:20
 * @LastEditors: guan zhenhua
 * @LastEditTime: 2020-08-07 10:14:24
 * @Description:
 -->

<template>
  <ul class="nav nav-pills second-menu">
    <router-link
      v-for="(tab, index) in tabMenuList"
      :key="index"
      :to="tab.path"
      tag="li"
      :class="{ active: $route.meta.authCode==tab.authCode }"
      @click="tabClick(tab)"
    >
      <a>
        {{ tab.name }}
      </a>
    </router-link>
  </ul>
</template>
<script>
export default {
  name: 'MyTabs',
  props: {
    tabList: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    tabMenuList() {
      var codes = this.$store.state.userInfo.codes || []
      var list = []
      for (var i = 0; i < this.tabList.length; i++) {
        if (this.$utils.hasPermission(codes, this.tabList[i].authCode)) {
          list.push(this.tabList[i])
        }
      }
      return list
    }
  },
  created() {
  },
  methods: {
    tabClick (tab) {
      this.$emit('selectItem', tab)
    }
  }
}
</script>
