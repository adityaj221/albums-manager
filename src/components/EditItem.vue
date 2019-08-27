<template lang='pug'>
  edit-album
</template>

<script>
import EditAlbum from 'components/EditAlbum'

export default {
  name: 'EditItem',
  components: {
    EditAlbum
  },
  data () {
    return {
      signedIn: false
    }
  },
  computed: {
    albumId: {
      get () {
        return this.$store.state.albums.activeAlbumId
      }
    },
    item: {
      get () {
        return this.$store.state.albums.editItem
      }
    }
  },
  beforeCreate () {
    this.$Auth.currentAuthenticatedUser()
      .then(user => {
        this.signedIn = true
      })
      .catch(() => {
        this.signedIn = false
      })
  }
}
</script>
