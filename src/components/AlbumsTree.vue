<template>
  <q-tree
    :nodes="renderTree"
    @update:selected="onSelect"
    :selected.sync="selected"
    selected-color="primary"
    node-key="id"
    style="font-size:0.7em"
  />
</template>

<script>
// import { listAlbums } from '../graphql/queries'

const listAlbumsTree = `query ListAlbums(
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

export default {
  name: 'AlbumsTree',
  data () {
    return {
      selected: null
    }
  },
  async mounted () {
    this.albumTree = await this.buildTree()
  },
  methods: {
    async buildTree (parentId = 'root') {
      let branch = await this.getBranch(parentId)
      for (let i = 0; i < branch.length; i++) {
        if (branch[i].childrenCount > 0) {
          branch[i].children = await this.buildTree(branch[i].id)
        }
      }
      return branch
    },
    async getBranch (parentId = 'root') {
      let query = this.$Amplify.graphqlOperation(listAlbumsTree, { filter: { parentId: { eq: parentId } } })
      let nodes = await this.$Amplify.API.graphql(query).then(result => {
        return result.data.listAlbums.items
      })
      let branch = []
      for (let i = 0; i < nodes.length; i++) {
        let item = {
          id: nodes[i].id,
          name: nodes[i].name,
          childrenCount: nodes[i].children.items.length || 0
        }
        branch.push(item)
      }
      return branch
    },
    renderBranch (branch) {
      let items = []
      for (let i = 0; i < branch.length; i++) {
        let item = {
          icon: 'photo_library',
          iconColor: 'grey',
          label: branch[i].name,
          id: branch[i].id,
          expandable: false,
          handler: this.openAlbum
        }
        if (branch[i].childrenCount > 0) {
          item.expandable = true
          item.children = this.renderBranch(branch[i].children)
        }
        items.push(item)
      }
      return items
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
    renderTree () {
      let tree = this.albumTree
      let rendered = []
      rendered = this.renderBranch(tree)
      return rendered
    }
  }
}
</script>
