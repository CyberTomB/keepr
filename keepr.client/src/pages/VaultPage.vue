<template>
  <div class="container d-flex">
    <div class="row" v-if="state.loading">
      <h1>Loading...</h1>
    </div>
    <div class="row flex-grow-1 align-content-start" v-else>
      <h1 class="col-12">
        {{ vault.name }} <span v-if="creatorMatch" class="mdi mdi-delete action text-danger" title="Delete Vault" @click="deleteVault"></span>
      </h1>
      <div class="col-12">
        <button class="btn btn-info" @click="returnToProfile">
          Go Back
        </button>
      </div>
      <div class="col-12 card-columns" v-if="keeps.length > 0">
        <KeepCard v-for="k in keeps" :key="k.id" :keep="k" :vault-view="creatorMatch" />
      </div>
      <div class="col-12" v-else>
        <h4><em>This Vault has no keeps... :(</em></h4>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from '@vue/runtime-core'
import { keepsService } from '../services/KeepsService'
import { useRoute, useRouter } from 'vue-router'
import { AppState } from '../AppState'
import { vaultsService } from '../services/VaultsService'
import { logger } from '../utils/Logger'
import Pop from '../utils/Notifier'
export default {
  setup() {
    const router = useRouter()
    const state = reactive({
      loading: false
    })
    const route = useRoute()
    onMounted(async() => {
      state.loading = true
      const access = await vaultsService.getOne(route.params.id)
      if (!access) {
        logger.log('access:', access)
        router.push({ name: 'Home' })
      }
      await keepsService.getAllByVault(route.params.id)
      state.loading = false
    })
    return {
      state,
      keeps: computed(() => AppState.keeps),
      vault: computed(() => AppState.activeVault),
      returnToProfile() {
        router.push({ name: 'Profile', params: { id: AppState.activeVault.creatorId } })
      },
      creatorMatch: computed(() => {
        return AppState.account.id === AppState.activeVault.creatorId
      }),
      async deleteVault() {
        try {
          if (await Pop.confirm('Are you sure you want to delete this vault?')) {
            await vaultsService.delete(route.params.id)
            router.push({ name: 'Profile', params: { id: AppState.account.id } })
          }
        } catch (error) {
          Pop.toast(error, 'error')
        }
      }
    }
  }
}
</script>

<style scoped>
  .card-columns {
  column-count: 4;
  }
@media only screen and (max-width: 768px) {
  .card-columns {
    column-count: 2;
  }
}
</style>
