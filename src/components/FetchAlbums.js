const listAlbums = `query ListAlbums(
  $filter: ModelAlbumFilterInput
  $limit: Int
  $nextToken: String
) {
  listAlbums(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      children {
        items {
          id
        }
        nextToken
      }
    }
    nextToken
  }
}
`
const onCreateAlbum = `subscription OnCreateAlbum {
  onCreateAlbum {
    id
    name
    parent {
      id
    }
  }
}
`
const onUpdateAlbum = `subscription OnUpdateAlbum {
  onUpdateAlbum {
    id
    name
    parent {
      id
    }
  }
}
`

export default {
  name: 'FetchAlbums',
  beforeMount () {
    this.listAllAlbums().then(tree => {
      this.albumTree = tree
    })
    this.$Amplify.API.graphql(
      this.$Amplify.graphqlOperation(onCreateAlbum)
    ).subscribe({
      next: (albumData) => {
        this.listAllAlbums().then(tree => {
          this.albumTree = tree
        })
      }
    })
    this.$Amplify.API.graphql(
      this.$Amplify.graphqlOperation(onUpdateAlbum)
    ).subscribe({
      next: (albumData) => {
        this.listAllAlbums().then(tree => {
          this.albumTree = tree
        })
      }
    })
  },
  methods: {
    getPath (leaf) {
      return this.albumTreeIndex[leaf] ? this.getPath(this.albumTreeIndex[leaf]).concat([leaf]) : [leaf]
    },
    listAllAlbums (parentId = 'root', depth = 0) {
      return this.listAllSiblings(parentId)
        .then((items) => {
          let getChildrenPromises = []
          items.forEach(item => {
            item.depth = depth
            let getChild = null
            if (item.hasChildren) {
              getChild = this.listAllAlbums(item.id, depth + 1).then(res => {
                item.children = res
                return item
              })
            } else {
              getChild = Promise.resolve(item)
            }
            getChildrenPromises.push(getChild)
          })
          return Promise.all(getChildrenPromises)
        })
    },
    listAllSiblings (parentId, nextToken = null) {
      return this.listSiblings(parentId, nextToken)
        .then(({ items, nextToken }) => {
          let itemsClean = items.map(x => {
            return {
              id: x.id,
              name: x.name,
              hasChildren: (x.children && x.children.items && x.children.items.length > 0)
            }
          })
          return nextToken
            ? this.listAllSiblings(parentId, nextToken)
              .then(x => itemsClean.concat(x))
            : itemsClean
        })
    },
    listSiblings (parentId, nextToken) {
      let filter = {
        parentId: {
          eq: parentId
        }
      }
      let limit = 1000
      let query = this.$Amplify.graphqlOperation(listAlbums, { limit, nextToken, filter })
      return this.$Amplify.API.graphql(query).then(result => {
        return result.data.listAlbums
      })
    }
  },
  computed: {
    albumTree: {
      get () {
        return this.$store.state.albums.tree
      },
      set (val) {
        this.$store.commit('albums/updateTree', val)
      }
    },
    albumTreeIndex: {
      get () {
        return this.$store.state.albums.treeIndex
      }
    }
  },
  render () {
    return ''
  }
}
