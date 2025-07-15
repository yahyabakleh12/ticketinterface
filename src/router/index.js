import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Tickets from '../views/Tickets.vue'

const routes = [
  { path: '/', component: Login },
  { path: '/tickets', component: Tickets }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
