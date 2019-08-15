<template lang="pug">
  .q-gutter-xs.row.items-center.no-wrap
    q-btn.q-ml-sm.q-px-md(
      flat dense no-wrap no-caps
      icon="add_photo_alternate"
      :label="$q.screen.gt.xs ? 'New Album' : ''"
      :to="{name: 'newAlbum'}"
    )
    q-btn.q-ml-sm.q-px-md(
      flat dense no-wrap no-caps
      icon="cloud_upload"
      :label="$q.screen.gt.xs ? 'Upload' : ''"
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
