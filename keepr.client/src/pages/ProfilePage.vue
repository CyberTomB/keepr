<template>
  <div v-if="state.loading" class="container">
    Loading...
  </div>
  <div v-else class="container">
    <CreateKeepModal />
    <CreateVaultModal />
    <div class="row justify-content-start">
      <div class="col-md-6">
        <div class="row py-4 justify-content-between align-items-end">
          <div class="col-4">
            <img :src="profile.picture" alt="Profile Image" :title="profile.name">
          </div>
          <div class="col-7 d-flex flex-column justify-content-between">
            <h1>{{ profile.name }}</h1>
            <span>Vaults: {{ vaults.length }}</span>
            <span>Keeps: {{ keeps.length }}</span>
          </div>
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
      <div class="col-12 card-columns">
        <KeepCard v-for="k in keeps" :key="k.id" :keep="k" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from '@vue/runtime-core'
import { profilesService } from '../services/ProfilesService'
import { vaultsService } from '../services/VaultsService'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import { keepsService } from '../services/KeepsService'
import $ from 'jquery'
export default {
  setup() {
    const state = reactive({
      loading: false
    })
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
  }
}
</script>

<style scoped>
.card-columns {
  column-count: 5;
}
</style>
