<template>
  <div v-if="state.loading" class="container">
    Loading...
  </div>
  <div v-else class="container">
    <div class="row">
      <div class="col-12">
        This is the profile page of {{ profile.name }}
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
      keeps: computed(() => AppState.keeps)
    }
  }
}
</script>
