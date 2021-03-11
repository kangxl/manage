<template>
  <el-form-item
    v-if="element && element.key"
    class="widget-view"
    :class="{active: selectWidget.key == element.key, 'is_req': element.options.required ,'clear-margin-left':element.type=='text'}"
    :label="element.type=='text'?'':element.label"
    :style="getItemStyle"
    @click.native.stop="handleSelectWidget(index)"
  >
    <template v-if="element.type == 'input'">
      <el-input
        v-model="element.options.defaultValue"
        clearable
        :maxlength="element.options.maxlength||''"
        :placeholder="element.options.placeholder"
        :show-password="element.options.showPassword"
        show-word-limit
        :style="{width: element.options.width}"
      />
    </template>
    <template v-if="element.type == 'textarea'">
      <el-input
        v-model="element.options.defaultValue"
        clearable
        :maxlength="element.options.maxlength||''"
        :placeholder="element.options.placeholder"
        show-word-limit
        :style="{width: element.options.width}"
        type="textarea"
      />
    </template>
    <template v-if="element.type == 'switch'">
      <el-switch
        v-model="element.options.defaultValue"
        :active-color="element.options.activeColor"
        :active-text="element.options.activeText"
        :inactive-color="element.options.inactiveColor"
        :inactive-text="element.options.inactiveText"
      />
    </template>
    <template v-if="element.type == 'inputnumber'">
      <el-input-number
        v-model="element.options.defaultValue"
        :max="(element.options.max+'').length>0?element.options.max:Infinity"
        :min="(element.options.min+'').length>0?element.options.min:-Infinity"
        :placeholder="element.options.placeholder"
        :precision="element.options.precision"
      />
    </template>
    <template v-if="element.type == 'slider'">
      <el-slider
        v-model="element.options.defaultValue"
        :max="element.options.max"
        :min="element.options.min"
        :range="element.options.range"
        :show-stops="element.options.showStops"
        :step="element.options.step"
      />
    </template>
    <template v-if="element.type == 'timepicker'">
      <el-time-picker
        v-model="element.options.defaultValue"
        arrow-control
        :end-placeholder="element.options.endPlaceholder"
        :is-range="element.options.isRange"
        :placeholder="element.options.placeholder"
        range-separator="至"
        :start-placeholder="element.options.startPlaceholder"
        value-format="HH:mm:ss"
      />
    </template>
    <template v-if="element.type == 'datepicker'">
      <el-date-picker
        v-model="element.options.defaultValue"
        arrow-control
        :end-placeholder="element.options.endPlaceholder"
        :is-range="element.options.isRange"
        :placeholder="element.options.placeholder"
        range-separator="至"
        :start-placeholder="element.options.startPlaceholder"
        :type="element.options.type"
      />
    </template>
    <template v-if="element.type == 'text'">
      <span :style="{'font-size': element.options.size + 'px',color: element.options.color}">
        {{ element.options.text }}
      </span>
    </template>
    <template v-if="element.type == 'editor'">
      <vue-editor
        v-model="element.options.defaultValue"
        :style="{width: element.options.width}"
      />
    </template>
    <template v-if="element.type == 'radio'">
      <el-radio-group v-model="element.options.defaultValue">
        <el-radio
          v-for="(item, i) in element.options.optionList"
          :key="item.value + i"
          :label="item.label"
        >
          {{ item.label }}
        </el-radio>
      </el-radio-group>
    </template>
    <template v-if="element.type == 'select'">
      <el-select
        v-model="element.options.defaultValue"
        clearable
        placeholder="请选择"
      >
        <el-option
          v-for="(item, i) in element.options.optionList"
          :key="item.value + i"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </template>
    <template v-if="element.type == 'checkbox'">
      <el-checkbox-group v-model="element.options.defaultValue">
        <el-checkbox
          v-for="(item, i) in element.options.optionList"
          :key="item.value + i"
          :label="item.label"
        > {{ item.label }}</el-checkbox>
      </el-checkbox-group>
    </template>
    <div
      v-if="selectWidget.key == element.key"
      class="widget-view-action"
    >
      <i
        class="iconfont iconcopy"
        @click.stop="handleWidgetClone(index)"
      />
      <i
        class="iconfont icondelete"
        @click.stop="handleWidgetDelete(index)"
      />
    </div>

    <div
      v-if="selectWidget.key == element.key"
      class="widget-view-drag"
    >
      <i class="iconfont iconmove1 drag-widget" />
    </div>
  </el-form-item>
</template>

<script>
export default {
  props: ['element', 'select', 'index', 'data'],
  data () {
    return {
      selectWidget: this.select
    }
  },
  computed: {
    getItemStyle () {
      if (this.element.type == 'text') {
        return {
          background: this.element.options.background,
          'text-align': this.element.options.position
        }
      }
      return ''
    }
  },
  watch: {
    select (val) {
      this.selectWidget = val
    },
    selectWidget: {
      handler (val) {
        this.$emit('update:select', val)
      },
      deep: true
    }
  },
  methods: {
    handleSelectWidget (index) {
      this.selectWidget = this.data.list[index]
    },
    handleWidgetDelete (index) {
      if (this.data.list.length - 1 === index) {
        if (index === 0) {
          this.selectWidget = {}
        } else {
          this.selectWidget = this.data.list[index - 1]
        }
      } else {
        this.selectWidget = this.data.list[index + 1]
      }

      this.$nextTick(() => {
        this.data.list.splice(index, 1)
      })
    },
    handleWidgetClone (index) {
      let cloneData = {
        ...this.data.list[index],
        options: { ...this.data.list[index].options },
        key: Date.parse(new Date()) + '_' + Math.ceil(Math.random() * 99999)
      }

      if (this.data.list[index].type === 'radio' || this.data.list[index].type === 'checkbox' || this.data.list[index].type === 'select') {
        cloneData = {
          ...cloneData,
          options: {
            ...cloneData.options,
            options: cloneData.options.options.map(item => ({ ...item }))
          }
        }
      }

      this.data.list.splice(index, 0, cloneData)

      this.$nextTick(() => {
        this.selectWidget = this.data.list[index + 1]
      })
    }
  }
}
</script>
<style >
.widget-view .el-form-item__content {
  position: unset;
}
</style>
