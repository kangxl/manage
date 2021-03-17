<template>
  <div>
    <my-table
      ref="myTable"
      :columns="columns"
      :page-config="pageConfig"
    >
      <template v-slot:searchItems>
        <el-form-item label="审批人">
          <el-input
            v-model="pageConfig.conditions.b"
            placeholder="审批人"
          />
        </el-form-item>
        <el-form-item label="审批人">
          <el-input
            v-model="pageConfig.conditions.b"
            placeholder="审批人"
          />
        </el-form-item>
      </template>
      <template v-slot:createTime="scope">
        {{ $date.formatDate(scope.item.row.createTime) }}
      </template>
      <template v-slot:accountHeader>
        <my-input-search-popover
          v-model="pageConfig.conditions.b"
          name="账号"
          type="input"
          @change="conditionChange('a',$event)"
        />
      </template>

      <template v-slot:operation="scope">
        <el-tooltip
          content="修改"
          placement="top"
        >
          <a @click="goToAccountForm(scope.item.row, scope.item.$index)"><i class="fa fa-pencil" />aaa</a>
        </el-tooltip>
        <el-tooltip
          content="密码重置"
          placement="top"
        >
          <a @click="resetPassword(scope.item.row,$event)">
            <i class="fa fa-key" />bbb
          </a>
        </el-tooltip>
      </template>
    </my-table>
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
import AccountForm from './accountForm'
import AccountDetail from './accountDetail'
import { getAccountList, deleteAccount, updateAccountPassword } from '../../api/accountApi'
export default {
  name: 'AccountList',
  components: { AccountForm, AccountDetail },
  data () {
    return {
      columns: [{
        label: '名称1',
        width: '',
        prop: 'account',
        transformFunc: null
      }, {
        label: '名称2',
        prop: 'createTime'
      }, {
        label: '名称3',
        prop: 'updaterName'
      }, {
        label: '名称4',
        prop: 'updateTime'
      }, {
        label: '操作',
        prop: 'operation'
      }],
      pageConfig: {
        queryRequest: getAccountList,
        deleteRequest: deleteAccount,
        conditions: {
          keywords: '',
          a: [],
          b: ''
        }
      },
      activeRow: {},
      isShowDetail: false,
      isShowEdit: false // 编辑弹窗
    }
  },
  methods: {
    conditionChange (prop, data) {
      this.$refs.myTable.search()
    },
    openDetail (row) {
      this.activeRow = row || {}
      this.isShowDetail = true
    },
    // 打开编辑弹窗
    goToAccountForm (row) {
      console.log(12345, row)
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
