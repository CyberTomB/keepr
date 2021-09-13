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

  async getOne(id) {
    const found = AppState.keeps.find(k => k.id === id)
    if (found) {
      AppState.activeKeep = found
    }
    try {
      const res = await api.get('/api/keeps/' + id)
      logger.log(res.data)
      AppState.activeKeep = res.data
    } catch (err) {
      logger.error('Keeps Service GetOne', err)
    }
  }
}

export const keepsService = new KeepsService()
