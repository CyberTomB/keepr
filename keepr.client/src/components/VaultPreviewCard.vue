<template>
  <router-link class="card" :to="{name: 'Vault', params: {id: vault.id}}">
    <div class="card-title">
      <h1>{{ vault.name }}</h1>
    </div>
  </router-link>
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
