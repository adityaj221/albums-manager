<template lang="pug">
  q-layout.bg-grey-10.text-grey-1(view="hHh LpR fFf")
    q-header.bg-grey-9(elevated reveal)
      q-toolbar
        q-btn.q-mr-sm(
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
        )

        q-btn.text-bold(
          key="logo"
          flat
          no-caps
          no-wrap
          stretch
          :to="{name: 'home'}"
        )
          q-avatar
            img(src="~assets/yapawa-logo.svg")
          q-toolbar-title(shrink v-if="$q.screen.gt.xs") Yapawa - Content Management

        q-space

        top-menu.self-stretch.row.no-wrap(v-if="$q.screen.gt.xs")

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
      side="left"
      content-class="bg-grey-9"
    )
      q-scroll-area(style="height: 100%")
        app-menu

    q-drawer(
      v-model="rightDrawerOpen"
      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
      mini-to-overlay
      shown-if-above
      :mini-width="24"
      side="right"
      behavior="desktop"
      content-class="bg-grey-9"
      content-style="overflow-x: hidden"
      v-if="showEdit"
    )
      q-icon.q-mini-drawer-only(
        name="chevron_left"
        style="font-size: 1.8em"
      )
      q-scroll-area.q-mini-drawer-hide(style="height: 100%")
        edit-item

    q-page-container
      router-view

    q-footer.bg-grey-8(reveal)
      .text-right.q-pr-sm.text-caption Quasar v{{ $q.version }}
    fetch-albums
</template>

<script>
import AppMenu from 'components/AppMenu'
import TopMenu from 'components/TopMenu'
import FetchAlbums from 'components/FetchAlbums'
import EditItem from 'components/EditItem'

export default {
  name: 'Layout',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      rightDrawerOpen: true,
      miniState: true
    }
  },
  components: {
    AppMenu,
    TopMenu,
    FetchAlbums,
    EditItem
  },
  computed: {
    showEdit () {
      return this.$store.getters['albums/showEdit']
    }
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
