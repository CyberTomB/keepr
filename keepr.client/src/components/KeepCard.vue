<template>
  <KeepDetailsModal :keep="keep" />
  <div class="keep-card card my-2 shadow selectable">
    <img class="keep-img img-fluid action rounded" @click="getModal(keep.id)" :src="keep.img" alt="image">
    <h4 class="keep-name text-light px-3 py-2">
      {{ keep.name }}
    </h4>
    <img class="keep-creator-img img-fluid" :src="keep.creator.picture" :alt="keep.creator.name">
    <i class="mdi mdi-sticker-remove action" v-if="vaultView" title="Remove From Vault" @click.stop="removeFromVault(keep.vaultKeepId)"></i>
  </div>
</template>

<script>
import { keepsService } from '../services/KeepsService'
import $ from 'jquery'
import Pop from '../utils/Notifier'
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
export default {
  props: {
    keep: {
      type: Object,
      required: true
    },
    vaultView: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    return {
      activeKeep: computed(() => AppState.activeKeep),
      async getModal(id) {
        try {
          $(`#keepModal${id}`).modal('toggle')
          await keepsService.getOne(id)
        } catch (error) {
          Pop.toast(error, 'error')
        }
      },
      async removeFromVault(vkId) {
        try {
          await keepsService.removeFromVault(vkId)
        } catch (error) {
          logger.error(error)
        }
      }
    }
  }
}
</script>

<style>
.keep-card{
  display: grid !important;
  grid-template-columns: 20% 20% 20% 20% 20%;
  grid-template-rows: 20% 20% 20% 20% 20%;
}

.keep-img{
  grid-row-start: 1;
  grid-row-end: 6;
  grid-column-start: 1;
  grid-column-end: 6;
}

.keep-name{
  grid-row-start: 5;
  grid-column-start: 1;
  grid-column-end: 5;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
}

.keep-creator-img{
  align-content: flex-end;
  grid-row-start: 5;
  grid-column-start: 5;
  border-radius: 50%;
  object-fit: cover;
  width: 5vh;
  height: 5vh;
  margin: auto;
}
</style>
