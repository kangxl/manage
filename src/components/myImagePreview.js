/*
 * @Author: kangxl
 * @Date: 2020-03-27 15:23:46
 * @LastEditors: kangxl
 * @LastEditTime: 2020-03-27 17:21:43
 * @Description: 图片预览服务
 * 用法：
 * this.$myImage.show({list:['url','url',.....]})
 */
import ImageViewer from 'element-ui/packages/image/src/image-viewer'

const Api = (Vue) => {
  return {
    // var default ={
    //   urlList
    //   zIndex
    //   onSwitch
    //   onClose
    // }
    show (props) {
      // const propsData = Object.assign({}, props)
      const instance = new (Vue.extend(ImageViewer))({
        el: document.createElement('div'),
        propsData: {
          zIndex: props.zIndex || 2000,
          urlList: props.list || [],
          onClose: () => {
            instance.$el.remove()
          }
        }
      })
      document.body.appendChild(instance.$el)
      return instance
    }
  }
}

export default Api
