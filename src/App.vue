<script setup>
import Nav from './components/Nav.vue'
</script>
<template>
  <header>
    <Nav />
  </header>
  <main class="container py-4">
    <RouterView />
  </main>
</template>

<style>
/* Colores "portal": cambiamos el verde de Bootstrap por un verde neón */
[data-bs-theme='dark'] {
  --bs-success: #97ce4c;
  --bs-success-rgb: 151, 206, 76;
  --bs-body-bg: #0d1117;
}

body {
  /* Resplandor verde suave arriba, como un portal */
  background: radial-gradient(circle at top, rgba(151, 206, 76, 0.12), transparent 60%) fixed,
    var(--bs-body-bg);
}

.btn-success {
  --bs-btn-color: #0d1117;
  --bs-btn-bg: #97ce4c;
  --bs-btn-border-color: #97ce4c;
  --bs-btn-hover-color: #0d1117;
  --bs-btn-hover-bg: #b4e46e;
  --bs-btn-hover-border-color: #b4e46e;
  --bs-btn-active-color: #0d1117;
  --bs-btn-active-bg: #7fb53a;
  --bs-btn-active-border-color: #7fb53a;
  --bs-btn-disabled-color: #0d1117;
  --bs-btn-disabled-bg: #97ce4c;
  --bs-btn-disabled-border-color: #97ce4c;
}

.btn-outline-success {
  --bs-btn-color: #97ce4c;
  --bs-btn-border-color: #97ce4c;
  --bs-btn-hover-color: #0d1117;
  --bs-btn-hover-bg: #97ce4c;
  --bs-btn-hover-border-color: #97ce4c;
  --bs-btn-active-color: #0d1117;
  --bs-btn-active-bg: #97ce4c;
  --bs-btn-active-border-color: #97ce4c;
}

/* Texto oscuro sobre la etiqueta verde para que se lea bien */
.text-bg-success {
  color: #0d1117 !important;
}
</style>
