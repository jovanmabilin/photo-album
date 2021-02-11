<template>
  <q-page>
    <q-btn
        dense
        no-caps
        unelevated
        color="primary"
        padding="2px 10px 2px 10px"
        class="flex q-mb-sm"
      >
        <q-icon name="add" size="xs" class="q-mr-sm"></q-icon>
        <span>Album</span>
        <q-popup-proxy>
          <q-banner class="q-pa-sm">
            <q-form @submit="addAlbum">
              <q-input
                v-model="newAlbumTitle"
                outlined
                label="Title"
                type="text"
                dense
                class="q-pb-sm"
                :rules="[isRequired('Title is required')]"
                hide-bottom-space
                lazy-rules
              >
              </q-input>
              <q-btn color="primary" class="float-right" flat dense  type="submit">Add</q-btn>
            </q-form>
          </q-banner>
        </q-popup-proxy>
    </q-btn>
    <template v-if="albumList.length">
      <div class="row q-col-gutter-md">
        <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-xs-12" v-for="(album, index) in albumList" :key="index">
          <q-card bordered flat class="cursor-pointer" style="height: 100%">
            <q-img :src="album.thumbnailUrl" class="cursor-pointer" @click.stop="getAlbum(album)">
              <div class="custom-caption-1">
                <div>{{ album.photoLength }} photos</div>
              </div>
              <div class="absolute-bottom custom-caption-2">
                <div>{{  album.title }}</div>
              </div>
            </q-img>
            <q-card-actions>
              <template v-if="!album.isEdit">
                <div class="album-item album-action">
                  <div class="album-action-item">
                    <q-btn color="primary" flat dense @click.stop="getAlbum(album)">View Details</q-btn>
                  </div>
                  <div class="album-action-item">
                    <q-btn color="primary" flat dense @click.stop="enableEdit(album)">Edit</q-btn>
                    <q-btn color="negative" flat dense @click.stop="deleteAlbum(album.id)">Delete</q-btn>
                  </div>
                </div>
              </template>
              <template v-else>

                <div class="album-item album-action">
                  <div class="album-action-input">
                    <q-form @submit.stop="updateAlbum(album)">
                      <q-input
                        v-model="albumTitle"
                        outlined
                        label="Title"
                        type="text"
                        dense
                        :rules="[isRequired('Title is required')]"
                        hide-bottom-space
                        lazy-rules
                      >
                      </q-input>
                    </q-form>
                  </div>
                  <div>
                    <q-btn size="sm" color="positive" icon="done" flat dense @click.stop="updateAlbum(album)"></q-btn>
                    <q-btn size="sm" color="negative" icon="close" flat dense @click.stop="cancelEdit(album)"></q-btn>
                  </div>
                </div>
              </template>
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </template>
    <template v-else>
      <q-banner inline-actions rounded class="bg-orange text-white">
        No records to display
      </q-banner>
    </template>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      newAlbumTitle: null,
      albumTitle: null,
    }
  },
  computed: {
    ...mapGetters('album', {
      getAlbumList: 'getAlbumList'
    }),
    ...mapGetters('user', {
      getUser: 'getUser'
    }),
    ...mapGetters('photo', {
      getPhotoList: 'getPhotoList'
    }),
    albumList() {
      if ( !this.getAlbumList.length || !this.getUser ) return [];
      const albumList = this.getAlbumList.filter(item => {
        item.isEdit = false
        item.thumbnailUrl = this.getAlbumPhotos(item.id)
        item.photoLength = this.getAlbumPhotoLength(item.id)
        return item.userId === this.getUser.id
      })
      return JSON.parse(JSON.stringify(albumList));
    }
  },
  methods: {
    getAlbumPhotos(albumId) {
      if ( !this.getPhotoList.length || !albumId ) return 'https://via.placeholder.com/150/92c952'
      const photoList = this.getPhotoList.filter(item => item.albumId === albumId)
      const firstPhoto = photoList.length ? photoList[0].thumbnailUrl : 'https://via.placeholder.com/150/92c952'
      return firstPhoto;
    },
    getAlbumPhotoLength(albumId) {
      if ( !this.getPhotoList.length || !albumId ) return 0
      const photoList = this.getPhotoList.filter(item => item.albumId === albumId)
      return photoList.length || 0;
    },
    addAlbum () {
      if ( !this.newAlbumTitle ) return;
      this.$store.dispatch('album/addAlbum', { userId: this.getUser.id, title: this.newAlbumTitle  })
      this.newAlbumTitle = null;
      this.$q.notify({
        icon: 'check_circle',
        color: 'positive',
        position: 'bottom-right',
        message: 'Album successfully added',
        timeout: 3000
      })
    },
    updateAlbum (album) {
      if ( !this.albumTitle ) return;
      let params = {
        id: album.id,
        title: this.albumTitle
      }
      this.$store.dispatch('album/updateAlbum', params)
      this.cancelEdit(album)
      this.$q.notify({
        icon: 'check_circle',
        color: 'positive',
        position: 'bottom-right',
        message: 'Album successfully updated',
        timeout: 3000
      })
    },
    deleteAlbum (id) {
      this.$store.dispatch('album/deleteAlbum', { id: id  })
      this.$q.notify({
        icon: 'check_circle',
        color: 'positive',
        position: 'bottom-right',
        message: 'Album successfully deleted',
        timeout: 3000
      })
    },
    enableEdit(album) {
      console.log('Lol:', album)
      this.resetEditState()
      this.albumTitle = album.title
      album.isEdit = true
      this.$forceUpdate()
    },
    getAlbum(album) {
      console.log('getAlbum', album)
      this.$store.dispatch('album/getAlbum', album)
    },
    cancelEdit(album) {
      this.albumTitle = null;
      album.isEdit = false;
      this.$forceUpdate();
    },
    resetEditState() {
      this.albumList.forEach(album => {
        album.isEdit = false
      })
    },
    isRequired (message) {
      return (val) => {
        const newVal = val ? val.toString() : val
        return (newVal && newVal.length > 0) || message
      }
    },
  },
}
</script>
<style scoped>
.album-container {
  display: grid;
  grid-template-columns: 1fr 60px;
  justify-content: space-between;
  gap: 10px;
}

.custom-caption-2 {
  text-align: center;
  padding: 12px;
  color: white;
  background-color: rgba(0, 0, 0, .3);
}

.custom-caption-1 {
  text-align: right;
  padding: 8px;
  color: white;
  background-color: rgba(0, 0, 0, .3);
  margin: 5px;
  position: absolute;
  right: 0;
  font-size: 10px;
}

.album-action {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.album-action-input {
  flex-grow: 1;
}
</style>
