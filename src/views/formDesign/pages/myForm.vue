<template>
  <el-dialog
    title="表单预览"
    :visible.sync="dialogFormVisible"
    @close="closeDialog"
  >
    <el-form
      ref="customForm"
      label-width="80px"
      :model="models"
      :rules="rules"
    >
      <template v-for="item in data.list">
        <template v-if="item.type == 'grid'">
          <el-row
            :key="item.key"
            :align="item.options.align"
            :gutter="item.options.gutter ? item.options.gutter : 0"
            :justify="item.options.justify"
            type="flex"
          >
            <el-col
              v-for="(col, colIndex) in item.columns"
              :key="colIndex"
              :span="col.span"
            >
              <template v-for="citem in col.list">
                <my-form-item
                  :key="citem.key"
                  :models.sync="models"
                  :remote="remote"
                  :rules="rules"
                  :widget="citem"
                  @input-change="onInputChange"
                />
              </template>
            </el-col>
          </el-row>
        </template>
        <template v-else>
          <my-form-item
            :key="item.key"
            :models.sync="models"
            :remote="remote"
            :rules="rules"
            :widget="item"
            @input-change="onInputChange"
          />
        </template>
      </template>
    </el-form>
    <div
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="closeDialog">取 消</el-button>
      <el-button
        type="primary"
        @click="submit"
      >确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { lengthRangeFormValidate } from '@/utils/validateForm'
import MyFormItem from './myFormItem'
export default {
  components: {
    MyFormItem
  },
  props: ['data', 'remote', 'value', 'insite'],
  data () {
    return {
      models: {},
      rules: {},
      dialogFormVisible: true
    }
  },
  created () {
    this.generateModle(this.data.list)
  },
  methods: {
    closeDialog () {
      this.$emit('close')
    },
    submit () {
      console.log(this.form, this.models)
      this.$refs.customForm.validate(valid => {
        console.log(valid)
      })
    },
    getRule (item) {
      if (item.type == 1) { // 必填项
        return { required: true, message: item.message || '请输入', trigger: 'change' }
      } else if (item.type == 10 && (item.min > 0 || item.max > 0)) {
        console.log(item)
        return { validator: lengthRangeFormValidate(item.min, item.max), trigger: 'blur' }
      }
    },
    generateModle (genList) {
      for (let i = 0; i < genList.length; i++) {
        if (genList[i].type === 'grid') {
          genList[i].columns.forEach(item => {
            this.generateModle(item.list)
          })
        } else {
          if (this.value && Object.keys(this.value).indexOf(genList[i].prop) >= 0) {
            this.models[genList[i].prop] = this.value[genList[i].prop]
          } else {
            if (genList[i].type === 'blank') {
              this.$set(this.models, genList[i].prop, genList[i].options.defaultType === 'String' ? '' : (genList[i].options.defaultType === 'Object' ? {} : []))
            } else {
              this.models[genList[i].prop] = genList[i].options.defaultValue
            }
          }
          if (this.rules[genList[i].prop]) {
            this.rules[genList[i].prop] = [...this.rules[genList[i].prop], ...genList[i].rules.map(item => {
              let rule = this.getRule(item)
              if (rule) {
                return rule
              }
            })]
          } else {
            this.rules[genList[i].prop] = [...genList[i].rules.map(item => {
              let rule = this.getRule(item)
              if (rule) {
                return rule
              }
            })]
          }
          console.log(6666, this.rules)
        }
      }
    },
    onInputChange () {

    }
  }
}
</script>
<style scope>
</style>
