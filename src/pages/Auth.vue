<template lang="pug">
  q-page
    .window-height.window-width.row.justify-center.items-center
      amplify-authenticator(:authConfig="authConfig")
</template>

<script>
export default {
  name: 'Auth',
  props: [],
  data () {
    return {
      authConfig: {
        signUpConfig: {
          hiddenDefaults: [
            'phone_number'
          ]
        }
      }
    }
  }
}
</script>

<style>
</style>
