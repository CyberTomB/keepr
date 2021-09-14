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
    }
  }

  async getAllByProfile(id) {
    try {
      const res = await api.get(`/api/profiles/${id}/keeps`)
      logger.log(res.data)
      AppState.keeps = res.data
    } catch (error) {
      logger.error('Keeps', error)
    }
  }

  async getAllByVault(id) {
    try {
      const res = await api.get(`/api/vaults/${id}/keeps`)
      logger.log(res.data)
      AppState.keeps = res.data
    } catch (error) {
      logger.error('Vaults', error)
    }
  }

  async getOne(id) {
    // const found = AppState.keeps.find(k => k.id === id)
    // if (found) {
    //   AppState.activeKeep = found
    // }
    try {
      const res = await api.get('/api/keeps/' + id)
      logger.log(res.data)
      AppState.activeKeep = res.data
    } catch (err) {
      logger.error('Keeps Service GetOne', err)
    }
  }

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
      return false
    }
  }

  async removeFromVault(vkId) {
    try {
      const res = await api.delete('/api/vaultkeeps/' + vkId)
      logger.log('remove keep:', res.data)
      AppState.keeps = AppState.keeps.filter(k => k.vaultKeepId !== vkId)
    } catch (error) {
      logger.error('Keeps Remove Vault', error)
    }
  }

  async create(keep) {
    try {
      const res = await api.post('api/keeps/', keep)
      logger.log(res.data)
      AppState.keeps.unshift(res.data)
    } catch (error) {
      Pop.toast(error, 'error')
    }
  }

  async delete(id) {
    try {
      const res = await api.delete('/api/keeps/' + id)
      Pop.toast('Deleted', 'success')
      logger.log('delete keep: ' + id, res.data)
      AppState.keeps = AppState.keeps.filter(k => k.id !== id)
    } catch (error) {
      logger.error('Keep Delete' + id, error)
    }
  }
}

export const keepsService = new KeepsService()
