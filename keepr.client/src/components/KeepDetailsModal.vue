<template>
  <div class="modal fade" :id="`keepModal${keep.id}`" tabindex="-1" aria-labelledby="keepModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-body">
          <div class="container-fluid">
            <div class="row">
              <div class="col-12 text-right m-0">
                <span data-dismiss="modal">X</span>
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
                  <div class="col-4">
                    <button type="button" class="btn btn-success" @click="addToKeep">
                      Add
                    </button>
                  </div>
                  <div class="col-4">
                    <i class="mdi mdi-delete"></i>
                  </div>
                  <div class="col-4">
                    <div class="row align-items-end">
                      <img :src="keep.creator.picture" class="img-fluid rounded col-6" alt="">
                      <span class="text-truncate col-6">{{ keep.creator.name }}</span>
                    </div>
                  </div>
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
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import Pop from '../utils/Notifier'
export default {
  props: {
    keep: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    return {
      activeKeep: computed(() => AppState.activeKeep),
      creatorMatch: computed(() => {
        if (AppState.activeKeep.creator.id === AppState.user.id) {
          return true
        }
        return false
      }),
      addToKeep() {
        // TODO: write function
        logger.log('Placeholder Test')
        // Pop.toast('Added', 'success')
      }
    }
  }
}
</script>
