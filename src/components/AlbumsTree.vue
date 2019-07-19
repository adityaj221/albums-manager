<template>
  <q-tree
    :nodes="albumTree"
    @update:selected="onSelect"
    :selected.sync="selected"
    selected-color="primary"
    node-key="id"
    style="font-size:0.7em"
  />
</template>

<script>
import { listAlbums } from '../graphql/queries'

export default {
  name: 'AlbumsTree',
  data () {
    return {
      selected: null,
      lazyAlbumTree: [],
      albumTree: []
    }
  },
  mounted () {
    // this.buildTree('0', (tree) => { this.lazyAlbumTree = tree })
    this.albumTree = this.buildNodes('0')
  },
  methods: {
    onLazyLoadTree ({ node, key, done, fail }) {
      this.buildTree(key, done, true)
    },
    buildNodes (parentId) {
      let nodes = []
      this.buildTree(parentId, (tree) => {
        tree.forEach(item => {
          if (item.expandable) {
            item.children = this.buildNodes(item.id)
          }
          nodes.push(item)
        })
      }, false)
      return nodes
    },
    buildTree (parentId, done, lazy = true) {
      let query = this.$Amplify.graphqlOperation(listAlbums, { filter: { parentId: { eq: parentId } } })
      this.$Amplify.API.graphql(query).then(result => {
        if (result.data.listAlbums.items.length === 0) {
          done([])
          return
        }
        let children = []
        result.data.listAlbums.items.forEach(item => {
          let hasChildren = item.children.items.length > 0
          let childItem = {
            icon: 'photo_library',
            iconColor: 'grey',
            label: item.name,
            id: item.id,
            lazy: false,
            expandable: false,
            handler: this.openAlbum
          }
          if (hasChildren) {
            childItem.lazy = lazy
            childItem.expandable = true
          }
          children.push(childItem)
        })
        done(children)
      })
    },
    openAlbum (album) {
      this.$router.push({ path: `/album/${album.id}` })
    },
    onSelect (key) {
      if (!key) {
        let old = this.selected
        this.$nextTick(() => { this.selected = old })
      }
    }
  }
}
</script>
