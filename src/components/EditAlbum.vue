<template lang='pug'>
  q-list(dark v-if="signedIn && album")
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
            v-model="album.name"
            :value="album.name"
            label="Name"
            @change="save(['name'])"
          )
          q-input(
            dark
            dense
            standout="bg-grey-5 text-grey-8"
            v-model.lazy="album.description"
            :value="album.description"
            label="Description"
            type="textarea"
            @change="save(['description'])"
          )
          q-input(
            dark
            dense
            standout="bg-grey-5 text-grey-8"
            v-model="album.summary"
            :value="album.summary"
            label="Summary"
            type="textarea"
            @change="save(['summary'])"
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
            v-model="slug"
            :value="slug"
            label="Slug"
            debounce="1000"
            @change="save(['slug'])"
          )
          q-select(
            dense
            dark
            options-dense
            options-dark
            options-selected-class="text-accent"
            standout="bg-grey-5 text-grey-8"
            v-model="album.visibility"
            :value="album.visibility"
            label="Visibility"
            :options="enumValues.visibility"
            @change="save(['visibility'])"
          )
          q-select(
            dense
            dark
            options-dense
            options-dark
            options-selected-class="text-accent"
            standout="bg-grey-5 text-grey-8"
            v-model="album.status"
            :value="album.status"
            label="Status"
            :options="enumValues.status"
            @change="save(['status'])"
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
            v-model="album.createdOn"
            :value="album.createdOn"
            label="Created"
            @change="save(['createdOn'])"
          )
          q-input(
            dark
            dense
            standout="bg-grey-5 text-grey-8"
            v-model="album.modifiedOn"
            :value="album.modifiedOn"
            label="Modified"
          )
</template>

<script>
const schema = require('../graphql/schema.json')
const slugify = require('slugify')
import { updateAlbum } from '../graphql/mutations'
import { extend, date } from 'quasar'

export default {
  name: 'EditAlbum',
  data () {
    return {
      signedIn: false,
      album: {}
    }
  },
  created () {
    this.album = extend({}, this.item.data)
  },
  watch: {
    item () {
      this.album = extend({}, this.item.data)
    }
  },
  methods: {
    save (fields) {
      let input = {
        id: this.item.itemId,
        modifiedOn: date.formatDate(Date.now(), 'YYYY-MM-DDTHH:mm:ss.SSSZ')
      }
      fields.forEach(field => {
        let value = this.album[field].trim()
        input[field] = (value === '') ? null : value
      })
      let updateQuery = this.$Amplify.graphqlOperation(updateAlbum, { input: input })
      this.$Amplify.API.graphql(updateQuery).then(result => {
        this.$q.notify({
          message: 'Value saved',
          color: 'positive',
          timeout: 2000,
          position: 'top-right'
        })
      }).catch(err => {
        let message = '<b>Error while saving field</b>:<br><ul>'
        err.errors.forEach(e => {
          message += `<li>${e.message}</li>`
        })
        message += '</ul>'
        this.$q.notify({
          message,
          html: true,
          color: 'negative',
          timeout: 5000,
          position: 'top-right'
        })
      })
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
    item: {
      get () {
        return this.$store.state.albums.editItem
      }
    },
    slug: {
      get () {
        return this.album.slug
      },
      set (val) {
        this.album.slug = slugify(val)
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
