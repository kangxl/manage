<template>
  <scroll-pane>
    <div id="tagView">
      <router-link
        v-for="(tag,index) in visitedViews"
        :key="tag.fullPath"
        ref="tag"
        class="tag"
        :class="isActive(tag)?'active':''"
        tag="span"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        @contextmenu.prevent.native="showContexmenu($event,tag,index)"
      >
        {{ tag.title }}
        <span
          class="el-icon-close"
          @click.prevent.stop="closeSelectedTag(tag)"
        />
      </router-link>
    </div>
  </scroll-pane>
</template>

<script>
import ScrollPane from './ScrollPane'
import contextMenu from '@/components/contextMenu'
export default {
  components: { ScrollPane },
  data () {
    return {
      top: 0,
      left: 0,
      selectedTag: {},
      affixTags: []
    }
  },
  computed: {
    visitedViews () {
      return this.$store.state.tagsView.visitedViews
    },
    routes () {
      return this.$store.state.permission.routes
    }
  },
  watch: {
    $route (route) {
      if (!route.meta.noTag) {
        this.addTags()
      }
    }
  },
  mounted () {
    this.addTags()
    contextMenu.init()
  },
  methods: {
    showContexmenu (ev, view, index) {
      let position = '', num = this.visitedViews.length
      if (index == 0) {
        position = 'left'
      } else if (index + 1 == num) {
        position = 'right'
      }
      contextMenu.show({
        left: ev.pageX,
        top: ev.pageY,
        position,
        num
      }, (data) => {
        if (data.role == 'reload-page') {
          // this.$store.dispatch('tagsView/addVisitedView', this.$route)
          this.$store.dispatch('tagsView/delCachedView', view)
          const { fullPath } = view
          this.$nextTick(() => {
            this.$router.replace({
              path: '/reload' + fullPath
            })
          })
        } else if (data.role == 'close') {
          this.$store.dispatch('tagsView/delVisitedView', view)
        } else if (data.role == 'close-all') {
          this.$store.dispatch('tagsView/delAllViews', view)
        } else if (data.role == 'close-other') {
          this.$store.dispatch('tagsView/delOthersVisitedViews', view)
        } else if (data.role == 'close-left') {
          this.$store.dispatch('tagsView/delLeftVisitedViews', view)
        } else if (data.role == 'close-right') {
          this.$store.dispatch('tagsView/delRightVisitedViews', view)
        }
      })
    },
    isActive (route) {
      return route.fullPath === this.$route.fullPath
    },
    addTags () {
      const { meta } = this.$route
      if (!meta.noTag) {
        this.$store.dispatch('tagsView/addVisitedView', this.$route)
      }
      return false
    },
    closeSelectedTag (view) {
      this.$store.dispatch('tagsView/delVisitedView', view)
    },
    closeView () {

    },
    toFristView () {

    }
  }
}
</script>
<style >
#tagView .tag {
  cursor: pointer;
  background-color: #ffffff;
  display: inline-block;
  height: 32px;
  margin-right: 5px;
  padding: 0 10px;
  line-height: 30px;
  font-size: 12px;
  color: #444;
  border: 1px solid #d8dce5;
  border-radius: 5px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  white-space: nowrap;
}
#tagView .el-icon-close {
  border-radius: 50%;
  color: #999;
}
#tagView .el-icon-close:hover {
  background-color: #d8d8d8;
  color: #fff;
}
#tagView .active {
  background: #acb5c3;
  color: #fff;
}
#tagView .active .el-icon-close {
  color: #fff;
}
</style>
