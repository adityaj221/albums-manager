export const updateTree = (state, tree) => {
  var index = {}
  const buildIndex = (root, children) => {
    for (var i in children) {
      index[children[i].id] = root
      buildIndex(children[i].id, children[i].children)
    }
  }
  buildIndex('root', tree)
  state.tree = tree
  state.treeIndex = index
}
export const setActive = (state, albumId) => {
  state.activeAlbumId = albumId
}
