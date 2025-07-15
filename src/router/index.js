import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/login.vue'
import Tickets from '../views/tickets.vue'
import TicketDetail from '../views/ticketDetail.vue'
import Orders from '../views/orders.vue'

const routes = [
  { path: '/', component: Login },
  { path: '/tickets', component: Tickets },
  { path: '/tickets/:id', component: TicketDetail },
  { path: '/orders', component: Orders },
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
