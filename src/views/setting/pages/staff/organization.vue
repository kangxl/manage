<template>
  <el-tree
    ref="myTree"
    :data="treeList"
    :props="props"
    node-key="id"
    default-expand-all
    draggable
    :expand-on-click-node="false"
    highlight-current
    :allow-drop="allowDrop"
    @node-drag-over="handleDragOver"
    @node-drop="handleDrop"
    @node-click="handleNodeClick"
  >
    <template v-slot="scope">
      <span
        class="custom-tree-node"
        :class="{ active: dragOverNodeId == scope.data.id }"
      >
        <span>{{ scope.data.name }}</span>
        <span>
          <el-button
            type="text"
            size="mini"
            @click.stop.prevent="() => append(scope)"
          >
            添加
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click.stop.prevent="() => edit(scope)"
          >
            修改
          </el-button>
          <el-button
            v-if="!scope.data.children || scope.data.children.length==0"
            type="text"
            size="mini"
            @click.stop.prevent="() => remove(scope)"
          >
            删除
          </el-button>
        </span>
      </span>
    </template>
  </el-tree>
</template>
<script>
import { getDepartmentTreeList, addDepartment, updateDepartment, deleteDepartment, updateDropPosition } from '../../api/departmentApi'
export default {
  data () {
    return {
      props: {
        label: 'name'
      },
      dragOverNodeId: '',
      parent: {},
      node: {},
      activeId: '',
      treeList: []
    }
  },
  mounted () {
    this.getDepartmentTreeList()
  },
  methods: {
    getDepartmentTreeList () {
      getDepartmentTreeList().then(res => {
        this.treeList = res && res.data || []
        this.activeFristNode()
      })
    },
    activeFristNode () {
      if (this.treeList.length > 0) {
        this.activeId = this.treeList[0].id
        this.$nextTick(() => {
          this.$refs.myTree.setCurrentKey(this.activeId)
        })
        this.$emit('selected', this.activeId)
      }
    },
    handleNodeClick (data, node, item) {
      if (this.activeId != data.id) {
        this.activeId = data.id
        this.$emit('selected', this.activeId)
      }
    },
    append (item) {
      this.node = {}
      this.parent = item && item.data || {}
      this.departmentAction()
    },
    edit (item) {
      this.node = item || {}
      this.parent = (item.data && item.data.parentId ? item.node.parent.data : {}) || {}
      this.departmentAction()
    },
    remove (item) {
      this.$confirm('是否要删除该数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteDepartment(item.data.id).then(rep => {
          const parent = item.node.parent
          const children = parent.data.children || parent.data
          const index = children.findIndex(d => d.id === item.data.id)
          children.splice(index, 1)
          if (item.data.id == this.activeId) {
            this.activeFristNode()
          }
        })
      })
    },
    departmentAction () {
      let id = this.node.data && this.node.data.id || null
      let desc = '父节点：' + (this.parent.name || '无')
      this.$prompt(desc, id ? '修改部门' : '添加', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue: this.node.data && this.node.data.name || '',
        inputValidator: val => {
          if (val && val.trim().length > 0) {
            return true
          } else {
            return '请输入部门名称'
          }
        }
      }).then(({ value }) => {
        let req = null
        if (id) {
          req = updateDepartment
        } else {
          req = addDepartment
        }
        let data = { id, name: value.trim(), parentId: this.parent.id || 0 }
        req(data).then(rep => {
          if (!data.id) {
            data.id = rep.data.id
          }
          this.closeCallback(data)
        })
      })
    },
    handleDrop (draggingNode, dropNode, dropType, ev) {
      this.dragOverNodeId = ''
      updateDropPosition({ parentId: dropNode.data.id, id: draggingNode.data.id }).catch(() => {
        this.getDepartmentTreeList()
      })
    },
    handleDragOver (draggingNode, dropNode, ev) {
      this.dragOverNodeId = dropNode.data.id
    },
    allowDrop (draggingNode, dropNode, type) {
      return type === 'inner'
    },
    closeCallback (data) {
      if (data) {
        if (this.node.data && this.node.data.id) { // 修改
          this.node.data.name = data.name
        } else {
          if (this.parent.id) { // 添加菜单
            if (!this.parent.children) {
              this.$set(this.parent, 'children', [])
            }
            this.parent.children.push(data)
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
.custom-tree-node .el-button {
  margin-left: 0px !important;
  margin-right: 0px !important;
}
.custom-tree-node.active {
  background: #c1c1c1;
}
</style>
