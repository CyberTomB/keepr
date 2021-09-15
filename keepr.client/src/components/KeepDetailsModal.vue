<template>
  <!-- TODO: Fix the "v=if" statement that trips the modal up -->
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
                <img :src="keep.img" alt="image" class="img-fluid rounded">
              </div>
              <div class="col-md-6 d-flex flex-column justify-content-between">
                <!-- Metrics -->
                <div class="row py-2 justify-content-around">
                  <div class="col-4 text-right">
                    <span class="mdi mdi-eye">{{ " " + activeKeep.views }}</span>
                  </div>
                  <div class="col-4 text-center">
                    <span class="mdi mdi-safe">{{ " " + activeKeep.keeps }}</span>
                  </div>
                  <div class="col-4">
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
                  <div class="col-6">
                    <!-- <button type="button" class="btn btn-success" @click="addToKeep">
                      Add <span class="mdi mdi-arrow-right-drop-circle" />
                    </button> -->
                    <div class="action text-center" v-show="yourVaults.length > 0">
                      Add to Vault:
                      <select v-model="state.vaultId" @change="addToVault">
                        <option v-for="v in yourVaults" :key="v.id" :value="v.id">
                          {{ v.name }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="col-2">
                    <DeleteBtn v-show="creatorMatch" @delete="deleteKeep" />
                  </div>
                  <router-link :to="{name: 'Profile', params: {id: keep.creator.id}}" class=" action col-4" @click="closeModal">
                    <div class="row align-items-end">
                      <img :src="activeKeep.creator.picture" class="profile-img col-4" alt="">
                      <span class="text-truncate col-8">{{ activeKeep.creator.name }}</span>
                    </div>
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
export default {
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
      closeModal: modalHandler.close(`#keepModal${props.keep.id}`),
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
            await Pop.toast('Added to Vault', 'success')
          } else { Pop.toast('Something went wrong', 'error') }
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
.profile-img{
    border-radius: 50%;
  object-fit: cover;
  max-width: 10vh;
  max-height: 10vh;
}

.line-break{
  height: 1px;
  background-color: var(--gray);
}
</style>
