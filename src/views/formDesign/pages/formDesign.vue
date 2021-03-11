<template>
  <el-container
    class="el-card-clear-padding"
    style="height:100%;position: relative;"
  >
    <div
      class="btn-shrink"
      :style="{left: leftWidth+5+'px'}"
      @click="leftWidth==300?leftWidth=0:leftWidth=300"
    >
      <i
        class="icon iconfont"
        :class="{'icondouble-arrow-left':leftWidth==300,'icondouble-arro-right':leftWidth==0}"
      />
    </div>
    <div
      class="btn-shrink"
      :style="{right: rightWidth+10+'px'}"
      @click="rightHideOrShow"
    >
      <i
        class="icon iconfont"
        :class="{'icondouble-arrow-left':rightWidth==0,'icondouble-arro-right':rightWidth>0}"
      />
    </div>
    <el-aside
      class="container-border"
      :width="leftWidth+'px'"
    >
      <el-card style="height:calc(60% - 2px);">
        <div
          slot="header"
          class="clearfix"
        >
          <span>基本组件</span>
        </div>
        <draggable
          v-bind="{group:{ name:'people', pull:'clone',put:false},sort:false, ghostClass: 'ghost'}"
          class="component-content"
          :list="basicComponents"
          :move="handleMove"
          tag="ul"
          @end="handleMoveEnd"
          @start="handleMoveStart"
        >
          <li
            v-for="(item, index) in basicComponents"
            :key="index"
          >
            <a>
              <i
                class="icon iconfont"
                :class="item.icon"
              />
              <span>{{ item.name }}</span>
            </a>
          </li>
        </draggable>
      </el-card>
      <el-card style="height:calc(40% - 2px);">
        <div
          slot="header"
          class="clearfix"
        >
          <span>布局类型</span>
          <draggable
            v-bind="{group:{ name:'people', pull:'clone',put:false},sort:false, ghostClass: 'ghost'}"
            class="component-content"
            :list="layoutComponents"
            :move="handleMove"
            tag="ul"
            @end="handleMoveEnd"
            @start="handleMoveStart"
          >

            <li
              v-for="(item, index) in layoutComponents"
              :key="index"
              :data-type="item.type"
            >
              <a>
                <i
                  class="icon iconfont"
                  :class="item.icon"
                />
                <span>{{ item.name }}</span>
              </a>
            </li>
          </draggable>
        </div>
      </el-card>
    </el-aside>

    <el-main
      class="container-border"
      style="padding:0"
    >
      <el-card class="box-card">
        <div
          slot="header"
          class="clearfix"
        >
          <span>表单页面</span>
          <div style="display:inline;float:right;height:20px">
            <el-button
              icon="iconfont iconqingkong"
              style="margin-left:10px"
              type="text"
              @click="clearForm"
            > 清空</el-button>
            <el-button
              icon="iconfont iconyulan"
              style="margin-left:10px"
              type="text"
              @click="handlePreview"
            > 预览</el-button>
            <el-button
              icon="iconfont iconjson"
              style="margin-left:10px"
              type="text"
              @click="showJSON"
            > JSON数据</el-button>
            <el-button
              icon="iconfont iconbaocun"
              type="text"
            > 保存</el-button>
          </div>
        </div>
        <create-form
          :data="widgetForm"
          :select.sync="widgetFormSelect"
        />
      </el-card>
    </el-main>
    <rezise-width
      direction="left"
      :max="800"
      :min="300"
      :width="rightWidth"
      @change="getWidth"
    />
    <el-aside
      class="container-border"
      :width="rightWidth+'px'"
    >
      <el-card class="box-card">
        <div
          slot="header"
          class="clearfix"
        >
          <span>页面属性</span>
          <!-- <el-button
            size="mini"
            style="float: right; padding: 3px 0"
            type="text"
          >保存属性<i class="el-icon-plus el-icon--right" /></el-button> -->
        </div>
        <widget-config
          v-if="widgetFormSelect&&widgetFormSelect.key"
          :data="widgetFormSelect"
        />

      </el-card>
    </el-aside>
    <my-form
      v-if="previewVisible"
      ref="generateForm"
      :data="widgetForm"
      insite="true"
      @close="previewVisible=false"
    />
    <el-dialog
      title="表单数据"
      :visible.sync="jsonVisible"
    >
      <my-ace
        v-if="jsonVisible"
        :code="widgetForm"
      />
    </el-dialog>
  </el-container>
</template>
<script>
import MyAce from '@/components/myAce'
import ReziseWidth from '@/components/ReziseWidth'
import MyForm from './myForm'
import CreateForm from './createForm'
import Draggable from 'vuedraggable'
import WidgetConfig from './WidgetConfig'
import { basicComponents, layoutComponents } from './componentConfig'
export default {
  components: {
    MyAce,
    Draggable,
    CreateForm,
    WidgetConfig,
    MyForm,
    ReziseWidth
  },
  data () {
    return {
      leftWidth: 300,
      rightWidth: 300,
      copy_rightWidth: 0,
      widgetFormSelect: null,
      jsonVisible: false,
      previewVisible: false,
      widgetForm: {
        list: [],
        config: {
          labelWidth: 100,
          labelPosition: 'right',
          size: 'small'
        }
      },
      basicComponents,
      layoutComponents
    }
  },

  methods: {
    rightHideOrShow () {
      if (this.rightWidth > 0) {
        this.copy_rightWidth = this.rightWidth
        this.rightWidth = 0
      } else {
        this.rightWidth = this.copy_rightWidth || 300
      }
    },
    getWidth (value) {
      this.rightWidth = value
    },
    showJSON () {
      this.jsonVisible = true
    },
    handlePreview () {
      this.previewVisible = true
    },
    clearForm () {
      this.widgetForm = {
        list: [],
        config: {
          labelWidth: 100,
          labelPosition: 'right',
          size: 'small',
          customClass: ''
        }
      }
      this.widgetFormSelect = {}
    },
    handleMoveEnd (evt) {
      console.log('end', evt)
    },
    handleMoveStart ({ oldIndex }) {
      console.log('start', oldIndex, this.basicComponents)
    },
    handleMove () {
      return true
    },
    removeForm (type, index) {
      this.$confirm('此操作将永久删除该表单?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        type.formList.splice(index, 1)
      })
    },
    closeDialog () {
    },
    saveSuccess (data) {

    }
  }
}
</script>
<style lang="scss" >
.container-border {
  border: solid 1px #e6e6e6;
  background: #fff;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.box-card {
  height: calc(100% - 2px);
}
.component-content {
  position: relative;
  overflow: hidden;
  padding: 0 10px 10px;
  margin: 0;
}
.component-content li {
  font-size: 12px;
  display: block;
  width: 46%;
  line-height: 26px;
  position: relative;
  float: left;
  left: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 1%;
  color: #333;
  border: 1px solid #f4f6fc;
}
.component-content li:hover {
  color: #409eff;
  border: 1px dashed #409eff;
}
.component-content li a {
  display: block;
  cursor: move;
  background: #f4f6fc;
  border: 1px solid #f4f6fc;
}
.component-content li a i {
  margin-right: 6px;
  margin-left: 8px;
  font-size: 20px;
  display: inline-block;
  vertical-align: middle;
}
.component-content li a span {
  display: inline-block;
  vertical-align: middle;
}
.el-card-clear-padding .el-card .el-card__body {
  padding: 0px;
}
.btn-shrink {
  position: absolute;
  display: inline;
  background-color: #409eff;
  font-size: 16px;
  color: #fff;
  line-height: 20px;
  text-align: center;
}
</style>
