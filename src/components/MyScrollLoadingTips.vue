<!--
 * @Author: kangxl
 * @Date: 2019-08-12 16:28:50
 * @LastEditors: kangxl
 * @LastEditTime: 2020-03-09 15:56:52
 * @Description: 加载完成提示
 -->
<template>
  <div
    v-if="isLoading"
    :class="['el-alert',{ 'el-alert--success':isLoading,'el-alert--info':isLoadOver },'is-center','scrolling-loading-tips','is-dark']"
    role="alert"
  >
    <i :class="['el-alert__icon',{'el-icon-info':isLoadOver,'el-icon-loading':isLoading && !isLoadOver}]" />
    <div class="el-alert__content">
      <span
        v-if="isLoading && !isLoadOver"
        class="el-alert__title"
      >数据加载中...</span>
      <span
        v-if="isLoadOver"
        class="el-alert__title"
      >没有能加载的数据了</span>
      <i
        v-if="isLoadOver"
        class="el-alert__closebtn el-icon-close"
        @click="closeAlert"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: 'MyScrollLoadingTips',
  data () {
    return {
      isLoadOver: false,
      isLoading: false
    }
  },
  methods: {
    start () { // 开始加载
      this.isLoading = true
      this.isLoadOver = false
    },
    complete () { // 加载完成
      this.isLoading = false
    },
    end (time) { // 不能在加载
      this.isLoading = true
      this.isLoadOver = true
      setTimeout(() => {
        this.isLoading = false
      }, time | 2000)
    },
    closeAlert () {
      this.isLoading = false
    }
  }
}
</script>
<style>
.scrolling-loading-tips {
  height: 50px;
  position: relative;
  height: 50px;
  top: -90px;
  left: 0px;
  right: 0px;
  bottom: 0px;
}
</style>
