<script setup>
defineProps(['pagina', 'totalPaginas'])
const emit = defineEmits(['cambiar'])
</script>
<template>
  <nav class="d-flex justify-content-center align-items-center gap-3 my-4">
    <button class="btn btn-outline-secondary" :disabled="pagina <= 1" @click="emit('cambiar', pagina - 1)">
      Anterior
    </button>
    <span>Página {{ pagina }} de {{ totalPaginas }}</span>
    <button
      class="btn btn-outline-secondary"
      :disabled="pagina >= totalPaginas"
      @click="emit('cambiar', pagina + 1)"
    >
      Siguiente
    </button>
  </nav>
</template>
