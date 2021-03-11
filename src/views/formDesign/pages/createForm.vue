<template>
  <div class="widget-form-container">
    <div
      v-if="data.list.length == 0"
      class="form-empty"
    >从左侧组件库中拖动创建</div>
    <el-form label-width="80px">
      <draggable
        v-model="data.list"
        v-bind="{group:'people', ghostClass: 'ghost',animation: 200, handle: '.drag-widget'}"
        class=""
        :move="onMoveCallback"
        @add="handleWidgetAdd"
        @end="handleMoveEnd"
      >

        <transition-group
          class="widget-form-list"
          name="fade"
          tag="div"
        >
          <template v-for="(element, index) in data.list">
            <template v-if="element.type == 'grid'">
              <el-row
                v-if="element && element.key"
                :key="element.key"
                :align="element.options.align"
                class="widget-col widget-view"
                :class="{active: selectWidget.key == element.key}"
                :data-type="selectWidget.type"
                :gutter="element.options.gutter ? element.options.gutter : 0"
                :justify="element.options.justify"
                type="flex"
                @click.native="handleSelectWidget(index)"
              >
                <el-col
                  v-for="(col, colIndex) in element.columns"
                  :key="colIndex"
                  :span="col.span ? col.span : 0"
                >
                  <draggable
                    v-model="col.list"
                    v-bind="{group:'people', ghostClass: 'ghost',animation: 200, handle: '.drag-widget'}"
                    :no-transition-on-drag="true"
                    @add="handleWidgetColAdd($event, element, colIndex)"
                    @end="handleMoveEnd"
                  >
                    <transition-group
                      class="widget-col-list"
                      data-type="grid"
                      name="fade"
                      tag="div"
                    >
                      <template v-for="(el, i) in col.list">
                        <widget-form-item
                          v-if="el.key"
                          :key="el.key"
                          :data="col"
                          :data-type="el.type"
                          :element="el"
                          :index="i"
                          :select.sync="selectWidget"
                        />
                      </template>
                    </transition-group>
                  </draggable>
                </el-col>
                <div
                  v-if="selectWidget.key == element.key"
                  class="widget-view-action widget-col-action"
                >
                  <i
                    class="iconfont icondelete"
                    @click.stop="handleWidgetDelete(index)"
                  />
                </div>
                <div
                  v-if="selectWidget.key == element.key"
                  class="widget-view-drag widget-col-drag"
                >
                  <i class="iconfont iconmove1 drag-widget" />
                </div>
              </el-row>
            </template>
            <template v-else>
              <widget-form-item
                v-if="element && element.key"
                :key="element.key"
                :data="data"
                :data-type="element.type"
                :element="element"
                :index="index"
                :select.sync="selectWidget"
              />
            </template>
          </template>
        </transition-group>
      </draggable>
    </el-form>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'
import WidgetFormItem from './WidgetFormItem'

export default {
  components: {
    Draggable,
    WidgetFormItem
  },
  props: {
    data: {
      type: Object,
      default: () => { }
    },
    select: {
      type: Object,
      default: () => { }
    }
  },
  data () {
    return {
      selectWidget: null
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
  mounted () {
    document.body.ondrop = function (event) {
      let isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1
      if (isFirefox) {
        event.preventDefault()
        event.stopPropagation()
      }
    }
  },
  methods: {
    clearData () {
      this.data.list = []
    },
    handleMoveEnd ({ newIndex, oldIndex }) {
      console.log('index', newIndex, oldIndex)
    },
    handleSelectWidget (index) {
      console.log(index, '#####')
      this.selectWidget = this.data.list[index]
    },
    onMoveCallback (evt, aa) {
      return !(evt.dragged.getAttribute('data-type') == 'grid' && evt.to.getAttribute('data-type') == 'grid')
    },
    handleWidgetAdd (evt) {
      console.log('handleWidgetAdd', evt)
      const newIndex = evt.newIndex
      let data = this.data.list[newIndex], type = data.type
      // 为拖拽到容器的元素添加唯一 key
      const key = Date.parse(new Date()) + '_' + Math.ceil(Math.random() * 99999)
      this.$set(this.data.list, newIndex, {
        ...data,
        options: {
          ...data.options
        },
        key,
        // 绑定键值
        model: type + '_' + key,
        rules: []
      })
      if (type === 'radio' || type === 'checkbox' || type === 'select') {
        this.$set(this.data.list, newIndex, {
          ...this.data.list[newIndex],
          options: {
            ...data.options,
            optionList: data.options.optionList.map(item => ({
              ...item
            }))
          }
        })
      }

      if (type === 'grid') {
        this.$set(this.data.list, newIndex, {
          ...this.data.list[newIndex],
          columns: data.columns.map(item => ({ ...item }))
        })
      }

      this.selectWidget = this.data.list[newIndex]
      console.log(this.data.list, this.selectWidget)
    },
    handleWidgetColAdd ($event, row, colIndex) {
      console.log('coladd', $event, row, colIndex)
      const newIndex = $event.newIndex
      // const oldIndex = $event.oldIndex
      // const item = $event.item

      // // 防止布局元素的嵌套拖拽
      // if (item.className.indexOf('data-grid') >= 0) {
      //   // 如果是列表中拖拽的元素需要还原到原来位置
      //   item.tagName === 'DIV' && this.data.list.splice(oldIndex, 0, row.columns[colIndex].list[newIndex])
      //   row.columns[colIndex].list.splice(newIndex, 1)

      //   return false
      // }
      if (row.type == 'grid' && $event.item.getAttribute('data-type') == 'grid') {
        this.$message({
          message: '禁止布局组件嵌套！',
          type: 'warning'
        })
        return false
      }

      const key = Date.parse(new Date()) + '_' + Math.ceil(Math.random() * 99999)

      this.$set(row.columns[colIndex].list, newIndex, {
        ...row.columns[colIndex].list[newIndex],
        options: {
          ...row.columns[colIndex].list[newIndex].options
        },
        key,
        // 绑定键值
        model: row.columns[colIndex].list[newIndex].type + '_' + key,
        rules: []
      })

      if (row.columns[colIndex].list[newIndex].type === 'radio' || row.columns[colIndex].list[newIndex].type === 'checkbox' || row.columns[colIndex].list[newIndex].type === 'select') {
        this.$set(row.columns[colIndex].list, newIndex, {
          ...row.columns[colIndex].list[newIndex],
          options: {
            ...row.columns[colIndex].list[newIndex].options,
            optionList: row.columns[colIndex].list[newIndex].options.optionList.map(item => ({
              ...item
            }))
          }
        })
      }

      this.selectWidget = row.columns[colIndex].list[newIndex]
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
    }
  }
}
</script>
<style >
.widget-form-container {
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.widget-form-list {
  background: #fff;
  border: 1px dashed #999;
  overflow: auto;
  height: calc(100vh - 180px);
  margin: 10px;
}
.form-empty {
  position: absolute;
  text-align: center;
  width: 300px;
  font-size: 20px;
  top: 200px;
  left: 50%;
  margin-left: -150px;
  color: #ccc;
}
.widget-form-list .widget-view.active {
  outline: 2px solid #409eff;
  border: 1px solid #409eff;
}
.widget-form-list .widget-view .widget-view-drag {
  position: absolute;
  left: -2px;
  top: -2px;
  bottom: -18px;
  height: 28px;
  line-height: 28px;
  background: #409eff;
  z-index: 9;
}
.widget-form-list .widget-view .widget-view-action {
  position: absolute;
  right: 0;
  bottom: 0;
  height: 28px;
  line-height: 28px;
  background: #409eff;
  z-index: 9;
}
.widget-form-list .widget-view .widget-view-action {
  position: absolute;
  right: 0;
  bottom: 0;
  height: 28px;
  line-height: 28px;
  background: #409eff;
  z-index: 9;
}
.widget-form-list .widget-view .widget-view-action i {
  font-size: 14px;
  color: #fff;
  margin: 0 5px;
  cursor: pointer;
}
.widget-form-list .widget-view .widget-view-drag i {
  font-size: 14px;
  color: #fff;
  margin: 0 5px;
  cursor: move;
}
.widget-form-list .widget-col .el-col {
  min-height: 50px;
}
.widget-form-list .widget-col-list {
  min-height: 50px;
  border: 1px dashed #ccc;
  background: #fff;
}
.widget-form-list .widget-view.is_req .el-form-item__label:before {
  content: "*";
  color: #f56c6c;
  margin-right: 4px;
}
.widget-form-list .widget-view {
  padding-bottom: 18px;
  position: relative;
  border: 1px dashed hsla(0, 0%, 66.7%, 0.7);
  background-color: rgba(236, 245, 255, 0.3);
  margin: 2px;
}
.widget-form-list .widget-view {
  padding-bottom: 18px;
  position: relative;
  border: 1px dashed hsla(0, 0%, 66.7%, 0.7);
  background-color: rgba(236, 245, 255, 0.3);
  margin: 2px;
}
</style>
