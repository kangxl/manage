<template>
  <app-link
    v-if="!item.children || item.children.length == 0"
    style="color: inherit;"
    :to="item.href"
  >
    <el-menu-item
      :class="{'submenu-title-noDropdown':!isNest}"
      :index="item.index"
    >
      <item
        :icon="item.icon"
        :title="item.name"
      />
    </el-menu-item>
  </app-link>
  <el-submenu
    v-else
    ref="subMenu"
    :index="item.index"
    popper-append-to-body
  >
    <template slot="title">
      <item
        :icon="item.icon"
        :title="item.name"
      />
    </template>
    <sidebar-item
      v-for="child in item.children"
      :key="child.href"
      :is-nest="true"
      :item="child"
    />
  </el-submenu>
</template>

<script>
import AppLink from './link'
import Item from './item'
export default {
  name: 'SidebarItem',
  components: { AppLink, Item },
  props: {
    isNest: {
      type: Boolean,
      default: false
    },
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
  }
}
</script>
