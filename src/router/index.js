import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/detalle/:id',
      component: () => import('@/views/DetalleView.vue'),
    },
    {
      path: '/favoritos',
      component: () => import('@/views/FavoritosView.vue'),
    },
  ],
})

export default router
