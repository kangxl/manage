<template>
  <div>
    <el-form
      class="myPageSearchForm"
      :inline="true"
      :model="form"
    >
      <el-form-item label="日期">
        <el-input
          v-model="form.date"
        />
      </el-form-item>
      <el-form-item label="姓名">
        <el-input
          v-model="form.name"
        />
      </el-form-item>
      <el-form-item
        v-for=" f in searchList"
        :key="f.prop"
        :label="f.name"
      >
        <el-input
          v-model="form[f.prop]"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="search"
        >查询</el-button>
      </el-form-item>
      <el-form-item
        class="myPageSearchBtn"
      >
        <el-button
          v-if="searchHandleList.indexOf('add')>-1"
          size="mini"
          type="primary"
        >添加用户<i class="el-icon-plus el-icon--right" /></el-button>
        <el-button
          v-if="searchHandleList.indexOf('upload')>-1"
          size="mini"
          type="primary"
        >上传<i class="el-icon-upload el-icon--right" /></el-button>
      </el-form-item>
    </el-form>

    <el-table
      border
      :data="tableList"
      style="width: 100%"
    >
      <el-table-column
        label="日期"
        prop="date"
        show-overflow-tooltip
        width="180"
      />
      <el-table-column
        label="姓名"
        prop="name"
        show-overflow-tooltip
        width="180"
      />
      <el-table-column
        v-for="c in columnList"
        :key="c.prop"
        :label="c.name"
        :prop="c.prop"
        show-overflow-tooltip
        width="180"
      />

    </el-table>
    <div class="text-center">
      <el-pagination
        :layout="pageLayout"
        :page-size="10"
        :page-sizes="[10, 20, 30, 50]"
        :total="400"
      />
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      form: { date: '', name: '' },
      searchList: [],
      columnList: [],
      searchHandleList: '',
      pageLayout: 'prev, pager, next',
      tableList: [{ date: '2020-12-01', name: '张三', age: 21, email: '1234@163.com', status: '未婚', money: '100W', address: '江苏苏州昆山工业技术研究院' }]
    }
  },
  mounted() {
    this.$myEvent.$on('form-change', (data) => {
      this.searchList = data.searchList
      this.columnList = data.columnList
      this.searchHandleList = data.searchHandleList
      var str = 'prev, pager, next'
      if (data.pageLayout.indexOf('sizes') > -1) {
        str = 'sizes,' + str
      }
      if (data.pageLayout.indexOf('total') > -1) {
        str = 'total,' + str
      }

      if (data.pageLayout.indexOf('jumper') > -1) {
        str = str + ',jumper'
      }
      this.pageLayout = str
      console.log(this.pageLayout)
    })
  },
  beforeDestroy() {
    this.$myEvent.$off('form-change')
  },
  methods: {
    search() {
      console.log(this.form)
    }
  }
}
</script>
<style scope>

</style>
