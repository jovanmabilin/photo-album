<template>
  <q-page class="q-pa-sm">
    <Album />
  </q-page>
</template>

<script>
import Album from './album/Album.vue'
export default {
  name: 'PageIndex',
  components: {
    Album,
  },
  created () {
    this.$store.dispatch('album/getAlbumList')
    this.$store.dispatch('user/getUserList')
    this.$store.dispatch('photo/getPhotoList')
  }
}
</script>
