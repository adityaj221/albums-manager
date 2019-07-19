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
        top-menu
        q-space

        .q-gutter-sm.row.items-center.no-wrap
          q-btn(round dense flat icon="notifications")
            q-badge(color="red" text-color="white" floating) 2
            q-tooltip Notifications
          q-btn(round dense flat icon="account_circle")
            q-tooltip Account
            q-menu
              q-list
                q-item(clickable :to="{name: 'profile'}")
                  q-item-section(avatar)
                    q-icon(name="settings")
                  q-item-section
                    q-item-label Profile
                    q-item-label(caption) View your profile
                q-item(clickable @click="signOut")
                  q-item-section(avatar)
                    q-icon(name="exit_to_app")
                  q-item-section
                    q-item-label Logout
    q-drawer(
      v-model="leftDrawerOpen"
      bordered
      content-class="bg-grey-2"
    )
      q-scroll-area(style="height: 100%")
        app-menu.q-my-lg

    q-page-container
      router-view

    q-footer
      .text-right.q-pr-sm.text-caption Quasar v{{ $q.version }}
</template>

<script>
import AppMenu from 'components/AppMenu'
import TopMenu from 'components/TopMenu'

export default {
  name: 'Layout',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  components: {
    AppMenu,
    TopMenu
  },
  methods: {
    async signOut () {
      await this.$Auth.signOut()
        .then(data => console.log('data', data)) // eslint-disable-line no-console
        .catch(err => console.log('err', err)) // eslint-disable-line no-console
      this.$AmplifyEventBus.$emit('authState', 'signedOut')
    }
  }
}
</script>

<style>
</style>
