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
    }
  },
  mounted () {
    this.albumTree = this.buildNodes()
  },
  methods: {
    buildNodes (parentId = null) {
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
    selected: {
      get () {
        return this.$store.state.albums.selected
      },
      set (val) {
        this.$store.commit('albums/setSelected', val)
      }
    }
  }
}
</script>
