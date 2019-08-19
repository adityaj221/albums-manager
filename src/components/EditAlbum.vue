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
      .q-pa-md(:icon-status="ongoingChange")
        .q-gutter-md
          q-input(
            dark
            dense
            standout="bg-grey-5 text-grey-8"
            v-model="album.name"
            :value="album.name"
            label="Name"
            @input="modified('name')"
            @change="save('name')"
          )
            template(v-slot:append)
              q-icon(v-if="fieldStates['name'] === 'saved'" name="done" color="positive")
              q-icon(v-if="fieldStates['name'] === 'modified'" name="help" color="warning")
              q-icon(v-if="fieldStates['name'] === 'saving'" name="save" color="warning")
              q-icon(v-if="fieldStates['name'] === 'error'" name="error" color="error")
          q-input(
            dark
            dense
            standout="bg-grey-5 text-grey-8"
            v-model.lazy="album.description"
            :value="album.description"
            label="Description"
            type="textarea"
            @input="modified('description')"
            @change="save('description')"
          )
            template(v-slot:append)
              q-icon(v-if="fieldStates['description'] === 'saved'" name="done" color="positive")
              q-icon(v-if="fieldStates['description'] === 'modified'" name="help" color="warning")
              q-icon(v-if="fieldStates['description'] === 'saving'" name="save" color="warning")
              q-icon(v-if="fieldStates['description'] === 'error'" name="error" color="error")
          q-input(
            dark
            dense
            standout="bg-grey-5 text-grey-8"
            v-model="album.summary"
            :value="album.summary"
            label="Summary"
            type="textarea"
            @input="modified('summary')"
            @change="save('summary')"
          )
            template(v-slot:append)
              q-icon(v-if="fieldStates['summary'] === 'saved'" name="done" color="positive")
              q-icon(v-if="fieldStates['summary'] === 'modified'" name="help" color="warning")
              q-icon(v-if="fieldStates['summary'] === 'saving'" name="save" color="warning")
              q-icon(v-if="fieldStates['summary'] === 'error'" name="error" color="error")
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
            @input="modified('slug')"
            @change="save('slug')"
          )
            template(v-slot:append)
              q-icon(v-if="fieldStates['slug'] === 'saved'" name="done" color="positive")
              q-icon(v-if="fieldStates['slug'] === 'modified'" name="help" color="warning")
              q-icon(v-if="fieldStates['slug'] === 'saving'" name="save" color="warning")
              q-icon(v-if="fieldStates['slug'] === 'error'" name="error" color="error")
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
            @input="modified('visibility');save('visibility')"
          )
            template(v-slot:append)
              q-icon(v-if="fieldStates['visibility'] === 'saved'" name="done" color="positive")
              q-icon(v-if="fieldStates['visibility'] === 'modified'" name="help" color="warning")
              q-icon(v-if="fieldStates['visibility'] === 'saving'" name="save" color="warning")
              q-icon(v-if="fieldStates['visibility'] === 'error'" name="error" color="error")
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
            @input="modified('status');save('status')"
          )
            template(v-slot:append)
              q-icon(v-if="fieldStates['status'] === 'saved'" name="done" color="positive")
              q-icon(v-if="fieldStates['status'] === 'modified'" name="help" color="warning")
              q-icon(v-if="fieldStates['status'] === 'saving'" name="save" color="warning")
              q-icon(v-if="fieldStates['status'] === 'error'" name="error" color="error")
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
            @input="modified('createdOn')"
            @change="save('createdOn')"
          )
            template(v-slot:append)
              q-icon(v-if="fieldStates['createdOn'] === 'saved'" name="done" color="positive")
              q-icon(v-if="fieldStates['createdOn'] === 'modified'" name="help" color="warning")
              q-icon(v-if="fieldStates['createdOn'] === 'saving'" name="save" color="warning")
              q-icon(v-if="fieldStates['createdOn'] === 'error'" name="error" color="error")
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
      album: {},
      fieldStates: {},
      ongoingChange: false
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
    modified (field) {
      this.ongoingChange = true
      if (this.album[field] !== this.item.data[field]) {
        this.setFieldStatus(field, 'modified')
      } else {
        this.setFieldStatus(field)
      }
    },
    save (field) {
      let input = {
        id: this.item.itemId,
        modifiedOn: date.formatDate(Date.now(), 'YYYY-MM-DDTHH:mm:ss.SSSZ')
      }
      let value = this.album[field].trim()
      input[field] = (value === '') ? null : value
      this.setFieldStatus(field, 'saving')

      let updateQuery = this.$Amplify.graphqlOperation(updateAlbum, { input: input })
      this.$Amplify.API.graphql(updateQuery).then(result => {
        this.setFieldStatus(field, 'saved')
        setTimeout(this.setFieldStatus.bind(this), 2500, field)
        this.$q.notify({
          message: 'Value saved',
          color: 'positive',
          timeout: 2000,
          position: 'top-right'
        })
      }).catch(err => {
        this.setFieldStatus(field, 'error')
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
    },
    setFieldStatus (field, value = '') {
      this.fieldStates[field] = value
      if (value === '') {
        this.ongoingChange = false
      }
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
