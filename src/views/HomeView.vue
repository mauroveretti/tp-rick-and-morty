<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Card from '../components/Card.vue'
import Paginacion from '../components/Paginacion.vue'
import Recomendador from '../components/Recomendador.vue'

const route = useRoute()
const router = useRouter()
const personajes = ref([])
const totalPaginas = ref(1)
const estado = ref('')
const cargando = ref(false)
const error = ref(false)

// La búsqueda, el filtro y la página se guardan en la URL (query),
// así al volver atrás desde el detalle seguimos en la misma página
const fetchApi = () => {
  cargando.value = true
  error.value = false
  const nombre = route.query.search || ''
  const pagina = route.query.page || 1
  estado.value = route.query.estado || ''
  fetch(
    `https://rickandmortyapi.com/api/character/?page=${pagina}&name=${nombre}&status=${estado.value}`,
  )
    .then((res) => {
      // La API devuelve 404 cuando la búsqueda no tiene resultados
      if (res.status == 404) {
        return { results: [], info: { pages: 1 } }
      }
      if (!res.ok) {
        throw new Error('Error al cargar los personajes')
      }
      return res.json()
    })
    .then((data) => {
      personajes.value = data.results
      totalPaginas.value = data.info.pages
    })
    .catch((err) => {
      console.log(err)
      error.value = true
    })
    .finally(() => {
      cargando.value = false
    })
}

const cambiarPagina = (nueva) => {
  router.push({
    path: '/',
    query: { search: route.query.search, estado: route.query.estado, page: nueva },
  })
}

const filtrar = () => {
  router.push({
    path: '/',
    query: { search: route.query.search, estado: estado.value },
  })
}

onMounted(() => {
  fetchApi()
})

// Cada vez que cambia la URL (búsqueda, filtro o página) volvemos a pedir los datos
watch(
  () => route.query,
  () => {
    fetchApi()
  },
)
</script>

<template>
  <h1 class="h2 fw-bold mb-1">
    <span v-if="route.query.search">Resultados para "{{ route.query.search }}"</span>
    <span v-else>Personajes</span>
  </h1>
  <p class="text-secondary mb-4">Explorá los personajes de Rick and Morty</p>

  <div class="row mb-4">
    <div class="col-12 col-sm-6 col-md-4">
      <label for="estado" class="form-label">Filtrar por estado</label>
      <select id="estado" class="form-select" v-model="estado" @change="filtrar">
        <option value="">Todos</option>
        <option value="alive">Vivo</option>
        <option value="dead">Muerto</option>
        <option value="unknown">Desconocido</option>
      </select>
    </div>
  </div>

  <div v-if="cargando" class="text-center my-5">
    <div class="spinner-border text-success" role="status"></div>
    <p>Cargando...</p>
  </div>

  <div v-else-if="error" class="alert alert-danger">
    <p>No se pudieron cargar los personajes.</p>
    <button class="btn btn-danger" @click="fetchApi">Reintentar</button>
  </div>

  <div v-else>
    <p v-if="personajes.length == 0" class="alert alert-info">No se encontraron personajes.</p>

    <Recomendador v-else :personajes="personajes" />

    <div class="row g-3">
      <div v-for="personaje in personajes" :key="personaje.id" class="col-12 col-sm-6 col-md-4 col-lg-3">
        <Card :personaje="personaje" />
      </div>
    </div>

    <Paginacion
      v-if="personajes.length > 0"
      :pagina="Number(route.query.page || 1)"
      :totalPaginas="totalPaginas"
      @cambiar="cambiarPagina"
    />
  </div>
</template>
