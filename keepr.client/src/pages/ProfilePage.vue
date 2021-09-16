<template>
  <div v-if="state.loading" class="container">
    Loading...
  </div>
  <div v-else class="container">
    <CreateKeepModal />
    <CreateVaultModal />
    <div class="row justify-content-start py-3">
      <div class="col-12 profile-name">
        <img :src="profile.picture" alt="Profile Image" :title="profile.name" id="profile-img">
        <div id="profile-details">
          <h1 id="profile-name">
            {{ profile.name }}
          </h1>
          <span>Vaults: {{ vaults.length }}</span>
          <br>
          <span>Keeps: {{ keeps.length }}</span>
        </div>
      </div>
    </div>
    <div class="row py-2">
      <h1 class="col-12">
        Vaults <span class="mdi mdi-plus-circle-outline text-success action" v-if="showCreateButtons" @click="getModal('#createVault')" title="Create Vault"></span>
      </h1>
      <div class="col-12 card-columns">
        <VaultPreviewCard v-for="v in vaults" :key="v.id" :vault="v" />
      </div>
    </div>
    <div class="row py-2">
      <h1 class="col-12">
        Keeps <span class="mdi mdi-plus-circle-outline text-success action" v-if="showCreateButtons" title="Create Keep" @click="getModal('#createKeep')"></span>
      </h1>
      <div class="col-12 card-columns" id="keeps">
        <KeepCard v-for="k in keeps" :key="k.id" :keep="k" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive, ref } from '@vue/runtime-core'
import { profilesService } from '../services/ProfilesService'
import { vaultsService } from '../services/VaultsService'
import { useRoute, useRouter } from 'vue-router'
import { AppState } from '../AppState'
import { keepsService } from '../services/KeepsService'
import $ from 'jquery'
import { logger } from '../utils/Logger'
export default {
  setup() {
    const state = reactive({
      loading: false
    })
    const router = useRouter()
    const route = useRoute()
    onMounted(async() => {
      state.loading = true
      await profilesService.getProfile(route.params.id)
      await vaultsService.getAllByProfile(route.params.id)
      await keepsService.getAllByProfile(route.params.id)
      state.loading = false
    })
    return {
      state,
      router,
      route,
      routeId: computed(() => route.params.id),
      profile: computed(() => AppState.profile),
      vaults: computed(() => AppState.vaults),
      keeps: computed(() => AppState.keeps),
      getModal(target) {
        $(target).modal('toggle')
      },
      showCreateButtons: computed(() => {
        return AppState.account.id === route.params.id
      })
    }
  },
  watch: {
    routeId: async function(newRoute, oldRoute) {
      if (oldRoute !== newRoute && this.route.name === 'Profile') {
        logger.log('route info:', this.route.name)
        // this.router.push({ name: 'Profile', params: { id: newRoute } })
        // await profilesService.getProfile(newRoute)
        this.state.loading = true
        await profilesService.getProfile(newRoute)
        await vaultsService.getAllByProfile(newRoute)
        await keepsService.getAllByProfile(newRoute)
        this.state.loading = false
      }
    }
  }
}
</script>

<style scoped>
  #keeps.card-columns {
  column-count: 5;
  }
@media only screen and (max-width: 768px) {
  .card-columns {
    column-count: 2;
  }
  #keeps.card-columns {
    column-count: 2;
  }
}

#profile-name{
  position: relative;
}

#profile-details{
  position: absolute;
  top: 1vh;
  left: 10rem;
}
</style>
