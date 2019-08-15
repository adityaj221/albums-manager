<template lang='pug'>
  q-list(dark v-if="signedIn && item && item.data")
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
            v-model="item.data.name"
            :value="item.data.name"
            label="Name"
          )
          q-input(
            dark
            dense
            standout="bg-grey-5 text-grey-8"
            v-model="item.data.description"
            :value="item.data.description"
            label="Description"
            type="textarea"
          )
          q-input(
            dark
            dense
            standout="bg-grey-5 text-grey-8"
            v-model="item.data.summary"
            :value="item.data.summary"
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
            v-model="item.data.slug"
            :value="item.data.slug"
            label="Slug"
          )
          q-input(
            dense
            dark
            standout="bg-grey-5 text-grey-8"
            v-model="item.data.visibility"
            :value="item.data.visibility"
            label="Visibility"
          )
          q-input(
            dense
            dark
            standout="bg-grey-5 text-grey-8"
            v-model="item.data.status"
            :value="item.data.status"
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
            v-model="item.data.createdOn"
            :value="item.data.createdOn"
            label="Created"
          )
          q-input(
            dark
            dense
            standout="bg-grey-5 text-grey-8"
            v-model="item.data.modifiedOn"
            :value="item.data.modifiedOn"
            label="Modified"
          )
</template>

<script>

export default {
  name: 'EditItem',
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
