<template lang="pug">
  q-page(padding)
    div.text-center(v-if="loading")
      q-spinner(color="primary" size="3em")
    div(v-else-if="errors.length > 0" class="bg-negative")
      div.q-pa-md
        strong Errors:
        ul
          li(v-for="error in errors" :key="error") {{error}}
    div(v-else-if="album")
      h1 {{ album.name }}
</template>

<script>
import { getAlbum } from '../graphql/queries'

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
    }
  },
  methods: {
    fetchAlbum (albumId) {
      this.albumId = albumId
      this.loading = true
      let getAlbumQuery = this.$Amplify.graphqlOperation(getAlbum, { id: this.albumId })
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
