<template>
  <div class="container">
    <div class="row" v-if="state.loading">
      <h1>Loading...</h1>
    </div>
    <div class="row" v-else>
      <h1 class="col-12">
        {{ vault.name }}
      </h1>
      <div class="col-12 card-columns" v-if="keeps.length > 0">
        <KeepCard v-for="k in keeps" :key="k.id" :keep="k" :vault-view="true" />
      </div>
      <div class="col-12" v-else>
        <h4>There is no Keeps</h4>
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
      vault: computed(() => AppState.activeVault)
    }
  }
}
</script>
