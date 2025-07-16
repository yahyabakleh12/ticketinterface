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
  <aside class="sidebar">
    <h2>On Street Parking</h2>
    <ul>
      <li class="title">On Street Parking</li>
      <li :class="{ active: route.path === '/tickets' }" @click="goTickets">
        Tickets
      </li>
      <li class="logout" @click="logout">Logout</li>
    </ul>
  </aside>
</template>
