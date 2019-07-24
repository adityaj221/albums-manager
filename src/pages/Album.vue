<template lang="pug">
  q-page(padding)
    amplify-connect(
      :query="getAlbumQuery",
      :subscription="createPhotoSubscription",
      :onSubscriptionMsg="onCreatePhotoMsg"
    )
      template(slot-scope="{loading, data, errors}")
        div(v-if="loading")
        div(v-else-if="errors.length > 0")
        div(v-else-if="data")
          h1 {{ data.getAlbum.name }}
</template>

<script>
import { getAlbum } from '../graphql/queries'
import { onCreatePhoto } from '../graphql/subscriptions'

export default {
  name: 'Album',
  created () {
    this.albumId = this.$route.params.id
  },
  beforeRouteUpdate (to, from, next) {
    this.albumId = to.params.id
    next()
  },
  beforeDestroy () {
    // this.albumId = null
  },
  computed: {
    getAlbumQuery () {
      return this.$Amplify.graphqlOperation(getAlbum, { id: this.albumId })
    },
    createPhotoSubscription () {
      return this.$Amplify.graphqlOperation(onCreatePhoto)
    },
    albumId: {
      get () {
        return this.$store.state.albums.activeAlbumId
      },
      set (val) {
        this.$store.commit('albums/setActive', val)
      }
    }
  },
  methods: {
    onCreatePhotoMsg (prevData, newData) {
      const newPhoto = newData.onCreatePhoto
      delete newPhoto.album
      prevData.data.getAlbum.photos.items.push(newPhoto)
      return prevData.data
    }
  }
}
</script>

<style>
</style>
