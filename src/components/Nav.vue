<script setup>
import Search from './Search.vue'
</script>
<template>
  <nav class="navbar navbar-expand-md bg-body-tertiary border-bottom border-success">
    <div class="container">
      <RouterLink class="navbar-brand fw-bold text-success" to="/">Rick and Morty</RouterLink>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Abrir menú"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <RouterLink class="nav-link" to="/">Inicio</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/favoritos">Favoritos</RouterLink>
          </li>
        </ul>
        <Search />
      </div>
    </div>
  </nav>
</template>
