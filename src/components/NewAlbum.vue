<template lang="pug">
  q-card(style="width: 700px; max-width: 80vw;")
    q-card-section.row.items-center
      .text-h6 New Album
      q-space
      q-btn(icon="close" flat round dense v-close-popup)
    q-card-section
      amplify-connect(:mutation="createAlbumMutation" @done="onCreateFinished")
        template(slot-scope="{loading, mutate, errors}")
          div(v-if="loading")
            q-spinner(color="primary" size="3em")
          div(v-else-if="errors.length > 0") {{errors}}
          div.q-gutter-md(v-else)
            q-input(v-model="name" label="Album Name")
            q-input(
              v-model="description"
              filled
              type="textarea"
              label="Description"
            )
            q-btn(color="primary" label="Create" :disabled="loading" @click="mutate")
</template>

<script>
import { createAlbum } from '../graphql/mutations'

export default {
  name: 'NewAlbumDialog',
  props: {
    parentId: String,
    parentDiv: String
  },
  data () {
    return {
      name: '',
      description: ''
    }
  },
  computed: {
    createAlbumMutation () {
      let input = {
        name: this.name,
        parentId: this.parentId
      }
      return this.$Amplify.graphqlOperation(createAlbum, { input: input })
    }
  },
  methods: {
    onCreateFinished () {
      this.name = null
      this.description = null
      this.$q.notify({
        message: 'Album Created',
        color: 'positive',
        timeout: 2500
      })
    }
  }
}
</script>
