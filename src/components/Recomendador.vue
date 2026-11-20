<script setup>
import { ref } from 'vue'
import { recomendar } from '@/services/recomendador'

const { personajes } = defineProps(['personajes'])
const pedido = ref('')
const respuesta = ref('')
const cargando = ref(false)
const error = ref('')

const consultar = async () => {
  if (pedido.value.trim() == '') return
  cargando.value = true
  error.value = ''
  respuesta.value = ''
  try {
    respuesta.value = await recomendar(pedido.value, personajes)
  } catch (err) {
    console.log(err)
    // Si se alcanzó el límite del plan gratuito, Gemini responde con error 429 / quota
    const mensaje = err.message.toLowerCase()
    if (mensaje.includes('429') || mensaje.includes('quota')) {
      error.value = 'Se alcanzó el límite de uso gratuito de la IA. Probá de nuevo más tarde.'
    } else if (mensaje.includes('abort') || mensaje.includes('timeout') || mensaje.includes('timed out')) {
      error.value = 'La IA tardó demasiado en responder. Probá de nuevo.'
    } else {
      error.value = 'No se pudo obtener una recomendación.'
    }
  } finally {
    cargando.value = false
  }
}
</script>

<template>
  <section class="card border-success mb-4">
    <div class="card-body">
      <h2 class="h5 text-success">✨ Recomendador con IA</h2>
      <p class="text-secondary small">
        Pedí una recomendación entre los personajes de esta página. Ej: "un personaje que no sea humano"
      </p>
      <form class="d-flex flex-column flex-sm-row gap-2" @submit.prevent="consultar">
        <input v-model="pedido" name="pedido" type="text" class="form-control" placeholder="¿Qué personaje buscás?" />
        <button type="submit" class="btn btn-success" :disabled="cargando">
          <span v-if="cargando">Pensando...</span>
          <span v-else>Recomendar</span>
        </button>
      </form>
      <p v-if="respuesta" class="alert alert-light mt-3 mb-0">{{ respuesta }}</p>
      <div v-if="error" class="alert alert-warning mt-3 mb-0">
        <p>{{ error }}</p>
        <button class="btn btn-warning btn-sm" @click="consultar">Reintentar</button>
      </div>
    </div>
  </section>
</template>
