<template>
  <div class="modal fade"
       id="createKeep"
       tabindex="-1"
       role="dialog"
       aria-labelledby="Create Keep"
       aria-hidden="true"
  >
    <div class="modal-dialog" role="form">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            Create Keep
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close" title="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <!-- REGION FORM -->
        <form @submit.prevent="createKeep">
          <div class="modal-body">
            <div class="form-group">
              <label for="keep-name">Name:</label>
              <input type="text"
                     name="keep-name"
                     id="keep-name"
                     maxlength="80"
                     placeholder="New keep"
                     class="form-control"
                     v-model="state.keep.name"
                     required
              >
            </div>
            <div class="form-group">
              <label for="keep-img">Image URL:</label>
              <input type="text"
                     name="keep-img"
                     id="keep-img"
                     placeholder="http//www.newimage.com"
                     class="form-control"
                     v-model="state.keep.img"
                     required
              >
            </div>
            <div class="form-group">
              <label for="keep-description">Description:</label>
              <textarea name="keep-description"
                        id="keep-description"
                        minlength="3"
                        placeholder="Tell us about it..."
                        class="form-control"
                        v-model="state.keep.description"
              >
              </textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal" aria-label="Close" title="Close">
              Close
            </button>
            <button type="submit" class="btn btn-primary">
              Create Keep
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
import { keepsService } from '../services/KeepsService'
import $ from 'jquery'
import Pop from '../utils/Notifier'
import { modalHandler } from '../utils/ModalHandler'
export default {
  setup() {
    const state = reactive({
      keep: {
        name: '',
        img: '',
        description: ''
      }
    })
    return {
      state,
      closeModal: modalHandler.close('#createKeep'),
      async createKeep() {
        try {
          await keepsService.create(state.keep)
          Pop.toast('Created Keep', 'success')
          state.keep = {
            name: '',
            img: '',
            description: ''
          }
        } catch (error) {
          Pop.toast(error, 'error')
        }
        modalHandler.close('#createKeep')
      }
    }
  }
}
</script>
