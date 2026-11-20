<script setup>
import { ref, onMounted } from 'vue'
import Card from '../components/Card.vue'

const favoritos = ref([])

onMounted(() => {
  favoritos.value = JSON.parse(localStorage.getItem('favoritos')) || []
})

const quitar = (id) => {
  favoritos.value = favoritos.value.filter((p) => p.id != id)
  localStorage.setItem('favoritos', JSON.stringify(favoritos.value))
}
</script>

<template>
  <h1 class="h2 fw-bold mb-4">Favoritos</h1>

  <p v-if="favoritos.length == 0" class="alert alert-info">
    Todavía no agregaste favoritos. Entrá al detalle de un personaje para agregarlo.
  </p>

  <div class="row g-3">
    <div v-for="personaje in favoritos" :key="personaje.id" class="col-12 col-sm-6 col-md-4 col-lg-3">
      <Card :personaje="personaje">
        <button class="btn btn-outline-danger btn-sm ms-2" @click="quitar(personaje.id)">Quitar</button>
      </Card>
    </div>
  </div>
</template>
