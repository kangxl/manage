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
  <div :style="{height:'calc(100% - '+tableHeight+'px)' }">
    <my-table-search
      v-if="pageConfig.isNeedSearch"
      ref="mySearch"
      :search-components="searchComponents"
      :conditions.sync="conditions"
      @search="refreshList"
    >
      <template v-slot:front>
        <slot name="search-front" />
      </template>
      <template v-slot:back>
        <slot name="search-back" />
      </template>
      <template v-slot:btns>
        <slot name="search-btns" />
      </template>
    </my-table-search>
    <el-table
      v-loading="mixinPage.isLoading"
      :data="mixinPage.list"
      border
      height="100%"
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column
        v-for="item in columns"
        :key="item.prop"
        :label="item.label"
        :width="item.width"
        show-overflow-tooltip
      >
        <template
          v-if="item.type=='1'"
          v-slot="scope"
        >
          <div v-html="item.transformFunc(scope,item.prop)" />
        </template>
        <template
          v-else-if="item.type=='2'"
          v-slot="scope"
        >
          <el-popover
            placement="top"
            trigger="hover"
            width="160"
          >
            <el-link
              v-if="scope.row[item.prop]"
              slot="reference"
              type="primary"
            >{{ scope.row[item.prop].length }} 个</el-link>
            <el-tag
              v-for="(t,index) in scope.row[item.prop]"
              :key="scope.$index+'-'+index"
              class="label label-gray"
              type="info"
            >{{ t[item.keyName] }} </el-tag>
          </el-popover>
        </template>
        <template
          v-else
          v-slot="scope"
        >
          {{ item.transformFunc?item.transformFunc(scope,item.prop):scope.row[item.prop] }}
        </template>
      </el-table-column>
      <el-table-column
        v-if="pageConfig.hasHandle"
        :width="pageConfig.handleWidth||100"
        label="操作"
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
        :page-size="mixinPage.pageSize"
        layout="total,prev, pager, next"
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
