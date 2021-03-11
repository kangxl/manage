<template>
  <el-header class="system-header navbar">
    <div class="systemLogo">
      <h3>管理系统</h3>
    </div>
    <div class="menu-content">
      <slot name="menu" />
    </div>
    <div class="right-menu">
      <screenfull
        id="screenfull"
        class="right-menu-item hover-effect"
      />
      <el-tooltip
        content="日历"
        effect="dark"
        placement="bottom"
      >
        <i class="iconfont iconricheng right-menu-item top-icon" />
      </el-tooltip>
      <el-tooltip
        content="消息"
        effect="dark"
        placement="bottom"
      >
        <el-badge
          class="myBadge right-menu-item "
          value="12"
        >
          <i class="iconfont iconxiaoxi right-menu-item top-icon" />
        </el-badge>
      </el-tooltip>
      <el-tooltip
        content="设置"
        effect="dark"
        placement="bottom"
      >
        <i
          class="iconfont iconshezhi right-menu-item top-icon"
          @click="isShowDrawer=true"
        />
      </el-tooltip>

      <el-tooltip
        content="字体大小"
        effect="dark"
        placement="bottom"
      >
        <i class="iconfont iconziti right-menu-item top-icon" />
      </el-tooltip>
      <el-dropdown
        class="avatar-container right-menu-item hover-effect"
        trigger="click"
      >
        <div class="avatar-wrapper">
          <img
            class="user-avatar"
            src="@/images/pic-boy.jpg"
          >
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">

          <router-link
            tag="li"
            to="/profile/index"
          >
            <el-dropdown-item>个人信息</el-dropdown-item>
          </router-link>
          <el-dropdown-item
            divided
            @click.native="logout"
          >
            <span style="display:block;">修改密码</span>
          </el-dropdown-item>
          <el-dropdown-item
            divided
            @click.native="logout"
          >
            <span style="display:block;">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <setting :is-show-drawer.sync="isShowDrawer" />
  </el-header>
</template>

<script>

import Screenfull from '@/components/Screenfull'
import Setting from './setting'
export default {
  components: {
    Screenfull,
    Setting
  },
  data () {
    return {
      isShowDrawer: false
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.system-header {
  display: -webkit-box;
  padding: 0;
  width: 100%;
  z-index: 3;
  position: fixed;
}
.navbar {
  height: 60px;
  overflow: hidden;
  background: #284042;
  color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  .menu-content {
    flex: 1;
    text-align: center;
    -webkit-box-flex: 1;
  }
  .systemLogo {
    margin: 0 15px;
  }
  .right-menu {
    float: right;
    height: 100%;
    line-height: 60px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;
      color: inherit;
      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
.top-icon {
  font-size: 25px !important;
  position: relative;
}
</style>
