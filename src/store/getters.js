/*
 * @Author: kangxl
 * @Date: 2020-10-29 14:52:35
 * @LastEditors: kangxl
 * @LastEditTime: 2020-10-30 14:12:10
 * @Description:
 */
const getters = {
  user: state => state.user,
  setting: state => state.setting,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews
}
export default getters
