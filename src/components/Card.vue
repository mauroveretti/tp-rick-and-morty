<script setup>
import Estado from './Estado.vue'
defineProps(['personaje'])
</script>
<template>
  <div class="card h-100 tarjeta">
    <img :src="personaje.image" class="card-img-top imagen" :alt="personaje.name" />
    <div class="card-body">
      <h2 class="card-title h5">{{ personaje.name }}</h2>
      <Estado :estado="personaje.status" />
      <span class="text-secondary ms-2">{{ personaje.species }}</span>
    </div>
    <div class="card-footer bg-transparent border-0 pb-3">
      <RouterLink :to="'/detalle/' + personaje.id" class="btn btn-success btn-sm">
        Ver detalle
      </RouterLink>
      <!-- Lugar para botones extra (por ejemplo "Quitar" en favoritos) -->
      <slot></slot>
    </div>
  </div>
</template>
<style scoped>
.tarjeta {
  transition: transform 0.2s, box-shadow 0.2s;
}
.tarjeta:hover {
  transform: translateY(-4px);
  border-color: var(--bs-success);
  box-shadow: 0 0 18px rgba(151, 206, 76, 0.45);
}
/* Mientras la imagen carga se ve un cuadrado gris en lugar de un hueco */
.imagen {
  aspect-ratio: 1 / 1;
  background-color: var(--bs-secondary-bg);
}
</style>
