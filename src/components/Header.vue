<template>
  <div class="header-container">
    <template v-if="getAlbum">
      <q-btn
        flat
        round
        dense
        icon="keyboard_backspace"
        class="q-mr-sm"
        @click="goBack"
      ></q-btn>
      <span>{{ getAlbum.title }}</span>
    </template>
    <template v-else>
      <span v-if="getUser">{{ getUser.name }}</span>
    </template>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapGetters('album', {
        getAlbum: 'getAlbum'
      }),
      ...mapGetters('user', {
        getUser: 'getUser'
      })
    },
    methods: {
      goBack() {
        this.$store.dispatch('album/getAlbum', null)
      }
    }
  }
</script>

<style lang="scss" scoped>
.header-container {
  background-color: #fff;
  color: #000;
  padding: 10px;
  height: 50px;
  display: flex;
  align-items: center;
}
</style>