import Vue from 'vue'
export default function treeToArray (data, expandAll, subName, selectedKey, parent = null, level = null) {
  let tmp = []
  Array.from(data).forEach((record) => {
    if (record._expanded === undefined) {
      Vue.set(record, '_expanded', expandAll)
    }
    if (record[selectedKey] === undefined) {
      Vue.set(record, selectedKey, expandAll)
    }
    if (record._isIndeterminate === undefined) {
      Vue.set(record, '_isIndeterminate', expandAll)
    }
    let _level = 1
    if (level !== undefined && level !== null) {
      _level = level + 1
    }
    Vue.set(record, '_level', _level)
    // 如果有父元素
    if (parent) {
      Vue.set(record, 'parent', parent)
    }
    tmp.push(record)
    if (record._expanded && record[subName] && record[subName].length > 0) {
      const children = treeToArray(record[subName], expandAll, subName, selectedKey, record, _level)
      tmp = tmp.concat(children)
    }
  })
  return tmp
}
export function setFlgToChildren (list, subName, flg, selectedKey) {
  for (var i = 0; i < (list || []).length; i++) {
    list[i][selectedKey] = flg
    list[i]._isIndeterminate = false
    if (list[i][subName] && list[i][subName].length > 0) {
      setFlgToChildren(list[i][subName], subName, flg, selectedKey)
    }
  }
}
export function getSelectedItem (list, selectedKey) {
  var items = []
  for (var i = 0; i < list.length; i++) {
    if (list[i][selectedKey]) {
      items.push(list[i])
    }
  }
  return items
}
export function setFlgToParent (obj, subName, selectedKey) {
  var isAllChecked = true, isIndeterminate = false

  for (var i = 0; i < obj[subName].length; i++) {
    if (obj[subName][i]._isIndeterminate) { // 中间状态
      isIndeterminate = true
    }
    if (obj[subName][i][selectedKey]) { // 中间状态
      isIndeterminate = true
    } else {
      isAllChecked = false
    }
  }
  if (isAllChecked) { // 全选
    obj[selectedKey] = true
    obj._isIndeterminate = false
  } else {
    if (isIndeterminate) { // 非全选
      obj[selectedKey] = false
      obj._isIndeterminate = true
    } else { // 全部不选
      obj[selectedKey] = false
      obj._isIndeterminate = false
    }
  }
  if (obj && obj.parent) {
    setFlgToParent(obj.parent, subName, selectedKey)
  }
}
