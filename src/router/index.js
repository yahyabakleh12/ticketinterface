import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/login.vue'
import Tickets from '../views/tickets.vue'

const routes = [
  { path: '/', component: Login },
  { path: '/tickets', component: Tickets },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.path !== '/' && !localStorage.getItem('token')) {
    next('/')
  } else {
    next()
  }
})

export default router
