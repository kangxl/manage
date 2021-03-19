
<template>
  <el-dialog
    :append-to-body="true"
    :title="getTitle"
    :visible.sync="resourceDialogVisible"
    width="80%"
    @close="closeDialog"
  >
    <el-form
      ref="resourceForm"
      label-width="80px"
      :model="resourceForm"
      :rules="formDataRules"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item label="父节点">
            {{ parent.name||'无' }}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="资源类型"
            prop="type"
          >
            {{ parent&&parent.id?'菜单':'系统' }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="资源名称"
            prop="name"
          >
            <el-input v-model="resourceForm.name" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="唯一标示"
            prop="code"
          >
            <el-input v-model="resourceForm.code" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row style="text-align: center;">
        <el-button
          icon="el-icon-document-add"
          type="text"
          @click="addPath"
        >添加请求</el-button>
      </el-row>
      <el-form-item label="资源地址">
        <el-table
          border
          :data="resourceForm.requestList"
          size="medium"
          style="width: 100%;"
        >
          <el-table-column
            label="url"
            prop="url"
          >
            <template slot-scope="scope">
              <el-form-item
                :prop="'requestList.' + scope.$index + '.url'"
                :rules="formDataRules.url"
              >
                <el-input v-model="scope.row.url" />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
            label="method"
            prop="method"
          >
            <template slot-scope="scope">
              <el-form-item
                :prop="'requestList.' + scope.$index + '.method'"
                :rules="formDataRules.method"
              >
                <el-select
                  v-model="scope.row.method"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in $DIC.clone(100)"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                  />
                </el-select>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="删除"
            width="80px"
          >
            <template slot-scope="scope">
              <el-tooltip
                content="删除"
                placement="top"
              >
                <a @click="deletePath(scope.$index,$event)">
                  <i class="fa fa-trash" />
                </a>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
    </el-form>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="closeDialog">取 消</el-button>
      <el-button
        :loading="loading"
        type="primary"
        @click="submitForm()"
      >确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { addResource, getResourceById, updateResource } from '../../api/resourceApi'
export default {
  props: {
    parent: {
      default: () => { },
      type: Object
    },
    nodeId: {
      default: '',
      type: String
    }
  },
  data () {
    return {
      resourceTree: [], // 资源树
      resourceDialogVisible: true,
      loading: false,
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      formDataRules: {
        address: [{ required: true, trigger: 'blur', message: '请输入资源名称' }],
        name: [{ required: true, trigger: 'blur', message: '请输入资源名称' }],
        url: [{ required: true, trigger: 'blur', message: '请输入url' }],
        method: [{ required: true, trigger: 'blur', message: '请输入method' }]
      },
      resourceForm: {
        name: '',
        type: '',
        requestList: []
      }
    }
  },
  computed: {
    getTitle () {
      if (!this.nodeId) {
        return '添加'
      } else {
        return '修改'
      }
    }
  },
  created () {
    this.getResourceData()
  },
  methods: {
    getResourceData () {
      if (this.nodeId) {
        getResourceById({ id: this.nodeId }).then(res => {
          this.resourceForm = res.data || {}
        })
      }
    },
    addPath () {
      this.resourceForm.requestList.push({ url: '', method: '' })
    },
    deletePath (index, $event) {
      // $event.target.parentElement.blur()
      // this.$confirm('确认删除?', '删除', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // }).then(() => {
      this.resourceForm.requestList.splice(index, 1)
      // })
    },
    submitForm (formName) {
      var id = ''
      this.$refs.resourceForm.validate((valid) => {
        if (valid) {
          this.loading = true
          const data = {
            name: this.resourceForm.name,
            type: this.parent && this.parent.id ? 'menu' : 'system',
            code: this.resourceForm.code,
            remark: this.resourceForm.remark,
            requestList: this.resourceForm.requestList
          }
          if (this.nodeId) {
            data.id = this.nodeId
          } else {
            data.parentId = this.parent && this.parent.id || null
          }
          let req
          if (id) {
            req = updateResource
          } else {
            req = addResource
          }
          req(data, id).then(res => {
            this.loading = false
            if (this.nodeId) {
              data.parentId = this.resourceForm.parentId
            } else {
              data.id = res.data
            }
            this.$emit('close', data)
          }).catch(() => {
            this.loading = false
          })
        }
      })
    },
    closeDialog () {
      this.$emit('close')
    }
  }
}
</script>

<style>
</style>
