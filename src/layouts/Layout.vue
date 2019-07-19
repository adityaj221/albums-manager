<template lang="pug">
  q-layout(view="hhh LpR fff")
    q-header(elevated)
      q-toolbar
        q-btn(
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
          class="q-mx-md"
        )

        q-toolbar-title.row.items-center.no-wrap(v-if="$q.screen.gt.sm" shrink)
          span.q-ml-sm Yapawa

        q-space

        .q-gutter-sm.row.items-center.no-wrap
          q-btn(round dense flat icon="notifications")
            q-badge(color="red" text-color="white" floating) 2
            q-tooltip Notifications
    q-drawer(
      v-model="leftDrawerOpen"
      bordered
      content-class="bg-grey-2"
    )
      q-scroll-area(style="height: 100%")

    q-page-container
      router-view

    q-footer
      .text-right.q-pr-sm.text-caption Quasar v{{ $q.version }}
</template>

<script>

export default {
  name: 'Layout',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
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
  },
  methods: {
    async signOut () {
      await this.$Auth.signOut()
        .then(data => console.log('data', data)) // eslint-disable-line no-console
        .catch(err => console.log('err', err)) // eslint-disable-line no-console
      this.signedIn = false
      this.user = ''
      this.$router.push({ name: 'auth' })
    }
  }
}
</script>

<style>
</style>
