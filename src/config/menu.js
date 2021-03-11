/*
 * @Author: kangxl
 * @Date: 2019-09-29 15:08:46
 * @LastEditors: guan zhenhua
 * @LastEditTime: 2020-08-11 10:34:00
 * @Description: 资源菜单数据
 */
import { system } from '@/utils/request'
/**
 * sysName 系统英文简称
 * name 菜单名称
 * short 简称
 * icon 图标
 * authCode 权限码
 * path 前段路由地址
 * level 1是一级菜单代表系统 2二级菜单代表top菜单 3三级菜单代表右侧菜单 以此类推
 */
export var systemData = { // 各个系统权限码
  pet: {
    sysName: system.pet, isShow: true, authCode: '100', name: '宠物管理', level: 1, icon: '<i class="fa fa-github-alt"></i>', path: '',
    children: [
      {
        authCode: '101', name: '宠物', short: '', level: 3, path: '/pet/main/petList'
      },
      {
        authCode: '102', name: '品种', short: '', level: 3, path: '/pet/main/varietiesList'
      }
    ]
  },
  mall: {
    sysName: system.mall, isShow: true, authCode: '200', name: '商城管理', level: 1, icon: '<i class="fa fa-shopping-bag"></i>', path: '',
    children: [
      {
        authCode: '201', name: '商品管理', short: '', level: 3, path: '/mall/goodsList'
      }
    ]
  },
  order: {
    sysName: system.order, isShow: true, authCode: '300', name: '订单管理', level: 1, icon: '<i class="fa fa-file-text"></i>', path: '',
    children: [
      {
        authCode: '301', name: '宠物订单', short: '', level: 3, path: '/order/main/petOrderList'
      },
      {
        authCode: '302', name: '商城订单', short: '', level: 3, path: '/order/main/mallOrderList'
      },
      {
        authCode: '303', name: '宠物退款', short: '', level: 3, path: '/order/main/petRefundList'
      },
      {
        authCode: '304', name: '商城退款', short: '', level: 3, path: '/order/main/mallRefundList'
      },
      {
        authCode: '305', name: '退款原因', short: '', level: 3, path: '/order/main/refundReasonList'
      },
      {
        authCode: '306', name: '评价', short: '', level: 3, path: '/order/main/evaluateList'
      }
    ]
  },
  userManage: {
    sysName: system.userManage, isShow: true, authCode: '400', name: '用户管理', level: 1, icon: '<i class="fa  fa-user"></i>', path: '',
    children: [
      {
        authCode: '401', name: '用户列表', short: '', level: 3, path: '/userManage/main/userList'
      },
      {
        authCode: '402', name: '玲珑币', short: '', level: 3, path: '/userManage/main/coin'
      }
    ]
  },
  store: {
    sysName: system.store, isShow: true, authCode: '500', name: '店铺管理', level: 1, icon: '<i class="fa  fa-shopping-cart"></i>', path: '',
    children: [
      {
        authCode: '501', name: '店铺列表', short: '', level: 3, path: '/store/main/storeList'
      },
      {
        authCode: '502', name: '店铺认证', short: '', level: 3, path: '/store/main/storeCert'
      }
    ]
  },
  promotion: {
    sysName: system.promotion, isShow: true, authCode: '600', name: '促销管理', level: 1, icon: '<i class="fa fa-tags"></i>', path: '',
    children: [
      {
        authCode: '601', name: '优惠券', short: '', level: 3, path: '/promotion/main/couponList'
      },
      {
        authCode: '602', name: '页面推荐', short: '', level: 3, path: '/promotion/main/recommendStoreList'
      }
    ]
  },
  operation: {
    sysName: system.operation, isShow: true, authCode: '700', name: '运营管理', level: 1, icon: '<i class="fa fa-recycle"></i>', path: '',
    children: [
      {
        authCode: '701', name: '消息管理', short: '', level: 3, path: '/operation/main/newsList'
      }, {
        authCode: '702', name: '图片管理', short: '', level: 3, path: '/operation/main/picManage'
      }
    ]
  },
  content: {
    sysName: system.content, isShow: true, authCode: '800', name: '内容管理', level: 1, icon: '<i class="fa fa-sticky-note"></i>', path: '',
    children: [
      {
        authCode: '801', name: '帮助与协议', short: '', level: 3, path: '/content/main/agreementList'
      }, {
        authCode: '802', name: '举报管理', short: '', level: 3, path: '/content/main/reportList'
      }, {
        authCode: '803', name: '帮助反馈', short: '', level: 3, path: '/content/main/feedbackList'
      }
    ]
  },
  finance: {
    sysName: system.finance, isShow: true, authCode: '900', name: '财务管理', level: 1, icon: '<i class="fa fa-money"></i>', path: '',
    children: [
      {
        authCode: '901', name: '卖家资金账户', short: '', level: 3, path: '/finance/main/fundAccountList'
      },
      // {
      //   authCode: '902', name: '卖家提现申请', short: '', level: 3, path: '/finance/main/withdrawalList'
      // },
      {
        authCode: '903', name: '收入订单', short: '', level: 3, path: '/finance/main/incomeList'
      }
    ]
  },
  socialContact: {
    sysName: system.socialContact, isShow: true, authCode: '1000', name: '社交管理', level: 1, icon: '<i class="fa fa-users"></i>', path: '',
    children: [
      {
        authCode: '1001', name: '玲珑圈', short: '', level: 3, path: '/socialContact/main/lingLongList'
      },
      {
        authCode: '1002', name: '消息响应', short: '', level: 3, path: '/socialContact/main/messagResponse'
      },
      {
        authCode: '1003', name: '历史消息', short: '', level: 3, path: '/socialContact/main/historyMessageList'
      }
    ]
  },
  setManage: {
    sysName: system.setManage, isShow: true, authCode: '1100', name: '设置管理', level: 1, icon: '<i class="fa  fa-cog"></i>', path: '',
    children: [
      {
        authCode: '1101', name: '平台信息', short: '', level: 3, path: '/setManage/main/plantformInfo'
      }
    ]
  },
  authManage: {
    sysName: system.authManage, isShow: true, authCode: '1200', name: '权限管理', level: 1, icon: '<i class="fa  fa-key"></i>', path: '',
    children: [
      {
        authCode: '1201', name: '角色管理', short: '', level: 3, path: '/authManage/main/roleList'
      }, {
        authCode: '1202', name: '成员管理', short: '', level: 3, path: '/authManage/main/memberList'
      }, {
        authCode: '1203', name: '操作日志', short: '', level: 3, path: '/authManage/main/operationLogList'
      }
    ]
  }
}

