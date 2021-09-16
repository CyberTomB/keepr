import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import Pop from '../utils/Notifier'
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
      Pop.toast(error, 'error')
    }
  }

  async getOne(id) {
    const access = {
      isValid: true,
      isPrivate: false
    }
    try {
      const res = await api.get('/api/vaults/' + id)
      logger.log(res.data)
      AppState.activeVault = res.data
      access.isPrivate = res.data.isPrivate
      return access
    } catch (error) {
      logger.error('Vaults', error)
      Pop.toast(error, 'error')
      access.isValid = false
      return access
    }
  }

  async create(vault) {
    try {
      const res = await api.post('/api/vaults', vault)
      logger.log(res.data)
      // REVIEW: Why is this showing up twice on Profile Page?
      // AppState.vaults.push(res.data)
      AppState.yourVaults.push(res.data)
    } catch (error) {
      Pop.toast(error, 'error')
    }
  }

  async delete(id) {
    try {
      const res = await api.delete('/api/vaults/' + id)
      logger.log(res.data)
      Pop.toast('Deleted ' + res.data.name, 'success', 'bottom-end')
      AppState.vaults = AppState.vaults.filter(v => v.id !== res.data.id)
    } catch (error) {
      Pop.toast(error, 'error')
    }
  }

  /**
   *
   * @param {Object} rawVault
   * rawVault object should contain id and any properties you wish to change: isPrivate, name, description ::
   * name is required by server
   */
  async edit(rawVault) {
    try {
      const res = await api.put('/api/vaults/' + rawVault.id, rawVault)
      Pop.toast('Updated', 'success', 'bottom-end', 2000)
      logger.log(res.data)
      AppState.activeVault = res.data
      return res.data
    } catch (error) {
      logger.error('Vault update', error)
      Pop.toast(error, 'error')
    }
  }
}

export const vaultsService = new VaultsService()
