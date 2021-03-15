<template>
  <div>
    <div class="search-area ">
      <el-form
        class="myForm"
        :inline="true"
        :model="pageConfig"
      >
        <el-form-item label="审批人">
          <el-input
            v-model="pageConfig.user"
            placeholder="审批人"
          ></el-input>
        </el-form-item>
        <el-form-item label="审批人">
          <el-input
            v-model="pageConfig.user"
            placeholder="审批人"
          ></el-input>
        </el-form-item>
        <el-form-item label="审批人">
          <el-input
            v-model="pageConfig.user"
            placeholder="审批人"
          ></el-input>
        </el-form-item>
        <el-form-item label="审批人">
          <el-input
            v-model="pageConfig.user"
            placeholder="审批人"
          ></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select
            v-model="pageConfig.region"
            placeholder="活动区域"
          >
            <el-option
              label="区域一"
              value="shanghai"
            ></el-option>
            <el-option
              label="区域二"
              value="beijing"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="operate-area ">
      <div class="lay">
        <el-button
          icon="el-icon-edit"
          size="mini"
          round
        >超小按钮</el-button>
        <el-button
          size="mini"
          type="primary"
          icon="el-icon-share"
        >超小按钮</el-button>
        <el-button
          size="mini"
          type="primary"
          icon="el-icon-delete"
          round
        >超小按钮</el-button>
        <el-button
          size="mini"
          round
        >超小按钮</el-button>
      </div>
      <el-button
        type="primary"
        icon="el-icon-share"
      >超小按钮</el-button>
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