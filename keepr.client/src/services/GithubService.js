import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import Pop from '../utils/Notifier'
import { github } from './AxiosService'

class GithubService {
  async getGithub() {
    try {
      const res = await github.get('/users/cybertomb')
      AppState.github = res.data
    } catch (error) {
      logger.error("Couldn't retrieve GitHub Account")
      Pop.toast("Couldn't retrieve GitHub Account", 'error')
    }
  }
}

export const githubService = new GithubService()
