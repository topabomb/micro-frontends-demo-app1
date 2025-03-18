import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
//const router = createRouter({
//history: createWebHistory(import.meta.env.BASE_URL),
const router = (basePath: string) =>
  createRouter({
    history: createWebHistory(basePath),
    routes: [
      {
        path: '/',
        name: 'home',
        component: HomeView,
      },
      {
        path: '/about',
        name: 'about',
        component: () => import('../views/AboutView.vue'),
      },
    ],
  })
export default router
