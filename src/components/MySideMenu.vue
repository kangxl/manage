<!--
 * @Author: kangxl
 * @Date: 2020-03-18 16:01:45
 * @LastEditors: kangxl
 * @LastEditTime: 2020-03-19 10:20:50
 * @Description: 左边有tab或者上面有tab
 -->
<template>

  <div class="side-menu">
    <ul>
      <li
        v-for="(m, index) in menuList"
        :key="index"
        :class="{ active: $route.meta.seq3==(index+1) }"
        @click="activeMenu(m)"
      >
        <a>{{ m.short }}</a>
        <span>{{ m.name }}</span>
      </li>
    </ul>
  </div>
</template>
<script>
import utils from '@/utils'
export default {
  name: 'MyContentLayout',
  props: {
    menuList: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    activeMenu (m) {
      var url = m.path || utils.getChildPage(m, this.$store.state.resource.ems || [])
      if (url) {
        this.$router.push(url)
        this.$emit('activeMenu', url)
      }
    }
  }
}
</script>
