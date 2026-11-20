<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Estado from '../components/Estado.vue'

const route = useRoute()
const router = useRouter()
const personaje = ref(null)
const cargando = ref(false)
const error = ref(false)
const isFavorito = ref(false)

const leerFavoritos = () => JSON.parse(localStorage.getItem('favoritos')) || []

const fetchPersonaje = () => {
  cargando.value = true
  error.value = false
  fetch('https://rickandmortyapi.com/api/character/' + route.params.id)
    .then((res) => {
      if (!res.ok) {
        throw new Error('No se encontró el personaje')
      }
      return res.json()
    })
    .then((data) => {
      personaje.value = data
      isFavorito.value = leerFavoritos().some((p) => p.id == data.id)
    })
    .catch((err) => {
      console.log(err)
      error.value = true
    })
    .finally(() => {
      cargando.value = false
    })
}

const toggleFavorito = () => {
  let favoritos = leerFavoritos()
  if (isFavorito.value) {
    // Quitar
    favoritos = favoritos.filter((p) => p.id != personaje.value.id)
    isFavorito.value = false
  } else {
    // Agregar (guardamos solo lo que se muestra en la lista)
    const { id, name, image, status, species } = personaje.value
    favoritos.push({ id, name, image, status, species })
    isFavorito.value = true
  }
  localStorage.setItem('favoritos', JSON.stringify(favoritos))
}

onMounted(() => {
  fetchPersonaje()
})
</script>

<template>
  <div v-if="cargando" class="text-center my-5">
    <div class="spinner-border text-success" role="status"></div>
    <p>Cargando...</p>
  </div>

  <div v-else-if="error" class="alert alert-danger">
    <p>No se pudo cargar el personaje.</p>
    <button class="btn btn-danger" @click="fetchPersonaje">Reintentar</button>
  </div>

  <article v-else-if="personaje" class="card border-success overflow-hidden">
    <div class="row g-0">
      <div class="col-12 col-md-4">
        <img :src="personaje.image" class="img-fluid w-100" :alt="personaje.name" />
      </div>
      <div class="col-12 col-md-8">
        <div class="card-body">
          <h1 class="card-title h2 fw-bold mb-2">{{ personaje.name }}</h1>
          <p class="mb-4"><Estado :estado="personaje.status" /></p>
          <dl class="row">
            <dt class="col-sm-4">Especie</dt>
            <dd class="col-sm-8">{{ personaje.species }}</dd>

            <dt class="col-sm-4">Género</dt>
            <dd class="col-sm-8">{{ personaje.gender }}</dd>

            <dt class="col-sm-4">Origen</dt>
            <dd class="col-sm-8">{{ personaje.origin.name }}</dd>

            <dt class="col-sm-4">Ubicación</dt>
            <dd class="col-sm-8">{{ personaje.location.name }}</dd>

            <dt class="col-sm-4">Episodios</dt>
            <dd class="col-sm-8">{{ personaje.episode.length }}</dd>
          </dl>
          <button
            class="btn"
            :class="isFavorito ? 'btn-outline-danger' : 'btn-success'"
            @click="toggleFavorito"
          >
            <span v-if="isFavorito">Quitar de favoritos</span>
            <span v-else>Agregar a favoritos</span>
          </button>
        </div>
      </div>
    </div>
  </article>

  <button class="btn btn-outline-secondary btn-sm mt-3" @click="router.back()">Volver</button>
</template>
