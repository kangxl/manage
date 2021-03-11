const ctx = '@@InfiniteScroll'
var throttle = function (fn, delay) {
  var now, lastExec, timer, context, args //eslint-disable-line
  var execute = function () {
    fn.apply(context, args)
    lastExec = now
  }
  return function () {
    context = this
    args = arguments
    now = Date.now()
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    if (lastExec) {
      var diff = delay - (now - lastExec)
      if (diff < 0) {
        execute()
      } else {
        timer = setTimeout(() => {
          execute()
        }, diff)
      }
    } else {
      execute()
    }
  }
}
var getScrollTop = function (element) {
  if (element === window) {
    return Math.max(window.pageYOffset || 0, document.documentElement.scrollTop)
  }
  return element.scrollTop
}
var getComputedStyle = document.defaultView.getComputedStyle
var getScrollEventTarget = function (element) {
  var currentNode = element
  var isElementTable = element.getAttribute('infinite-is-ele-table')
  if (isElementTable === '1') {
    return element
  }
  // bugfix, see http://w3help.org/zh-cn/causes/SD9013 and http://stackoverflow.com/questions/17016740/onscroll-function-is-not-working-for-chrome
  while (currentNode && currentNode.tagName !== 'HTML' && currentNode.tagName !== 'BODY' && currentNode.nodeType === 1) {
    var overflowY = getComputedStyle(currentNode).overflowY
    if (overflowY === 'scroll' || overflowY === 'auto') {
      return currentNode
    }
    currentNode = currentNode.parentNode
  }
  return window
}
var getVisibleHeight = function (element) {
  if (element === window) {
    return document.documentElement.clientHeight
  }
  return element.clientHeight
}
var getElementTop = function (element) {
  if (element === window) {
    return getScrollTop(window)
  }
  return element.getBoundingClientRect().top + getScrollTop(window)
}
var isAttached = function (element) {
  var currentNode = element.parentNode
  while (currentNode) {
    if (currentNode.tagName === 'HTML') {
      return true
    }
    if (currentNode.nodeType === 11) {
      return false
    }
    currentNode = currentNode.parentNode
  }
  return false
}
var doBind = function () {
  if (this.binded) return // eslint-disable-line
  this.binded = true

  var directive = this
  var element = directive.el
  var throttleDelayExpr = element.getAttribute('infinite-scroll-throttle-delay')
  var throttleDelay = 200
  if (throttleDelayExpr) {
    throttleDelay = Number(directive.vm[throttleDelayExpr] || throttleDelayExpr)
    if (isNaN(throttleDelay) || throttleDelay < 0) {
      throttleDelay = 200
    }
  }
  directive.throttleDelay = throttleDelay
  directive.scrollEventTarget = getScrollEventTarget(element)
  directive.scrollListener = throttle(doCheck.bind(directive), directive.throttleDelay)
  directive.scrollEventTarget.addEventListener('scroll', directive.scrollListener)
  this.vm.$on('hook:beforeDestroy', function () {
    directive.scrollEventTarget.removeEventListener('scroll', directive.scrollListener)
  })
  var disabledExpr = element.getAttribute('infinite-scroll-disabled')
  var disabled = false
  if (disabledExpr) {
    this.vm.$watch(disabledExpr, function (value) {
      directive.disabled = value
      if (!value && directive.immediateCheck) {
        doCheck.call(directive)
      }
    })
    disabled = Boolean(directive.vm[disabledExpr])
  }
  directive.disabled = disabled
  var distanceExpr = element.getAttribute('infinite-scroll-distance')
  var distance = 0
  if (distanceExpr) {
    distance = Number(directive.vm[distanceExpr] || distanceExpr)
    if (isNaN(distance)) {
      distance = 0
    }
  }
  directive.distance = distance
  var immediateCheckExpr = element.getAttribute('infinite-scroll-immediate-check')
  var immediateCheck = true
  if (immediateCheckExpr) {
    immediateCheck = Boolean(directive.vm[immediateCheckExpr])
  }
  directive.immediateCheck = immediateCheck
  if (immediateCheck) {
    doCheck.call(directive)
  }
  var eventName = element.getAttribute('infinite-scroll-listen-for-event')
  if (eventName) {
    directive.vm.$on(eventName, function () {
      doCheck.call(directive)
    })
  }
}
var doCheck = function (force) {
  var scrollEventTarget = this.scrollEventTarget
  var element = this.el
  var distance = this.distance
  if (force !== true && this.disabled) return //eslint-disable-line
  var viewportScrollTop = getScrollTop(scrollEventTarget)
  var viewportBottom = viewportScrollTop + getVisibleHeight(scrollEventTarget)
  var shouldTrigger = false
  if (scrollEventTarget === element) {
    shouldTrigger = scrollEventTarget.scrollHeight - viewportBottom <= distance
  } else {
    var elementBottom = getElementTop(element) - getElementTop(scrollEventTarget) + element.offsetHeight + viewportScrollTop
    shouldTrigger = viewportBottom + distance >= elementBottom
  }
  if (shouldTrigger && this.expression && this.el.scrollTop > 0) {
    this.expression()
  }
}
export default {
  bind (el, binding, vnode) {
    var newEl = el.querySelector('.el-table__body-wrapper')
    if (newEl) {
      newEl.setAttribute('infinite-is-ele-table', '1')
      newEl.setAttribute('infinite-scroll-throttle-delay', el.getAttribute('infinite-scroll-throttle-delay'))
      newEl.setAttribute('infinite-scroll-disabled', el.getAttribute('infinite-scroll-disabled'))
      newEl.setAttribute('infinite-scroll-distance', el.getAttribute('infinite-scroll-distance'))
      newEl.setAttribute('infinite-scroll-immediate-check', el.getAttribute('infinite-scroll-immediate-check'))
      newEl.setAttribute('infinite-scroll-listen-for-event', el.getAttribute('infinite-scroll-listen-for-event'))
      el = newEl
    }
    el[ctx] = {
      el,
      vm: vnode.context,
      expression: binding.value
    }
    const args = arguments
    var func = function () {
      if (isAttached(el)) {
        doBind.call(el[ctx], args)
      }
      el[ctx].bindTryCount = 0
      var tryBind = function () {
        if (el[ctx].bindTryCount > 10) return //eslint-disable-line
        el[ctx].bindTryCount++
        if (isAttached(el)) {
          doBind.call(el[ctx], args)
        } else {
          setTimeout(tryBind, 50)
        }
      }
      tryBind()
    }
    if (el[ctx].vm._isMounted) {
      func()
    } else {
      el[ctx].vm.$on('hook:mounted', function () {
        el[ctx].vm.$nextTick(function () {
          func()
        })
      })
    }
  },
  unbind (el) {
    var isElementTable = el.getAttribute('infinite-is-ele-table')
    if (isElementTable === '1') {
      el = el.querySelector('.el-table__body-wrapper')
    }
    if (el && el[ctx] && el[ctx].scrollEventTarget) {
      el[ctx].scrollEventTarget.removeEventListener('scroll', el[ctx].scrollListener)
    }
  }
}
