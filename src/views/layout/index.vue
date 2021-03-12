<template>
  <el-container>
    <top />
    <el-container style="height: calc(100vh - 60px);margin-top: 60px;">
      <el-aside
        v-if="menuPosition == 'left'"
        :width="(isCollapseMenu?65:width)+'px'"
      >
        <left />
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
          <router-view class="tag-view-divide-line" />
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
import Left from './left'
export default {
  name: 'Layout',
  components: {
    Left,
    Top,
    TagsView,
    ReziseWidth
  },
  data () {
    return {
      width: 200
    }
  },
  computed: {
    ...mapState({
      isCollapseMenu: state => state.setting.isCollapseMenu,
      menuPosition: state => state.setting.menuPosition
    })
  },
  methods: {
    getWidth (value) {
      this.width = value
    }
  }
}
</script>
<style lang="scss" >
.tag-view-divide-line {
  margin-top: 2px;
  border-top: 2px solid rgb(201 201 201);
}
.app-main {
  border: solid 1px #e6e6e6;
  background: #fff;
}
</style>
