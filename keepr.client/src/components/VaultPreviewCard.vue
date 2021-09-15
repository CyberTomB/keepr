<template>
  <router-link class="card rounded shadow p-2 selectable vault" :to="{name: 'Vault', params: {id: vault.id}}">
    <div class="card-title">
      <span class="f-18 text-wrap">{{ vault.name }} <i :class="vault.isPrivate ? 'privacy-indicator mdi mdi-lock' : ''"></i></span>
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

.vault{
  position: relative;
}

</style>
