import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class KeepsService {
  async getAll() {
    try {
      const res = await api.get('/api/keeps')
      logger.log(res.data)
      AppState.keeps = res.data
    } catch (err) {
      logger.error('Keeps Service GetAll', err)
    }
  }
}

export const keepsService = new KeepsService()
