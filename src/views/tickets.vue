<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { getTickets } from '../api'

const router = useRouter()
const tickets = ref([])

onMounted(async () => {
  const token = localStorage.getItem('token')
  const res = await getTickets(token)
  tickets.value = res.data
})

function logout() {
  localStorage.removeItem('token')
  router.push('/')
}
</script>

<template>
  <div class="dashboard">
    <aside class="sidebar">
      <h2>Dashboard</h2>
      <ul>
        <li><RouterLink to="/tickets">Tickets</RouterLink></li>
        <li><a href="#" @click.prevent="logout">Logout</a></li>
      </ul>
    </aside>
    <main class="content">
      <h2>Tickets</h2>
      <ul>
        <li v-for="ticket in tickets" :key="ticket.id">
          {{ ticket.number }} - {{ ticket.city }} - {{ ticket.status }}
        </li>
      </ul>
    </main>
  </div>
</template>
