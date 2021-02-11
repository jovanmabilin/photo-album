<template>
  <div v-if="photoList || photoList.length">
    <q-carousel
      swipeable
      animated
      arrows
      v-model="slide"
      :fullscreen.sync="fullscreen"
      infinite
    >
      <q-carousel-slide
        v-for="(photo, index) in photoList"
        :key="index"
        :name="photo.id"
        :img-src="photo.url"
      >
        <div class="absolute-top custom-caption">
          <div>{{ photo.title }}</div>
        </div>
      </q-carousel-slide>
    
      <template v-slot:control>
        <q-carousel-control
          position="bottom-right"
          :offset="[18, 18]"
        >
          <q-btn
            push round dense color="white" text-color="primary"
            :icon="fullscreen ? 'fullscreen_exit' : 'fullscreen'"
            @click="fullscreen = !fullscreen"
          />
        </q-carousel-control>
      </template>
    </q-carousel>
  </div>
</template>

<script>
  export default {
    props: {
      photoList: {
        type: Array,
        default: null
      },
      selectedSlide: {
        type: Number,
        default: null
      },
    },
    data() {
      return {
        slide: 0,
        fullscreen: false,
      }
    },
    watch:{
      selectedSlide: {
        handler(nv) {
          this.slide = nv;
        }, immediate: true
      }
    }
  }
</script>

<style lang="scss" scoped>
.custom-caption {
  text-align: center;
  padding: 12px;
  color: white;
  background-color: rgba(0, 0, 0, .3);
}
</style>