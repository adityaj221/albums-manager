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
        this.signedIn = true
        this.$router.push('/')
      }
      if (info === 'signedOut') {
        this.$router.push('/auth')
        this.signedIn = false
      }
    })
  },
  beforeCreate () {
    this.$Auth.currentAuthenticatedUser()
      .then(user => {
        this.signedIn = true
        this.user = user
      })
      .catch(() => {
        this.signedIn = false
        this.user = ''
      })
  },
  computed: {
    signedIn: {
      get () {
        return this.$store.state.auth.signedIn
      },
      set (val) {
        this.$store.commit('auth/setAuth', val)
      }
    },
    user: {
      get () {
        return this.$store.state.auth.user
      },
      set (val) {
        this.$store.commit('auth/setUser', val)
      }
    }
  }
}
</script>

<style>
</style>
