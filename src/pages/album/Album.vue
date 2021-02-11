<template>
  <q-page class="q-pa-sm">
    <component :is="currentComponent" />
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
import AlbumList from './AlbumList.vue'
import AlbumInfo from './AlbumInfo.vue'
export default {
  components: {
    AlbumList,
    AlbumInfo,
  },
  computed: {
    ...mapGetters('album', {
      getAlbumList: 'getAlbumList',
      getAlbum: 'getAlbum'
    }),
    currentComponent() {
      return this.getAlbum ? 'AlbumInfo' : 'AlbumList'
    }
  },
}
</script>
