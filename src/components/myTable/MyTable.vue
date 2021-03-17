<!--
 table,查询组件
 prop配置：
 table 表格配置
 columns 表格字段属性
 pageConfig 分页相关配置
 template插槽：
      1：search 整个搜索区域重构
      2: searchItems 搜索项区域区域重构
      3：operateLeft 和 operateRight  table操作区左右区域
      4: table 整个table重构
      5: table中的prop:xxx 自定义列数据
其他参照props
 -->

<template>
  <div class="myTable">
    <div ref="tableTopArea">
      <div class="search-area">
        <el-form
          class="myForm"
          :inline="true"
        >
          <slot name="search">
            <slot name="searchItems" />
            <el-form-item v-if="$slots.searchItems">
              <el-button
                type="primary"
                @click="search"
              >查询</el-button>
            </el-form-item>
          </slot>
        </el-form>
      </div>
      <div
        v-if="$slots.operateLeft || $slots.operateRight"
        class="operate-area "
      >
        <div class="lay">
          <slot name="operateLeft" />
        </div>
        <slot name="operateRight" />
      </div>
    </div>
    <slot name="table">
      <el-table
        v-loading="mixinPage.isLoading"
        border
        :data="mixinPage.list"
        :height="height"
        highlight-current-row
        :max-height="maxHeight"
        size="mini"
        stripe
        @current-change="handleCurrentChange"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          v-if="table.isMultiple"
          align="center"
          type="selection"
          width="50"
        />
        <el-table-column
          v-for="(item,index) in columns"
          :key="item.prop+index"
          align="center"
          :label="item.label"
          show-overflow-tooltip
          :width="item.width"
        >
          <template slot="header">
            <slot :name="item.prop+'Header'">
              {{ item.label }}
            </slot>
          </template>
          <template v-slot="scope">
            <slot
              :item="scope"
              :name="item.prop"
            >
              {{ scope.row[item.prop] }}
            </slot>
          </template>
        </el-table-column>
      </el-table>
    </slot>
    <div
      v-if="table.isNeedPage"
      class="text-center"
    >
      <el-pagination
        :current-page.sync="mixinPage.pageNum"
        layout="total,prev, pager, next"
        :page-size="mixinPage.pageSize"
        :total="mixinPage.total"
        @current-change="mixin_page_currentChange"
      />
    </div>
  </div>
</template>
<script>
import pageMixin from '@/mixins/pageMixin'
export default {
  name: 'MyTable',
  mixins: [pageMixin],
  props: {
    table: {
      type: Object,
      default: () => {
        return {
          isMultiple: false, // 是否支持多选
          height: 0, // table指定高度
          otherHeight: 0, // 非table区域的高度
          isNeedPage: true // 是否需要分页
        }
      }
    },
    /**
     * 列数据
     * @param label 列标题 必填
     * @param width 列宽度
     * @param prop 列属性
     * @param type 数据类型
     *
     */
    columns: {
      type: Array,
      default: () => []
    },
    /**
     * 配置信息
     * @param queryRequest 分页查询请求
     * @param queryCallBack // 查询成功回调函数 Function
       @param deleteRequest // 删除接口API Function
       @param  deleteCallBack // 删除成功回调函数 Function
     */
    pageConfig: {
      type: Object,
      default: () => { }
    }
  },
  data () {
    return {
      maxHeight: '100%',
      height: '100%',
      otherHeight: 60 + 10 + 32 + 32 + 20 // 顶部+padding+tags+pagination+其他
    }
  },
  mounted () {
    if (this.table.height) {
      this.$nextTick(() => {
        this.height = this.table.height
      })
    } else {
      window.onresize = () => {
        this.setTableAutoHeight()
      }
      this.setTableAutoHeight()
    }
  },
  methods: {
    setTableAutoHeight () {
      let h = 0
      if (this.table.otherHeight > 0) {
        h = window.innerHeight - this.table.otherHeight
      } else {
        let tableTopHeight = this.$refs.tableTopArea.offsetHeight
        h = window.innerHeight - tableTopHeight - this.otherHeight
      }
      this.$nextTick(() => {
        this.maxHeight = h
        this.height = null
      })
    },
    handleCurrentChange (row, oldRow) { // 获取当前选中行的数据
      this.$emit('getCurrentRow', row)
    },
    search () { // 重新查询数据
      this.mixin_page_seachList()
    },
    reload () { // 重新加载数据
      this.mixin_page_getList()
    },
    handleSelectionChange (val) { // 获取勾选的所有行
      this.$emit('getSelectedRows', val)
    }
  }
}
</script>
<style scoped lang="scss">
.myTable {
  .search-area {
    border: 1px solid #eee;
    margin-bottom: 5px;
    background: #f9f9f9;
    padding: 8px 15px;
  }
  .operate-area {
    background: #f0f0f0;
    padding: 3px 10px;
    height: 25px;
    line-height: 25px;
    display: flex;
    flex-wrap: wrap;
  }
  .operate-area {
    .lay {
      -webkit-box-flex: 1;
      flex: 1;
      button {
        padding: 5px;
      }
    }
  }
  .text-center {
    text-align: center;
  }
}
</style>
