<!--
 * @Author: ztt
 * @Date: 2020-04-16 11:03:45
 * @LastEditors: ztt
 * @LastEditTime: 2020-05-07 15:28:55
 * @Description: 拖拽缩放组件
  传入
 -->
<template>
  <div class="move-container">
    <div
      :class="className"
      :style="itemStyle"
      @mousedown.stop="moveHandle"
    >
      <div
        v-if="!isDisable&&isRight"
        class="handle handle-mr"
        @mousedown="scaleHandle('right')"
      />
      <div
        v-if="!isDisable&&isLeft"
        class="handle handle-ml"
        @mousedown="scaleHandle('left')"
      />
    </div>
    <div
      v-if="showDragShadow"
      :style="itemShadowStyle"
    />
  </div>
</template>
<script>

export default {
  name: 'MyDrayResize',
  props: {
    containerWidth: {
      type: Number,
      default: 500
    }, // 必填，容器宽度,单位px
    isDisable: {
      type: Boolean,
      default: false
    }, // 必填，元素上是否有点击事件
    isLeft: {
      type: Boolean,
      default: true
    },
    isRight: {
      type: Boolean,
      default: true
    },
    isDrag: { // 是否可拖动
      type: Boolean,
      default: true
    },
    className: {
      type: String,
      required: true
    }, // 移动元素的类名，页面有多个移动元素时必填，每个名称不能一样
    limit: { // 小于边界不能拖拽
      type: Number,
      default: 0
    },
    showDragShadow: {
      type: Boolean,
      default: false
    }, // 刚进入页面是否显示阴影
    itemStyle: {
      type: Object,
      default: () => {
        return {
          width: '100px',
          height: '20px',
          background: '#5bc0de',
          left: '50px',
          top: '5px',
          position: 'absolute',
          'border-radius': '2px',
          'margin-top': '5px',
          'z-index': 1
        }
      }
    },
    itemShadowStyle: {
      type: Object,
      default: () => {
        return {
          width: '100px',
          height: '30px',
          background: '#cdecf5',
          left: '50px',
          top: '5px',
          position: 'absolute',
          'border-radius': '2px',
          'margin-top': '0px'
        }
      }
    }
  },
  data () {
    return {
      isScale: false, // 是否为为缩放操作
      direction: null // 拉伸方向
    }
  },
  computed: {
  },
  created () {

  },
  methods: {
    scaleHandle (direction) {
      this.isScale = true
      this.direction = direction
    },
    moveHandle (e) {
      if (!this.isDisable) {
        this.showDragShadow = true
        const oldDiv = document.querySelector(`.${this.className}`) // 获取目标元素
        const oldDivWidth = oldDiv.offsetWidth // 水平方向 width
        const oldDivLeft = oldDiv.offsetLeft // left 值
        const mouseX = e.clientX // 鼠标指针向对于浏览器页面（或客户区）的水平坐标
        const disX = mouseX - oldDiv.offsetLeft // 算出鼠标相对元素的位置
        document.onmousemove = (e) => { // 鼠标按下并移动的事件
          let left = e.clientX - disX // 当前移动元素距离左边长度
          if (this.limit && left < this.limit) {
            left = this.limit
          }
          if (!this.isScale) {
            if (this.isDrag) {
              this.dealDrag(e, left, oldDiv, oldDivWidth)
            }
          } else {
            this.dealScale(e, left, oldDiv, oldDivWidth, oldDivLeft, mouseX)
          }
        }

        document.onmouseup = (e) => {
          if (oldDiv.offsetLeft != oldDivLeft || oldDivWidth != oldDiv.offsetWidth) {
            this.$emit('saveData', {
              className: this.className,
              left: parseInt(oldDiv.style.left),
              width: parseInt(oldDiv.style.width),
              oldLeft: parseInt(oldDivLeft),
              oldWidth: parseInt(oldDivWidth)
            })
          }

          document.onmousemove = null
          document.onmouseup = null
          this.isScale = false
        }
      }
    },
    dealScale (e, left, oldDiv, oldDivWidth, oldDivLeft, mouseX) {
      if (this.direction === 'right') {
        let width = oldDivWidth + e.clientX - mouseX
        if (width > this.containerWidth - oldDivLeft) {
          width = this.containerWidth - oldDivLeft
        }
        oldDiv.style.width = width + 'px'
      } else {
        let width = oldDivWidth - e.clientX + mouseX
        if (width >= oldDivLeft + oldDivWidth) {
          width = oldDivLeft + oldDivWidth
        }
        oldDiv.style.width = width + 'px'
        if (left < 0) {
          left = 0
        }
        if (left > oldDivLeft + oldDivWidth) {
          left = oldDivLeft + oldDivWidth
        }
        oldDiv.style.left = left + 'px'
      }
    },
    dealDrag (e, left, oldDiv, oldDivWidth) {
      if (left < 0) {
        left = 0
      }
      if (left > this.containerWidth - oldDivWidth) {
        left = this.containerWidth - oldDivWidth
      }
      oldDiv.style.left = left + 'px'
    }
  }
}
</script>
<style scoped>
.handle-ml {
  top: 50%;
  margin-top: -5px;
  left: -10px;
  cursor: w-resize;
}
.handle-mr {
  top: 50%;
  margin-top: -5px;
  right: -10px;
  cursor: e-resize;
}
.handle {
  box-sizing: border-box;
  position: absolute;
  width: 2px;
  height: 10px;
  background: #eee;
  border: 1px solid #333;
  display: block;
}
.disable {
  pointer-events: none;
}
</style>
