<template>
  <div>
    <div class="content-header lay-main lay-center-v lay-between">
      <h4>角色管理</h4>
      <button
        class="btn btn-primary btn-sm"
        @click="goToRoleForm(null)"
      >
        <i class="fa fa-plus" />
        添加角色
      </button>
    </div>
    <div class="table-wrap">
      <div class="search-area ">
        <ul class="lay-main lay-center-v">
          <li> <a>关键字</a>
            <div class="hr-rank">
              <input
                v-model="pageConfig.conditions.keywords"
                class="form-control"
              />
            </div>
          </li>
          <li>
            <button
              class="btn hr-rank btn-search"
              @click.stop.prevent="mixin_page_seachList"
            >
              <i
                class="fa fa-search "
                title="搜索"
              /> </button>
          </li>
        </ul>
      </div>
      <div>
        <el-table
          border
          :data="mixinPage.list"
          highlight-current-row
          size="mini"
          stripe
          style="width: 100%;"
        >
          <el-table-column
            align="center"
            label="角色名称"
            prop="name"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="更新人"
            prop="updaterName"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="更新时间"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              {{ $date.formatDate(scope.row.updateTime) }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="操作"
          >
            <template slot-scope="scope">
              <el-tooltip
                content="修改"
                placement="top"
              >
                <a @click="goToRoleForm(scope.row, scope.$index)"><i class="fa fa-pencil" /></a>
              </el-tooltip>
              <el-tooltip
                content="删除"
                placement="top"
              >
                <a @click="mixin_page_deleteRowData(scope.row, $event)"><i class="fa fa-trash" /> </a>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <div class="text-center">
          <el-pagination
            :current-page.sync="mixinPage.pageIndex"
            layout="total,prev, pager, next"
            :page-size="mixinPage.pageSize"
            :total="mixinPage.total"
            @current-change="mixin_page_currentChange"
          />
        </div>
      </div>
    </div>
    <role-form
      v-if="isShowEdit"
      :form-data="activeRow"
      @close="close"
    />
  </div>

</template>
<script>
import pageMixin from '@/mixins/pageMixin'
import RoleForm from './roleForm'
import { getRoleList, deleteRole } from '../../api/roleApi'
export default {
  name: 'RoleList',
  components: { RoleForm },
  mixins: [pageMixin],
  data () {
    return {
      pageConfig: {
        queryRequest: getRoleList,
        deleteRequest: deleteRole,
        conditions: {
          keywords: ''
        }
      },
      activeRow: {},
      isShowEdit: false // 编辑弹窗
    }
  },
  methods: {
    // 打开编辑弹窗
    goToRoleForm (row) {
      this.activeRow = row || {}
      this.isShowEdit = true
    },
    // 关闭编辑弹窗
    close (data) {
      if (data) {
        this.mixin_page_getList()
      }
      this.isShowEdit = false
    }
  }
}
</script>
