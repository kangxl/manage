<template>
  <div>
    <el-form
      class="myPageSearchForm"
      :inline="true"
    >
      <el-form-item label="字段1">
        <el-input
          v-model="form.a1"
          placeholder="审批人"
        />
      </el-form-item>
      <el-form-item label="字段6">
        <el-select
          v-model="form.a6"
          placeholder="请选择"
        >
          <el-option
            label="苹果"
            value="shanghai"
          />
          <el-option
            label="香蕉"
            value="beijing"
          />
          <el-option
            label="橘子"
            value="beijing"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          size="mini"
          type="primary"
        >查询</el-button>
      </el-form-item>
      <el-form-item class="myPageSearchBtn">
        <el-button
          size="mini"
          type="primary"
          @click="openRoleForm"
        >添加角色<i class="el-icon-plus el-icon--right" /></el-button>
        <el-button
          size="mini"
          type="primary"
        >上传<i class="el-icon-upload el-icon--right" /></el-button>
      </el-form-item>
    </el-form>
    <el-table
      border
      :data="roleList"
      style="width: 100%"
    >
      <el-table-column
        label="角色名称"
        prop="roleName"
        show-overflow-tooltip
      />
      <el-table-column
        label="是否启用"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <el-switch v-model="scope.row.isEnable" />
        </template>
      </el-table-column>
      <el-table-column
        label="创建时间"
        prop="createTime"
        show-overflow-tooltip
      />
      <el-table-column
        label="备注"
        prop="desc"
        show-overflow-tooltip
      />
      <el-table-column
        label="操作"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <el-button
            size="small"
            type="text"
          >修改</el-button>
          <el-button
            size="small"
            type="text"
            @click="goSetting(scope.row)"
          >配置</el-button>
          <el-button
            size="small"
            type="text"
          >删除</el-button>
          <el-button
            size="small"
            type="text"
          >复制角色</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="text-center">
      <el-pagination
        layout="total, sizes, prev, pager, next, jumper"
        :page-size="100"
        :page-sizes="[100, 200, 300, 400]"
        :total="400"
      />
    </div>
    <role-form
      v-if="isShowRoleFrom"
      @close="closeDialog"
    />
  </div>
</template>
<script>
import RoleForm from './roleForm'
export default {
  components: {
    RoleForm
  },
  data () {
    return {
      isShowRoleFrom: false,
      form: {},
      roleList: [{ roleName: '仓库管理员', desc: '只负责管理仓库出库入库数据', createTime: '2020-10-01 15:30:20' }]
    }
  },
  methods: {
    goSetting (item) {
      this.$router.push({ path: '/role/setting' })
    },
    openRoleForm (item) {
      this.isShowRoleFrom = true
    },
    closeDialog () {
      this.isShowRoleFrom = false
    }
  }
}
</script>
<style scope>
</style>
