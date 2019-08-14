<template lang="pug">
  q-list(dark v-if="signedIn")
    q-item-label(header) Albums
    q-item
      albums-tree
</template>

<script>
import AlbumsTree from 'components/AlbumsTree'

export default {
  name: 'AppMenu',
  data () {
    return {
      signedIn: false
    }
  },
  components: {
    AlbumsTree
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
