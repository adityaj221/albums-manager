<template lang='pug'>
  div(v-if="loading") Loading...
  q-list(dark v-if="signedIn && item")
    q-expansion-item(
      dense
      default-opened
      switch-toggle-side
      expand-separator
      label="Covers"
      header-class="text-uppercase"
    )

    q-expansion-item(
      dense
      default-opened
      switch-toggle-side
      expand-separator
      label="Properties"
      header-class="text-uppercase"
    )
      .q-pa-md
        .q-gutter-md
          q-input(
            dark
            dense
            standout="bg-grey-5 text-grey-8"
            v-model="item.name"
            :value="item.name"
            label="Name"
          )
          q-input(
            dark
            dense
            standout="bg-grey-5 text-grey-8"
            v-model="item.description"
            :value="item.description"
            label="Description"
            type="textarea"
          )
    q-expansion-item(
      default-opened
      dense
      switch-toggle-side
      expand-separator
      label="Site"
      header-class="text-uppercase"
    )
      .q-pa-md
        .q-gutter-md
          q-input(
            dense
            dark
            standout="bg-grey-5 text-grey-8"
            v-model="item.slug"
            :value="item.slug"
            label="Slug"
          )
    q-expansion-item(
      default-opened
      dense
      switch-toggle-side
      expand-separator
      label="History"
      header-class="text-uppercase"
    )
      .q-pa-md
        .q-gutter-md
          q-input(
            dark
            dense
            standout="bg-grey-5 text-grey-8"
            v-model="item.createdOn"
            :value="item.createdOn"
            label="created"
          )
</template>

<script>
import { getAlbum } from '../graphql/queries'

export default {
  name: 'EditItem',
  data () {
    return {
      signedIn: false,
      item: null,
      loading: null
    }
  },
  computed: {
    albumId: {
      get () {
        return this.$store.state.albums.activeAlbumId
      }
    }
  },
  created () {
    this.fetchAlbum()
  },
  methods: {
    fetchAlbum () {
      this.loading = true
      let query = this.$Amplify.graphqlOperation(getAlbum, { id: this.albumId })
      this.$Amplify.API.graphql(query).then(res => {
        this.loading = false
        this.item = res.data.getAlbum
      })
    }
  },
  watch: {
    'albumId': 'fetchAlbum'
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
