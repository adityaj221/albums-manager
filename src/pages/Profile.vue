<template lang="pug">
  q-page(padding)
    h1 Welcome, {{user.username}}
</template>

<script>
export default {
  name: 'Profile',
  data () {
    return {
      user: ''
    }
  },
  beforeCreate () {
    this.$Auth.currentAuthenticatedUser()
      .then(user => {
        this.user = user
      })
      .catch(() => {
        this.user = null
      })
  }
}
</script>

<style>
</style>
