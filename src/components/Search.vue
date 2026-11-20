<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const nombre = ref('')

const buscar = () => {
  router.push({
    path: '/',
    query: { search: nombre.value },
  })
}
</script>
<template>
  <form class="d-flex mt-2 mt-md-0" role="search" @submit.prevent="buscar">
    <input
      v-model="nombre"
      name="search"
      class="form-control me-2"
      type="search"
      placeholder="Buscar personaje"
      aria-label="Buscar"
    />
    <button class="btn btn-outline-success" type="submit">Buscar</button>
  </form>
</template>
