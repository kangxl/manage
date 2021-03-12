class MenuItem {
  constructor(opt) {
    this.text = opt.text
    this.icon = opt.icon
    this.role = opt.role
    this.clickHandle = opt.clickHandle
    this.init()
  }

  init () {
    const li = document.createElement('li')
    li.className = 'fy_contextMenu_item'
    li.dataset.role = this.role
    li.innerHTML = `<i class="${this.icon}"></i><span>${this.text}</span>`
    this.el = li
    this.el.onclick = (e) => {
      e.stopPropagation()
      hide()
      callBack(this)
    }
  }
  getEl () {
    return this.el
  }
}

// 右键菜单栏容器
let ul = null
// 回调事件
let callBack = null

/**
 * @description 隐藏右键菜单
 */
function hide () {
  ul.style.display = 'none'
  // document.getElementById("ul_contextMenu_container").style.display = 'none'
}

/**
 * @description 生成分割线菜单项
 */
function generateMenuDivideLine () {
  const divide = document.createElement('div')
  divide.style.cssText = 'height:1px;background:#efefef;'
  ul.appendChild(divide)
}

/**
 * @description 生成单个菜单项并插入右键菜单中
 * @param {object} opt
 */
function generateMenuItem (opt) {
  const item = new MenuItem(opt)
  ul.appendChild(item.getEl())
}

/**
 * @description 生成菜单项
 */
function generateMenuItemsBycurrentComponent (config) {
  ul.innerHTML = ''
  generateMenuItem({ text: '关闭', icon: '', role: 'close' })
  generateMenuDivideLine()
  generateMenuItem({ text: '刷新', icon: '', role: 'reload-page' })
  generateMenuDivideLine()
  generateMenuItem({ text: '关闭所有', icon: '', role: 'close-all' })
  generateMenuDivideLine()
  if (config.num > 1) {
    generateMenuItem({ text: '关闭其他', icon: '', role: 'close-other' })
    if (config.position == 'left') {
      generateMenuDivideLine()
      generateMenuItem({ text: '关闭右侧', icon: '', role: 'close-right' })
    } else if (config.position == 'right') {
      generateMenuDivideLine()
      generateMenuItem({ text: '关闭左侧', icon: '', role: 'close-left' })
    } else {
      generateMenuDivideLine()
      generateMenuItem({ text: '关闭右侧', icon: '', role: 'close-right' })
      generateMenuDivideLine()
      generateMenuItem({ text: '关闭左侧', icon: '', role: 'close-left' })
    }
  }
}

/**
 * @description 生成菜单容器
 */
function generateMenuContainer () {
  let m = document.getElementById('ul_contextMenu_container')
  if (m) {
    m.remove()
  }

  ul = document.createElement('ul')
  ul.className = 'contextMenu_container'
  ul.id = 'ul_contextMenu_container'
  document.body.appendChild(ul)
  ul.onmouseup = hide
}

/**
 * @description 显示右键菜单
 * @param {object} position {left:0,top:0}
 * @param {*} component 组件，传入当前组件，用于在点击菜单按钮时，绑定操作对象
 */
function show (config, func) {
  ul.style.top = `${config.top}px`
  ul.style.left = `${config.left}px`
  ul.style.display = 'block'
  callBack = func
  generateMenuItemsBycurrentComponent(config)
}
function createStyle () {
  if (document.getElementById('contextMenu_style')) {
    return false
  }
  var style = document.createElement('style')
  style.type = 'text/css'
  style.id = 'contextMenu_style'
  let str = `
  .contextMenu_container {
    margin: 0;
    padding: 5px 0;
    min-width: 120px;
    position: absolute;
    list-style: none;
    background-color: hsla(0, 0%, 100%, 0.98);
    border: 1px solid #eee;
    -webkit-box-shadow: 5px 5px 30px rgba(0, 0, 0, 0.1);
    box-shadow: 5px 5px 30px rgba(0, 0, 0, 0.1);
    border-radius: 2px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    z-index: 9999;
  }
  .contextMenu_container li {
    font-size: 12px;
    color: #333;
    height: 26px;
    line-height: 26px;
    padding-left: 10px;
    padding-right: 10px;
    cursor: pointer;
    -webkit-transition: background-color 0.1s ease;
    -o-transition: background-color 0.1s ease;
    transition: background-color 0.1s ease;
  }
  .contextMenu_container li:hover {
    background-color: #e8f6ff;
    color: black;
  }
  .contextMenu_container li span {
    margin-left: 10px;
  }
  `
  try {
    style.appendChild(document.createTextNode(str))
  } catch (ex) {
    style.styleSheet.cssText = str // 针对IE
  }
  var head = document.getElementsByTagName('head')[0]
  head.appendChild(style)
}
/**
 * @description 初始化右键菜单
 */
function init () {
  createStyle()
  generateMenuContainer()
  document.addEventListener('click', (ev) => {
    hide()
  })
  hide()
}
function removeMenu () {
  document.getElementById('contextMenu_style').remove()
  ul.remove()
}
const ContextMenu = {
  init,
  show,
  hide,
  removeMenu
}

export default ContextMenu
