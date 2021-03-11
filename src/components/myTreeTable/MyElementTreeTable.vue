<template>
  <el-table
    :data="formatData"
    :row-style="showRow"
    v-bind="$attrs"
  >
    <!-- <el-table-column v-if="columns.length===0" width="150">
      <template slot-scope="scope">
        <span v-for="space in scope.row._level" :key="space" class="ms-tree-space" />
        <span v-if="iconShow(0,scope.row)" class="tree-ctrl" @click="toggleExpanded(scope.$index)">
           <i v-if="scope.row[subName]&&scope.row[subName].length>0" :class="{'fa fa-plus-square-o':!scope.row._expanded,'fa fa-minus-square-o':scope.row._expanded }" />
        </span>
        {{ scope.$index }}
      </template>
    </el-table-column> -->
    <el-table-column
      v-for="(column, index) in columns"
      :key="index"
      :label="column.title"
      :width="column.width"
      show-overflow-tooltip
    >
      <template slot-scope="scope">
        <template v-for="space in scope.row._level">
          <span
            v-if="index === 0"
            :key="space"
            class="ms-tree-space"
          />
        </template>
        <span
          v-if="iconShow(index,scope.row)"
          class="tree-ctrl"
          @click="toggleExpanded(scope.$index)"
        >
          <i
            v-if="scope.row[subName]&&scope.row[subName].length>0"
            :class="{'fa fa-plus-square-o':!scope.row._expanded,'fa fa-minus-square-o':scope.row._expanded }"
          />
        </span>
        <el-checkbox
          v-if="isCheckbox && index === 0"
          v-model="scope.row[checkBoxSelectKey]"
          :indeterminate="scope.row._isIndeterminate"
          @change="handleCheckAllChange($event,scope)"
        /> {{ column.transformFunc?column.transformFunc(scope.row[column.key]):scope.row[column.key] }}
      </template>
    </el-table-column>
    <slot />
  </el-table>
</template>

<script>
import treeToArray, { setFlgToChildren, setFlgToParent, getSelectedItem } from './eval'
export default {
  name: 'MyElementTreeTable',
  props: {
    items: {
      type: [Array, Object],
      required: true
    },
    columns: {
      type: Array,
      default: () => []
    },
    subName: {
      type: String,
      default: 'children'
    },
    evalFunc: {
      type: Function,
      default: null
    },
    evalArgs: {
      type: Array,
      default: () => []
    },
    expandAll: {
      type: Boolean,
      default: false
    },
    isCheckbox: {
      type: Boolean,
      default: false
    },
    checkBoxSelectKey: {
      type: String,
      default: '_isChecked'
    }
  },
  computed: {
    // 格式化数据源
    formatData () {
      let tmp
      if (!Array.isArray(this.items)) {
        tmp = [this.items]
      } else {
        tmp = this.items
      }
      const func = this.evalFunc || treeToArray
      const args = this.evalArgs ? Array.concat([tmp, this.expandAll, this.subName, this.checkBoxSelectKey], this.evalArgs) : [tmp, this.expandAll, this.subName, this.checkBoxSelectKey]
      return func.apply(null, args)
    }
  },
  methods: {
    showRow (row) {
      const show = (row.row.parent ? (row.row.parent._expanded && row.row.parent._show) : true)
      row.row._show = show
      return show ? 'animation:treeTableShow 1s;-webkit-animation:treeTableShow 1s;' : 'display:none;'
    },
    // 切换下级是否展开
    toggleExpanded (trIndex) {
      const record = this.formatData[trIndex]
      record._expanded = !record._expanded
    },
    getSelectedItem () {
      var items = getSelectedItem(this.formatData, this.checkBoxSelectKey)
      return items
    },
    getListData () {
      return this.formatData || []
    },
    handleCheckAllChange (val, row) {
      if (val) {
        this.formatData[row.$index]._isIndeterminate = false
        setFlgToChildren(this.formatData[row.$index][this.subName], this.subName, true, this.checkBoxSelectKey)
      } else {
        setFlgToChildren(this.formatData[row.$index][this.subName], this.subName, false, this.checkBoxSelectKey)
      }
      var parent = this.formatData[row.$index].parent
      if (parent) {
        parent[this.checkBoxSelectKey] = val
        setFlgToParent(parent, this.subName, this.checkBoxSelectKey)
      }
    },
    // 图标显示
    iconShow (index, record) {
      return (index === 0 && record[this.subName] && record[this.subName].length > 0)
    }
  }
}
</script>
<style rel="stylesheet/css">
@keyframes treeTableShow {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@-webkit-keyframes treeTableShow {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>

<style lang="scss" rel="stylesheet/scss" scoped>
$color-blue: #2196f3;
$space-width: 18px;
.ms-tree-space {
  position: relative;
  top: 1px;
  display: inline-block;
  font-style: normal;
  font-weight: 400;
  line-height: 1;
  width: $space-width;
  height: 14px;
  &::before {
    content: "";
  }
}
.processContainer {
  width: 100%;
  height: 100%;
}
table td {
  line-height: 26px;
}

.tree-ctrl {
  position: relative;
  cursor: pointer;
  color: $color-blue;
  margin-left: -$space-width;
}
</style>
