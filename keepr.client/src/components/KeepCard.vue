<template>
  <KeepDetailsModal :keep="keep" />
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
export default {
  props: {
    keep: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {
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
