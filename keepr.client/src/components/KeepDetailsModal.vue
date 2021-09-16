<template>
  <div class="modal fade" :id="`keepModal${keep.id}`" aria-labelledby="keepModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-body">
          <div class="container-fluid">
            <div class="row">
              <div class="col-12 text-right m-0">
                <span class="action" data-dismiss="modal" title="close">X</span>
              </div>
              <div class="col-md-6">
                <img :src="keep.img" alt="This image did not load." class="img-fluid rounded">
              </div>
              <div class="col-md-6 d-flex flex-column justify-content-between">
                <!-- Metrics -->
                <div class="row py-2 justify-content-around f-16">
                  <div class="col-4 text-right">
                    <span class="mdi mdi-eye" title="Views">{{ " " + activeKeep.views }}</span>
                  </div>
                  <div class="col-4 text-center">
                    <span class="mdi mdi-safe" title="Keeps">{{ " " + activeKeep.keeps }}</span>
                  </div>
                  <!-- TODO: Implement Shares Link -->
                  <div class="col-4" title="Shares (Coming Soon!)">
                    <span class="mdi mdi-share-variant">{{ " " + activeKeep.shares }}</span>
                  </div>
                </div>
                <!-- Primary Content -->
                <div class="row flex-grow-1 align-content-around justify-content-center">
                  <div class="col-12">
                    <h3 class="text-center">
                      <b>{{ keep.name }}</b>
                    </h3>
                    <p>{{ keep.description }}</p>
                  </div>
                  <div class="line-break col-8 my-4"></div>
                </div>
                <!-- Bottom buttons -->
                <div class="row justify-content-around align-items-end">
                  <div class="col-5">
                    <div class="text-center" v-show="yourVaults.length > 0">
                      Add to Vault:
                      <select class="action vault-selector form-select bg-gray" aria-label="Add to Vault" v-model="state.vaultId" @change="addToVault" title="Add to Vault">
                        <option v-for="v in yourVaults" :key="v.id" :value="v.id">
                          {{ v.name }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="col-2 p-0"
                       v-if="creatorMatch"
                  >
                    <IconLink :mdi="'delete'"
                              :closed="'text-danger'"
                              :open="'bg-danger'"
                              :icon-size="'1.5rem'"
                              @click.stop="deleteKeep"
                              title="Delete"
                    />
                  </div>
                  <router-link
                    :to="{name: 'Profile', params: {id: keep.creator.id}}"
                    :class="creatorMatch ? 'col-4 pl-0' : 'col-5'"
                    class="action profile-info d-flex align-items-center"
                    @click="closeModal"
                    :title="activeKeep.creator.name + ' profile'"
                  >
                    <img :src="activeKeep.creator.picture" class="profile-img" alt="This image did not load.">
                    <span class="profile-name ml-2">{{ activeKeep.creator.name }}</span>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import Pop from '../utils/Notifier'
import { keepsService } from '../services/KeepsService'
import { modalHandler } from '../utils/ModalHandler'
import IconLink from './IconLink.vue'
export default {
  components: { IconLink },
  props: {
    keep: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const state = reactive({
      vaultId: 0
    })
    return {
      state,
      closeModal() { modalHandler.close(`#keepModal${props.keep.id}`) },
      activeKeep: computed(() => {
        if (AppState.activeKeep.id) {
          return AppState.activeKeep
        }
        return props.keep
      }),
      yourVaults: computed(() => AppState.yourVaults),
      creatorMatch: computed(() => {
        return AppState.activeKeep.creatorId === AppState.account.id
      }),
      async deleteKeep() {
        try {
          if (await Pop.confirm('Are you sure about that?')) {
            await keepsService.delete(props.keep.id)
            modalHandler.close(`#keepModal${props.keep.id}`)
          }
        } catch (error) {
          Pop.toast(error, 'error')
        }
      },
      async addToVault() {
        // TODO: write function
        logger.log('Placeholder Test', state.vaultId)
        try {
          const added = await keepsService.addToVault(state.vaultId, props.keep.id)
          logger.log(added)
          if (added) {
            await Pop.toast('Added', 'success', 'bottom-end', 1000, false)
          } else { Pop.toast('Something went wrong', 'error', 'bottom-end', 2000) }
        } catch (error) {
          logger.error(error)
          Pop.toast(error, 'error')
        }
      }
    }
  }
}
</script>

<style scoped>
.profile-info{
  position: relative;
}

.profile-img{
  bottom: 0.2rem;
    border-radius: 50%;
  object-fit: cover;
  max-width: 6vh;
  max-height: 6vh;
}

.profile-name{
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
}

.line-break{
  height: 1px;
  background-color: var(--gray);
}

.vault-selector{
  max-width: 100%;
}

</style>
