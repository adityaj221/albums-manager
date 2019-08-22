<template lang="pug">
  q-page(padding)
    .text-h5 Create new Album
    .q-pa-md
      .q-gutter-xs(style="max-width: 600px")
        amplify-connect(:mutation="createAlbumMutation" @done="onCreateFinished")
          template(slot-scope="{loading, mutate, errors}")
            div(v-if="loading")
              q-spinner(color="primary" size="3em")
            div(v-else-if="errors.length > 0") {{errors}}
            div.q-gutter-md(v-else)
              q-input(
                dark
                dense
                standout="bg-grey-5 text-grey-8"
                v-model="name"
                :value="name"
                label="Name"
              )
              q-input(
                dark
                dense
                standout="bg-grey-5 text-grey-8"
                v-model="description"
                :value="description"
                type="textarea"
                label="Description"
              )
              q-select(
                dark
                dense
                standout="bg-grey-5 text-grey-8"
                options-selected-class="text-accent"
                options-dense
                options-dark
                v-model="parentAlbum"
                :value="parentAlbum"
                :options="options"
                label="Parent Album"
                emit-value
                map-options
              )
              q-expansion-item(
                label="More Properties"
                dense
                switch-toggle-side
                expand-separator
                header-class = "text-uppercase"
              )
                div.q-gutter-md
                  q-input(
                    dark
                    dense
                    standout="bg-grey-5 text-grey-8"
                    v-model="summary"
                    :value="summary"
                    label="Summary"
                    type="textarea"
                  )
                  q-select(
                    dark
                    dense
                    standout="bg-grey-5 text-grey-8"
                    options-selected-class="text-accent"
                    options-dense
                    options-dark
                    emit-value
                    map-options
                    v-model="visibility"
                    :value="visibility"
                    label="Visibility"
                    :options="enumValues.visibility"
                  )
              q-btn(color="accent" label="Create" :disabled="btnStatus" @click="mutate")
</template>

<script>
const schema = require('../graphql/schema.json')
import { createAlbum } from '../graphql/mutations'
import { date, uid } from 'quasar'
const slugify = require('slugify')

export default {
  name: 'AlbumCreate',
  created () {
    this.parentAlbum = this.albumParentId
  },
  data () {
    return {
      name: '',
      description: null,
      parentAlbum: 'root',
      newAlbumId: uid(),
      visibility: 'public',
      summary: null
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
    createAlbumMutation () {
      let name = this.name ? this.name.trim() : null
      let description = this.description ? this.description.trim() : null
      let summary = this.summary ? this.summary.trim() : description
      let visibility = this.visibility ? this.visibility.trim() : null
      let order = 1
      let slug = name ? slugify(name) : null
      let timestamp = Date.now()
      let createdOn = date.formatDate(timestamp, 'YYYY-MM-DDTHH:mm:ss.SSSZ')
      let parentId = this.parentAlbum
      if (parentId === null) {
        parentId = 'root'
      }

      let input = {
        id: this.newAlbumId,
        name,
        description,
        summary,
        parentId,
        order,
        slug,
        visibility,
        status: 'draft',
        createdOn,
        modifiedOn: createdOn
      }

      return this.$Amplify.graphqlOperation(createAlbum, { input: input })
    },
    btnStatus () {
      return !(this.name.length > 0)
    },
    albumParentId: {
      get () {
        return this.$store.state.albums.activeAlbumId
      }
    },
    albumTree () {
      return this.$store.getters['albums/tree']
    },
    albumPath () {
      return this.$store.getters['albums/path'](this.selected)
    },
    options () {
      let options = []
      this.renderOptions(options, this.albumTree)
      return options
    }
  },
  methods: {
    onCreateFinished () {
      this.name = null
      this.description = null
      this.parentId = {}
      this.$q.notify({
        message: 'Album Created<br/>Now add some photos',
        html: true,
        color: 'positive',
        timeout: 2500,
        position: 'center'
      })
      this.$router.push({ path: `/album/${this.newAlbumId}` })
    },
    renderOptions (options, tree, depth = 0) {
      for (let i = 0; i < tree.length; i++) {
        let option = {
          label: `${'&nbsp;&nbsp;'.repeat(depth)}${tree[i].name}`,
          value: tree[i].id
        }
        options.push(option)
        if (tree[i].children && tree[i].children.length > 0) {
          options = this.renderOptions(options, tree[i].children, depth + 1)
        }
      }
      return options
    }
  }
}
</script>
