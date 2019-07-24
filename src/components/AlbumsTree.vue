<template>
  <q-tree
    :nodes="renderTree"
    @update:selected="onSelect"
    :selected.sync="selected"
    :expanded.sync="expanded"
    selected-color="primary"
    node-key="id"
    style="font-size:0.7em"
    no-nodes-label="Loading Albums..."
    accordion
  />
</template>

<script>
export default {
  name: 'AlbumsTree',
  data () {
    return {
      expanded: []
    }
  },
  methods: {
    getPath (leaf) {
      return this.albumTreeIndex[leaf] ? this.getPath(this.albumTreeIndex[leaf]).concat([leaf]) : [leaf]
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
        if (branch[i].hasChildren) {
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
    },
    setExpanded (val) {
      this.expanded = val
    }
  },
  computed: {
    selected: {
      get () {
        return this.$store.state.albums.activeAlbumId
      },
      set (val) {
        this.$store.commit('albums/setActive', val)
      }
    },
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
    },
    renderTree () {
      let tree = this.albumTree
      if (tree && tree.length > 0) {
        this.setExpanded(this.getPath(this.selected))
        return this.renderBranch(tree)
      } else {
        this.setExpanded([])
        return []
      }
    }
  }
}
</script>
