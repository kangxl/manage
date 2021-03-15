<!--
 * @Author: kangxl
 * @Date: 2020-02-26 17:37:48
 * @LastEditors: kangxl
 * @LastEditTime: 2020-03-11 14:37:11
 * @Description: table,查询组件
 template插槽：
      1：search-front和search-back 查询条件前后条件自定义
      2: search-btns 搜索位置操作按钮
      3：table-handles-front 和table-handles-back  位于删除操作的前后位置
其他参照props
 -->

<template>
  <div>
    <div class="search-area">
      <el-form
        class="myForm"
        :inline="true"
        :model="pageConfig"
      >
        <slot name="search-items" />
        <el-form-item>
          <el-button type="primary">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="operate-area ">
      <div class="lay">
        <slot name="operate-left" />
      </div>
      <slot name="operate-right" />
    </div>
    <el-table
      v-loading="mixinPage.isLoading"
      border
      :data="mixinPage.list"
      height="100%"
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column
        v-for="item in columns"
        :key="item.prop"
        :label="item.label"
        show-overflow-tooltip
        :width="item.width"
      >
        <template v-slot="scope">
          {{ item.transformFunc?item.transformFunc(scope,item.prop):scope.row[item.prop] }}
        </template>
      </el-table-column>
      <el-table-column
        v-if="pageConfig.hasHandle"
        label="操作"
        :width="pageConfig.handleWidth||100"
      >
        <template v-slot="scope">
          <slot
            name="table-handles-front"
            :row="scope.row"
          />
          <el-tooltip
            v-if="pageConfig.deleteRequest"
            content="删除"
            placement="top"
          >
            <a @click.stop.prevent="mixin_page_deleteRowData(scope.row, $event)">
              <i class="fa fa-trash" /> </a>
          </el-tooltip>
          <slot
            name="table-handles-back"
            :row="scope.row"
          />
        </template>
      </el-table-column>
    </el-table>
    <div class="text-center">
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
import MyTableSearch from '@/components/myTable/MyTableSearch'
import pageMixin from '@/mixins/pageMixin'
export default {
  name: 'MyTable',
  components: {
    MyTableSearch
  },
  mixins: [pageMixin],
  props: {
    /**
     * 列数据
     * @param label 列标题 必填
     * @param width 列宽度
     * @param prop 列属性
     * @param type 数据类型 1：直接显示 2：显示多个el-link和el-tag组合显示
     * @param transformFunc 数据转换方法 返回(scope对象，当前prop属性)
     *
     */
    columns: {
      type: Array,
      default: () => []
    },
    /**
     * 配置信息
     * @param hasHandle 是否有操作这一列
     * @param handleWidth 操作栏宽度
     * @param queryRequest 分页查询请求
     * @param deleteRequest 删除行数据请求
     */
    pageConfig: {
      type: Object,
      default: () => { }
    },
    // 查询条件
    conditions: {
      type: Object,
      default: () => { }
    },
    /**
     * 查询条件
     * @param type 查询组件类型  input select
     * @param prop 分页查询请求
     * @param placeholder 删除上数据请求
     * @param list
     *
     */
    searchComponents: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      tableHeight: 0
    }
  },
  mounted () {
    this.tableHeight = this.$refs.mySearch.$el.offsetHeight + 35
    console.log(this.$refs.mySearch.$el, this.$refs.mySearch.$el.offsetHeight, this.$refs.mySearch.$el.clientHeight)
  },
  methods: {
    refreshList () {
      this.mixin_page_getList()
    }
  }
}
</script>
<style scoped >
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
.operate-area .lay {
  -webkit-box-flex: 1;
  flex: 1;
}
.operate-area .lay button {
  padding: 5px;
}
</style>
