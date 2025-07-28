import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/login.vue'
import Tickets from '../views/tickets.vue'
import SubmittedTickets from '../views/submittedTickets.vue'
import CancelledTickets from '../views/cancelledTickets.vue'
import TicketDetail from '../views/ticketDetail.vue'

const routes = [
  { path: '/', component: Login },
  { path: '/tickets', component: Tickets },
  { path: '/submittedtickets', component: SubmittedTickets },
  { path: '/cancelledtickets', component: CancelledTickets },
  { path: '/ticket/:id', component: TicketDetail },
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
