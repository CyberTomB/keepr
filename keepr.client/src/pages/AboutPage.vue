<template>
  <div class="container" v-if="github.login">
    <div class="row h-100 align-items-center">
      <div class="col d-flex justify-content-center">
        <div class="card" style="width: 18rem;">
          <img :src="github.avatar_url" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">
              {{ github.name }}
            </h5>
            <p class="card-text">
              {{ github.bio }}
            </p>
          </div>
          <div class="card-footer">
            <IconLink :mdi="'github'">
              &nbsp;Github
            </IconLink>
            <IconLink :mdi="'linkedin'">
              &nbsp;LinkedIn
            </IconLink>
            <IconLink :mdi="'email'" :size="16">
              &nbsp;tomcbowers@gmail.com
            </IconLink>
          </div>
        </div>
      </div>
    </div>
  </div>
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
