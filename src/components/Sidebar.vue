<script setup>
// Sidebar component reused across the app
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

function goTickets() {
  router.push('/tickets')
}

function logout() {
  localStorage.removeItem('token')
  router.push('/')
}
</script>

<template>
  <aside class="sidebar bg-dark text-white p-3 h-100">
    <h2 class="h5">On Street Parking</h2>
    <ul class="list-unstyled mt-3">
      <li class="title fw-bold mb-2">On Street Parking</li>
      <li
        class="mb-1 px-2 py-1 rounded"
        :class="{ 'bg-secondary': route.path === '/tickets' }"
        @click="goTickets"
      >
        Tickets
      </li>
      <li class="logout mt-3" @click="logout">Logout</li>
    </ul>
  </aside>
</template>
