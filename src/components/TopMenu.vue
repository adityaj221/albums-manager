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
      v-if="$q.screen.gt.xs && this.albumId"
      flat dense no-wrap no-caps
      icon="cloud_upload"
      label="Upload"
    )

    q-dialog(v-model="showNewAlbumForm" persistent)
      new-album(:parentId="albumId")
</template>

<script>
export default {
  name: 'TopMenu',
  data () {
    return {
      showNewAlbumForm: false,
      albumId: '0'
    }
  }
}
</script>
