<template lang="pug">
  .q-gutter-sm.row.items-center.no-wrap
    q-btn.q-ml-sm.q-px-md(v-if="$q.screen.gt.xs" flat dense no-wrap icon="add_photo_alternate" no-caps label="New Album" @click="showNewAlbumForm = true")
    q-btn.q-ml-sm.q-px-md(v-if="$q.screen.gt.xs && this.albumId" flat dense no-wrap icon="cloud_upload" no-caps label="Upload")

    q-dialog(v-model="showNewAlbumForm" persistent)
      new-album(:parentId="albumId")
</template>

<script>
import NewAlbum from 'components/NewAlbum'
export default {
  name: 'TopMenu',
  data () {
    return {
      showNewAlbumForm: false
    }
  },
  components: {
    NewAlbum: NewAlbum
  }
}
</script>
