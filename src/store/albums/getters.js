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
      } else {
        tree.push(mappedElem)
      }
    }
  }
  return tree
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
