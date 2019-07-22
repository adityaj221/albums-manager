<template lang="pug">
  .q-gutter-xs.row.items-center.no-wrap
    q-btn.q-ml-sm.q-px-md(
      v-if="$q.screen.gt.xs"
      flat dense no-wrap no-caps
      icon="add_photo_alternate"
      label="New Album"
      :to="{name: 'newAlbum'}"
    )
    q-btn.q-ml-sm.q-px-md(
      v-if="$q.screen.gt.xs"
      flat dense no-wrap no-caps
      icon="cloud_upload"
      label="Upload"
      :disable="(this.activeAlbumId === null)"
    )
</template>

<script>
export default {
  name: 'TopMenu',
  computed: {
    activeAlbumId: {
      get () {
        return this.$store.state.albums.activeAlbumId
      }
    }
  }
}
</script>
