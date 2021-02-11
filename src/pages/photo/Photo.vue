<template>
  <q-page>
    <component :is="currentComponent"/>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
import PhotoList from './PhotoList.vue'
export default {
  components: {
    PhotoList,
  },
  data () {
    return {
      currentComponent: 'PhotoList'
    }
  },
}
</script>
