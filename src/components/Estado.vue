<script setup>
defineProps(['estado'])
</script>
<template>
  <span v-if="estado == 'Alive'" class="badge text-bg-success">Vivo</span>
  <span v-else-if="estado == 'Dead'" class="badge text-bg-danger">Muerto</span>
  <span v-else class="badge text-bg-secondary">Desconocido</span>
</template>
