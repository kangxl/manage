<template>
  <div>
    <div class="content-header lay-main lay-center-v lay-between">
      <h4>资源管理</h4>
      <button
        class="btn btn-primary btn-sm"
        @click="append(null)"
      >
        <i class="fa fa-plus" />
        添加资源
      </button>
    </div>
    <el-tree
      :data="treeList"
      :props="props"
      node-key="id"
      default-expand-all
      :expand-on-click-node="false"
    >
      <template v-slot="scope">
        <span class="custom-tree-node">
          <span>{{ scope.data.name }}</span>
          <span>
            <el-button
              v-if="scope.data.type == 'system'"
              type="text"
              size="mini"
              @click="() => append(scope)"
            >
              添加
            </el-button>
            <el-button
              type="text"
              size="mini"
              @click="() => edit(scope)"
            >
              修改
            </el-button>
            <el-button
              v-if="!scope.data.children || scope.data.children.length==0"
              type="text"
              size="mini"
              @click="() => remove(scope)"
            >
              删除
            </el-button>
          </span>
        </span>
      </template>
    </el-tree>
    <resource-modal
      v-if="dialogFormVisible"
      :parent="parent.data||{}"
      :node-id="node.data&&node.data.id||''"
      @close="closeCallback"
    />
  </div>
</template>
<script>
import { getResourceTreeList, deleteResource } from '../../api/resourceApi'
import ResourceModal from './resourceModal'
export default {
  components: { ResourceModal },
  data () {
    return {
      dialogFormVisible: false,
      props: {
        label: 'name'
      },
      parent: {},
      node: {},
      treeList: []
    }
  },
  created () {
    this.getResourceTreeList()
  },
  methods: {
    getResourceTreeList () {
      getResourceTreeList().then(res => {
        this.treeList = res && res.data || []
      })
    },
    append (item) {
      this.node = {}
      this.parent = item || {}
      this.dialogFormVisible = true
    },
    edit (item) {
      this.node = item
      this.parent = item.data && item.data.parentId ? item.node.parent : {}
      this.dialogFormVisible = true
    },
    remove (item) {
      this.$confirm('是否要删除该数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteResource(item.data.id).then(rep => {
          const parent = item.node.parent
          const children = parent.data.children || parent.data
          const index = children.findIndex(d => d.id === item.data.id)
          children.splice(index, 1)
        })
      })
    },
    closeCallback (data) {
      console.log('返回数据', data, this.parent, this.node)

      this.dialogFormVisible = false
      if (data) {
        if (this.node.data && this.node.data.id) { // 修改
          this.node.data.name = data.name
          this.node.data.code = data.code
        } else {
          if (this.parent.data && this.parent.data.id) { // 添加菜单
            if (!this.parent.data.children) {
              this.$set(this.parent.data, 'children', [])
            }
            this.parent.data.children.push(data)
          } else { // 添加系统
            this.treeList.push(data)
          }
        }
      }
    }
  }
}
</script>
<style>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
}
</style>
