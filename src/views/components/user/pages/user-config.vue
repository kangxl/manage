<template>
  <div>
    <el-form
      label-position="top"
      :model="form"
    >
      <el-form-item label="查询字段">
        <draggable
          v-bind="{group:{ name:'options'}, ghostClass: 'ghost',handle: '.drag-item'}"
          handle=".drag-item"
          :list="form.searchList"
          style="margin: 0;padding: 0;"
          tag="ul"
          @change="formChange"
        >
          <li
            v-for="(item, index) in form.searchList"
            :key="index"
          >
            <el-select
              v-model="item.prop"
              filterable
              placeholder="请选择"
              size="mini"
              style="width:100px;"
              @change="formChange"
            >
              <el-option
                v-for="f in getFieldList('search',item.prop)"
                :key="f.prop"
                :label="f.name"
                :value="f.prop"
                @click.native="fieldChange('search',f,index)"
              />
            </el-select>
            <el-input
              v-model="item.name"
              size="mini"
              style="padding-left:5px;width:100px;"
              @change="formChange"
            />
            <el-button
              circle
              class="drag-item"
              icon="el-icon-rank"
              plain
              size="mini"
              style="padding: 4px;margin-left: 5px;"
              @change="formChange"
            />
            <el-button
              circle
              icon="el-icon-minus"
              plain
              size="mini"
              style="padding: 4px;margin-left: 5px;"
              type="danger"
              @change="formChange"
              @click="removeField('search',index)"
            />

          </li>
        </draggable>
        <div>
          <el-button
            type="text"
            @click="addField('search')"
          >添加新的查询条件</el-button>
        </div>
      </el-form-item>
      <el-form-item label="搜索区操作按钮">
        <el-checkbox-group
          v-model="form.searchHandleList"
          @change="formChange"
        >
          <el-checkbox label="add">添加用户</el-checkbox>
          <el-checkbox label="upload">上传</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="列表字段">
        <draggable
          v-bind="{group:{ name:'options'}, ghostClass: 'ghost',handle: '.drag-item'}"
          handle=".drag-item"
          :list="form.columnList"
          style="margin: 0;padding: 0;"
          tag="ul"
        >
          <li
            v-for="(item, index) in form.columnList"
            :key="index"
          >
            <el-input
              v-model="item.albel"
              size="mini"
              style="padding-left:5px;width:100px;"
            />
            <el-input
              v-model="item.value"
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
              @change="formChange"
            />
            <el-button
              circle
              icon="el-icon-minus"
              plain
              size="mini"
              style="padding: 4px;margin-left: 5px;"
              type="danger"
              @change="formChange"
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
      <el-form-item label="分页配置">
        <el-checkbox-group
          v-model="form.pageLayout"
          @change="formChange"
        >
          <el-checkbox label="total">总页数显示</el-checkbox>
          <el-checkbox label="sizes">每页个数选择</el-checkbox>
          <el-checkbox label="jumper">指定跳转页码</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="备注">
        <el-input
          v-model="form.desc"
          placeholder="请输入内容"
          :rows="2"
          type="textarea"
        />
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import Draggable from 'vuedraggable'
export default {
  components: {
    Draggable
  },
  data () {
    return {
      form: {
        searchList: [],
        searchHandleList: [],
        columnList: [],
        pageLayout: [],
        desc: ''
      },
      searchFieldList: [{ prop: 'a1', name: '字段1' }, { prop: 'a2', name: '字段2' }, { prop: 'a3', name: '字段3' }, { prop: 'a4', name: '字段4' }, { prop: 'a5', name: '字段5' }],
      columnFieldList: [
        // { prop: 'date', name: '日期' },
        // { prop: 'name', name: '姓名' },
        { prop: 'sex', name: '性别' },
        { prop: 'age', name: '年龄' },
        { prop: 'email', name: '邮箱' },
        { prop: 'monet', name: '存款' },
        { prop: 'status', name: '婚姻状态' },
        { prop: 'address', name: '地址' }
      ]
    }
  },
  computed: {
    getFieldList () {
      return (type, prop) => {
        let ids = [], selectList = [], allList = []
        if (type == 'search') {
          selectList = this.form.searchList
          allList = this.searchFieldList
        } else if (type == 'column') {
          selectList = this.form.columnList
          allList = this.columnFieldList
        }
        for (var i = 0; i < selectList.length; i++) {
          if (selectList[i].prop != prop) {
            ids.push(selectList[i].prop)
          }
        }
        return allList.filter(function (item) {
          if (ids.indexOf(item.prop) < 0) {
            return true
          }
          return false
        })
      }
    }
  },
  methods: {
    closeDialog () {
      this.$emit('close')
    },
    fieldChange (type, item, index) {
      if (type == 'search') {
        this.$set(this.form.searchList[index], 'name', item.name)
      } else if (type == 'column') {
        this.$set(this.form.columnList[index], 'name', item.name)
      }
    },
    addField (type) {
      if (type == 'search') {
        this.form.searchList.push({ prop: '', name: '' })
      } else if (type == 'column') {
        this.form.columnList.push({ prop: '', name: '' })
      }
    },
    removeField (type, index) {
      if (type == 'search') {
        this.form.searchList.splice(index, 1)
      } else if (type == 'column') {
        this.form.columnList.splice(index, 1)
      }
    },
    formChange () {
      this.$myEvent.$emit('form-change', this.form)
    }
  }
}
</script>
<style scope>
</style>
