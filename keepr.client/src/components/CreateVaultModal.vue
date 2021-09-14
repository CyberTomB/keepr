<template>
  <div class="modal fade"
       id="createVault"
       tabindex="-1"
       role="dialog"
       aria-labelledby="Create vault"
       aria-hidden="true"
  >
    <div class="modal-dialog" role="form">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            Create Vault
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close" title="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <!-- REGION FORM -->
        <form @submit.prevent="createVault">
          <div class="modal-body">
            <div class="form-group">
              <label for="vault-name">Name:</label>
              <input type="text"
                     name="vault-name"
                     id="vault-name"
                     maxlength="80"
                     placeholder="New vault"
                     class="form-control"
                     v-model="state.vault.name"
                     required
              >
            </div>
            <div class="form-group">
              <label for="vault-description">Description:</label>
              <textarea name="vault-description"
                        id="vault-description"
                        minlength="3"
                        placeholder="Tell us about it..."
                        class="form-control"
                        v-model="state.vault.description"
              >
              </textarea>
            </div>
            <div class="form-check">
              <input type="checkbox" class="form-check-input" v-model="state.vault.isPrivate" id="isPrivate">
              <label for="isPrivate" class="form-check-label">Private?</label>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal" aria-label="Close" title="Close">
              Close
            </button>
            <button type="submit" class="btn btn-primary">
              Create Vault
            </button>
          </div>
        </form>
        <!-- END REGION -->
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import $ from 'jquery'
import Pop from '../utils/Notifier'
import { vaultsService } from '../services/VaultsService'
import { modalHandler } from '../utils/ModalHandler'
export default {
  setup() {
    const state = reactive({
      vault: {
        name: '',
        description: '',
        isPrivate: false
      }
    })
    return {
      state,
      closeModal: modalHandler.close('#createVault'),
      async createVault() {
        try {
          await vaultsService.create(state.vault)
          Pop.toast('Created Vault', 'success')
          state.vault = {
            name: '',
            description: '',
            isPrivate: false
          }
        } catch (error) {
          Pop.toast(error, 'error')
        }
        modalHandler.close('#createVault')
      }
    }
  }
}
</script>
