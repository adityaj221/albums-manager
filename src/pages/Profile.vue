<template lang="pug">
  q-page(padding v-if="user && user.attributes")
    .row.q-gutter-md
      div
        avatar-uploader(v-bind:photoPickerConfig="photoPickerConfig")
      div.col-5
        .q-pa-md
          .q-gutter-md(style="max-width: 600px")
            q-input(
              dark
              dense
              standout="bg-grey-5 text-grey-8"
              v-model="user.username"
              label="Username"
              readonly
            )
            q-input(
              dark
              dense
              standout="bg-grey-5 text-grey-8"
              v-model="user.attributes.email"
              label="E-Mail"
              readonly
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
              v-model="user.attributes.locale"
              :value="user.attributes.locale"
              :options="languages"
              label="Language"
              @input="showUpdate = true"
            )
        q-btn(v-if="showUpdate" color="accent" label="Update" @click="saveAttributes")
</template>

<script>
import languages from 'quasar/lang/index.json'
import AvatarUploader from 'components/AvatarUploader'

export default {
  name: 'Profile',
  components: {
    AvatarUploader
  },
  data () {
    return {
      user: {},
      showUpdate: false
    }
  },
  computed: {
    languages () {
      let allowedLanguages = [
        'de',
        'fr',
        'en-us',
        'en-gb'
      ]
      let options = languages
        .filter(lang => allowedLanguages.indexOf(lang.isoName) > -1)
        .map(lang => ({
          label: lang.nativeName, value: lang.isoName
        }))
      return options
    },
    photoPickerConfig () {
      return {
        header: null,
        accept: 'image/*',
        path: `profiles/${this.user.username}`,
        defaultName: 'avatar',
        storageOptions: {
          level: 'public'
        },
        url: this.user.attributes.picture
      }
    }
  },
  methods: {
    async saveAttributes () {
      await this.$Auth.updateUserAttributes(this.user, { 'locale': this.user.attributes.locale })
      this.user = await this.$Auth.currentAuthenticatedUser({ bypassCache: true })
    }
  },
  created () {
    this.$AmplifyEventBus.$on('fileUpload', path => {
      this.$Auth.updateUserAttributes(this.user, { 'picture': path })
        .then(res => {
          this.$Auth.currentAuthenticatedUser({ bypassCache: true }).then(user => {
            this.user = user
          })
        })
    })
    this.$Auth.currentAuthenticatedUser()
      .then(user => {
        this.user = user
      })
  }

}
</script>

<style>
</style>
