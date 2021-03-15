<template>
  <my-dialog
    :loading="loading"
    :title="getTitle"
    width="50%"
    @close="$emit('close')"
    @submit="submitForm"
  >
    <el-form
      ref="form"
      label-width="80px"
      :model="form"
      :rules="formRules"
    >
      <el-form-item
        label="名称"
        prop="name"
      >
        <el-input v-model.trim="form.name" />
      </el-form-item>
      <el-form-item
        label="资源"
        prop="resourceIds"
      >
        <el-tree
          ref="resourceTree"
          accordion
          :check-on-click-node="true"
          :data="treeData"
          :default-checked-keys="form.resourceIds"
          node-key="id"
          :props="defaultProps"
          show-checkbox
          @check="checkChange"
        >
          <template v-slot="scope">
            <span>
              <span>{{ scope.node.label }}</span>
            </span>
          </template>
        </el-tree>
      </el-form-item>
      <el-form-item
        label="备注"
        prop="remark"
      >
        <el-input
          v-model="form.remark"
          type="textarea"
          @blur="form.remark=form.remark.trim()"
        />
      </el-form-item>
    </el-form>
  </my-dialog>
</template>
<script>
import { addRole, editRole, getRoleById } from '../../api/roleApi'
import { getResourceTreeList } from '../../api/resourceApi'
export default {
  name: 'RoleFormDialog',
  props: {
    formData: {
      default: () => { },
      type: Object
    }
  },
  data () {
    return {
      treeData: [],
      loading: false,
      form: {},
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      formRules: {
        resourceIds: [{ type: 'array', required: true, trigger: 'change', message: '必须选择资源' }],
        name: [{ required: true, trigger: 'change', message: '请输入角色名称' }]
      }
    }
  },
  computed: {
    getTitle () {
      if (!this.formData || !this.formData.id) {
        return '新增'
      } else {
        return '修改'
      }
    }
  },
  created () {
    this.getResourceTreeList()
    if (!this.formData.id) {
      this.$set(this.form, 'resourceIds', [])
    } else {
      this.getRoleDetail()
    }
  },
  methods: {
    getRoleDetail () {
      getRoleById(this.formData.id).then(res => {
        var data = res.data || {}
        data.resourceIds = this.$utils.getListAttrs(data.resourceList)
        this.form = res.data
      })
    },
    getResourceTreeList () {
      getResourceTreeList().then(res => {
        this.treeData = res && res.data || []
      })
    },
    /**
     * 关闭角色添加修改窗口
     */
    closeDialog () {
      this.$emit('close')
    },
    checkChange (data, treeSelected) {
      this.$set(this.form, 'resourceIds', this.$refs.resourceTree.getCheckedKeys(true))
      this.$nextTick(() => {
        this.$refs.form.validateField('resourceIds')
      })
    },
    /**
     * 提交角色添加修改数据
     */
    submitForm () {
      this.loading = true
      this.$refs.form.validate(valid => {
        if (valid) {
          var data = {
            name: this.form.name,
            remark: this.form.remark || '',
            resourceIds: this.form.resourceIds
          }

          let req
          if (this.form.id) {
            data.id = this.form.id
            req = editRole(this.form.id, data)
          } else {
            req = addRole(data)
          }
          req.then((rep) => {
            this.$emit('close', true)
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          this.loading = false
        }
      })
    }
  }
}
</script>
