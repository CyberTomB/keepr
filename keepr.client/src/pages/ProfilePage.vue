<template>
  <h1>This is the profile page of {{ profile.name }}</h1>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { profilesService } from '../services/ProfilesService'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
export default {
  setup() {
    const route = useRoute()
    onMounted(async() => {
      profilesService.getProfile(route.params.id)
    })
    return {
      profile: computed(() => AppState.profile)
    }
  }
}
</script>
