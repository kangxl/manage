<!--
 * @Author: fwp
 * @Date: 2020-06-03 14:58:38
 * @LastEditors: kangxl
 * @LastEditTime: 2020-12-28 14:46:25
 * @Description:
 -->
<template>
  <div>
    <div class="content-header lay-main lay-center-v lay-between">
      <h4>员工管理</h4>
      <button
        class="btn btn-primary btn-sm"
        @click.stop.prevent="goToStaffForm(null)"
      >
        <i class="fa fa-plus" />
        添加员工
      </button>
    </div>
    <el-container style="height: calc(100vh - 130px);">
      <el-aside
        width="250px"
        style="padding:0 !important;"
      >
        <header class="ccs-title">
          <div class="content-header lay-main lay-center-v lay-between">
            <h4>组织结构</h4>
            <button
              class="btn btn-primary btn-sm"
              @click.stop.prevent="$refs.organization.append()"
            >
              <i class="fa fa-plus" />
              添加部门
            </button>
          </div>
          <organization
            ref="organization"
            style="width:250px"
            @selected="selected"
          />
        </header>
      </el-aside>
      <el-main style="padding:0 !important;">
        <header class="ccs-title">
          <el-form :inline="true">
            <el-form-item>
              <h4>员工列表</h4>
            </el-form-item>
            <el-form-item>
              <el-input
                v-model="pageConfig.conditions.keywords"
                size="mini"
                placeholder="关键字"
              />
            </el-form-item>
            <el-form-item>
              <el-button
                size="mini"
                @click.stop.prevent="mixin_page_seachList"
              >
                <i
                  class="fa fa-search "
                  title="搜索"
                />
              </el-button>

            </el-form-item>
          </el-form>
        </header>
        <el-table
          border
          stripe
          highlight-current-row
          :data="mixinPage.list"
          size="mini"
          style="width: 100%;"
        >
          <el-table-column
            label="姓名"
            prop="name"
            align="center"
            show-overflow-tooltip
          />
          <el-table-column
            label="工号"
            prop="jobNo"
            align="center"
            show-overflow-tooltip
          />
          <el-table-column
            label="登录账号"
            align="center"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              {{ $utils.getListAttrs(scope.row.accountList,'account').join(',') }}
            </template>
          </el-table-column>
          <el-table-column
            label="所属部门"
            prop="deptName"
            align="center"
            show-overflow-tooltip
          />
          <el-table-column
            label="是否审批主管"
            align="center"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <el-tag
                v-if="scope.row.isApproval == 1"
                type="success"
              >是</el-tag>
              <el-tag
                v-else
                type="danger"
              >否</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="状态"
            align="center"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <el-tag
                v-if="scope.row.status == 1"
                type="success"
              >在职</el-tag>
              <el-tag
                v-else
                type="danger"
              >离职</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="更新时间"
            align="center"
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
                <a @click="goToStaffForm(scope.row, scope.$index)"><i class="fa fa-pencil" /></a>
              </el-tooltip>
              <el-tooltip
                v-if="scope.row.status != 0"
                content="删除"
                placement="top"
              >
                <a @click="mixin_page_deleteRowData(scope.row, $event,{msg:'删除后表示该员工离职,是否继续？'})"><i class="fa fa-trash" /> </a>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <div class="text-center">
          <el-pagination
            :current-page.sync="mixinPage.pageIndex"
            :page-size="mixinPage.pageSize"
            layout="total,prev, pager, next"
            :total="mixinPage.total"
            @current-change="mixin_page_currentChange"
          />
        </div>
      </el-main>
    </el-container>
    <staff-form
      v-if="isShowEdit"
      :form-data="activeRow"
      @close="close"
    />
    <my-loading
      :active.sync="mixinPage.isLoading"
      :is-full-page="false"
    />
  </div>
</template>

<script>
import Organization from './organization'
import StaffForm from './staffForm'
import pageMixin from '@/mixins/pageMixin'
import { getStaffList, deleteStaff } from '../../api/staffApi'
export default {
  name: 'StaffList',
  components: {
    Organization, StaffForm
  },
  mixins: [pageMixin],
  data () {
    return {
      pageConfig: {
        isAutoLoad: false,
        queryRequest: getStaffList,
        deleteRequest: deleteStaff,
        conditions: {
          deptId: '',
          keywords: ''
        }
      },
      activeRow: {},
      isShowEdit: false // 编辑弹窗
    }
  },
  methods: {
    // 打开编辑弹窗
    goToStaffForm (row) {
      this.activeRow = row || { deptId: this.pageConfig.conditions.deptId }
      this.isShowEdit = true
    },
    selected (id) {
      if (id) {
        this.$set(this.pageConfig.conditions, 'deptId', id)
        this.mixin_page_seachList()
      }
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

<style>
.ccs-title {
  padding: 0 10px;
  height: 40px;
  color: #667484;
  font-size: 16px;
  background: #f5f5f7;
  border: 1px solid #e6ebf3;
}
</style>
