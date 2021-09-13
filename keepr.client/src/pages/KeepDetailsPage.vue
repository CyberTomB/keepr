<template>
  <div class="container">
    <div class="row">
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { keepsService } from '../services/KeepsService'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
export default {
  setup() {
    const route = useRoute()
    onMounted(async() => {
      await keepsService.getOne(route.params.id)
    })
    return {
      activeKeep: computed(() => AppState.activeKeep)
    }
  }
}
</script>
