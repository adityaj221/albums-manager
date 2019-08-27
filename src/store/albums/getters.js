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

  for (let id in mappedArr) { // eslint-disable-line no-unused-vars
    if (mappedArr.hasOwnProperty(id)) {
      mappedElem = mappedArr[id]
      if (mappedElem.parentId !== 'root') {
        if (!mappedArr[mappedElem['parentId']].hasOwnProperty('children')) {
          mappedArr[mappedElem['parentId']]['children'] = []
        }
        mappedArr[mappedElem['parentId']]['children'].push(mappedElem)
        mappedArr[mappedElem['parentId']]['children'].sort(customOrder(mappedArr[mappedElem['parentId']].orderBy, mappedArr[mappedElem['parentId']].orderDirection))
      } else {
        tree.push(mappedElem)
        tree.sort(customOrder('order', 'asc'))
      }
    }
  }
  return tree
}

const customOrder = (field, direction) => {
  if (field === null) {
    field = 'createdOn'
  }
  if (direction === null) {
    direction = 'desc'
  }
  let asc = 1
  let desc = -1
  if (direction !== 'desc') {
    asc = -1
    desc = 1
  }
  let orderFct = (a, b) => {
    if (a[field] === b[field]) {
      return 0
    }
    return (a[field] < b[field]) ? asc : desc
  }
  return orderFct
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
