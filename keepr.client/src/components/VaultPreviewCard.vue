<template>
  <div class="card">
    <div class="card-title">
      <h1>{{ vault.name }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    vault: {
      type: Object,
      required: true
    }
  }
}
</script>
