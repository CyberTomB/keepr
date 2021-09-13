import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class ProfilesService {
  async getProfile(id) {
    try {
      const res = await api.get('/api/profiles/' + id)
      logger.log(res.data)
      AppState.profile = res.data
    } catch (error) {
      logger.error('Profile', error)
    }
  }
}

export const profilesService = new ProfilesService()
