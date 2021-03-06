<template>
  <KeepDetailsModal :keep="keep" />
  <div class="keep-card card my-2 shadow selectable" @click="getModal(keep.id)">
    <img class="keep-img action rounded" :src="keep.img || '../assets/img/keep-placeholder.png'" alt="This image did not load.">
    <span class="keep-name f-16 text-light">
      {{ keep.name }}
    </span>
    <img class="keep-creator-img img-fluid" :src="keep.creator.picture" :alt="keep.creator.name">
    <IconLink v-if="vaultView"
              title="Remove from Vault"
              @click.stop="removeFromVault(keep.vaultKeepId)"
              class="keep-remove"
              :mdi="'sticker-remove'"
              :closed="'text-danger'"
              :open="'bg-danger'"
              :size="'16px'"
    >
      &nbsp;Remove?
    </IconLink>
  </div>
</template>

<script>
import { keepsService } from '../services/KeepsService'
import $ from 'jquery'
import Pop from '../utils/Notifier'
import { computed, reactive } from '@vue/runtime-core'
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
    const state = reactive({
      mouseOver: false
    })
    return {
      state,
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
          Pop.toast('Removed', 'success', 'bottom-end', 1000)
        } catch (error) {
          logger.error(error)
          Pop.toast(error, 'error')
        }
      }
    }
  }
}
</script>

<style>
.keep-card{
  position: relative;
  text-align: center;
}

.keep-img{
  min-height: 100px;
  height: 100%;
  width: 100%;
}

.keep-name{
  position: absolute;
  bottom: 1.5vh;
  left: 1vw;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
}

.keep-creator-img{
  position: absolute;
  bottom: 1vh;
  right: 1vw;
  border-radius: 50%;
  object-fit: cover;
  width: 5vh;
  height: 5vh;
  margin: auto;
}

.keep-remove{
  position: absolute;
  top: 1vh;
  left: 1vh;
  transition: all 0.2s linear;
  z-index: 1;
}

.keep-card:hover{
  transform: scale(1.01);
}
</style>
