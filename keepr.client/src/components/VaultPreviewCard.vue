<template>
  <router-link class="card rounded shadow p-2 selectable" :to="{name: 'Vault', params: {id: vault.id}}">
    <div class="card-title">
      <span class="f-18 text-wrap">{{ vault.name }}</span>
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

<style scoped>
:hover{
      transform: scale(1.01);
}
</style>
