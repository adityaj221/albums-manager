import { extend } from 'quasar'

const listToTree = (list) => {
  let tree = []
  let mappedArr = {}
  let arrElem = null
  let mappedElem = null

  for (let i = 0; i < list.length; i++) {
    arrElem = list[i]
    mappedArr[arrElem.id] = arrElem
  }

  for (let id in mappedArr) {
    if (mappedArr.hasOwnProperty(id)) {
      mappedElem = mappedArr[id]
      if (mappedElem.parentId !== 'root') {
        if (!mappedArr[mappedElem['parentId']].hasOwnProperty('children')) {
          mappedArr[mappedElem['parentId']]['children'] = []
        }
        mappedArr[mappedElem['parentId']]['children'].push(mappedElem)
        mappedArr[mappedElem['parentId']]['children'].sort(byCreatedOnDesc)
      } else {
        tree.push(mappedElem)
        tree.sort(byOrderAsc)
      }
    }
  }
  return tree
}

const byOrderAsc = (a, b) => {
  if (a.order === b.order) {
    return 0
  }
  return (b.order < a.order) ? 1 : -1
}

const byCreatedOnDesc = (a, b) => {
  if (a.createdOn === b.createdOn) {
    return 0
  }
  return (a.createdOn < b.createdOn) ? 1 : -1
}

const getPath = (index, leaf) => {
  return index[leaf] ? getPath(index, index[leaf]).concat([leaf]) : [leaf]
}

export const tree = state => {
  let list = extend(true, [], state.list)
  return listToTree(list)
}

export const path = state => {
  let list = extend(true, [], state.list)
  let index = []
  for (let i = 0; i < list.length; i++) {
    if (list[i].parentId !== 'root') {
      index[list[i].id] = list[i].parentId
    }
  }
  return leaf => getPath(index, leaf)
}

export const showEdit = state => {
  if (state.editItem && state.editItem.type && state.editItem.itemId) {
    return true
  }
  return false
}
