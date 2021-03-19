<template>
  <el-form-item
    :class="{'clear-margin-left':widget.type=='text'}"
    :label="widget.type=='text'?'':widget.label"
    :prop="widget.prop=='text'?'':widget.prop"
    :style="getItemStyle"
  >
    <el-input
      v-if="widget.type == 'input'"
      v-model="dataModel"
      clearable
      :disabled="widget.options.disabled"
      :maxlength="widget.options.maxlength>0?widget.options.maxlength:''"
      :placeholder="widget.options.placeholder"
      :show-password="widget.options.showPassword"
      :show-word-limit="widget.options.showWordLimit"
      :style="{width: widget.options.width}"
    />
    <el-input
      v-if="widget.type == 'textarea'"
      v-model="dataModel"
      clearable
      :disabled="widget.options.disabled"
      :maxlength="widget.options.maxlength>0?widget.options.maxlength:''"
      :placeholder="widget.options.placeholder"
      :show-word-limit="widget.options.showWordLimit"
      :style="{width: widget.options.width}"
      type="textarea"
    />
    <el-input-number
      v-if="widget.type == 'inputnumber'"
      v-model="dataModel"
      :max="(widget.options.max+'').length>0?widget.options.max:Infinity"
      :min="(widget.options.min+'').length>0?widget.options.min:-Infinity"
      :placeholder="widget.options.placeholder"
      :precision="widget.options.precision"
    />
    <el-switch
      v-if="widget.type == 'switch'"
      v-model="dataModel"
      :active-color="widget.options.activeColor"
      :active-text="widget.options.activeText"
      :inactive-color="widget.options.inactiveColor"
      :inactive-text="widget.options.inactiveText"
    />
    <el-slider
      v-if="widget.type == 'slider'"
      v-model="dataModel"
      :max="widget.options.max"
      :min="widget.options.min"
      :range="widget.options.range"
      :show-stops="widget.options.showStops"
      :step="widget.options.step"
    />
    <el-time-picker
      v-if="widget.type == 'timepicker'"
      v-model="dataModel"
      arrow-control
      :end-placeholder="widget.options.endPlaceholder"
      :is-range="widget.options.isRange"
      :placeholder="widget.options.placeholder"
      range-separator="至"
      :start-placeholder="widget.options.startPlaceholder"
      :type="widget.options.type"
      value-format="HH:mm:ss"
    />
    <el-date-picker
      v-if="widget.type == 'datepicker'"
      v-model="dataModel"
      arrow-control
      :end-placeholder="widget.options.endPlaceholder"
      :is-range="widget.options.isRange"
      :placeholder="widget.options.placeholder"
      range-separator="至"
      :start-placeholder="widget.options.startPlaceholder"
      :type="widget.options.type"
    />
    <template v-if="widget.type == 'text'">
      <span :style="{'font-size': widget.options.size+'px',color:widget.options.color}">
        {{ widget.options.text }}
      </span>
    </template>
    <template v-if="widget.type == 'editor'">
      <vue-editor
        v-model="dataModel"
        :style="{width: widget.options.width}"
      />
    </template>
    <template v-if="widget.type == 'radio'">
      <el-radio-group v-model="dataModel">
        <el-radio
          v-for="(item, i) in widget.options.optionList"
          :key="item.value + i"
          :label="item.label"
        >
          {{ item.label }}
        </el-radio>
      </el-radio-group>
    </template>
    <template v-if="widget.type == 'select'">
      <el-select
        v-model="dataModel"
        clearable
        placeholder="请选择"
      >
        <el-option
          v-for="(item, i) in widget.options.optionList"
          :key="item.value + i"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </template>
    <template v-if="widget.type == 'checkbox'">
      <el-checkbox-group v-model="dataModel">
        <el-checkbox
          v-for="(item, i) in widget.options.optionList"
          :key="item.value + i"
          :label="item.label"
        > {{ item.label }}</el-checkbox>
      </el-checkbox-group>
    </template>
  </el-form-item>
</template>

<script>
export default {

  props: ['widget', 'models'],
  data () {
    return {
      dataModel: this.models[this.widget.prop]
    }
  },
  computed: {
    getItemStyle () {
      if (this.widget.type == 'text') {
        return {
          background: this.widget.options.background,
          'text-align': this.widget.options.position
        }
      }
      return ''
    }
  },
  watch: {
    dataModel: {
      deep: true,
      handler (val) {
        this.models[this.widget.prop] = val
        this.$emit('update:models', {
          ...this.models,
          [this.widget.prop]: val
        })
        this.$emit('input-change', val, this.widget.prop)
      }
    },
    models: {
      deep: true,
      handler (val) {
        this.dataModel = val[this.widget.prop]
      }
    }
  },
  created () {
  },
  methods: {
  }
}
</script>
