import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import Pop from '../utils/Notifier'
import { api } from './AxiosService'

class ProfilesService {
  async getProfile(id) {
    try {
      const res = await api.get('/api/profiles/' + id)
      logger.log(res.data)
      AppState.profile = res.data
    } catch (error) {
      logger.error('Profile', error)
      Pop.toast(error, 'error')
    }
  }
}

export const profilesService = new ProfilesService()
