<template>
  <div
    style="position: relative;
    z-index: 2;
    width: 5px;
    height:100%;
    cursor: col-resize;
    border-left: 1px solid rgba(255,255,255,0.05);
    border-right: 1px solid rgba(0,0,0,0.4);
    background: rgb(216, 216, 216);"
  />
</template>
<script>
export default {
  props: {
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 0
    },
    width: {
      type: Number,
      default: 0
    },
    direction: {
      type: String,
      default: 'right'
    }
  },
  data () {
    return {
      isMoving: false,
      realWidth: this.width,
      x: 0
    }
  },
  mounted() {
    this.$el.onmousedown = (event) => {
      if (document.body.className.indexOf('disabled-select-text') < 0) {
        document.body.className = document.body.className + ' disabled-select-text'
      }
      this.isMoving = true
      this.x = event.x
      document.onmouseover = document.onmousemove = (event) => {
        if (this.isMoving) {
          let diffWidth = event.x - this.x
          this.x = event.x
          let width = 0
          if (this.direction == 'right') {
            width = this.realWidth + diffWidth
          } else {
            width = this.realWidth - diffWidth
          }
          if (width < this.min) {
            width = this.min
          }
          if (this.max > 0 && width > this.max) {
            width = this.max
          }
          this.realWidth = width
          this.$emit('change', width)
        }
      }
      document.onmouseup = (event) => {
        this.isMoving = false
        document.onmousemove = null
        document.onmouseup = null
        document.onmouseover = null
        document.body.className = document.body.className.replace('disabled-select-text', '').trim()
      }
    }
  },
  methods: {

  }
}
</script>
<style scope>

</style>
