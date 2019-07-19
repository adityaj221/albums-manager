<template lang="pug">
  #q-app
    router-view
</template>

<script>
export default {
  name: 'App',
  mounted () {
    this.$AmplifyEventBus.$on('authState', info => {
      if (info === 'signedIn') {
        this.$router.push({ name: 'home' })
      }
      if (info === 'signedOut') {
        this.$router.push('/auth')
      }
    })
  }
}
</script>

<style>
</style>
