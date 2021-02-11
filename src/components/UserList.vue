<template>
  <div>
    <q-item
      v-for="(user, index) in getUserList"
      :key="index"
      :active="user.id === getUser.id"
      clickable
      @click="showAlbums(user)"
    >
      <q-item-section avatar>
        <q-icon name="account_circle" />
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ user.name }}</q-item-label>
      </q-item-section>
    </q-item>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters('user', {
      getUserList: 'getUserList',
      getUser: 'getUser',
    })
  },
  methods: {
    showAlbums(user) {
      this.clearAlbum();
      this.$store.dispatch('user/getUser', user)
    },
    clearAlbum() {
      this.$store.dispatch('album/getAlbum')
    },
  },
}
</script>
