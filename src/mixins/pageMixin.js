/*
 * @Author: kangxl
 * @Date: 2020-02-25 14:18:29
 * @LastEditors: guanzhenhua
 * @LastEditTime: 2021-01-13 13:44:01
 * @Description: table分页混合
 * minix之外的参数：
 * pageConfig
*     height // table之外的高度
      queryRequest // 查询列表接口API Function
      queryCallBack // 查询成功回调函数 Function
      deleteRequest// 删除接口API Function
      deleteCallBack // 删除成功回调函数 Function
      conditions // 查询条件 Object
 */
var mixin = {
  data () {
    return {
      mixinPage: {
        isAutoLoad: true, // 是否自动加载-在createzhong 执行查询炒作
        height: 400, // 计算table高度
        list: [], // 列表数据
        pageSize: 20, // this.PAGESIZE, // 每页条数
        pageIndex: 1, // 第几页
        total: 0, // 一页多少条
        isLoading: false, // 是否加载中
        isLoadOver: false // 是否加重完成
      },
      _mixin_timer: false // 重新计算table高度标志，不能频繁计算
    }
  },
  created () {
    if (this.mixinPage.isAutoLoad) {
      this.mixin_page_getList()
    }
    this.setTableHeight()
  },
  beforeDestroy () {
    window.onresize = null
  },
  mounted () {
    if (this.pageConfig.height) {
      window.onresize = () => {
        this.setTableHeight()
      }
    }
  },
  methods: {
    setTableHeight () { // 设置table高度
      if (!this._mixin_timer) {
        let h = window.innerHeight - this.pageConfig.height || 100
        if (h < 300) { // 最小300
          this.mixinPage.height = 300
        } else {
          this.mixinPage.height = h
        }
        this._mixin_timer = true
        const that = this
        setTimeout(function () { // 延迟执行
          that._mixin_timer = false
        }, 400)
      }
    },
    /**
     * 删除行数据
     * @param {*} item
     * @param {*} $event
     * @param {*} config
     */
    mixin_page_deleteRowData (item, $event, config = {}) {
      if (this.pageConfig.deleteRequest) {
        $event.target.parentElement.blur()
        this.$confirm(config.msg || '是否要删除该数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.pageConfig.deleteRequest(item).then(rep => {
            this.mixin_page_getList()
            if (this.pageConfig.deleteCallBack) {
              this.pageConfig.deleteCallBack(item)
            }
          })
        }).catch(() => {
        })
      }
    },
    /**
     * 翻页
     * @param {*} val
     */
    mixin_page_currentChange (val) {
      this.mixin_page_getList()
    },
    /**
     * 重新查询数据
     */
    mixin_page_seachList () {
      this.mixinPage.list = []
      this.mixinPage.pageIndex = 1
      this.mixinPage.total = 0
      this.mixin_page_getList()
    },
    /**
     * 分页查询mixin方法
     */
    mixin_page_getList () {
      if (this.mixinPage.isLoading) { // 处于加载中不能再加载
        return false
      }
      this.mixinPage.isLoading = true
      var data = {
        ...this.pageConfig.conditions,
        pageSize: this.mixinPage.pageSize,
        pageIndex: this.mixinPage.pageIndex
      }
      this.pageConfig.queryRequest(data).then(res => {
        var d = res.data || {}
        this.mixinPage.list = Array.isArray(d) ? d : (d.list || [])
        this.mixinPage.total = d.total || 0
        this.mixinPage.isLoading = false
        if (this.pageConfig.queryCallBack) {
          this.pageConfig.queryCallBack(d)
        }
      }).catch((e) => {
        this.mixinPage.isLoading = false
      })
    }
  }
}
export default mixin

