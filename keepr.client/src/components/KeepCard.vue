<template>
  <KeepDetailsModal :keep="keep" v-if="activeKeep" />
  <div class="card my-1 shadow" @click="getModal(keep.id)">
    <div class="card-body">
      <img :src="keep.img" alt="image" class="img-fluid">
      <h4>{{ keep.name }}</h4>
    </div>
  </div>
</template>

<script>
import { keepsService } from '../services/KeepsService'
import $ from 'jquery'
import Pop from '../utils/Notifier'
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
export default {
  props: {
    keep: {
      type: Object,
      required: true
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
      }
    }
  }
}
</script>
