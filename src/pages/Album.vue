<template lang="pug">
  q-page(padding)
    div.text-center(v-if="loading")
      q-spinner(color="primary" size="3em")
    div(v-else-if="errors.length > 0" class="bg-negative")
      div.q-pa-md
        strong Errors:
        ul
          li(v-for="error in errors" :key="error") {{error.message}}
    div(v-else-if="album")
      .text-h5 {{ album.name }}
      .row.q-pa-md.items-start.q-gutter-md
        q-card.bg-grey-9.cursor-pointer(dark flat v-for="item in children" :key="item.id" @click="$router.push({path: `/album/${item.id}` })")
          q-card-section
            .text-h6 {{ item.name }}
            .text-subtitle2 {{ item.createdOn }}
            .text-subtitle2 {{ item.modifiedOn }}
            .text-subtitle2 {{ item.order }}
          template(v-if="item.description")
            q-separator(dark inset)
            q-card-section {{ item.description }}
</template>

<script>
import { getAlbum } from '../graphql/queries'
import { onUpdateAlbum } from '../graphql/subscriptions'

export default {
  name: 'Album',
  data () {
    return {
      album: {},
      loading: false,
      errors: []
    }
  },
  created () {
    this.fetchAlbum(this.$route.params.id)
    this.$Amplify.API.graphql(
      this.$Amplify.graphqlOperation(onUpdateAlbum)
    ).subscribe({
      next: (albumData) => {
        let item = albumData.value.data.onUpdateAlbum
        this.album = item
        this.editItem = {
          type: 'album',
          itemId: item.id,
          data: item
        }
      }
    })
  },
  beforeRouteUpdate (to, from, next) {
    this.fetchAlbum(to.params.id)
    next()
  },
  beforeDestroy () {
    this.editItem = null
    // this.albumId = null
  },
  computed: {
    albumId: {
      get () {
        return this.$store.state.albums.activeAlbumId
      },
      set (val) {
        this.$store.commit('albums/setActive', val)
      }
    },
    editItem: {
      get () {
        return this.$store.state.albums.editItem
      },
      set (val) {
        this.$store.commit('albums/setEditItem', val)
      }
    },
    children () {
      return [...this.album.children.items]// .sort(this.byCreatedOnDesc)
    }
  },
  methods: {
    fetchAlbum (albumId) {
      this.albumId = albumId
      this.loading = true
      let getAlbumQuery = this.$Amplify.graphqlOperation(getAlbum, { id: this.albumId, sortDirection: 'DESC', limit: 1000 })
      this.$Amplify.API.graphql(getAlbumQuery).then(result => {
        this.album = result.data.getAlbum
        this.editItem = {
          type: 'album',
          itemId: this.albumId,
          data: this.album
        }
        this.loading = false
      }).catch(err => {
        this.loading = false
        this.album = null
        this.errors = err.errors
      })
    }
  }
}
</script>

<style>
</style>
