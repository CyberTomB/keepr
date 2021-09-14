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
                <div class="row flex-grow-1">
                  <div class="col-12">
                    <h3 class="text-center">
                      <b>{{ keep.name }}</b>
                    </h3>
                    <p>{{ keep.description }}</p>
                  </div>
                </div>
                <!-- Bottom buttons -->
                <div class="row justify-content-around align-items-end">
                  <div class="col-md-6">
                    <!-- <button type="button" class="btn btn-success" @click="addToKeep">
                      Add <span class="mdi mdi-arrow-right-drop-circle" />
                    </button> -->
                    <div class="action">
                      Add to Vault:
                      <select v-model="state.vaultId" @change="addToVault">
                        <option v-for="v in yourVaults" :key="v.id" :value="v.id">
                          {{ v.name }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-2">
                    <i class="mdi mdi-delete action" title="Delete Keep" v-show="creatorMatch"></i>
                  </div>
                  <router-link :to="{name: 'Profile', params: {id: keep.creator.id}}" class="col-md-4 action" @click="closeModal(`#keepModal${keep.id}`)">
                    <div class="row align-items-end">
                      <img :src="activeKeep.creator.picture" class="img-fluid rounded col-6" alt="">
                      <span class="text-truncate col-6">{{ activeKeep.creator.name }}</span>
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
import $ from 'jquery'
import Pop from '../utils/Notifier'
import { keepsService } from '../services/KeepsService'
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
      activeKeep: computed(() => AppState.activeKeep),
      yourVaults: computed(() => AppState.yourVaults),
      creatorMatch: computed(() => {
        return AppState.activeKeep.creatorId === AppState.account.id
      }),
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
      },
      closeModal(modalId) {
        // eslint-disable-next-line no-undef
        $(modalId).modal('hide')
        // eslint-disable-next-line no-undef
        $('body').removeClass('modal-open')
        // eslint-disable-next-line no-undef
        $('.modal-backdrop').remove()
      }
    }
  }
}
</script>
