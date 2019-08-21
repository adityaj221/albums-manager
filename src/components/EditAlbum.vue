<template lang='pug'>
  q-list(dark v-if="signedIn && album")
    q-expansion-item(label="Covers" v-bind="expansionItemStyle")

    q-expansion-item(label="Properties" v-bind="expansionItemStyle")
      .q-pa-md(:icon-status="ongoingChange")
        .q-gutter-md
          q-input(
            dark
            dense
            standout="bg-grey-5 text-grey-8"
            v-model.lazy="album.name"
            :value="album.name"
            label="Name"
            @input="modified('name')"
            @keyup.esc="revert('name')"
          )
            template(v-slot:after)
              .column
                q-icon.col(v-if="fieldStates['name'] === 'saved'" name="done" color="positive")
                q-icon.col.cursor-pointer(v-if="fieldStates['name'] === 'modified'" name="cancel" @click="revert('name')")
                q-icon.col.cursor-pointer(v-if="fieldStates['name'] === 'modified'" name="save" @click="save('name')")
                q-icon.col(v-if="fieldStates['name'] === 'saving'" name="save" color="positive")
                q-icon.col(v-if="fieldStates['name'] === 'error'" name="error" color="error")
          q-input(
            dark
            dense
            standout="bg-grey-5 text-grey-8"
            v-model.lazy="album.description"
            :value="album.description"
            label="Description"
            type="textarea"
            @keyup.esc="revert('description')"
            @input="modified('description')"
          )
            template(v-slot:after)
              .column
                q-icon.col(v-if="fieldStates['description'] === 'saved'" name="done" color="positive")
                q-icon.col.cursor-pointer(v-if="fieldStates['description'] === 'modified'" name="cancel" @click="revert('description')")
                q-icon.col.cursor-pointer(v-if="fieldStates['description'] === 'modified'" name="save" @click="save('description')")
                q-icon.col(v-if="fieldStates['description'] === 'saving'" name="save" color="positive")
                q-icon.col(v-if="fieldStates['description'] === 'error'" name="error" color="error")
          q-input(
            dark
            dense
            standout="bg-grey-5 text-grey-8"
            v-model="album.summary"
            :value="album.summary"
            label="Summary"
            type="textarea"
            @input="modified('summary')"
            @keyup.esc="revert('summary')"
          )
            template(v-slot:after)
              .column
                q-icon.col(v-if="fieldStates['summary'] === 'saved'" name="done" color="positive")
                q-icon.col.cursor-pointer(v-if="fieldStates['summary'] === 'modified'" name="save" @click="save('summary')")
                q-icon.col.cursor-pointer(v-if="fieldStates['summary'] === 'modified'" name="cancel" @click="reset('summary')")
                q-icon.col(v-if="fieldStates['summary'] === 'saving'" name="save" color="positive")
                q-icon.col(v-if="fieldStates['summary'] === 'error'" name="error" color="error")
    q-expansion-item(label="Site" v-bind="expansionItemStyle")
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
            @keyup.esc="revert('slug')"
          )
            template(v-slot:after)
              .column
                q-icon.col(v-if="fieldStates['slug'] === 'saved'" name="done" color="positive")
                q-icon.col.cursor-pointer(v-if="fieldStates['slug'] === 'modified'" name="save" @click="save('slug')")
                q-icon.col.cursor-pointer(v-if="fieldStates['slug'] === 'modified'" name="cancel" @click="revert('slug')")
                q-icon.col(v-if="fieldStates['slug'] === 'saving'" name="save" color="positive")
                q-icon.col(v-if="fieldStates['slug'] === 'error'" name="error" color="error")
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
            @input="modified('visibility')"
            @keyup.esc="revert('visibility')"
          )
            template(v-slot:after)
              .column
                q-icon.col(v-if="fieldStates['visibility'] === 'saved'" name="done" color="positive")
                q-icon.col.cursor-pointer(v-if="fieldStates['visibility'] === 'modified'" name="save" @click="save('visibility')")
                q-icon.col.cursor-pointer(v-if="fieldStates['visibility'] === 'modified'" name="cancel" @click="revert('visibility')")
                q-icon.col(v-if="fieldStates['visibility'] === 'saving'" name="save" color="positive")
                q-icon.col(v-if="fieldStates['visibility'] === 'error'" name="error" color="error")
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
            @input="modified('status')"
            @keyup.esc="revert('status')"
          )
            template(v-slot:after)
              .column
                q-icon.col(v-if="fieldStates['status'] === 'saved'" name="done" color="positive")
                q-icon.col.cursor-pointer(v-if="fieldStates['status'] === 'modified'" name="save" @click="save('status')")
                q-icon.col.cursor-pointer(v-if="fieldStates['status'] === 'modified'" name="cancel" @click="revert('status')")
                q-icon.col(v-if="fieldStates['status'] === 'saving'" name="save" color="positive")
                q-icon.col(v-if="fieldStates['status'] === 'error'" name="error" color="error")
    q-expansion-item(label="History" v-bind="expansionItemStyle")
      .q-pa-md
        .q-gutter-md
          q-input(
            dark
            dense
            standout="bg-grey-5 text-grey-8"
            v-model="createdOn"
            :value="createdOn"
            label="Created"
            mask="####-##-## ##:##:##"
            @input="modified('createdOn')"
            @change="modified('createdOn')"
            @keyup.esc="revert('createdOn')"
          )
            template(v-slot:prepend)
              q-icon.cursor-pointer(name="event")
                q-popup-proxy(transition-show="scale" transition-hide="scale")
                  q-date(dark color="accent" v-model="createdOn" mask="YYYY-MM-DD HH:mm:ss" today-btn)

            template(v-slot:append)
              q-icon.cursor-pointer(name="access_time")
                q-popup-proxy(transition-show="scale" transition-hide="scale")
                  q-time(dark color="accent" minimal v-model="createdOn" mask="YYYY-MM-DD HH:mm:ss" format24h with-seconds now-btn)
            template(v-slot:after)
              .column
                q-icon.col(v-if="fieldStates['createdOn'] === 'saved'" name="done" color="positive")
                q-icon.col.cursor-pointer(v-if="fieldStates['createdOn'] === 'modified'" name="save" @click="save('createdOn', true)")
                q-icon.col.cursor-pointer(v-if="fieldStates['createdOn'] === 'modified'" name="cancel" @click="revert('createdOn')")
                q-icon.col(v-if="fieldStates['createdOn'] === 'saving'" name="save" color="positive")
                q-icon.col(v-if="fieldStates['createdOn'] === 'error'" name="error" color="error")
          q-input(
            dark
            dense
            standout="bg-grey-5 text-grey-8"
            v-model="modifiedOn"
            :value="modifiedOn"
            label="Last Modified"
            readonly
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
      ongoingChange: false,
      expansionItemStyle: {
        dense: true,
        'default-opened': true,
        'switch-toggle-side': true,
        'expand-separator': true,
        'header-class': 'text-uppercase'
      }
    }
  },
  created () {
    this.album = extend({}, this.item.data)
    this.fieldStates = {}
  },
  watch: {
    item () {
      this.album = extend({}, this.item.data)
      this.fieldStates = {}
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
    revert (field) {
      this.album[field] = this.item.data[field]
      this.setFieldStatus(field)
    },
    save (field, isDate = false) {
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
    },
    createdOn: {
      get () {
        return date.formatDate(this.album.createdOn, 'YYYY-MM-DD HH:mm:ss')
      },
      set (val) {
        this.album.createdOn = date.formatDate(val, 'YYYY-MM-DDTHH:mm:ss.SSSZ')
        this.modified('createdOn')
      }
    },
    modifiedOn: {
      get () {
        return date.formatDate(this.album.modifiedOn, 'YYYY-MM-DD HH:mm:ss')
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
