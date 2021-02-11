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
        <span>Photo</span>
        <q-popup-proxy>
          <q-banner class="q-pa-sm">
            <q-form @submit="addPhoto">
              <q-input
                v-model="newPhotoTitle"
                outlined
                label="Title"
                type="text"
                dense
                class="q-pb-sm"
                :rules="[isRequired('Title is required')]"
                hide-bottom-space
              >
              </q-input>
              <q-btn color="primary" class="float-right" flat dense  type="submit">Add</q-btn>
            </q-form>
          </q-banner>
        </q-popup-proxy>
    </q-btn>
    <template v-if="photoList.length">
      <div class="row q-col-gutter-md">
        <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-xs-12" v-for="(photo, index) in photoList" :key="index">
          <q-card bordered flat class="cursor-pointer">
            <q-img :src="photo.thumbnailUrl" class="cursor-pointer" @click="openCarousel(photo)">
              <div class="absolute-bottom custom-caption">
                <div>{{ photo.title }}</div>
              </div>
            </q-img>
            <q-card-actions>
              <template v-if="!photo.isEdit">
                <div class="photo-item photo-action">
                  <div class="photo-action-item">
                  </div>
                  <div class="photo-action-item">
                    <q-btn color="primary" flat dense @click.stop="enableEdit(photo)">Edit</q-btn>
                    <q-btn color="negative" flat dense @click.stop="deletePhoto(photo.id)">Delete</q-btn>
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="photo-item photo-action">
                  <div class="photo-action-input">
                    <q-form @submit.stop="updatePhoto(photo)">
                      <q-input
                        v-model="photoTitle"
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
                    <q-btn size="sm" color="positive" icon="done" flat dense @click.stop="updatePhoto(photo)"></q-btn>
                    <q-btn size="sm" color="negative" icon="close" flat dense @click.stop="cancelEdit(photo)"></q-btn>
                  </div>
                </div>
              </template>
            </q-card-actions>
          </q-card>
        </div>
      </div>
      <q-dialog v-model="isCarousel">
        <q-card style="width:100%">
          <PhotoCarousel :selectedSlide="selectedSlide" :photoList="photoList" v-if="isCarousel" />
        </q-card>
      </q-dialog>
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
import PhotoCarousel from './PhotoCarousel.vue'
export default {
  components: {
    PhotoCarousel,
  },
  data () {
    return {
      newPhotoTitle: null,
      photoTitle: null,
      isCarousel: false,
      selectedSlide: 1,
    }
  },
  computed: {
    ...mapGetters('photo', {
      getPhotoList: 'getPhotoList'
    }),
    ...mapGetters('album', {
      getAlbum: 'getAlbum'
    }),
    photoList() {
      if ( !this.getPhotoList.length || !this.getAlbum ) return [];
      const photoList = this.getPhotoList.filter(item => {
        item.isEdit = false
        return item.albumId === this.getAlbum.id
      })
      return JSON.parse(JSON.stringify(photoList));
    }
  },
  methods: {
    openCarousel (photo) {
      this.selectedSlide = photo.id
      this.isCarousel = true
    },
    addPhoto () {
      if ( !this.newPhotoTitle ) return;
      this.$store.dispatch('photo/addPhoto', { albumId: this.getAlbum.id, title: this.newPhotoTitle  })
      this.newPhotoTitle = null;
      this.$q.notify({
        icon: 'check_circle',
        color: 'positive',
        position: 'bottom-right',
        message: 'Photo successfully added',
        timeout: 3000
      })
    },
    updatePhoto (photo) {
      if ( !this.photoTitle ) return;
      let params = {
        id: photo.id,
        title: this.photoTitle
      }
      this.$store.dispatch('photo/updatePhoto', params)
      this.cancelEdit(photo)
      this.$q.notify({
        icon: 'check_circle',
        color: 'positive',
        position: 'bottom-right',
        message: 'Photo successfully updated',
        timeout: 3000
      })
    },
    deletePhoto (id) {
      this.$store.dispatch('photo/deletePhoto', { id: id  })
      this.$q.notify({
        icon: 'check_circle',
        color: 'positive',
        position: 'bottom-right',
        message: 'Photo successfully deleted',
        timeout: 3000
      })
    },
    enableEdit(photo) {
      this.resetEditState()
      this.photoTitle = photo.title
      photo.isEdit = true
      this.$forceUpdate()
    },
    getPhoto(photo) {
      this.$store.dispatch('photo/getPhoto', photo)
    },
    cancelEdit(photo) {
      this.photoTitle = null;
      photo.isEdit = false;
      this.$forceUpdate();
    },
    resetEditState() {
      this.photoList.forEach(photo => {
        photo.isEdit = false
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
.photo-container {
  display: grid;
  grid-template-columns: 1fr 60px;
  justify-content: space-between;
  gap: 10px;
}
.photo-action {
  display: flex;
  justify-content: flex-end;
}
.custom-caption {
  text-align: center;
  padding: 12px;
  color: white;
  background-color: rgba(0, 0, 0, .3);
}
.photo-action {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.photo-action-input {
  flex-grow: 1;
}
</style>
