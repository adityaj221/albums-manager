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
          q-select(
            dense
            dark
            options-dense
            options-dark
            options-selected-class="text-accent"
            standout="bg-grey-5 text-grey-8"
            v-model="album.data.visibility"
            :value="album.data.visibility"
            label="Visibility"
            :options="enumValues.visibility"
          )
          q-select(
            dense
            dark
            options-dense
            options-dark
            options-selected-class="text-accent"
            standout="bg-grey-5 text-grey-8"
            v-model="album.data.status"
            :value="album.data.status"
            label="Status"
            :options="enumValues.status"
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
const schema = require('../graphql/schema.json')

export default {
  name: 'EditAlbum',
  data () {
    return {
      signedIn: false
    }
  },
  computed: {
    enumValues () {
      let values = {}
      schema.data.__schema.types.filter(item => item.kind === 'ENUM' && !item.name.startsWith('__')).forEach(item => {
        let vals = item.enumValues.map(e => { return e.name })
        values[item.name.toLowerCase()] = vals
      })
      return values
    },
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
