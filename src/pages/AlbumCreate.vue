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
                v-model="name"
                :value="name"
                label="Name"
              )
              q-input(
                v-model="description"
                :value="description"
                filled
                type="textarea"
                label="Description"
              )
              q-select(
                v-model="parentId"
                :value="parentId"
                :options="options"
                label="Parent Album"
              )
              q-btn(color="primary" label="Create" :disabled="btnStatus" @click="mutate")
</template>

<script>
import { createAlbum } from '../graphql/mutations'
import { date, uid } from 'quasar'

export default {
  name: 'AlbumCreate',
  data () {
    return {
      name: '',
      description: '',
      selectedOption: {},
      parentId: {},
      options: [],
      newAlbumId: uid()
    }
  },
  computed: {
    createAlbumMutation () {
      let summary = this.description
      let order = 1
      let slug = this.name
      let timestamp = Date.now()
      let createdOn = date.formatDate(timestamp, 'YYYY-MM-DDTHH:mm:ss.SSSZ')

      let input = {
        id: this.newAlbumId,
        name: this.name,
        description: this.description,
        summary,
        parentId: 'root',
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
        return this.$store.state.albums.selected
      }
    },
    albumTree: {
      get () {
        return this.$store.state.albums.tree
      }
    },
    buildOptions () {
      let tree = JSON.parse(this.albumTree)
      tree.forEach(item => {
        console.log(item) // eslint-disable-line no-console
      })
      return {}
    },
    buildOptionsItem () {
      return {}
    }

  },
  methods: {
    onCreateFinished () {
      this.name = null
      this.description = null
      this.parentId = {}
      this.$q.notify({
        message: 'Album Created<br/>Now add some photos',
        color: 'positive',
        timeout: 2500,
        position: 'center'
      })
      this.$router.push({ path: `/album/${this.newAlbumId}` })
    }
  },
  mounted () {
    this.buildOptions()
  }
}
</script>
