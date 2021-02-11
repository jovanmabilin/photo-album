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

      <q-item-section side>
        <q-btn icon="info" color="primary" flat dense rounded @click="showUserInfo"></q-btn>
      </q-item-section>
    </q-item>
    <q-dialog v-model="isDialog">
      <q-card class="card-dimension q-pa-lg">
        <div class="grid-row q-mb-md">
          <div class="grid-column customer-photo">
            <q-img src="~assets/avatar.svg"></q-img>
          </div>
          <div class="grid-column customer-details">
            <strong>{{ `${getUser.name} (${getUser.username}) ` }}</strong>
            <div>{{ getUser.phone }}</div>
            <div>{{ getUser.email }}</div>
            <div>
              <a :href="`http://${getUser.website}`" target="_blank" class="text-primary">{{ getUser.website }}</a>
            </div>
          </div>
        </div>
        <q-card class="q-mb-sm" flat bordered>
          <q-card-section>
            <div class="address-details">
              <div class="label">Address</div>
              <div class="value">{{ `${getUser.address.street} ${getUser.address.suite} ${getUser.address.city} ${getUser.address.zipcode}` }}</div>
              <div class="value">
                <q-chip color="primary" text-color="white" size="sm">{{ `Latitude ${getUser.address.geo.lat}` }}</q-chip>
                <q-chip color="primary" text-color="white" size="sm">{{ `Longitude ${getUser.address.geo.lng}` }}</q-chip>
              </div>
            </div>
            <div class="address-details">
              <div class="label">Company</div>
              <div class="value">{{ getUser.company.name }}</div>
              <div class="value">"{{ getUser.company.catchPhrase }}"</div>
              <div class="value">
                <q-chip v-for="(value, index) in companyBS(getUser.company.bs)" :key="index" color="primary" text-color="white" size="sm">{{ value }}</q-chip>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      isDialog: false
    }
  },
  computed: {
    ...mapGetters('user', {
      getUserList: 'getUserList',
      getUser: 'getUser',
    })
  },
  methods: {
    companyBS(value) {
      return value.split(' ')
    },
    showUserInfo() {
      this.isDialog = true;
    },
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
<style scoped>
.grid-row {
  display: block;
  text-align: center
}
.customer-photo {
  width: 60px;
  height: 60px;
  margin: 0 auto;
}
.card-dimension {
  width: 600px;
}

.address-details {
  margin-bottom: 10px
}

.address-details .label {
  font-weight: 600;
}

.value-chip {
  display: inline-block
}
</style>