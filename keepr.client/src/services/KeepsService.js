import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import Pop from '../utils/Notifier'
import { api } from './AxiosService'

class KeepsService {
  async getAll() {
    try {
      const res = await api.get('/api/keeps')
      logger.log(res.data)
      AppState.keeps = res.data
      // To satisfy v-if statement on keep cards
      AppState.activeKeep = res.data[0]
    } catch (err) {
      logger.error('Keeps Service GetAll', err)
      Pop.toast(err, 'error')
    }
  }

  /**
 *
 * @param {string} id - Profile ID
 */
  async getAllByProfile(id) {
    try {
      const res = await api.get(`/api/profiles/${id}/keeps`)
      logger.log(res.data)
      AppState.keeps = res.data
    } catch (error) {
      logger.error('Keeps', error)
      Pop.toast(error, 'error')
    }
  }

  /**
   *
   * @param {number} id - Vault ID
   */
  async getAllByVault(id) {
    try {
      const res = await api.get(`/api/vaults/${id}/keeps`)
      logger.log(res.data)
      AppState.keeps = res.data
    } catch (error) {
      logger.error('Vaults', error)
      Pop.toast(error, 'error')
    }
  }

  async getOne(id) {
    try {
      const res = await api.get('/api/keeps/' + id)
      logger.log(res.data)
      AppState.activeKeep = res.data
    } catch (err) {
      logger.error('Keeps Service GetOne', err)
      Pop.toast(err, 'error')
    }
  }

  /**
   *
   * @param {number} vaultId
   * @param {number} keepId
   * @returns {boolean} - success is true
   */
  async addToVault(vaultId, keepId) {
    try {
      const newVK = {
        CreatorId: AppState.account.id,
        VaultId: vaultId,
        KeepId: keepId
      }
      const res = await api.post('/api/vaultkeeps', newVK)
      logger.log(res.data)
      return true
    } catch (error) {
      logger.error('Keeps Add Vault', error)
      Pop.toast(error, 'error')
      return false
    }
  }

  /**
   *
   * @param {number} vkId - vaultKeep ID
   */
  async removeFromVault(vkId) {
    try {
      const res = await api.delete('/api/vaultkeeps/' + vkId)
      logger.log('remove keep:', res.data)
      AppState.keeps = AppState.keeps.filter(k => k.vaultKeepId !== vkId)
    } catch (error) {
      logger.error('Keeps Remove Vault', error)
      Pop.toast(error, 'error')
    }
  }

  /**
   *
   * @param {Object<Keep>} keep
   */
  async create(keep) {
    try {
      const res = await api.post('api/keeps/', keep)
      logger.log(res.data)
      AppState.keeps.push(res.data)
    } catch (error) {
      Pop.toast(error, 'error')
    }
  }

  async delete(id) {
    try {
      const res = await api.delete('/api/keeps/' + id)
      Pop.toast('Deleted', 'success', 'bottom-end')
      logger.log('delete keep: ' + id, res.data)
      AppState.keeps = AppState.keeps.filter(k => k.id !== id)
    } catch (error) {
      logger.error('Keep Delete' + id, error)
      Pop.toast(error, 'error')
    }
  }
}

export const keepsService = new KeepsService()
