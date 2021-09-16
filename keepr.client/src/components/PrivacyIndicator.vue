<template>
  <i class="privacy-indicator mdi" :class="isPrivate ? state.privateClass : state.publicClass"></i>
</template>

<script>
import { reactive } from '@vue/reactivity'
export default {
  props: {
    isPrivate: {
      type: Boolean,
      default: true
    }
  },
  setup() {
    const state = reactive({
      privateClass: 'mdi-lock',
      publicClass: 'mdi-lock-open-variant'
    })
    return {
      state
    }
  }
}
</script>

<style scoped>
.privacy-indicator{
  color: rgb(76, 22, 93);
}
</style>
