<template lang="pug">
  q-page(padding)
    h1 Create new Album
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
                filled
                v-model="name"
                :value="name"
                label="Name"
              )
              q-input(
                dark
                v-model="description"
                :value="description"
                filled
                type="textarea"
                label="Description"
              )
              q-select(
                dark
                filled
                options-dense
                v-model="parentAlbum"
                :value="parentAlbum"
                :options="options"
                label="Parent Album"
                emit-value
                map-options
              )
              q-btn(color="accent" label="Create" :disabled="btnStatus" @click="mutate")
</template>

<script>
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
      newAlbumId: uid()
    }
  },
  computed: {
    createAlbumMutation () {
      let summary = this.description
      let order = 1
      let slug = slugify(this.name)
      let timestamp = Date.now()
      let createdOn = date.formatDate(timestamp, 'YYYY-MM-DDTHH:mm:ss.SSSZ')
      let parentId = this.parentAlbum
      if (parentId === null) {
        parentId = 'root'
      }

      let input = {
        id: this.newAlbumId,
        name: this.name,
        description: this.description,
        summary,
        parentId,
        order,
        slug,
        visibility: 'public',
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
