/*
 * @Author: kangxl
 * @Date: 2020-11-11 09:38:37
 * @LastEditors: kangxl
 * @LastEditTime: 2020-11-12 10:42:15
 * @Description:
 */
var mixin = {
  data () {
    return {
      moreColumnConfig: {
        domId: '', // el-table的id
        list: [], // table列数据
        indexWidth: 0, // 前置列的宽度
        columnWidth: 100, // 字段相同宽度
        leftNum: 0, // 左侧偏移数量
        contentNum: 20, // 显示区域数量
        rightNum: 0// 右侧偏移数量
      }
    }
  },
  computed: {
    propList () {
      return this.moreColumnConfig.list.list.slice(this.moreColumnConfig.leftNum, this.moreColumnConfig.leftNum + this.moreColumnConfig.contentNum)
    },
    leftWidth () {
      return this.moreColumnConfig.leftNum * this.moreColumnConfig.columnWidth + (this.moreColumnConfig.leftNum ? this.moreColumnConfig.indexWidth : 0)
    },
    rightWidth () {
      return this.moreColumnConfig.rightNum * this.moreColumnConfig.columnWidth
    }
  },
  mounted () {
    var table = document.getElementById(this.moreColumnConfig.domId)
    var scrollContent = table.getElementsByClassName('el-table__body-wrapper')[0]
    this.getPaddingNum(table, scrollContent)
    scrollContent.addEventListener('scroll', (e) => {
      this.getPaddingNum(table, scrollContent)
    })
    this.moreColumnConfig.contentNum = parseInt(table.offsetWidth / this.moreColumnConfig.columnWidth) + 2
    window.onresize = () => {
      this.$nextTick(() => {
        this.moreColumnConfig.contentNum = parseInt(table.offsetWidth / this.moreColumnConfig.columnWidth) + 2
      })
    }
  },
  beforeDestroy () {
    window.onresize = null
  },
  methods: {
    getPaddingNum (table, scrollContent) { // 获取偏移数量
      this.$nextTick(() => {
        let left = scrollContent.scrollLeft
        if (left > this.moreColumnConfig.columnWidth + this.moreColumnConfig.indexWidth) {
          this.moreColumnConfig.leftNum = parseInt((left - this.moreColumnConfig.indexWidth) / this.moreColumnConfig.columnWidth)
        } else {
          this.moreColumnConfig.leftNum = 0
        }
        let maxLeft = this.moreColumnConfig.list.list.length - this.moreColumnConfig.contentNum
        if (this.moreColumnConfig.leftNum > maxLeft) {
          this.moreColumnConfig.leftNum = maxLeft
        }
        this.moreColumnConfig.rightNum = this.moreColumnConfig.list.list.length - this.moreColumnConfig.contentNum - this.moreColumnConfig.leftNum
      })
    }
  }
}
export default mixin

