<template>
  <div class="container" v-if="github.login"></div>
  <BeanEaterLoader v-else />
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { githubService } from '../services/GithubService'
import { AppState } from '../AppState'
export default {
  name: 'AboutPage',
  setup() {
    onMounted(async() => {
      await githubService.getGithub()
    })
    return {
      github: computed(() => AppState.github)
    }
  }
}
</script>
