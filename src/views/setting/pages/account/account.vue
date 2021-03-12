<!--
 * @Author: kangxl
 * @Date: 2020-10-29 14:58:43
 * @LastEditors: kangxl
 * @LastEditTime: 2021-01-26 15:33:17
 * @Description:
 -->
<template>
  <div>
    <div class="content-header lay-main lay-center-v lay-between">
      <h4>账号管理</h4>
      <button
        class="btn btn-primary btn-sm"
        @click="goToAccountForm(null)"
      >
        <i class="fa fa-plus" />
        添加账号
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
              /></div>
          </li>
          <li>
            <button
              class="btn hr-rank btn-search"
              @click.stop.prevent="mixin_page_seachList"
            >
              <i
                class="fa fa-search "
                title="搜索"
              /> </button></li>
        </ul>
      </div>
      <div>
        <el-table
          border
          stripe
          highlight-current-row
          :data="mixinPage.list"
          size="mini"
          style="width: 100%;"
        >
          <el-table-column
            label="账号"
            prop="account"
            align="center"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <el-link
                :underline="true"
                @click="openDetail(scope.row)"
              >{{ scope.row.account }}</el-link>
            </template>
          </el-table-column>
          <el-table-column
            label="创建时间"
            align="center"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              {{ $date.formatDate(scope.row.createTime) }}
            </template>
          </el-table-column>
          <el-table-column
            label="更新人"
            prop="updaterName"
            align="center"
            show-overflow-tooltip
          />
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
            width="100"
            label="操作"
          >
            <template slot-scope="scope">
              <el-tooltip
                content="修改"
                placement="top"
              >
                <a @click="goToAccountForm(scope.row, scope.$index)"><i class="fa fa-pencil" /></a>
              </el-tooltip>
              <el-tooltip
                content="删除"
                placement="top"
              >
                <a @click="mixin_page_deleteRowData(scope.row, $event)"><i class="fa fa-trash" /> </a>
              </el-tooltip>
              <el-tooltip
                content="密码重置"
                placement="top"
              >
                <a @click="resetPassword(scope.row,$event)">
                  <i class="fa fa-key" />
                </a>
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
      </div>
    </div>
    <account-form
      v-if="isShowEdit"
      :form-data="activeRow"
      @close="close"
    />
    <account-detail
      v-if="isShowDetail"
      :form-data="activeRow"
      @close="isShowDetail=false"
    />
  </div>

</template>
<script>
import pageMixin from '@/mixins/pageMixin'
import AccountForm from './accountForm'
import AccountDetail from './accountDetail'

import { getAccountList, deleteAccount, updateAccountPassword } from '../../api/accountApi'
export default {
  name: 'AccountList',
  components: { AccountForm, AccountDetail },
  mixins: [pageMixin],
  data () {
    return {
      pageConfig: {
        queryRequest: getAccountList,
        deleteRequest: deleteAccount,
        conditions: {
          keywords: ''
        }
      },
      activeRow: {},
      isShowDetail: false,
      isShowEdit: false // 编辑弹窗
    }
  },
  methods: {
    openDetail (row) {
      console.log(123456, row)
      this.activeRow = row || {}
      this.isShowDetail = true
    },
    // 打开编辑弹窗
    goToAccountForm (row) {
      this.activeRow = row || {}
      this.isShowEdit = true
    },
    resetPassword (item, $event) {
      $event.target.parentElement.blur()
      this.$prompt('请输入新密码', '重置密码', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValidator: val => {
          if (val && val.length > 0) {
            if (!this.$validate.validatePassword(val)) {
              return this.$validate.PASSWORD_ERROR_MSG
            } else {
              return true
            }
          } else {
            return '请输入密码'
          }
        }
      }).then(({ value }) => {
        updateAccountPassword({ password: value, id: item.id }).then(rep => {
          this.$message({
            message: '密码重置成功！',
            type: 'success'
          })
        })
      })
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
