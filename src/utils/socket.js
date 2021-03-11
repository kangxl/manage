/*
 * @Autor: guan zhenhua
 * @Date: 2020-07-28 13:11:58
 * @LastEditors: guan zhenhua
 * @LastEditTime: 2020-08-06 16:37:47
 * @Description:scoket
 */
// import { Message } from 'element-ui'
import settings from '@/config/settings'
import myEvent from '@/utils/myEvent'
function connectWebsocket(path) {
  const wsuri = settings.socketHost + path
  window.chartSocket = new WebSocket(wsuri)

  window.chartSocket.onopen = function () {
    // Message({
    //   message: 'scoket连接成功!',
    //   type: 'success',
    //   duration: 2000
    // })
  }
  window.chartSocket.onmessage = function (e) {
    myEvent.$emit('chatMessage', JSON.parse(e.data))
  }

  window.chartSocket.onclose = () => {
    connectWebsocket(path)
    // Message({
    //   message: 'scoket连接关闭!',
    //   duration: 2000
    // })
  }
}
export default {
  status: {
    connecting: WebSocket.CONNECTING,
    open: WebSocket.OPEN,
    closing: WebSocket.CLOSING,
    closed: WebSocket.CLOSED
  },
  createSocket (path) { // 初始化weosocket
    connectWebsocket(path)
  }
}

