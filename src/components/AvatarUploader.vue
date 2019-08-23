<template lang="pug">
  div
    div {{options.header}}
      div
        div(
          style="width:250px; height:250px;"
          @click="imgClick"
        )
          q-img(
            v-if="photoUrl"
            :src="photoUrl"
            style="max-width: 100%"
          )
          div(v-if="!photoUrl" style="height:100%")
            .flex.flex-center.bg-grey-7.text-white(style="height:100%")
              q-icon(
                name="account_circle"
                size="10vw"
              )
        q-input.hidden(
          id="avatarUploader"
          ref="file_input"
          type="file"
          :accept="options.accept"
          @change="pick"
        )
      q-btn.q-my-md(color="accent" v-if="file" v-on:click="upload" :disabled="!file") {{options.title}}
      .bg-negative(v-if="error") {{ error }}
</template>

<script>
// use this instead? https://www.npmjs.com/package/vue-avatar-editor-improved
export default {
  name: 'PhotoPicker',
  props: ['photoPickerConfig'],
  data () {
    return {
      logger: {},
      file: null,
      s3ImagePath: '',
      photoUrl: '',
      error: ''
    }
  },
  computed: {
    options () {
      const defaults = {
        header: this.$Amplify.I18n.get('File Upload'),
        title: this.$Amplify.I18n.get('Upload'),
        accept: '*/*',
        storageOptions: {}
      }
      return Object.assign(defaults, this.photoPickerConfig || {})
    }
  },
  mounted () {
    this.logger = new this.$Amplify.Logger(this.$options.name)
    if (!this.options.path) {
      return this.setError('File path not provided.')
    }
    if (this.options.path.substr(this.options.path.length - 1) !== '/') {
      this.options.path = this.options.path + '/'
    }
    if (this.photoPickerConfig.url) {
      this.$Amplify.Storage.get(this.photoPickerConfig.url, { level: 'public' })
        .then(imageUrl => {
          this.photoUrl = imageUrl
        })
    }
  },
  methods: {
    upload: function () {
      this.$Amplify.Storage.put(
        this.s3ImagePath,
        this.file,
        this.options.storageOptions
      )
        .then((result) => {
          this.completeFileUpload(result.key)
        })
        .catch(e => this.setError(e))
    },
    imgClick (e) {
      document.getElementById('avatarUploader').click()
    },
    pick: function (evt) {
      this.file = evt.target.files[0]
      if (!this.file) { return };
      if (!this.options.storageOptions.contentType) {
        this.options.storageOptions.contentType = this.file.type
      }
      const name = this.options.defaultName ? this.options.defaultName : this.file.name
      this.s3ImagePath = `${this.options.path}${name}`
      const that = this
      const reader = new FileReader()
      reader.onload = (e) => {
        const target = e.target
        const url = target.result
        that.photoUrl = url
      }
      reader.readAsDataURL(this.file)
    },
    completeFileUpload: function (img) {
      this.file = null
      this.s3ImageFile = null
      // this.$refs.file_input.value = null
      this.$AmplifyEventBus.$emit('fileUpload', img)
    },
    setError: function (e) {
      this.error = this.$Amplify.I18n.get(e.message || e)
      this.logger.error(this.error)
    }
  }
}
</script>
