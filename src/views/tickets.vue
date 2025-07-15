<script setup>
import { ref, onMounted } from 'vue'
import { getTickets } from '../api'

const tickets = ref([])

onMounted(async () => {
  const token = localStorage.getItem('token')
  const res = await getTickets(token)
  tickets.value = res.data
})
</script>

<template>
  <div>
    <h2>Tickets</h2>
    <ul>
      <li v-for="ticket in tickets" :key="ticket.id">
        {{ ticket.number }} - {{ ticket.city }} - {{ ticket.status }}
      </li>
    </ul>
  </div>
</template>
