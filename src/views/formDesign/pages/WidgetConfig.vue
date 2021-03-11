<template>
  <div
    v-if="show"
    style="height: calc(100vh - 200px);overflow-y: auto;"
  >
    <el-form
      label-position="right"
      label-width="80px"
      :rules="rules"
    >
      <template v-if="data.type == 'grid'">
        <el-form-item label="间隔">
          <el-input
            v-model.number="data.options.gutter"
            type="number"
          />
        </el-form-item>
        <el-form-item label="列配置">
          <draggable
            v-bind="{group:{ name:'options'}, ghostClass: 'ghost',handle: '.drag-item'}"
            handle=".drag-item"
            :list="data.columns"
            tag="ul"
          >
            <li
              v-for="(item, index) in data.columns"
              :key="index"
            >
              <i
                class="drag-item"
                style="font-size: 16px;margin: 0 5px;cursor: move;"
              ><i class="icon iconfont iconsorting" /></i>
              <el-input
                v-model.number="item.span"
                style="width: 100px;"
                type="number"
              />
              <el-button
                circle
                icon="el-icon-minus"
                plain
                style="padding: 4px;margin-left: 5px;"
                type="danger"
                @click="handleOptionsRemove(index)"
              />
            </li>
          </draggable>
          <div style="margin-left: 22px;">
            <el-button
              type="text"
              @click="handleAddColumn"
            >添加列</el-button>
          </div>
        </el-form-item>

      </template>
      <template v-else>

        <el-form-item
          v-if="hasOwnProperty('prop',data)"
          label="选择字段"
          prop="prop"
        >
          <el-select
            v-model="data.prop"
            placeholder="请选择"
            required
          >
            <el-option
              v-for="item in propList"
              :key="item.prop"
              :label="item.name"
              :value="item.prop"
              @click.native="changeProp(item)"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          v-if="hasOwnProperty('prop',data) "
          label="名称"
        >
          <el-input v-model="data.label" />
        </el-form-item>
        <el-form-item
          v-if="hasOwnProperty('width')"
          label="宽度"
        >
          <el-input v-model="data.options.width" />
        </el-form-item>
        <template v-if="hasOwnProperty('placeholder')">
          <el-form-item label="占位提示">
            <el-input v-model="data.options.placeholder" />
          </el-form-item>
        </template>
        <el-form-item
          v-if="hasOwnProperty('optionList') "
          label="数据源"
        >
          <draggable
            v-bind="{group:{ name:'options'}, ghostClass: 'ghost',handle: '.drag-item'}"
            handle=".drag-item"
            :list="data.options.optionList"
            style="margin: 0;padding: 0;"
            tag="ul"
          >
            <li
              v-for="(item, index) in data.options.optionList"
              :key="index"
            >
              <el-input
                v-model="item.label"
                placeholder="文字"
                size="mini"
                style="padding-left:5px;width:100px;"
              />

              <el-input
                v-model="item.value"
                placeholder="值"
                size="mini"
                style="padding-left:5px;width:100px;"
              />
              <el-button
                circle
                class="drag-item"
                icon="el-icon-rank"
                plain
                size="mini"
                style="padding: 4px;margin-left: 5px;"
              />
              <el-button
                circle
                icon="el-icon-minus"
                plain
                size="mini"
                style="padding: 4px;margin-left: 5px;"
                type="danger"
                @click="removeField('column',index)"
              />

            </li>
          </draggable>
          <div>
            <el-button
              type="text"
              @click="addField('column')"
            >添加列表项</el-button>
          </div>
        </el-form-item>
        <template v-if="data.type == 'timepicker' || data.type == 'datepicker'">

          <el-form-item label="是否范围">
            <el-switch v-model="data.options.isRange" />
          </el-form-item>
          <el-form-item
            v-if="data.options.isRange"
            label="前占位提示"
          >
            <el-input v-model="data.options.startPlaceholder" />
          </el-form-item>
          <el-form-item
            v-if="data.options.isRange"
            label="后占位提示"
          >
            <el-input v-model="data.options.endPlaceholder" />
          </el-form-item>
          <el-form-item
            v-if="data.type == 'datepicker'"
            label="日期类型"
          >
            <el-select
              v-model="data.options.type"
              placeholder="请选择"
            >
              <el-option
                v-for="item in dateTypeOptions"
                :key="item.type"
                :label="item.name"
                :value="item.type"
              />
            </el-select>
          </el-form-item>
        </template>
        <template v-if="data.type == 'inputnumber' || data.type == 'slider'">
          <el-form-item label="最大值">
            <el-input-number
              v-model="data.options.max"
              :min="data.options.min"
            />
          </el-form-item>
          <el-form-item label="最小值">
            <el-input-number
              v-model="data.options.min"
              :max="data.options.max"
            />
          </el-form-item>
        </template>
        <template v-if="data.type == 'inputnumber'">
          <el-form-item label="精度">
            <el-input-number
              v-model="data.options.precision"
              :min="0"
              :precision="0"
            />
          </el-form-item>
        </template>
        <template v-if="data.type == 'slider'">
          <el-form-item label="是否显示间断点">
            <el-switch v-model="data.options.showStops" />
          </el-form-item>
          <el-form-item label="是否为范围选择">
            <el-switch v-model="data.options.range" />
          </el-form-item>
        </template>
        <template v-if="data.type == 'input' || data.type == 'textarea'">
          <el-form-item label="默认值">
            <el-input v-model="data.options.defaultValue" />
          </el-form-item>
        </template>
        <el-form-item
          v-if="hasOwnProperty('showPassword')"
          label="密码模式"
        >
          <el-switch v-model="data.options.showPassword" />
        </el-form-item>
        <template v-if="hasOwnProperty('required')">
          <el-divider> 验证规则 </el-divider>
          <el-form-item label="是否必填">
            <el-switch v-model="data.options.required" />
          </el-form-item>
        </template>
        <el-form-item
          v-if="hasOwnProperty('minlength')"
          label="最小长度"
        >
          <el-input-number
            v-model="data.options.minlength"
            :max="data.options.maxlength"
            :min="0"
          />
        </el-form-item>
        <el-form-item
          v-if="hasOwnProperty('maxlength')"
          label="最大长度"
        >
          <el-input-number
            v-model="data.options.maxlength"
            :min="data.options.minlength||0"
          />
        </el-form-item>
        <template v-if="data.type == 'text'">
          <el-form-item label="文字位置">
            <el-radio-group v-model="data.options.position">
              <el-radio-button label="left">居左</el-radio-button>
              <el-radio-button label="center">居中</el-radio-button>
              <el-radio-button label="right">居右</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="内容">
            <el-input v-model="data.options.text" />
          </el-form-item>
          <el-form-item label="字体大小">
            <el-input-number
              v-model="data.options.size"
              :min="10"
              :precision="0"
              :step="1"
            />
          </el-form-item>
          <el-form-item label="字体颜色">
            <el-color-picker v-model="data.options.color" />
          </el-form-item>
          <el-form-item label="背景颜色">
            <el-color-picker v-model="data.options.background" />
          </el-form-item>
        </template>
      </template>
    </el-form>
  </div>
</template>

<script>

export default {
  props: {
    data: {
      default: () => { },
      type: Object
    }
  },
  data () {
    return {
      dateTypeOptions: [
        { name: '日期', type: 'date' },
        { name: '年', type: 'year' },
        { name: '月', type: 'month' },
        { name: '多个日期', type: 'dates' },
        { name: '周', type: 'week' },
        { name: '日期和时间', type: 'datetime' },
        { name: '日期和时间范围', type: 'datetimerange' },
        { name: '日期范围', type: 'daterange' },
        { name: '月范围', type: 'monthrange' }
      ],
      dateTimeTypeOptions: [],
      propList: [{ name: '姓名', prop: 'name' }, { name: '年龄', prop: 'age' }, { name: '邮箱', prop: 'email' }, { name: '地址', prop: 'address' }],
      rules: {

      },
      validator: {
        type: null,
        required: null,
        pattern: null,
        range: null,
        length: null
      }
    }
  },
  computed: {
    show () {
      if (this.data && Object.keys(this.data).length > 0) {
        return true
      }
      return false
    }
  },
  watch: {
    'data.options.required' (val) {
      this.validateRequired(val)
    },
    'data.options.minlength' (val) {
      this.validateLength(val)
    },
    'data.options.maxlength' (val) {
      this.validateLength(val)
    },
    'data.key' (val) {
      this.setProp()
    }
  },
  created () {
    this.setProp()
  },
  methods: {
    hasOwnProperty (name, data) {
      return (data || this.data.options).hasOwnProperty(name)
    },
    addField (type) {
      this.data.options.optionList.push({ label: '', value: '' })
    },
    removeField (type, index) {
      this.data.options.optionList.splice(index, 1)
    },
    setProp () {
      if (this.data.type != 'text' && this.data.type != 'grid') {
        this.$set(this.data, 'prop', this.propList[0].prop)
        this.$set(this.data, 'label', this.propList[0].name)
      }
    },
    handleOptionsRemove (index) {
      if (this.data.type === 'grid') {
        this.data.columns.splice(index, 1)
      } else {
        this.data.options.options.splice(index, 1)
      }
    },
    handleAddColumn () {
      this.data.columns.push({
        span: '',
        list: []
      })
    },
    changeProp (item) {
      this.$set(this.data, 'label', item.name)
    },
    generateRule () {
      this.data.rules = []
      Object.keys(this.validator).forEach(key => {
        if (this.validator[key]) {
          this.data.rules.push(this.validator[key])
        }
      })
    },
    validateLength () {
      if (this.data.options.maxlength > 0 || this.data.options.minlength > 0) {
        this.validator.required = { type: 10, min: this.data.options.minlength, max: this.data.options.maxlength }
      } else {
        this.validator.required = null
      }
      this.$nextTick(() => {
        this.generateRule()
      })
    },
    validateRequired (val) {
      if (val) {
        this.validator.required = { type: 1, message: '' }
      } else {
        this.validator.required = null
      }
      this.$nextTick(() => {
        this.generateRule()
      })
    }
  }
}
</script>
