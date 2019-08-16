<template lang='pug'>
  q-list(dark v-if="signedIn && album && album.data")
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
            v-model="album.data.name"
            :value="album.data.name"
            label="Name"
          )
          q-input(
            dark
            dense
            standout="bg-grey-5 text-grey-8"
            v-model="album.data.description"
            :value="album.data.description"
            label="Description"
            type="textarea"
          )
          q-input(
            dark
            dense
            standout="bg-grey-5 text-grey-8"
            v-model="album.data.summary"
            :value="album.data.summary"
            label="Summary"
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
            v-model="album.data.slug"
            :value="album.data.slug"
            label="Slug"
          )
          q-input(
            dense
            dark
            standout="bg-grey-5 text-grey-8"
            v-model="album.data.visibility"
            :value="album.data.visibility"
            label="Visibility"
          )
          q-input(
            dense
            dark
            standout="bg-grey-5 text-grey-8"
            v-model="album.data.status"
            :value="album.data.status"
            label="Status"
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
            v-model="album.data.createdOn"
            :value="album.data.createdOn"
            label="Created"
          )
          q-input(
            dark
            dense
            standout="bg-grey-5 text-grey-8"
            v-model="album.data.modifiedOn"
            :value="album.data.modifiedOn"
            label="Modified"
          )
</template>

<script>

export default {
  name: 'EditAlbum',
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
    album: {
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
