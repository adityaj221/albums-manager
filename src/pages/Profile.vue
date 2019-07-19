<template lang="pug">
  q-page(padding)
    h1 Welcome, {{user.username}}
</template>

<script>
export default {
  name: 'Profile',
  computed: {
    signedIn: {
      get () {
        return this.$store.state.auth.signedIn
      }
    },
    user: {
      get () {
        return this.$store.state.auth.user
      }
    }
  }
}
</script>

<style>
</style>
