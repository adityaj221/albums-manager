<template lang="pug">
  q-page(padding)
    h1 Edit Album
    .q-pa-md
      .q-gutter-xs(style="max-width: 600px")
        amplify-connect(
          :mutation="updateAlbumMutation"
          @done="onUpdateFinished"
        )
          template(slot-scope="{loading, mutate, errors}")
            div(v-if="loading")
              q-spinner(color="primary" size="3em")
            div(v-else-if="errors.length > 0") {{errors}}
            div.q-gutter-md(v-else)
              q-input(
                v-model="name"
                :value="name"
                label="Name"
              )
              q-input(
                v-model="slug"
                :value="slug"
                label="Slug"
              )
              q-input(
                v-model="order"
                :value="order"
                label="Order"
                type="number"
              )
              q-input(
                v-model="description"
                :value="description"
                filled
                type="textarea"
                label="Description"
              )
              q-input(
                v-model="summary"
                :value="summary"
                filled
                type="textarea"
                label="Summary"
              )
              q-select(
                options-dense
                v-model="parentAlbum"
                :value="parentAlbum"
                :options="options"
                label="Parent Album"
                emit-value
                map-options
              )
              q-input(
                v-model="visibility"
                :value="visibility"
                label="Visibility"
              )
              q-input(
                v-model="status"
                :value="status"
                label="Status"
              )
              q-input(
                v-model="createdOn"
                :value="createdOn"
                label="Created"
              )
              q-input(
                v-model="modifiedOn"
                :value="modifiedOn"
                label="Modified"
              )
              q-btn(color="primary" label="Save" :disabled="btnStatus" @click="mutate")
</template>

<script>
import { getAlbum } from '../graphql/queries'
import { updateAlbum } from '../graphql/mutations'
import { date } from 'quasar'

export default {
  name: 'AlbumCreate',
  created () {
    this.parentAlbum = this.albumParentId
    this.albumId = this.$route.params.id
    this.$Amplify.API.graphql(this.getAlbumQuery).then(res => {
      let item = res.data.getAlbum
      this.name = item.name
      this.parentAlbum = item.parentId
      this.description = item.description
      this.summary = item.summary
      this.order = item.order
      this.slug = item.slug
      this.visibility = item.visibility
      this.status = item.status
      this.createdOn = item.createdOn
      this.modifiedOn = item.modifiedOn
    })
  },
  beforeRouteUpdate (to, from, next) {
    this.albumId = to.params.id
    next()
  },
  data () {
    return {
      name: '',
      description: null,
      summary: null,
      order: null,
      slug: null,
      parentAlbum: 'root',
      visibility: 'public',
      status: 'draft',
      createdOn: null,
      modifiedOn: null
    }
  },
  computed: {
    updateAlbumMutation () {
      let summary = this.summary
      let order = this.order
      let slug = this.name
      let timestamp = Date.now()
      let modifiedOn = date.formatDate(timestamp, 'YYYY-MM-DDTHH:mm:ss.SSSZ')
      let parentId = this.parentAlbum
      if (parentId === null) {
        parentId = 'root'
      }

      let input = {
        id: this.albumId,
        name: this.name,
        description: this.description,
        summary,
        parentId,
        order,
        slug,
        modifiedOn
      }

      return this.$Amplify.graphqlOperation(updateAlbum, { input: input })
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
    },
    getAlbumQuery () {
      return this.$Amplify.graphqlOperation(getAlbum, { id: this.albumId })
    }
  },
  methods: {
    onUpdateFinished () {
      this.name = null
      this.description = null
      this.parentId = {}
      this.$q.notify({
        message: 'Album Updated',
        html: true,
        color: 'positive',
        timeout: 2500,
        position: 'center'
      })
      this.$router.push({ path: `/album/${this.albumId}` })
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
