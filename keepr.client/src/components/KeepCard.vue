<template>
  <div class="card my-1 shadow">
    <div class="card-body">
      <img :src="keep.img" alt="image" class="img-fluid">
      <h4>{{ keep.name }}</h4>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    keep: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {}
  }
}
</script>
