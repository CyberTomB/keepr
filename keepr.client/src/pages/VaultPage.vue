<template>
  <div class="container d-flex">
    <div class="row" v-if="state.loading">
      <h1>Loading...</h1>
    </div>
    <div class="row flex-grow-1 align-content-start" v-else>
      <h1 class="col-12">
        {{ vault.name }} <PrivacyIndicator
          @mouseenter="state.isPrivate = !vault.isPrivate"
          @mouseleave="state.isPrivate = vault.isPrivate"
          class="action"
          :is-private="state.isPrivate"
          title="Toggle Privacy"
          @click="togglePrivacy"
          v-if="creatorMatch"
        />
        <IconLink v-if="creatorMatch"
                  :mdi="'delete'"
                  :closed="'text-danger'"
                  :open="'bg-danger'"
                  :size="'1rem'"
                  :wrap-size="'2.5rem'"
                  :icon-size="'2rem'"
                  title="Delete Vault"
                  @click="deleteVault"
        >
          <em> &nbsp;Delete Vault?</em>
        </IconLink>
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
      loading: false,
      isPrivate: false
    })
    const route = useRoute()
    onMounted(async() => {
      state.loading = true
      const access = await vaultsService.getOne(route.params.id)
      if (!access.isValid) {
        logger.log('access:', access)
        router.push({ name: 'Home' })
      }
      state.isPrivate = access.isPrivate
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
      async togglePrivacy() {
        try {
          const rawVault = {
            id: route.params.id,
            isPrivate: true,
            name: AppState.activeVault.name
          }
          if (await Pop.confirm(`Are you sure you want to make ${AppState.activeVault.name} ${AppState.activeVault.isPrivate ? 'public' : 'private'}?`, '', 'question', 'Yes')) {
            rawVault.isPrivate = !AppState.activeVault.isPrivate
            const editedVault = await vaultsService.edit(rawVault)
            state.isPrivate = editedVault.isPrivate
          }
        } catch (error) {
          Pop.toast('Something went wrong', 'error')
        }
      },
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
