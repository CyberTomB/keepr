<template>
  <form @submit.prevent="emit$('create')">
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
</template>
