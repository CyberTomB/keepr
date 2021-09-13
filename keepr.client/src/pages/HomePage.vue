<template>
  <div class="home flex-grow-1 d-flex flex-column align-items-center justify-content-center">
    <h1>KEEPS</h1>
    <h3 v-for="k in keeps" :key="k.id">
      {{ k.name }}
    </h3>
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { keepsService } from '../services/KeepsService'
export default {
  name: 'Home',
  setup() {
    onMounted(async() => {
      await keepsService.getAll()
    })
    return {
      keeps: computed(() => AppState.keeps)
    }
  }
}
</script>

<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}
</style>
