<!--
import Vue from 'vue';
tree 表格
https://github.com/huanglong6828/vue-tree-grid/tree/master/src/components

    <tree-grid  :items='data' :columns='columns'  @on-row-click='rowClick' >
    </tree-grid>
items的数据格式：
{
    id:"",children:[
        {id:""}
    ],
    {id:""}
}
    columns的数据格式：
    {
                    title: '操作',//表头文字 必填
                    key:"name" //字段属性名称  非必填
                    type: 'action',//seqNo,action 默认字段
                    actions: [//非必填，操作区
                        type:"icon",
                        icon: 'el-icon-edit',
                        text: '修改'
                    },{
                        type:"icon",
                        icon: 'el-icon-delete',
                        text: '删除'
                    }]
                }
 -->
<template>
  <table class="table table-bordered">
    <thead>
      <tr>
        <th
          v-for="(column,index) in cloneColumns"
          :key="index"
        >
          <label>
            {{ column.title }}
          </label>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(item,index) in initItems"
        v-show="show(item)"
        :key="item.id"
        :style="{'background-color':selectedRow[selectedKeyName] == item[selectedKeyName]?'#66C2CD':''}"
        :class="{'child-tr': item.children && item.children.length==0}"
        @click="setCurrentRow(item)"
      >

        <td
          v-for="(column,snum) in columns"
          :key="column.snum"
          :style="tdStyle(column)"
        >
          <div v-if="column.type === 'seqNo'">
            {{ index+1 }}
          </div>
          <div v-if="column.type === 'action'">

            <i
              v-for="(action,iconIndex) in (column.actions)"
              :key="iconIndex"
              :class="[action.icon]"
              @click="rowClick(item,$event,index,action)"
            />
          </div>
          <label
            v-if="!column.type"
            @click="toggle(index,item)"
          >
            <span
              v-if="snum==0"
              :style="{'padding-left':(item.level-1)*10+'px'}"
            >
              <i
                v-if="item.children&&item.children.length>0"
                :class="{'fa fa-plus-square-o':!item.expanded,'fa fa-minus-square-o':item.expanded }"
              />
            </span> {{ renderBody(item,column) }}
          </label>
        </td>
      </tr>
    </tbody>
  </table>

</template>
<script>
export default {
  name: 'MyTreeGrid',
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    items: {
      type: Array,
      default: () => []
    },
    selectedKeyName: {
      type: String,
      default: 'id'
    }
  },
  data () {
    return {
      selectedRow: {},
      openIds: {},
      initItems: [], // 处理后数据数组
      cloneColumns: [] // 处理后的表头数据
    }
  },

  watch: {

    items () {
      if (this.items) {
        this.initData(this.deepCopy(this.items), 1, null)
      }
    },
    columns: {
      handler () {
        this.cloneColumns = this.makeColumns()
      },
      deep: true
    }
  },
  mounted () {
    if (this.items) {
      this.initData(this.deepCopy(this.items), 1, null)
      this.cloneColumns = this.makeColumns()
    }
  },
  methods: {
    setCurrentRow (item) {
      if (item.children && item.children.length > 0) {
        // 父节点不处理
      } else {
        this.selectedRow = item
        this.$emit('getCurrentRow', item)
      }
    },
    // 设置td宽度,td的align
    tdStyle (column) {
      var style = {}
      if (column.align) {
        style['text-align'] = column.align
      }
      if (column.width) {
        style['min-width'] = column.width + 'px'
      }
      return style
    },
    // 点击某一行事件
    rowClick (data, event, index, action) {
      this.$emit('on-row-click', data, event, index, action)
    },

    // 处理表头数据
    makeColumns () {
      const columns = this.deepCopy(this.columns)
      columns.forEach((column, index) => {
        column._index = index
        column._width = column.width ? column.width : ''
        column._sortType = 'normal'
      })
      return columns
    },
    // 数据处理 增加自定义属性监听
    initData (items, level, parent) {
      this.initItems = []
      items.forEach((item, index) => {
        item = Object.assign({}, item, {
          parent,
          level
        })
        if ((typeof item.expanded) === 'undefined') {
          item = Object.assign({}, item, {
            'expanded': this.openIds[item[this.selectedKeyName]] || false
          })
        }
        if ((typeof item.show) === 'undefined') {
          item = Object.assign({}, item, {
            'isShow': this.openIds[item[this.selectedKeyName]] || false
          })
        }
        item = Object.assign({}, item, {
          'load': (!!item.expanded)
        })
        this.initItems.push(item)
        if (item.children && item.expanded) {
          this.initData(item.children, level + 1, item)
        }
      })
    },
    //  隐藏显示
    show (item) {
      return ((item.level === 1) || (item.parent && item.parent.expanded && item.isShow))
    },
    toggle (index, item) {
      const level = item.level + 1
      if (item.children) {
        if (item.expanded) {
          item.expanded = !item.expanded
          this.close(index, item)
          this.openIds[item[this.selectedKeyName]] = true
        } else {
          item.expanded = !item.expanded
          this.openIds[item[this.selectedKeyName]] = false
          if (item.load) {
            this.open(index, item)
          } else {
            item.load = true
            item.children.forEach((child, childIndex) => {
              this.initItems.splice((index + childIndex + 1), 0, child)
              // 设置监听属性
              var _data = this.initItems[index + childIndex + 1]
              this.$set(_data, 'parent', item)
              this.$set(_data, 'level', level)
              this.$set(_data, 'isShow', true)
              this.$set(_data, 'expanded', false)
            })
          }
        }
      }
    },
    open (index, item) {
      if (item.children) {
        item.children.forEach((child, childIndex) => {
          child.isShow = true
          if (child.children && child.expanded) {
            this.open(index + childIndex + 1, child)
          }
        })
      }
    },
    close (index, item) {
      if (item.children) {
        item.children.forEach((child, childIndex) => {
          child.isShow = false
          // child.expanded = false;
          if (child.children) {
            this.close(index + childIndex + 1, child)
          }
        })
      }
    },

    // 数组去重
    getArray (a) {
      var hash = {}, len = a.length, result = []
      for (var i = 0; i < len; i++) {
        if (!hash[a[i]]) {
          hash[a[i]] = true
          result.push(a[i])
        }
      }
      return result
    },
    // 返回内容
    renderBody (row, column, index) {
      return column.transformFunc ? column.transformFunc(row[column.key]) : row[column.key]
    },
    // 深度拷贝函数
    deepCopy (data) {
      var t = this.type(data), o, i, ni
      if (t === 'array') {
        o = []
      } else if (t === 'object') {
        o = {}
      } else {
        return data
      }
      if (t === 'array') {
        for (i = 0, ni = data.length; i < ni; i++) {
          o.push(this.deepCopy(data[i]))
        }
        return o
      } else if (t === 'object') {
        for (i in data) {
          o[i] = this.deepCopy(data[i])
        }
        return o
      }
    },
    type (obj) {
      var toString = Object.prototype.toString
      var map = {
        '[object Boolean]': 'boolean',
        '[object Number]': 'number',
        '[object String]': 'string',
        '[object Function]': 'function',
        '[object Array]': 'array',
        '[object Date]': 'date',
        '[object RegExp]': 'regExp',
        '[object Undefined]': 'undefined',
        '[object Null]': 'null',
        '[object Object]': 'object'
      }
      return map[toString.call(obj)]
    }
  }
}
</script>
<style scoped>
.child-tr,
i {
  cursor: pointer;
}
</style>
