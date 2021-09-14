import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class VaultsService {
  async getAllByProfile(id, yourVaults = false) {
    logger.log('vaultservice', id)
    try {
      const res = await api.get(`/api/profiles/${id}/vaults`)
      logger.log(res.data)
      if (yourVaults) {
        AppState.yourVaults = res.data
      }
      AppState.vaults = res.data
    } catch (error) {
      logger.error('Vaults', error)
    }
  }

  async getOne(id) {
    try {
      const res = await api.get('/api/vaults/' + id)
      logger.log(res.data)
      AppState.activeVault = res.data
    } catch (error) {
      logger.error('Vaults', error)
    }
  }
}

export const vaultsService = new VaultsService()
