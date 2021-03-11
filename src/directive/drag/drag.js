export default {
  bind(el, binding, vnode) {
    var moveDom = el
    var maxWidth = el.getAttribute('drag-width')
    var maxheight = el.getAttribute('drag-height')
    var dragData = el.getAttribute('drag-data')
    var isDrag = el.getAttribute('drag-permission')
    if (!isDrag) {
      return false
    }
    el.style.cursor = 'move'
    var startX = 0
    var startY = 0
    var x = 0
    var y = 0

    moveDom.onmousedown = (event) => {
      x = el.offsetLeft
      y = el.offsetTop
      startX = event.pageX - x
      startY = event.pageY - y
      document.onmousemove = mousemove
      document.onmouseup = mouseup
      document.onmouseover = mousemove
    }

    function mousemove(event) {
      y = event.pageY - startY
      x = event.pageX - startX
      if (y > maxheight) {
        y = maxheight
      }
      if (x > maxWidth) {
        x = maxWidth
      }
      el.style.top = (y > 0 ? y : 0) + 'px'
      el.style.left = (x > 0 ? x : 0) + 'px'
    }

    function mouseup() {
      binding.value({ x, y, data: dragData })
      document.onmousemove = null
      document.onmouseup = null
      document.onmouseover = null
    }
  }
}
