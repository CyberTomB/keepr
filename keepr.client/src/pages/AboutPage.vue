<template>
  <div class="container" v-if="github.login">
    <div class="row h-100 align-items-center">
      <div class="col-6 d-flex justify-content-center">
        <div class="card" style="width: 25rem;">
          <img :src="github.avatar_url" class="card-img-top" alt="...">
          <div class="card-body">
            <h4 class="card-title pb-2">
              Developer: <b>{{ github.name }}</b>
            </h4>
            <p class="card-text">
              {{ github.bio }}
            </p>
          </div>
          <div class="card-footer d-flex justify-content-around">
            <IconLink :mdi="'github'" :href="github.html_url" rel="external" target="_blank" title="Github/CyberTomB">
              &nbsp;Github
            </IconLink>
            <IconLink :mdi="'linkedin'" href="https://www.linkedin.com/in/tombowers93/" title="LinkedIn/Tombowers93" target="_blank">
              &nbsp;LinkedIn
            </IconLink>
            <IconLink :mdi="'email'" :size="16" href="mailto:tomcbowers@gmailcom" title="Email">
              &nbsp;tomcbowers@gmail.com
            </IconLink>
          </div>
        </div>
      </div>
      <div class="col-6">
        <h1>Welcome to Keepr!</h1>
        <p>Create keeps, save keeps to vaults, and have fun creating collections of images and text to share with everyone you know!</p>
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

<style scoped>
h4.card-title{
  border-bottom: 1px solid var(--info);
}
</style>
